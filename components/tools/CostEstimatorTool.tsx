"use client";

import { useState } from "react";
import { estimateCost, type CostInput } from "@/lib/tools/costEstimate";
import { DUCTS, FINANCING, systemTypes, tiers, type DuctState, type SystemType, type Tier } from "@/lib/tools/pricing";
import { Icon } from "../Icon";
import { ChoiceStep, Gate, money, NumberStep, ResultCtas, ToolCard } from "./ToolUI";

const TOTAL = 5;

export function CostEstimatorTool() {
  const [step, setStep] = useState(1);
  const [d, setD] = useState<Partial<CostInput>>({});
  const [unlocked, setUnlocked] = useState(false);

  const next = (patch: Partial<CostInput>) => {
    setD((p) => ({ ...p, ...patch }));
    setStep((s) => s + 1);
  };
  const back = step > 1 && step <= TOTAL ? () => setStep((s) => s - 1) : undefined;
  const r = step > TOTAL ? estimateCost(d as CostInput) : null;

  return (
    <ToolCard step={step} total={TOTAL} label="Cost estimator" onBack={back}>
      {step === 1 && (
        <NumberStep
          title="How big is your home?"
          hint="Conditioned living space — not counting the garage."
          label="Square feet"
          suffix="sq ft"
          min={300}
          max={10000}
          placeholder="2,000"
          initial={d.sqft}
          onNext={(sqft) => next({ sqft })}
        />
      )}
      {step === 2 && (
        <ChoiceStep
          title="How many stories?"
          selected={d.stories}
          choices={[
            { value: 1, label: "One story", icon: "home" },
            { value: 2, label: "Two stories", icon: "home" },
            { value: 3, label: "Three or more", icon: "home" },
          ]}
          onPick={(stories) => next({ stories: stories as CostInput["stories"] })}
        />
      )}
      {step === 3 && (
        <ChoiceStep
          title="What type of system?"
          hint="Not sure? Pick the first one — it's what most Las Vegas homes have."
          selected={d.type}
          choices={(Object.keys(systemTypes) as SystemType[]).map((k) => ({
            value: k,
            label: systemTypes[k].label,
            sub: systemTypes[k].sub,
            icon: k === "mini-split" ? "split" : k === "heat-pump" ? "unit" : "unitPlus",
          }))}
          onPick={(type) => next({ type })}
        />
      )}
      {step === 4 && (
        <ChoiceStep
          title="Which efficiency level?"
          hint="Higher efficiency costs more up front but lowers your power bill every summer."
          selected={d.tier}
          choices={(Object.keys(tiers) as Tier[]).map((k) => ({ value: k, label: tiers[k].label, sub: tiers[k].sub, icon: "gauge" }))}
          onPick={(tier) => next({ tier })}
        />
      )}
      {step === 5 && (
        <ChoiceStep
          title="What shape is your ductwork in?"
          selected={d.ducts}
          choices={(Object.keys(DUCTS) as DuctState[]).map((k) => ({ value: k, label: DUCTS[k].label, icon: "duct" }))}
          onPick={(ducts) => next({ ducts })}
        />
      )}

      {r && (
        <div className="step result">
          <div className="verdict v-borderline">
            <span className="verdict-ic">
              <Icon name="tag" size={26} />
            </span>
            <div>
              <small>Estimated installed price</small>
              {unlocked ? (
                <strong>
                  {money(r.low)} – {money(r.high)}
                </strong>
              ) : (
                <strong className="blurred" aria-label="Unlock to see your price range">
                  $X,XXX – $XX,XXX
                </strong>
              )}
            </div>
          </div>

          {unlocked ? (
            <>
              <div className="stat-row">
                <div>
                  <small>With financing*</small>
                  <b>
                    {money(r.monthlyLow)}–{money(r.monthlyHigh)}/mo
                  </b>
                </div>
                <div>
                  <small>{d.type === "mini-split" ? "Zones" : "Est. size"}</small>
                  <b>{d.type === "mini-split" ? `${r.zones} zone${r.zones! > 1 ? "s" : ""}` : `${r.tons} tons`}</b>
                </div>
              </div>
              <ul className="check-list tight">
                {r.notes.map((n) => (
                  <li key={n}>
                    <Icon name="check" size={16} />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
              <p className="table-note">
                *Example only: {FINANCING.months} months at {FINANCING.apr}% APR, with approved credit. This is a ballpark range, not a
                quote — your exact price comes from a free in-home estimate.
              </p>
              <ResultCtas service="New system / replacement estimate" primary="Get My Exact Price — Free" />
              <button type="button" className="tool-back" onClick={() => setStep(1)}>
                Start over
              </button>
            </>
          ) : (
            <>
              <p className="form-hint">
                Your estimate is ready — {systemTypes[d.type!].label.toLowerCase()}, {tiers[d.tier!].label.toLowerCase()},{" "}
                {d.sqft!.toLocaleString()} sq ft.
              </p>
              <Gate
                tool="AC Replacement Cost Estimator"
                slug="cost-estimator"
                summary={`${money(r.low)}–${money(r.high)} · ${d.sqft} sq ft, ${d.stories}-story, ${d.type}, ${d.tier}, ducts: ${d.ducts}, ~${r.tons} tons${r.systems > 1 ? ` (${r.systems} systems)` : ""}`}
                service="New system / replacement estimate"
                cta="Show My Price Range"
                onUnlock={() => setUnlocked(true)}
              />
            </>
          )}
        </div>
      )}
    </ToolCard>
  );
}
