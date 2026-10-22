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
  rule5000: number;
  headline: string;
  reasons: string[];
  nextStep: string;
};

export function scoreRepairReplace(i: RRInput): RRResult {
  const rule5000 = Math.round(i.age * i.repairCost);
  let score = 0;
  const reasons: string[] = [];

  if (rule5000 > 5000) {
    score += 3;
    reasons.push(`Age × repair cost = ${fmt(rule5000)}, over the $5,000 rule of thumb — the repair is a big investment in an aging system.`);
  } else if (rule5000 >= 3500) {
    score += 1.5;
    reasons.push(`Age × repair cost = ${fmt(rule5000)}, close to the $5,000 tipping point.`);
  } else if (rule5000 < 2000) {
    score -= 2;
    reasons.push(`Age × repair cost = ${fmt(rule5000)}, well under the $5,000 rule — this repair is reasonable for your system.`);
  } else {
    reasons.push(`Age × repair cost = ${fmt(rule5000)}, under the $5,000 rule of thumb.`);
  }

  if (i.age >= 15) {
    score += 2;
    reasons.push(`At ${i.age} years, your system is at or past the typical 10–15 year lifespan for a Las Vegas AC.`);
  } else if (i.age >= 12) {
    score += 1;
    reasons.push(`At ${i.age} years, your system is entering the final stretch of its expected life in desert heat.`);
  } else if (i.age < 8) {
    score -= 2;
    reasons.push(`At ${i.age} years, your system should have plenty of life left with good maintenance.`);
  }

  if (i.repairs2y >= 3) {
    score += 2;
    reasons.push("Three or more repairs in two years is a strong sign the system is wearing out.");
  } else if (i.repairs2y === 2) {
    score += 1;
    reasons.push("Two repairs in two years suggests reliability is starting to slip.");
  }

  if (i.refrigerant === "r22") {
    score += 2;
    reasons.push("R-22 refrigerant has been phased out, so any refrigerant repair is expensive and supplies keep shrinking.");
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
      nextStep: "Get a repair quote and a free replacement estimate side by side so you can compare real numbers.",
    },
    replace: {
      headline: "Replacement is likely the better value",
      nextStep: "Get a free, no-pressure replacement estimate before putting more money into this system.",
    },
  }[verdict];

  return { verdict, score, rule5000, reasons, ...copy };
}

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
