/**
 * Summer bill savings estimate. Assumptions (edit here):
 * - Cooling is ~65% of a Las Vegas summer electric bill
 * - "Summer" bill applies for ~5.5 months of heavy cooling per year
 * - Efficiency loss from skipped maintenance and savings from thermostat upgrades
 *   are conservative ranges based on ENERGY STAR / DOE guidance.
 */
export const ASSUME = {
  coolingShare: 0.65,
  coolingMonths: 5.5,
  /** NV Energy residential rate used to convert $ to kWh — approximate */
  ratePerKwh: 0.13,
  upgradeSeer: { high: 17, premium: 21 },
};

export type ESInput = {
  bill: number; // average summer monthly electric bill
  age: number;
  seer: number | null; // known SEER, or null to estimate from age
  thermostat: "manual" | "programmable" | "smart";
  tuneUp: "recent" | "1-2" | "2plus" | "never";
};

export type ESResult = {
  annualCooling: number;
  seerUsed: number;
  tuneUp: number;
  thermostat: number;
  upgradeHigh: number;
  upgradePremium: number;
  best: number;
  tenYear: number;
  kwh: number;
};

export function seerFromAge(age: number) {
  if (age < 5) return 15;
  if (age < 10) return 14;
  if (age < 15) return 13;
  if (age < 20) return 11;
  return 10;
}

const MAINT_LOSS = { recent: 0, "1-2": 0.05, "2plus": 0.1, never: 0.15 };
const STAT_SAVE = { manual: 0.08, programmable: 0.03, smart: 0 };

export function estimateSavings(i: ESInput): ESResult {
  const annualCooling = i.bill * ASSUME.coolingShare * ASSUME.coolingMonths;
  const seerUsed = i.seer ?? seerFromAge(i.age);

  const tuneUp = annualCooling * MAINT_LOSS[i.tuneUp];
  const thermostat = annualCooling * STAT_SAVE[i.thermostat];
  const upgrade = (target: number) => Math.max(0, annualCooling * (1 - seerUsed / target));
  const upgradeHigh = upgrade(ASSUME.upgradeSeer.high);
  const upgradePremium = upgrade(ASSUME.upgradeSeer.premium);

  // A new system resets maintenance losses, so they aren't double-counted with an upgrade
  const best = Math.max(tuneUp + thermostat, upgradePremium + thermostat);
  const r = (n: number) => Math.round(n);

  return {
    annualCooling: r(annualCooling),
    seerUsed,
    tuneUp: r(tuneUp),
    thermostat: r(thermostat),
    upgradeHigh: r(upgradeHigh),
    upgradePremium: r(upgradePremium),
    best: r(best),
    tenYear: r(best * 10),
    kwh: r(best / ASSUME.ratePerKwh),
  };
}
