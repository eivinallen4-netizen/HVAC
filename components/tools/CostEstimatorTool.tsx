"use client";

import { useState } from "react";
import { questions, replacementText, resultText, type Option } from "@/lib/estimate/config";
import { rangeText, replacementEstimate, type Answers } from "@/lib/estimate/logic";
import { track } from "@/lib/track";
import { Icon } from "../Icon";
import { ChoiceStep, ResultCtas, ToolCard } from "./ToolUI";

/**
 * AC Replacement Cost Estimator. Uses the same Wave prices as the hero estimate form
 * (lib/estimate/config.ts). While those slots are empty, it shows the "priced at your visit" message.
 */
type StepKey = "system" | "size" | "location" | "zones" | "systems";

const stepsFor = (a: Answers): StepKey[] =>
  a.system === "minisplit" ? ["system", "zones", "systems"] : ["system", "size", "location", "systems"];

export function CostEstimatorTool() {
  const [a, setA] = useState<Answers>({ help: "replace", scope: "complete" });
  const [history, setHistory] = useState<StepKey[]>([]);

  const steps = stepsFor(a);
  const step = steps.find((s) => !a[s]) ?? null;
  const total = steps.length;
  const idx = step ? steps.indexOf(step) + 1 : total + 1;

  const answer = (k: StepKey, v: string) => {
    const next = { ...a, [k]: v };
    setA(next);
    setHistory((h) => [...h, k]);
    if (!stepsFor(next).some((s) => !next[s])) track("tool_result", { tool: "cost-estimator" });
  };
  const back = history.length
    ? () => {
        const last = history[history.length - 1];
        setHistory((h) => h.slice(0, -1));
        setA((p) => {
          const n = { ...p };
          delete n[last];
          return n;
        });
      }
    : undefined;

  const r = step ? null : replacementEstimate(a);

  return (
    <ToolCard step={idx} total={total} label="Cost estimator" onBack={back}>
      {step && (
        <ChoiceStep
          title={questions[step].title}
          hint={"hint" in questions[step] ? (questions[step] as { hint?: string }).hint : undefined}
          choices={questions[step].options as Option[]}
          onPick={(v: string) => answer(step, v)}
        />
      )}

      {r && (
        <div className="step result">
          <div className="est-block">
            <span className="est-label">{replacementText.heading}</span>
            {r.range ? <strong className="est-range">{rangeText(r.range)}</strong> : <strong className="est-msg">{r.message}</strong>}
            <p className="est-fine">{resultText.finePrint}</p>
          </div>
          <ResultCtas service="New system / replacement estimate" primary="Book a Visit" />
          <button
            type="button"
            className="tool-back"
            onClick={() => {
              setA({ help: "replace", scope: "complete" });
              setHistory([]);
            }}
          >
            <Icon name="chev" size={14} className="flip" /> {resultText.startOver}
          </button>
        </div>
      )}
    </ToolCard>
  );
}
