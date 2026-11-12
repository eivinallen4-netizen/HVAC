/**
 * Estimate form logic: routing, price math and messages.
 * Pure functions with no React, so scripts/check-estimate.mjs can test them.
 * All numbers and wording come from ./config.ts. Never put a price here.
 */
import {
  ageMessages,
  compareBox,
  DUCTED,
  fees,
  financing,
  priceList,
  questions,
  repairByProblem,
  repairText,
  replacement,
  replacementText,
  resultText,
  safety,
  UNSURE_LIMIT,
  unsureText,
  urgency,
  zips,
  type Age,
  type Ducts,
  type Help,
  type Price,
  type PriceKey,
  type Problem,
  type Range,
  type Scope,
  type Size,
  type System,
  type Systems,
  type Working,
} from "./config.ts";

export type StepId =
  | "help" | "system" | "age"
  | "problem" | "working"
  | "size" | "scope" | "ducts"
  | "systems" | "zip";

export type Answers = Partial<{
  help: Help;
  system: System;
  age: Age;
  problem: Problem;
  working: Working;
  size: Size;
  scope: Scope;
  ducts: Ducts;
  systems: Systems;
  zip: string;
}>;

/* ─────────────────────────── Routing ─────────────────────────── */
export const wantsRepair = (a: Answers) => a.help === "repair" || a.help === "compare";
export const wantsReplace = (a: Answers) => a.help === "replace" || a.help === "compare";

/** Ordered steps for the current answers */
export function route(a: Answers): StepId[] {
  const steps: StepId[] = ["help", "system", "age"];
  // Before Q1 is answered, count the repair path so the progress bar starts at "1 of 7"
  if (!a.help || wantsRepair(a)) steps.push("problem", "working");
  if (wantsReplace(a)) {
    // Mini-splits are ductless and priced by indoor unit, so skip home size and ducts
    if (a.system === "minisplit") steps.push("scope");
    else steps.push("size", "scope", "ducts");
  }
  steps.push("systems", "zip");
  return steps;
}

/** First step without an answer, or null when the result is ready */
export function nextStep(a: Answers): StepId | null {
  return route(a).find((s) => !a[s]) ?? null;
}

/** How many of the questions asked were answered "Not sure" */
export const unsureCount = (a: Answers) => route(a).filter((s) => a[s] === "unsure").length;
const tooUnsure = (a: Answers) => unsureCount(a) >= UNSURE_LIMIT;

/* ─────────────────────────── Formatting ─────────────────────────── */
export const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
/** "$254–$829", or "$9,800–$14,500+" when the high end is open */
export const rangeText = (r: Range, plus = false) =>
  (r.low === r.high ? money(r.low) : `${money(r.low)}–${money(r.high)}`) + (plus ? "+" : "");

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

/** Monthly payment on the HIGH end of a range, or null below the financing minimum */
export function monthlyFor(r: Range): number | null {
  if (r.high < financing.minimum) return null;
  return Math.ceil((r.high * financing.per10k) / 10000);
}

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
  if (tooUnsure(a)) {
    return { range: null, message: unsureText.repair, likely: rule.likely, lessCommon: [], confirm: repairText.confirm };
  }
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
  /** Show "+" after the high end */
  plus: boolean;
  /** Shown instead of a range */
  message?: string;
  /** Small notes under the range or message */
  notes: string[];
  /** "Or about $182/mo with approved credit" */
  monthly?: string;
  /** Separate duct replacement line (not added to the total) */
  ductLine?: string;
};

/** Complete-system price for one system, before the number of systems */
function oneSystem(a: Answers): Range | null {
  const { system } = a;
  if (!system) return null;
  if (system === "minisplit") return replacement.miniSplitSingleZone;
  const size = !a.size || a.size === "unsure" ? replacement.unsureSize : a.size;
  const bands = replacement.sizeBands[size];
  const types = system === "unsure" ? DUCTED : [system];
  const low = Math.min(...types.map((t) => replacement.bandPrice[bands.low][t].low));
  const high = Math.max(...types.map((t) => replacement.bandPrice[bands.high][t].high));
  return { low, high };
}

export function replacementEstimate(a: Answers): ReplacementResult | null {
  if (!wantsReplace(a)) return null;
  const notes: string[] = [];
  const partial = a.scope === "outdoor" || a.scope === "indoor";

  // Duct line: shown whenever the customer says the ducts are old or damaged
  let ductLine: string | undefined;
  if (a.ducts === "old" && a.system !== "minisplit") {
    const size = !a.size || a.size === "unsure" ? replacement.unsureSize : a.size;
    const d = replacement.ductPrice[size];
    ductLine = validRange(d) ? replacementText.ductLine(rangeText(d)) : replacementText.ductVisit;
  }

  if (tooUnsure(a)) return { range: null, plus: false, message: unsureText.replacement, notes, ductLine };
  if (partial) {
    return { range: null, plus: false, message: replacementText.partialMessage, notes: [replacementText.partialNote], ductLine };
  }
  if (a.scope !== "complete") return { range: null, plus: false, message: replacementText.visitMessage, notes, ductLine };

  const one = oneSystem(a);
  const factor = replacement.systemsFactor[a.systems ?? "1"];
  if (!validRange(one) || !(factor > 0)) {
    return { range: null, plus: false, message: replacementText.visitMessage, notes, ductLine };
  }
  const range = { low: Math.round(one.low * factor), high: Math.round(one.high * factor) };

  if (a.system === "minisplit") notes.push(replacementText.miniSplitNote);
  if (a.size === "gt2300") notes.push(replacementText.bigHomeNote);
  if (factor > 1) notes.push(replacementText.perSystemNote(factor));
  if (a.systems === "3plus") notes.push(replacementText.threePlusNote);

  const m = monthlyFor(range);
  return { range, plus: true, notes, monthly: m ? financing.line(money(m)) : undefined, ductLine };
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
  return compareBox.forAges.includes(a.age);
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
    lines.push(resultText.finePrintRepair);
  }
  const n = replacementEstimate(a);
  if (n) {
    lines.push(`${replacementText.heading}: ${n.range ? rangeText(n.range, n.plus) : n.message}`);
    if (n.monthly) lines.push(n.monthly);
    lines.push(...n.notes);
    if (n.ductLine) lines.push(n.ductLine);
    lines.push(resultText.finePrintReplace);
  }
  if (r) lines.push(`${fees.diagnosticTitle}. ${fees.diagnosticLines.join(" ")}`);
  if (showCompareBox(a)) lines.push(`Shown: ${compareBox.title}`);
  const z = zipStatus(a.zip);
  lines.push(`ZIP ${a.zip ?? "?"}: ${z === "in" ? "in service area" : "outside usual area (customer told to call)"}`);
  return lines.join("\n");
}

/** Short service label for the office */
export function serviceLabel(a: Answers): string {
  if (a.help === "compare") return "Estimate: compare repair vs replacement";
  if (a.help === "replace") return "Estimate: replacement";
  const p = a.problem ? optionLabel("problem", a.problem) : "repair";
  return `Estimate: repair (${p})`;
}
