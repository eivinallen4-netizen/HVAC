/**
 * ⚠️ PLACEHOLDER PRICING — CONFIRM WITH WAVE BEFORE LAUNCH ⚠️
 * Every number in this file feeds the public AC Replacement Cost Estimator.
 * Update to Wave's real installed pricing (equipment + labor + permit) before going live.
 */

export const systemTypes = {
  "ac-furnace": { label: "Central AC + gas furnace", sub: "Split system — most common in Las Vegas" },
  "heat-pump": { label: "Heat pump", sub: "One system for heating & cooling" },
  package: { label: "Package unit", sub: "All-in-one, usually on the roof" },
  "mini-split": { label: "Ductless mini-split", sub: "Room-by-room, no ducts" },
} as const;
export type SystemType = keyof typeof systemTypes;

export const tiers = {
  standard: { label: "Standard efficiency", sub: "Meets current minimums (~14.3–15 SEER2)" },
  high: { label: "High efficiency", sub: "Two-stage, ~16–17 SEER2" },
  premium: { label: "Premium / variable-speed", sub: "Inverter, ~18–22+ SEER2, quietest" },
} as const;
export type Tier = keyof typeof tiers;

/** Installed price = base + perTon × tons (per system). PLACEHOLDER values. */
export const PRICE: Record<Exclude<SystemType, "mini-split">, Record<Tier, { base: number; perTon: number }>> = {
  "ac-furnace": {
    standard: { base: 4500, perTon: 2100 },
    high: { base: 5500, perTon: 2600 },
    premium: { base: 7000, perTon: 3200 },
  },
  "heat-pump": {
    standard: { base: 5000, perTon: 2200 },
    high: { base: 6000, perTon: 2800 },
    premium: { base: 7500, perTon: 3400 },
  },
  package: {
    standard: { base: 4000, perTon: 2000 },
    high: { base: 5000, perTon: 2500 },
    premium: { base: 6500, perTon: 3000 },
  },
};

/** Mini-split: base + per indoor zone. PLACEHOLDER values. */
export const MINI_SPLIT: Record<Tier, { base: number; perZone: number }> = {
  standard: { base: 1000, perZone: 3800 },
  high: { base: 1000, perZone: 4600 },
  premium: { base: 1200, perZone: 5600 },
};

/** Ductwork adders. PLACEHOLDER values. */
export const DUCTS = {
  good: { label: "Ducts are in good shape", add: [0, 0] },
  some: { label: "Some repair / sealing needed", add: [800, 1800] },
  replace: { label: "Full duct replacement", perSqft: [2.5, 4.5] },
  unsure: { label: "Not sure", add: [0, 1200] },
} as const;
export type DuctState = keyof typeof DUCTS;

/** Range spread around the point estimate */
export const SPREAD = { low: 0.9, high: 1.15 };

/** Financing example shown under the price. PLACEHOLDER — match Wave's actual lender terms. */
export const FINANCING = { apr: 9.99, months: 120 };

/** Las Vegas sizing rule of thumb used for the ballpark (actual sizing uses a load calculation) */
export const SQFT_PER_TON = 500;
export const MAX_TONS_PER_SYSTEM = 5;
