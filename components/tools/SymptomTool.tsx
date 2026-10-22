"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { symptoms, urgencyCopy, type Diagnosis } from "@/lib/tools/symptoms";
import { CallLink } from "../Cta";
import { Icon } from "../Icon";
import { ChoiceStep, Gate, ResultCtas, ToolCard } from "./ToolUI";

export function SymptomTool() {
  const [symptomId, setSymptomId] = useState<string | null>(null);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const symptom = symptoms.find((s) => s.id === symptomId);

  const step = result ? 3 : symptom ? 2 : 1;
  const reset = () => {
    setSymptomId(null);
    setResult(null);
  };

  return (
    <ToolCard
      step={step}
      total={2}
      label="AC symptom checker"
      onBack={step === 2 ? () => setSymptomId(null) : undefined}
    >
      {step === 1 && (
        <ChoiceStep
          title="What's your AC doing?"
          hint="Pick the closest match."
          choices={symptoms.map((s) => ({ value: s.id, label: s.label, sub: s.sub, icon: s.icon }))}
          onPick={(v) => setSymptomId(v)}
        />
      )}
      {step === 2 && symptom && (
        <ChoiceStep
          title={symptom.question}
          choices={symptom.answers.map((a, i) => ({ value: i, label: a.label }))}
          onPick={(i) => setResult(symptom.answers[i].result)}
        />
      )}

      {result && (
        <div className="step result">
          <div className={`verdict u-${result.urgency}`}>
            <span className="verdict-ic">
              <Icon name={result.urgency === "emergency" ? "bolt" : result.urgency === "soon" ? "clock" : "check"} size={26} />
            </span>
            <div>
              <small>{urgencyCopy[result.urgency].label}</small>
              <strong>{result.title}</strong>
            </div>
          </div>
          <p className="form-hint">{urgencyCopy[result.urgency].text}</p>

          {result.urgency === "emergency" && (
            <CallLink className="btn btn-red btn-block btn-lg" location="symptom-emergency">
              Call Now — {site.phone}
            </CallLink>
          )}

          <h3 className="result-h">Safe things to check right now</h3>
          <ul className="check-list tight">
            {result.diy.map((x) => (
              <li key={x}>
                <Icon name="check" size={16} />
                <span>{x}</span>
              </li>
            ))}
          </ul>

          {unlocked ? (
            <>
              <h3 className="result-h">Most likely causes</h3>
              <ol className="cause-list">
                {result.causes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ol>
              <h3 className="result-h">What a Wave technician will do</h3>
              <p>{result.tech}</p>
              <p className="result-next">
                Learn more: <Link href={result.link.href}>{result.link.label}</Link>
              </p>
              <ResultCtas service={result.service} primary="Book a Technician" />
              <button type="button" className="tool-back" onClick={reset}>
                Check another symptom
              </button>
            </>
          ) : (
            <Gate
              tool="AC Symptom Checker"
              slug="symptom-checker"
              summary={`${symptom?.label} → ${symptom?.answers.find((a) => a.result === result)?.label}. Likely: ${result.title}. Urgency: ${urgencyCopy[result.urgency].label}`}
              service={result.service}
              cta={result.urgency === "emergency" ? "Get Priority Callback + Full Diagnosis" : "See Likely Causes & Get a Callback"}
              onUnlock={() => setUnlocked(true)}
            />
          )}
        </div>
      )}
    </ToolCard>
  );
}
