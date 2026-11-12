"use client";

import { useState } from "react";
import { questions, resultText, type Option } from "@/lib/estimate/config";
import { replacementEstimate, type Answers } from "@/lib/estimate/logic";
import { track } from "@/lib/track";
import { ReplaceBlock } from "../EstimateForm";
import { Icon } from "../Icon";
import { ChoiceStep, ResultCtas, ToolCard } from "./ToolUI";

/**
 * AC Replacement Cost Estimator. Uses the same Wave prices as the hero estimate form
 * (lib/estimate/config.ts), always for a complete system.
 */
type StepKey = "system" | "size" | "ducts" | "systems";

const START: Answers = { help: "replace", scope: "complete" };
const stepsFor = (a: Answers): StepKey[] =>
  a.system === "minisplit" ? ["system", "systems"] : ["system", "size", "ducts", "systems"];

export function CostEstimatorTool() {
  const [a, setA] = useState<Answers>(START);
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
          <ReplaceBlock n={r} />
          <ResultCtas service="New system / replacement estimate" primary="Book a Visit" />
          <button
            type="button"
            className="tool-back"
            onClick={() => {
              setA(START);
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
