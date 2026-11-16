/**
 * Outcome-first button copy. Main CTAs name what the visitor gets;
 * opt-out links name the outcome they're turning down.
 * The button should answer its heading, not repeat it:
 * - heading names a problem ("AC out in the heat?")  → `relief` (the feeling they get back)
 * - heading names the result ("Restore your comfort") → `action` (the service that gets them there)
 * - anything else                                       → `cta`
 */
export type CtaKey = "repair" | "heat" | "replace" | "tuneup" | "ductless" | "air";

type Copy = { cta: string; action: string; relief: string; decline: string };

export const ctas: Record<CtaKey, Copy> = {
  repair: { cta: "Repair my AC", action: "Get AC repair", relief: "Get more comfort", decline: "No, I don't want my AC fixed" },
  heat: { cta: "Fix my heat", action: "Get heating repair", relief: "Get warm again", decline: "No, I don't want my heat fixed" },
  replace: { cta: "Get more comfort", action: "Get a new AC", relief: "Get more comfort", decline: "No, I don't want more comfort" },
  tuneup: {
    cta: "Keep my system running",
    action: "Get a tune-up",
    relief: "Keep my system running",
    decline: "No, I don't want my system kept running",
  },
  ductless: { cta: "Get more comfort", action: "Get a mini-split", relief: "Get more comfort", decline: "No, I don't want more comfort" },
  air: { cta: "Breathe cleaner air", action: "Get cleaner air", relief: "Breathe cleaner air", decline: "No, I don't want cleaner air" },
};

/** Maps an estimate/service `pick` string (or a CtaKey) to its outcome copy. Unknown → repair. */
export function ctaKey(pick?: string): CtaKey {
  if (!pick) return "repair";
  if (pick in ctas) return pick as CtaKey;
  const p = pick.toLowerCase();
  if (p.includes("heat")) return "heat";
  if (p.includes("replace") || p.includes("new system")) return "replace";
  if (p.includes("maintenance") || p.includes("tune")) return "tuneup";
  if (p.includes("ductless") || p.includes("mini-split")) return "ductless";
  if (p.includes("duct") || p.includes("air quality")) return "air";
  return "repair";
}

export const ctaFor = (pick?: string) => ctas[ctaKey(pick)];
