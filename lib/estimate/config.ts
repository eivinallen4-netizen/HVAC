/**
 * ════════════════════════════════════════════════════════════════════
 *  WAVE ESTIMATE FORM — ALL PRICES, MESSAGES AND ZIP CODES LIVE HERE
 * ════════════════════════════════════════════════════════════════════
 *  Edit numbers and wording in this file only. The form logic
 *  (lib/estimate/logic.ts) and screens (components/EstimateForm.tsx)
 *  read everything from here.
 *
 *  Rules:
 *  • Every price comes from Wave's technician. Never guess a number.
 *  • `null` means "no price yet". The form then shows the
 *    "priced at your visit" message instead of a number. It never shows $0.
 *  • No discounts, coupons, sale or membership pricing anywhere.
 *  • All prices include parts and labor. No sales tax is added.
 * ════════════════════════════════════════════════════════════════════
 */

import type { IconName } from "../site";

/* ─────────────────────────── Shared types ─────────────────────────── */
export type Range = { low: number; high: number };
/** A price on the full repair list */
export type Price =
  | { low: number; high: number } // a range, e.g. $254–$349
  | { from: number } //               "from $535"
  | { fixed: number } //              one price, e.g. $442
  | { perLb: number } //              refrigerant, per pound
  | "visit"; //                       priced at the visit (no number)

export type Option<V extends string = string> = { value: V; label: string; sub?: string; icon?: IconName };

/* ─────────────────────────── Questions ─────────────────────────── */
export type Help = "repair" | "replace" | "compare" | "unsure";
export type System = "split" | "package" | "heatpump" | "minisplit" | "unsure";
export type Age = "lt5" | "5to10" | "11to15" | "gt15" | "unsure";
export type Problem = "nocool" | "noheat" | "nostart" | "airflow" | "noise" | "water" | "other";
export type Working = "yes" | "partial" | "no" | "unsure";
export type History = "none" | "once" | "multiple" | "unsure";
export type Size = "lt1200" | "1200to1800" | "1801to2400" | "2401to3200" | "gt3200" | "unsure";
export type Location = "attic" | "closet" | "garage" | "roof" | "unsure";
export type Scope = "complete" | "outdoor" | "indoor" | "unsure";
export type Zones = "1" | "2" | "3" | "4plus" | "unsure";
export type Systems = "1" | "2" | "3plus" | "unsure";

export const questions = {
  help: {
    title: "What can we help you with?",
    options: [
      { value: "repair", label: "Repair", sub: "Something isn't working right", icon: "wrench" },
      { value: "replace", label: "Replace", sub: "I want a new system", icon: "unitPlus" },
      { value: "compare", label: "Compare", sub: "See repair and replacement side by side", icon: "gauge" },
      { value: "unsure", label: "Not sure", sub: "Help me figure it out", icon: "question" },
    ] as Option<Help>[],
  },
  system: {
    title: "What type of HVAC system do you have?",
    options: [
      { value: "split", label: "Split system", sub: "Outdoor unit plus indoor furnace or air handler", icon: "unit" },
      { value: "package", label: "Package unit", sub: "All-in-one, usually on the roof", icon: "unitPlus" },
      { value: "heatpump", label: "Heat pump", sub: "One system for heating and cooling", icon: "bolt" },
      { value: "minisplit", label: "Mini-split", sub: "Ductless, mounted on the wall", icon: "split" },
      { value: "unsure", label: "Not sure", icon: "question" },
    ] as Option<System>[],
  },
  age: {
    title: "How old is your system?",
    hint: "The age is on the sticker on your outdoor unit.",
    options: [
      { value: "lt5", label: "Under 5 years", icon: "clock" },
      { value: "5to10", label: "5–10 years", icon: "clock" },
      { value: "11to15", label: "11–15 years", icon: "clock" },
      { value: "gt15", label: "Over 15 years", icon: "clock" },
      { value: "unsure", label: "Not sure", icon: "question" },
    ] as Option<Age>[],
  },
  problem: {
    title: "What problem are you experiencing?",
    options: [
      { value: "nocool", label: "No cooling", icon: "snow" },
      { value: "noheat", label: "No heating", icon: "flame" },
      { value: "nostart", label: "Won't start", icon: "power" },
      { value: "airflow", label: "Weak airflow", icon: "duct" },
      { value: "noise", label: "Noise", icon: "bolt" },
      { value: "water", label: "Water", sub: "Leaking or dripping", icon: "drop" },
      { value: "other", label: "Other", icon: "question" },
    ] as Option<Problem>[],
  },
  working: {
    title: "Is the system working at all?",
    options: [
      { value: "yes", label: "Yes", icon: "check" },
      { value: "partial", label: "Partially", icon: "gauge" },
      { value: "no", label: "No", icon: "power" },
      { value: "unsure", label: "Not sure", icon: "question" },
    ] as Option<Working>[],
  },
  history: {
    title: "Has the system needed repairs recently?",
    options: [
      { value: "none", label: "No", icon: "check" },
      { value: "once", label: "Once", icon: "wrench" },
      { value: "multiple", label: "Multiple times", icon: "wrench" },
      { value: "unsure", label: "Not sure", icon: "question" },
    ] as Option<History>[],
  },
  size: {
    title: "What is your home's approximate size?",
    options: [
      { value: "lt1200", label: "Under 1,200 sq ft", icon: "home" },
      { value: "1200to1800", label: "1,200–1,800 sq ft", icon: "home" },
      { value: "1801to2400", label: "1,801–2,400 sq ft", icon: "home" },
      { value: "2401to3200", label: "2,401–3,200 sq ft", icon: "home" },
      { value: "gt3200", label: "Over 3,200 sq ft", icon: "home" },
      { value: "unsure", label: "Not sure", icon: "question" },
    ] as Option<Size>[],
  },
  location: {
    title: "Where is the indoor equipment located?",
    options: [
      { value: "attic", label: "Attic", icon: "home" },
      { value: "closet", label: "Closet", icon: "home" },
      { value: "garage", label: "Garage", icon: "home" },
      { value: "roof", label: "Roof package", icon: "sun" },
      { value: "unsure", label: "Not sure", icon: "question" },
    ] as Option<Location>[],
  },
  scope: {
    title: "What do you want replaced?",
    options: [
      { value: "complete", label: "Complete system", sub: "Indoor and outdoor together", icon: "unitPlus" },
      { value: "outdoor", label: "Outdoor unit only", icon: "unit" },
      { value: "indoor", label: "Indoor unit only", icon: "home" },
      { value: "unsure", label: "Not sure", icon: "question" },
    ] as Option<Scope>[],
  },
  zones: {
    title: "How many indoor units does your mini-split have?",
    hint: "Count the units mounted on your walls.",
    options: [
      { value: "1", label: "1", icon: "split" },
      { value: "2", label: "2", icon: "split" },
      { value: "3", label: "3", icon: "split" },
      { value: "4plus", label: "4 or more", icon: "split" },
      { value: "unsure", label: "Not sure", icon: "question" },
    ] as Option<Zones>[],
  },
  systems: {
    title: "How many HVAC systems serve your home?",
    options: [
      { value: "1", label: "1", icon: "unit" },
      { value: "2", label: "2", icon: "unit" },
      { value: "3plus", label: "3 or more", icon: "unit" },
      { value: "unsure", label: "Not sure", icon: "question" },
    ] as Option<Systems>[],
  },
  zip: {
    title: "What ZIP code is the property in?",
    label: "ZIP code",
    error: "Enter a 5-digit ZIP code",
  },
};

/* ─────────────────────────── Fees ─────────────────────────── */
const DIAGNOSTIC = 89;

export const fees = {
  diagnostic: DIAGNOSTIC,
  diagnosticTitle: `$${DIAGNOSTIC} diagnostic visit`,
  diagnosticLines: [
    `This is also the minimum charge.`,
    `No after-hours, weekend or holiday surcharge.`,
    `Weekdays (Mon–Fri, 7am–6pm): if you approve the repair during the visit, the $${DIAGNOSTIC} is included in the repair price.`,
    `All prices include parts and labor. No sales tax added.`,
  ],
};

/* ─────────────────────────── Full repair price list ─────────────────────────── */
export const priceList = {
  capacitor: { label: "Capacitor", price: { low: 254, high: 349 } },
  contactor: { label: "Contactor", price: { low: 339, high: 569 } },
  condenserFanMotor: { label: "Condenser fan motor", price: { low: 705, high: 829 } },
  blowerMotor: { label: "Blower motor", price: { low: 705, high: 829 } },
  compressor: { label: "Compressor", price: { low: 2900, high: 4500 } },
  txv: { label: "TXV", price: { low: 699, high: 1200 } },
  leakSearch: { label: "Refrigerant leak search", price: { low: 297, high: 499 } },
  leakRepair: { label: "Refrigerant leak repair", price: { from: 535 } },
  refrigerantR410A: { label: "R-410A refrigerant", price: { perLb: 93 } },
  refrigerantR32: { label: "R-32 refrigerant", price: { perLb: 93 } },
  refrigerantR454B: { label: "R-454B refrigerant", price: { perLb: 110 } },
  refrigerantTopOff: { label: "Refrigerant top-off, up to 2 lb", price: { fixed: 424 } },
  drainLine: { label: "Clogged drain line", price: { from: 246 } },
  floatSwitch: { label: "Float switch", price: { fixed: 254 } },
  secondaryDrainPan: { label: "Secondary drain pan", price: { fixed: 679 } },
  condensatePump: { label: "Condensate pump", price: { from: 509 } },
  thermostatBasic: { label: "Thermostat, basic", price: { low: 254, high: 349 } },
  thermostatSmart: { label: "Thermostat, smart", price: { low: 399, high: 760 } },
  igniter: { label: "Furnace igniter", price: { fixed: 442 } },
  flameSensor: { label: "Flame sensor", price: { fixed: 212 } },
  inducerMotor: { label: "Inducer motor", price: { from: 599 } },
  pressureSwitch: { label: "Pressure switch", price: { from: 298 } },
  gasValve: { label: "Gas valve", price: { from: 490 } },
  controlBoard: { label: "Control board", price: { from: 599 } },
  reversingValve: { label: "Reversing valve", price: { from: 594 } },
  defrostBoard: { label: "Defrost board", price: { from: 390 } },
  ductRepair: { label: "Duct repair", price: { low: 299, high: 899 } },
  // Priced at the visit (no number on the site)
  variableSpeedBlower: { label: "Variable-speed blower motor", price: "visit" },
  evaporatorCoil: { label: "Evaporator coil", price: "visit" },
  condenserCoil: { label: "Condenser coil", price: "visit" },
  heatStrips: { label: "Heat strips", price: "visit" },
  miniSplitParts: { label: "Mini-split parts", price: "visit" },
  refrigerantR22: { label: "R-22 refrigerant", price: "visit" },
} satisfies Record<string, { label: string; price: Price }>;

export type PriceKey = keyof typeof priceList;

/* ─────────────────────────── Repair estimate by problem ─────────────────────────── */
type RepairRule = {
  /** null = no range; `message` is shown instead */
  range: Range | null;
  message?: string;
  likely: string[];
  /** Less common causes, priced from the list above */
  lessCommon: PriceKey[];
  /** Added to the less common line when the system is a heat pump */
  heatPumpExtra?: PriceKey[];
};

export const repairByProblem: Record<Problem, RepairRule> = {
  nocool: {
    range: { low: 254, high: 829 },
    likely: ["Capacitor", "Contactor", "Condenser fan motor"],
    lessCommon: ["refrigerantTopOff", "leakSearch", "leakRepair", "compressor"],
  },
  noheat: {
    range: { low: 89, high: 520 },
    likely: ["Dirty filter", "Capacitor", "Ignition"],
    lessCommon: ["igniter", "gasValve", "controlBoard"],
    heatPumpExtra: ["defrostBoard", "reversingValve"],
  },
  nostart: {
    range: { low: 297, high: 349 },
    likely: ["Fuse or breaker", "Thermostat", "Burned wires"],
    lessCommon: ["contactor", "controlBoard"],
  },
  airflow: {
    range: { low: 89, high: 490 },
    likely: ["Dirty filter", "Dirty blower", "Dirty coil"],
    lessCommon: ["blowerMotor", "ductRepair"],
  },
  noise: {
    range: { low: 490, high: 829 },
    likely: ["Blower wheel", "Dirty filter", "Condenser fan motor"],
    lessCommon: [],
  },
  water: {
    range: { low: 247, high: 799 },
    likely: ["Clogged drain line", "Missing secondary drain pan", "Rusted drain pan"],
    lessCommon: [],
  },
  other: {
    range: null,
    message: `$${DIAGNOSTIC} diagnostic visit. We'll give you an exact price before any work.`,
    likely: [],
    lessCommon: [],
  },
};

export const repairText = {
  heading: "Repair estimate",
  likelyLabel: "Likely causes",
  lessCommonLabel: "Less common",
  confirm: "Your technician confirms the exact price before any work. Prices are per system.",
  miniSplitMessage: "Mini-split repairs are priced at your visit.",
};

/* ─────────────────────────── Urgency and what to check now (Q5R) ─────────────────────────── */
const CHECK = {
  ice: "Check the outside unit for ice",
  filter: "Check the air filter",
  batteries: "Check the thermostat batteries",
  breaker: "Check the breaker",
};

export const urgency = {
  line: "We'll get to you as soon as possible.",
  checksLabel: "What to check now",
  checks: {
    yes: [CHECK.ice, CHECK.filter],
    partial: [CHECK.batteries, CHECK.ice, CHECK.filter],
    no: [CHECK.breaker, CHECK.batteries, CHECK.ice, CHECK.filter],
    unsure: [CHECK.breaker, CHECK.batteries, CHECK.ice, CHECK.filter],
  } as Record<Working, string[]>,
};

export const safety = {
  title: "Safety first",
  text: "Turn the system off at the thermostat until we arrive if water is leaking, there's ice on the refrigerant lines, or it's making loud noises.",
  /** Problems that make the safety box prominent */
  prominentFor: ["water", "noise"] as Problem[],
};

/* ─────────────────────────── Age messages (Q3) ─────────────────────────── */
export const ageMessages: Record<Age, { main: string; extra?: string }> = {
  lt5: {
    main: "Good news: it's still new equipment. Keep it maintained and you should enjoy it for at least 10 years.",
    extra: "Parts are usually still under the manufacturer's warranty. If they're covered, you pay labor and any refrigerant.",
  },
  "5to10": {
    main: "Keep it maintained and it should last at least another 5 years.",
    extra: "We'll check with the manufacturer whether your parts are still under warranty.",
  },
  "11to15": {
    main: "Your system is near the end of its lifespan. Good care can stretch it, but if a major repair comes up, be ready to replace.",
  },
  gt15: {
    main: "Your system is past its expected lifespan. It's time to plan an upgrade.",
    extra: "If it uses older R-22 refrigerant, refrigerant and parts cost more and are harder to find.",
  },
  unsure: {
    main: "Not sure how old it is? Your technician can tell from the unit's label.",
  },
};

/* ─────────────────────────── "Compare with replacement" box ─────────────────────────── */
export const compareBox = {
  title: "Compare with replacement",
  text: "On an older system, once a repair reaches about $2,000, replacing usually makes more sense. A burned-out compressor or a refrigerant leak in a hard-to-reach spot usually means replace, not repair.",
  button: "Compare with replacement",
  /** Shown on repair results when the age is one of these… */
  alwaysForAges: ["gt15"] as Age[],
  /** …or when the age AND repair history both match */
  agesWithHistory: ["11to15"] as Age[],
  history: ["multiple"] as History[],
};

/* ─────────────────────────── Replacement estimate ─────────────────────────── */
/*
 * ALL REPLACEMENT SLOTS ARE EMPTY UNTIL WAVE SENDS PRICES.
 * While any slot an answer needs is null, the form shows `replacementText.visitMessage`.
 *
 * How it adds up once filled:
 *   Complete system: systemPrice[type][tons] + locationAdder[location]
 *   Mini-split:      miniSplit.singleZone + miniSplit.addedZone × (indoor units − 1)
 *   Outdoor/indoor only: partialPrice[part][tons] (+ locationAdder when the part is in locationAdderAppliesTo)
 *   Then 2 or 3+ systems: low × extraSystems[n].lowFactor, high × extraSystems[n].highFactor
 */
export const TONS = ["2", "2.5", "3", "3.5", "4", "5"] as const;
export type Tons = (typeof TONS)[number];
type TonTable = Record<Tons, Range | null>;
const emptyTons = (): TonTable => ({ "2": null, "2.5": null, "3": null, "3.5": null, "4": null, "5": null });

export const replacement = {
  /** Home size answer → tons. Example: lt1200: "2" */
  sizeMap: {
    lt1200: null,
    "1200to1800": null,
    "1801to2400": null,
    "2401to3200": null,
    gt3200: null,
  } as Record<Exclude<Size, "unsure">, Tons | null>,

  /** Installed price for a complete system. Example: split: { "3": { low: 0000, high: 0000 } } */
  systemPrice: {
    split: emptyTons(),
    package: emptyTons(),
    heatpump: emptyTons(),
  } as Record<"split" | "package" | "heatpump", TonTable>,

  /** Mini-split: first indoor unit, then each added unit */
  miniSplit: {
    singleZone: null as Range | null,
    addedZone: null as Range | null,
  },

  /** Added for where the indoor equipment is. { low: 0, high: 0 } is allowed for "no extra". */
  locationAdder: {
    attic: null,
    closet: null,
    garage: null,
    roof: null,
  } as Record<Exclude<Location, "unsure">, Range | null>,
  /** Which jobs get the location adder */
  locationAdderAppliesTo: ["complete", "indoor"] as Exclude<Scope, "unsure">[],

  /** Outdoor-only or indoor-only replacement, by size */
  partialPrice: {
    outdoor: emptyTons(),
    indoor: emptyTons(),
  } as Record<"outdoor" | "indoor", TonTable>,

  /** Homes with more than one system. Example: two: { lowFactor: 2, highFactor: 2 } */
  extraSystems: {
    two: null as { lowFactor: number; highFactor: number } | null,
    threePlus: null as { lowFactor: number; highFactor: number } | null,
  },
};

export const replacementText = {
  heading: "Replacement estimate",
  visitMessage:
    "Replacement pricing depends on your home and equipment. We'll measure and give you exact options at a visit.",
  partialNote:
    "Refrigerants have changed (R-22 → R-410A → R-32/R-454B), so older coils often can't be matched with new equipment. Many partial replacements end up as a full system. We'll confirm at your visit.",
};

/* ─────────────────────────── ZIP check (Q8) ─────────────────────────── */
export const zips = {
  /** Any ZIP starting with these is in the area (Las Vegas) */
  prefixes: ["891"],
  /** Plus these exact ZIPs */
  henderson: ["89002", "89011", "89012", "89014", "89015", "89044", "89052", "89074"],
  northLasVegas: ["89030", "89031", "89032", "89033", "89081", "89084", "89085", "89086"],
  inAreaNote: "Good news: you're in our service area, with no trip charge.",
  outsideNote: "You may be outside our usual area. Call us to confirm.",
};

/* ─────────────────────────── Result screen text ─────────────────────────── */
export const resultText = {
  kicker: "Instant estimate",
  title: "Your estimate",
  finePrint:
    "Estimate only, based on recent Wave Heating & Cooling jobs. Prices include parts and labor. No sales tax added. Final price confirmed by your technician before any work.",
  startOver: "Start over",
};

/* ─────────────────────────── Booking ─────────────────────────── */
export const booking = {
  title: "Book a visit",
  hint: "Pick a time that works for you below. We'll confirm your appointment.",
};
