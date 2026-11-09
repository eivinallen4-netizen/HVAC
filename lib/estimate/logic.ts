/**
 * Estimate form logic: routing, price math and messages.
 * Pure functions with no React, so scripts/check-estimate.mjs can test them.
 * All numbers and wording come from ./config.ts. Never put a price here.
 */
import {
  ageMessages,
  compareBox,
  fees,
  priceList,
  questions,
  repairByProblem,
  repairText,
  replacement,
  replacementText,
  resultText,
  safety,
  urgency,
  zips,
  type Age,
  type Help,
  type History,
  type Location,
  type Price,
  type PriceKey,
  type Problem,
  type Range,
  type Scope,
  type Size,
  type System,
  type Systems,
  type Tons,
  type Working,
  type Zones,
} from "./config.ts";

export type StepId =
  | "help" | "system" | "age"
  | "problem" | "working" | "history"
  | "size" | "location" | "scope" | "zones"
  | "systems" | "zip";

export type Answers = Partial<{
  help: Help;
  system: System;
  age: Age;
  problem: Problem;
  working: Working;
  history: History;
  size: Size;
  location: Location;
  scope: Scope;
  zones: Zones;
  systems: Systems;
  zip: string;
}>;

/* ─────────────────────────── Routing ─────────────────────────── */
export const wantsRepair = (a: Answers) => a.help === "repair" || a.help === "unsure" || a.help === "compare";
export const wantsReplace = (a: Answers) => a.help === "replace" || a.help === "compare";

/** Ordered steps for the current answers */
export function route(a: Answers): StepId[] {
  const steps: StepId[] = ["help", "system", "age"];
  // Before Q1 is answered, count the repair path so the progress bar starts at "1 of 8"
  if (!a.help || wantsRepair(a)) steps.push("problem", "working", "history");
  if (wantsReplace(a)) {
    steps.push("size", "location", "scope");
    if (a.system === "minisplit") steps.push("zones");
  }
  steps.push("systems", "zip");
  return steps;
}

/** First step without an answer, or null when the result is ready */
export function nextStep(a: Answers): StepId | null {
  return route(a).find((s) => !a[s]) ?? null;
}

/* ─────────────────────────── Formatting ─────────────────────────── */
export const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
export const rangeText = (r: Range) => (r.low === r.high ? money(r.low) : `${money(r.low)}–${money(r.high)}`);

export function priceText(p: Price): string {
  if (p === "visit") return "priced at your visit";
  if ("perLb" in p) return `${money(p.perLb)} per lb`;
  if ("from" in p) return `from ${money(p.from)}`;
  if ("fixed" in p) return money(p.fixed);
  return rangeText(p);
}

export const itemText = (k: PriceKey) => `${priceList[k].label} (${priceText(priceList[k].price)})`;

/** A range we're allowed to show: real numbers, above $0, low ≤ high */
export const validRange = (r: Range | null | undefined): r is Range =>
  !!r && Number.isFinite(r.low) && Number.isFinite(r.high) && r.low > 0 && r.high >= r.low;

/* ─────────────────────────── Repair estimate ─────────────────────────── */
export type RepairResult = {
  range: Range | null;
  /** Shown instead of a range */
  message?: string;
  /** Extra line under the message (mini-split) */
  messageSub?: string;
  likely: string[];
  lessCommon: string[];
  confirm: string;
};

export function repairEstimate(a: Answers): RepairResult | null {
  if (!wantsRepair(a) || !a.problem) return null;
  if (a.system === "minisplit") {
    return {
      range: null,
      message: `${fees.diagnosticTitle}.`,
      messageSub: repairText.miniSplitMessage,
      likely: [],
      lessCommon: [],
      confirm: repairText.confirm,
    };
  }
  const rule = repairByProblem[a.problem];
  const extra = a.system === "heatpump" ? rule.heatPumpExtra ?? [] : [];
  return {
    range: validRange(rule.range) ? rule.range : null,
    message: validRange(rule.range) ? undefined : rule.message ?? `${fees.diagnosticTitle}.`,
    likely: rule.likely,
    lessCommon: [...rule.lessCommon, ...extra].map(itemText),
    confirm: repairText.confirm,
  };
}

/* ─────────────────────────── Replacement estimate ─────────────────────────── */
export type ReplacementResult = {
  range: Range | null;
  /** Shown instead of a range */
  message?: string;
  /** Refrigerant note for outdoor-only / indoor-only */
  partialNote?: string;
};

const add = (a: Range, b: Range): Range => ({ low: a.low + b.low, high: a.high + b.high });

function systemsFactor(s: Systems | undefined) {
  if (s === "1") return { lowFactor: 1, highFactor: 1 };
  if (s === "2") return replacement.extraSystems.two;
  if (s === "3plus") return replacement.extraSystems.threePlus;
  return null; // not answered or "Not sure"
}

function rawReplacement(a: Answers): Range | null {
  const { system, size, location, scope, zones } = a;
  if (!system || system === "unsure" || !scope || scope === "unsure") return null;

  let price: Range | null = null;
  if (system === "minisplit") {
    // Mini-splits are priced by indoor unit. Partial mini-split jobs are priced at the visit.
    if (scope !== "complete" || !zones || zones === "unsure" || zones === "4plus") return null;
    const first = replacement.miniSplit.singleZone;
    const each = replacement.miniSplit.addedZone;
    const extra = Number(zones) - 1;
    if (!validRange(first)) return null;
    if (extra > 0 && !(each && each.low >= 0 && each.high >= each.low)) return null;
    price = extra > 0 ? { low: first.low + each!.low * extra, high: first.high + each!.high * extra } : first;
  } else {
    if (!size || size === "unsure") return null;
    const tons: Tons | null = replacement.sizeMap[size];
    if (!tons) return null;
    price = scope === "complete" ? replacement.systemPrice[system][tons] : replacement.partialPrice[scope][tons];
    if (!validRange(price)) return null;
    if (replacement.locationAdderAppliesTo.includes(scope)) {
      if (!location || location === "unsure") return null;
      const adder = replacement.locationAdder[location];
      if (!adder || adder.low < 0 || adder.high < adder.low) return null;
      price = add(price, adder);
    }
  }

  const f = systemsFactor(a.systems);
  if (!f || !(f.lowFactor > 0) || !(f.highFactor > 0)) return null;
  const total = { low: Math.round(price.low * f.lowFactor), high: Math.round(price.high * f.highFactor) };
  return validRange(total) ? total : null;
}

export function replacementEstimate(a: Answers): ReplacementResult | null {
  if (!wantsReplace(a)) return null;
  const range = rawReplacement(a);
  const partial = a.scope === "outdoor" || a.scope === "indoor";
  return {
    range,
    message: range ? undefined : replacementText.visitMessage,
    partialNote: partial ? replacementText.partialNote : undefined,
  };
}

/* ─────────────────────────── Other result pieces ─────────────────────────── */
export type ZipStatus = "in" | "out" | "invalid";

export function zipStatus(zip: string | undefined): ZipStatus {
  if (!zip || !/^\d{5}$/.test(zip)) return "invalid";
  if (zips.prefixes.some((p) => zip.startsWith(p))) return "in";
  if (zips.henderson.includes(zip) || zips.northLasVegas.includes(zip)) return "in";
  return "out";
}

/** "Compare with replacement" box on repair-only results */
export function showCompareBox(a: Answers): boolean {
  if (wantsReplace(a) || !wantsRepair(a) || !a.age) return false;
  if (compareBox.alwaysForAges.includes(a.age)) return true;
  return compareBox.agesWithHistory.includes(a.age) && !!a.history && compareBox.history.includes(a.history);
}

export const ageMessage = (a: Answers) => (a.age ? ageMessages[a.age] : null);

export function urgencyFor(a: Answers) {
  if (!wantsRepair(a) || !a.working) return null;
  return {
    line: urgency.line,
    checks: urgency.checks[a.working],
    safety: safety.text,
    prominent: !!a.problem && safety.prominentFor.includes(a.problem),
  };
}

/* ─────────────────────────── Booking summary ─────────────────────────── */
const optionLabel = (step: StepId, value: string) => {
  if (step === "zip") return value;
  const opts = questions[step].options as { value: string; label: string }[];
  return opts.find((o) => o.value === value)?.label ?? value;
};

/** Plain-text questions and answers, in the order asked */
export function answersText(a: Answers): string {
  return route(a)
    .filter((s) => a[s])
    .map((s) => `${questions[s].title} ${optionLabel(s, a[s] as string)}`)
    .join("\n");
}

/** Plain-text copy of exactly what the customer saw */
export function estimateText(a: Answers): string {
  const lines: string[] = [];
  const r = repairEstimate(a);
  if (r) {
    lines.push(`${repairText.heading}: ${r.range ? rangeText(r.range) : [r.message, r.messageSub].filter(Boolean).join(" ")}`);
    if (r.likely.length) lines.push(`${repairText.likelyLabel}: ${r.likely.join(", ")}`);
    if (r.lessCommon.length) lines.push(`${repairText.lessCommonLabel}: ${r.lessCommon.join(", ")}`);
  }
  const n = replacementEstimate(a);
  if (n) {
    lines.push(`${replacementText.heading}: ${n.range ? rangeText(n.range) : n.message}`);
    if (n.partialNote) lines.push(n.partialNote);
  }
  if (r) lines.push(`${fees.diagnosticTitle}. ${fees.diagnosticLines.join(" ")}`);
  if (showCompareBox(a)) lines.push(`Shown: ${compareBox.title}`);
  const z = zipStatus(a.zip);
  lines.push(`ZIP ${a.zip ?? "?"}: ${z === "in" ? "in service area" : "outside usual area (customer told to call)"}`);
  lines.push(resultText.finePrint);
  return lines.join("\n");
}

/** Short service label for the office */
export function serviceLabel(a: Answers): string {
  if (a.help === "compare") return "Estimate: compare repair vs replacement";
  if (a.help === "replace") return "Estimate: replacement";
  const p = a.problem ? optionLabel("problem", a.problem) : "repair";
  return `Estimate: repair (${p})`;
}
