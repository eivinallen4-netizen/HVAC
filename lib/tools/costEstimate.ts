import {
  DUCTS,
  FINANCING,
  MAX_TONS_PER_SYSTEM,
  MINI_SPLIT,
  PRICE,
  SPREAD,
  SQFT_PER_TON,
  type DuctState,
  type SystemType,
  type Tier,
} from "./pricing";

export type CostInput = {
  sqft: number;
  stories: 1 | 2 | 3;
  type: SystemType;
  tier: Tier;
  ducts: DuctState;
};

export type CostResult = {
  low: number;
  high: number;
  tons: number;
  systems: number;
  zones?: number;
  monthlyLow: number;
  monthlyHigh: number;
  notes: string[];
};

const round100 = (n: number) => Math.round(n / 100) * 100;

export function monthlyPayment(principal: number, apr = FINANCING.apr, months = FINANCING.months) {
  const r = apr / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export function estimateCost(i: CostInput): CostResult {
  const notes: string[] = [];
  let point = 0;
  let tons = 0;
  let systems = 1;
  let zones: number | undefined;

  if (i.type === "mini-split") {
    zones = Math.max(1, Math.min(8, Math.ceil(i.sqft / 600)));
    const p = MINI_SPLIT[i.tier];
    point = p.base + p.perZone * zones;
    tons = Math.round(zones * 0.75 * 2) / 2;
    notes.push(`Assumes about ${zones} indoor zone${zones > 1 ? "s" : ""} for ${i.sqft.toLocaleString()} sq ft.`);
  } else {
    // 2+ story homes in Las Vegas commonly need a bit more capacity (hot upstairs)
    const raw = (i.sqft / SQFT_PER_TON) * (i.stories > 1 ? 1.05 : 1);
    tons = Math.max(1.5, Math.round(raw * 2) / 2);
    systems = Math.ceil(tons / MAX_TONS_PER_SYSTEM);
    if (i.stories > 1 && i.sqft > 2800) systems = Math.max(systems, 2);
    const perSystemTons = Math.round((tons / systems) * 2) / 2;
    const p = PRICE[i.type][i.tier];
    point = systems * (p.base + p.perTon * perSystemTons);
    notes.push(
      `Ballpark sizing: about ${tons} tons${systems > 1 ? ` split across ${systems} systems` : ""} for ${i.sqft.toLocaleString()} sq ft. Final sizing uses a full load calculation.`
    );
  }

  let low = point * SPREAD.low;
  let high = point * SPREAD.high;

  const d = DUCTS[i.ducts];
  if ("perSqft" in d) {
    low += d.perSqft[0] * i.sqft;
    high += d.perSqft[1] * i.sqft;
    notes.push("Includes an allowance for replacing the duct system.");
  } else if (d.add[1] > 0) {
    low += d.add[0];
    high += d.add[1];
    notes.push(i.ducts === "unsure" ? "Includes a small allowance in case duct repairs are needed." : "Includes an allowance for duct repair and sealing.");
  }

  notes.push("Includes equipment, standard installation, removal of old equipment and startup testing. Rebates may lower your cost.");

  low = round100(low);
  high = round100(high);
  return {
    low,
    high,
    tons,
    systems,
    zones,
    monthlyLow: Math.round(monthlyPayment(low)),
    monthlyHigh: Math.round(monthlyPayment(high)),
    notes,
  };
}
