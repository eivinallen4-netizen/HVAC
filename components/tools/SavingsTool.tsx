"use client";

import { useState } from "react";
import { estimateSavings, seerFromAge, type ESInput } from "@/lib/tools/energySavings";
import { Icon } from "../Icon";
import { ChoiceStep, Gate, money, NumberStep, ResultCtas, ToolCard } from "./ToolUI";

const TOTAL = 5;

export function SavingsTool() {
  const [step, setStep] = useState(1);
  const [d, setD] = useState<Partial<ESInput>>({});
  const [unlocked, setUnlocked] = useState(false);

  const next = (patch: Partial<ESInput>) => {
    setD((p) => ({ ...p, ...patch }));
    setStep((s) => s + 1);
  };
  const back = step > 1 && step <= TOTAL ? () => setStep((s) => s - 1) : undefined;
  const r = step > TOTAL ? estimateSavings(d as ESInput) : null;

  return (
    <ToolCard step={step} total={TOTAL} label="Summer bill savings" onBack={back}>
      {step === 1 && (
        <NumberStep
          title="What's your average summer electric bill?"
          hint="June–August is a good guide. A rough number is fine."
          label="Monthly bill"
          prefix="$"
          min={40}
          max={2000}
          placeholder="350"
          initial={d.bill}
          onNext={(bill) => next({ bill })}
        />
      )}
      {step === 2 && (
        <NumberStep
          title="How old is your air conditioner?"
          label="System age"
          suffix="years"
          min={0}
          max={50}
          placeholder="12"
          initial={d.age}
          onNext={(age) => next({ age })}
        />
      )}
      {step === 3 && (
        <ChoiceStep
          title="Do you know its SEER rating?"
          hint="It's on the yellow EnergyGuide label or the outdoor unit's sticker."
          choices={[
            { value: 0, label: "Not sure", sub: `We'll estimate about ${seerFromAge(d.age ?? 12)} SEER from its age` },
            { value: 10, label: "10 SEER or lower" },
            { value: 13, label: "13 SEER" },
            { value: 14, label: "14–15 SEER" },
            { value: 16, label: "16+ SEER" },
          ]}
          onPick={(v) => next({ seer: v === 0 ? null : v })}
        />
      )}
      {step === 4 && (
        <ChoiceStep
          title="What kind of thermostat do you have?"
          selected={d.thermostat}
          choices={[
            { value: "manual", label: "Manual / basic", sub: "You adjust it by hand" },
            { value: "programmable", label: "Programmable", sub: "Set schedules" },
            { value: "smart", label: "Smart / Wi-Fi", sub: "Nest, Ecobee, Honeywell, etc." },
          ]}
          onPick={(thermostat) => next({ thermostat: thermostat as ESInput["thermostat"] })}
        />
      )}
      {step === 5 && (
        <ChoiceStep
          title="When was its last professional tune-up?"
          selected={d.tuneUp}
          choices={[
            { value: "recent", label: "Within the last year" },
            { value: "1-2", label: "1–2 years ago" },
            { value: "2plus", label: "More than 2 years ago" },
            { value: "never", label: "Never / not sure" },
          ]}
          onPick={(tuneUp) => next({ tuneUp: tuneUp as ESInput["tuneUp"] })}
        />
      )}

      {r && (
        <div className="step result">
          <div className="verdict v-repair">
            <span className="verdict-ic">
              <Icon name="bolt" size={26} />
            </span>
            <div>
              <small>You could save up to</small>
              <strong>{money(r.best)} per year</strong>
            </div>
          </div>
          <p className="form-hint">
            We estimate about {money(r.annualCooling)} of your yearly electric bill goes to cooling, with your system running at
            roughly {r.seerUsed} SEER.
          </p>

          {unlocked ? (
            <>
              <div className="savings-table">
                <SaveRow label="Professional tune-up" sub="Restore lost efficiency" value={r.tuneUp} max={r.upgradePremium || 1} />
                <SaveRow label="Smart thermostat" sub="Smarter scheduling" value={r.thermostat} max={r.upgradePremium || 1} />
                <SaveRow label="High-efficiency upgrade" sub="~17 SEER2 system" value={r.upgradeHigh} max={r.upgradePremium || 1} />
                <SaveRow label="Premium inverter upgrade" sub="~21 SEER2 variable-speed" value={r.upgradePremium} max={r.upgradePremium || 1} />
              </div>
              <div className="stat-row">
                <div>
                  <small>10-year savings</small>
                  <b>{money(r.tenYear)}</b>
                </div>
                <div>
                  <small>Energy saved / yr</small>
                  <b>{r.kwh.toLocaleString()} kWh</b>
                </div>
              </div>
              <p className="table-note">
                Estimates based on typical Las Vegas usage and NV Energy rates. Actual savings vary with your home, habits and rates.
              </p>
              <ResultCtas
                service={r.upgradePremium > r.tuneUp * 2 ? "New system / replacement estimate" : "Maintenance / tune-up"}
                primary={r.upgradePremium > r.tuneUp * 2 ? "Get a Free Upgrade Estimate" : "Book a Tune-Up"}
              />
              <button type="button" className="tool-back" onClick={() => setStep(1)}>
                Start over
              </button>
            </>
          ) : (
            <Gate
              tool="Summer Bill Savings Calculator"
              slug="savings-calculator"
              summary={`Up to ${money(r.best)}/yr. Bill $${d.bill}/mo, ${d.age}-yr AC (~${r.seerUsed} SEER), thermostat ${d.thermostat}, last tune-up ${d.tuneUp}. Tune-up ${money(r.tuneUp)}, upgrade ${money(r.upgradeHigh)}–${money(r.upgradePremium)}/yr.`}
              service="Maintenance / tune-up"
              cta="Show My Savings Breakdown"
              onUnlock={() => setUnlocked(true)}
            />
          )}
        </div>
      )}
    </ToolCard>
  );
}

function SaveRow({ label, sub, value, max }: { label: string; sub: string; value: number; max: number }) {
  return (
    <div className="save-row">
      <div>
        <strong>{label}</strong>
        <small>{sub}</small>
      </div>
      <div className="save-bar" aria-hidden="true">
        <i style={{ width: `${Math.max(3, Math.min(100, (value / max) * 100))}%` }} />
      </div>
      <b>{money(value)}/yr</b>
    </div>
  );
}
