/** Repair-or-Replace scoring. Pure function — no prices shown to the user, recommendation only. */

export type RRInput = {
  age: number; // years
  repairCost: number; // $ quoted (or expected) repair
  repairs2y: 0 | 1 | 2 | 3; // repairs in the last 2 years (3 = 3+)
  refrigerant: "r22" | "r410a" | "unsure";
  bills: "stable" | "rising";
  comfort: "good" | "some" | "poor";
  stay: "short" | "mid" | "long"; // <2 yrs, 2–5, 5+
};

export type RRVerdict = "repair" | "borderline" | "replace";

export type RRResult = {
  verdict: RRVerdict;
  score: number;
  headline: string;
  reasons: string[];
  nextStep: string;
};

/**
 * Wave's own rule (tech questionnaire, Nov 2026): no age × cost formula.
 * Replacement comes up when the system is over 15 years old AND the repair is about $2,000 or more.
 * Minor repairs are fine at any age; the number of past repairs matters less than what this one costs.
 */
const OLD_AGE = 15;
const BIG_REPAIR = 2000;

export function scoreRepairReplace(i: RRInput): RRResult {
  let score = 0;
  const reasons: string[] = [];
  const old = i.age >= OLD_AGE;
  const big = i.repairCost >= BIG_REPAIR;

  if (old && big) {
    score += 4;
    reasons.push(`A ${fmt(i.repairCost)} repair on a ${i.age}-year-old system is past our $2,000 line. That's a big investment in a system near the end of its life.`);
  } else if (big) {
    score += 1.5;
    reasons.push(`${fmt(i.repairCost)} is a major repair, but on a system under ${OLD_AGE} years old it's often still worth doing.`);
  } else if (i.repairCost < 1000) {
    score -= 2;
    reasons.push(`A ${fmt(i.repairCost)} repair is a common, minor fix. Repairing makes sense at almost any age.`);
  } else {
    reasons.push(`${fmt(i.repairCost)} is under our $2,000 line for older systems.`);
  }

  if (old) {
    score += 1.5;
    reasons.push(`At ${i.age} years, your system is past the typical 15-year lifespan for a Las Vegas AC. Plan for replacement if a major repair comes up.`);
  } else if (i.age >= 11) {
    score += 0.5;
    reasons.push(`At ${i.age} years, your system is near the end of its lifespan. Good care can stretch it.`);
  } else if (i.age < 10) {
    score -= 2;
    reasons.push(`At ${i.age} years, your system should have plenty of life left with good maintenance.`);
  }

  if (i.repairs2y >= 3) {
    score += 1;
    reasons.push("Three or more repairs in two years can be a sign the system is wearing out.");
  }

  if (i.refrigerant === "r22") {
    score += 1.5;
    reasons.push("R-22 systems can still be repaired, but refrigerant and parts get more expensive and harder to find every year.");
  }

  if (i.bills === "rising") {
    score += 1;
    reasons.push("Rising power bills usually mean the system is losing efficiency.");
  }

  if (i.comfort === "poor") {
    score += 1;
    reasons.push("Your home isn't staying comfortable — a sign the system may be worn out or sized wrong.");
  } else if (i.comfort === "some") {
    score += 0.5;
  }

  if (i.stay === "short") {
    score -= 1.5;
    reasons.push("Since you may move within two years, a repair often makes more financial sense than a new system.");
  } else if (i.stay === "long") {
    score += 0.5;
    reasons.push("Staying 5+ years means you'd enjoy most of the energy savings and reliability of a new system.");
  }

  const verdict: RRVerdict = score >= 4 ? "replace" : score >= 1.5 ? "borderline" : "repair";

  const copy = {
    repair: {
      headline: "Repair makes sense",
      nextStep: "Get the repair done and keep the system on a yearly tune-up schedule to get the most life out of it.",
    },
    borderline: {
      headline: "It's a close call",
      nextStep: "Get a repair quote and a replacement estimate side by side so you can compare real numbers.",
    },
    replace: {
      headline: "Replacement is likely the better value",
      nextStep: "Get a no-pressure replacement estimate before putting more money into this system.",
    },
  }[verdict];

  return { verdict, score, reasons, ...copy };
}

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
