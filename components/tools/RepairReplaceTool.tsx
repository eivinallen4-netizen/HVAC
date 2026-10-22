"use client";

import { useState } from "react";
import { scoreRepairReplace, type RRInput, type RRResult } from "@/lib/tools/repairReplace";
import { Icon } from "../Icon";
import { ChoiceStep, Gate, NumberStep, ResultCtas, ToolCard } from "./ToolUI";

const TOTAL = 7;

export function RepairReplaceTool() {
  const [step, setStep] = useState(1);
  const [d, setD] = useState<Partial<RRInput>>({});
  const [unlocked, setUnlocked] = useState(false);

  const next = (patch: Partial<RRInput>) => {
    setD((p) => ({ ...p, ...patch }));
    setStep((s) => s + 1);
  };
  const back = step > 1 && step <= TOTAL ? () => setStep((s) => s - 1) : undefined;

  const done = step > TOTAL;
  const result: RRResult | null = done ? scoreRepairReplace(d as RRInput) : null;

  return (
    <ToolCard step={step} total={TOTAL} label="Repair or replace?" onBack={back}>
      {step === 1 && (
        <NumberStep
          title="How old is your AC or heat pump?"
          hint="Check the sticker on the outdoor unit, or your best guess is fine."
          label="System age"
          suffix="years"
          min={0}
          max={50}
          placeholder="12"
          initial={d.age}
          onNext={(age) => next({ age })}
        />
      )}
      {step === 2 && (
        <NumberStep
          title="How much is the repair you've been quoted?"
          hint="Don't have a quote yet? Estimate — a refrigerant leak or compressor is usually $1,000+, a capacitor or contactor a few hundred."
          label="Repair cost"
          prefix="$"
          min={50}
          max={20000}
          placeholder="1,200"
          initial={d.repairCost}
          onNext={(repairCost) => next({ repairCost })}
        />
      )}
      {step === 3 && (
        <ChoiceStep
          title="How many repairs in the last 2 years?"
          selected={d.repairs2y}
          choices={[
            { value: 0, label: "None", sub: "This is the first problem" },
            { value: 1, label: "One" },
            { value: 2, label: "Two" },
            { value: 3, label: "Three or more" },
          ]}
          onPick={(repairs2y) => next({ repairs2y: repairs2y as RRInput["repairs2y"] })}
        />
      )}
      {step === 4 && (
        <ChoiceStep
          title="What refrigerant does it use?"
          hint="It's printed on the outdoor unit's label. Systems installed before 2010 often use R-22."
          selected={d.refrigerant}
          choices={[
            { value: "r22", label: "R-22 (Freon)", sub: "Older systems — phased out" },
            { value: "r410a", label: "R-410A / R-454B / R-32", sub: "Newer refrigerants" },
            { value: "unsure", label: "Not sure" },
          ]}
          onPick={(refrigerant) => next({ refrigerant: refrigerant as RRInput["refrigerant"] })}
        />
      )}
      {step === 5 && (
        <ChoiceStep
          title="How have your summer power bills been?"
          selected={d.bills}
          choices={[
            { value: "stable", label: "About the same each year" },
            { value: "rising", label: "Creeping up", sub: "Higher than last year for similar weather" },
          ]}
          onPick={(bills) => next({ bills: bills as RRInput["bills"] })}
        />
      )}
      {step === 6 && (
        <ChoiceStep
          title="How comfortable is your home on hot days?"
          selected={d.comfort}
          choices={[
            { value: "good", label: "Comfortable everywhere" },
            { value: "some", label: "A few warm rooms" },
            { value: "poor", label: "Struggles to keep up", sub: "Hot rooms, runs nonstop" },
          ]}
          onPick={(comfort) => next({ comfort: comfort as RRInput["comfort"] })}
        />
      )}
      {step === 7 && (
        <ChoiceStep
          title="How long do you plan to stay in the home?"
          selected={d.stay}
          choices={[
            { value: "short", label: "Less than 2 years" },
            { value: "mid", label: "2–5 years" },
            { value: "long", label: "5+ years" },
          ]}
          onPick={(stay) => next({ stay: stay as RRInput["stay"] })}
        />
      )}

      {result && (
        <div className="step result">
          <div className={`verdict v-${result.verdict}`}>
            <span className="verdict-ic">
              <Icon name={result.verdict === "repair" ? "wrench" : result.verdict === "replace" ? "unitPlus" : "gauge"} size={26} />
            </span>
            <div>
              <small>Our recommendation</small>
              <strong>{result.headline}</strong>
            </div>
          </div>
          <div className="meter" aria-hidden="true">
            <span>Repair</span>
            <div className="meter-bar">
              <i style={{ left: `${Math.max(4, Math.min(96, ((result.score + 5) / 15) * 100))}%` }} />
            </div>
            <span>Replace</span>
          </div>

          {unlocked ? (
            <>
              <h3 className="result-h">Why we recommend this</h3>
              <ul className="check-list tight">
                {result.reasons.map((r) => (
                  <li key={r}>
                    <Icon name="check" size={16} />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <p className="result-next">
                <strong>Next step:</strong> {result.nextStep}
              </p>
              <ResultCtas
                service={result.verdict === "repair" ? "AC not cooling" : "New system / replacement estimate"}
                primary={result.verdict === "repair" ? "Book a Repair" : "Get a Free Replacement Estimate"}
              />
              <button type="button" className="tool-back" onClick={() => setStep(1)}>
                Start over
              </button>
            </>
          ) : (
            <Gate
              tool="Repair or Replace Calculator"
              slug="repair-or-replace"
              summary={`${result.verdict.toUpperCase()} (score ${result.score}). ${d.age}-yr system, $${d.repairCost} repair, ${d.repairs2y} repairs/2y, refrigerant ${d.refrigerant}, bills ${d.bills}, comfort ${d.comfort}, stay ${d.stay}. Age×cost = $${result.rule5000}.`}
              service={result.verdict === "repair" ? "AC not cooling" : "New system / replacement estimate"}
              cta="Show Me Why"
              onUnlock={() => setUnlocked(true)}
            />
          )}
        </div>
      )}
    </ToolCard>
  );
}
