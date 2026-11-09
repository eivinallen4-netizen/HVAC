"use client";

import { useState } from "react";
import type { IconName } from "@/lib/site";
import { track } from "@/lib/track";
import { CallLink } from "../Cta";
import { Icon } from "../Icon";
import { BookNowLink } from "../Booking";

export type Choice<T extends string | number> = { value: T; label: string; sub?: string; icon?: IconName };

/** Card shell with progress bar for multi-step tools */
export function ToolCard({
  step,
  total,
  label,
  onBack,
  children,
  id,
  className = "",
}: {
  step: number;
  total: number;
  label: string;
  onBack?: () => void;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const pct = Math.min(100, Math.round((step / total) * 100));
  return (
    <div className={`form-card tool-ui ${className}`.trim()} id={id}>
      <div className="form-top">
        <span className="kicker">{label}</span>
        <span className="step-pill">{step <= total ? `Step ${step} of ${total}` : "Your results"}</span>
      </div>
      <div className="progress" aria-hidden="true">
        <i style={{ width: `${pct}%` }} />
      </div>
      {children}
      {onBack && (
        <button type="button" className="tool-back" onClick={onBack}>
          <Icon name="chev" size={14} className="flip" /> Back
        </button>
      )}
    </div>
  );
}

/** One question with tappable options; picking one advances */
export function ChoiceStep<T extends string | number>({
  title,
  hint,
  choices,
  onPick,
  selected,
}: {
  title: string;
  hint?: string;
  choices: Choice<T>[];
  onPick: (v: T) => void;
  selected?: T;
}) {
  return (
    <div className="step" key={title}>
      <h2 className="form-title">{title}</h2>
      {hint && <p className="form-hint">{hint}</p>}
      <div className="opts">
        {choices.map((c) => (
          <button
            type="button"
            className={`opt${selected === c.value ? " is-sel" : ""}`}
            key={String(c.value)}
            onClick={() => {
              track("tool_step", { question: title, answer: c.label });
              onPick(c.value);
            }}
          >
            {c.icon && (
              <span className="oi">
                <Icon name={c.icon} size={22} />
              </span>
            )}
            <span className="opt-txt">
              <strong>{c.label}</strong>
              {c.sub && <small>{c.sub}</small>}
            </span>
            <Icon name="chev" size={18} className="chev" />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Number entry step (e.g. age, repair cost, square footage) */
export function NumberStep({
  title,
  hint,
  label,
  prefix,
  suffix,
  min,
  max,
  placeholder,
  initial,
  onNext,
}: {
  title: string;
  hint?: string;
  label: string;
  prefix?: string;
  suffix?: string;
  min: number;
  max: number;
  placeholder?: string;
  initial?: number;
  onNext: (v: number) => void;
}) {
  const [val, setVal] = useState(initial ? String(initial) : "");
  const [err, setErr] = useState("");
  return (
    <form
      className="step"
      key={title}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const n = Number(val.replace(/[^\d.]/g, ""));
        if (!val || Number.isNaN(n) || n < min || n > max) {
          setErr(`Enter a number between ${min.toLocaleString()} and ${max.toLocaleString()}`);
          return;
        }
        track("tool_step", { question: title, answer: n });
        onNext(n);
      }}
    >
      <h2 className="form-title">{title}</h2>
      {hint && <p className="form-hint">{hint}</p>}
      <label className={`f num-f${err ? " has-err" : ""}`}>
        <span className="f-label">{label}</span>
        <span className="num-wrap">
          {prefix && <span className="num-fix">{prefix}</span>}
          <input
            inputMode="decimal"
            autoFocus
            value={val}
            placeholder={placeholder}
            onChange={(e) => {
              setErr("");
              setVal(e.target.value.replace(/[^\d.,]/g, ""));
            }}
          />
          {suffix && <span className="num-fix">{suffix}</span>}
        </span>
        {err && <span className="f-err">{err}</span>}
      </label>
      <button type="submit" className="btn btn-red btn-block btn-lg">
        Next <Icon name="arrow" size={20} />
      </button>
    </form>
  );
}

/** Results reveal: no contact details collected — one tap shows the full result */
export function Gate({
  slug,
  cta = "Show My Full Results",
  onUnlock,
}: {
  tool?: string;
  slug: string;
  summary?: string;
  service?: string;
  cta?: string;
  onUnlock: () => void;
}) {
  return (
    <div className="gate">
      <button
        type="button"
        className="btn btn-red btn-block btn-lg"
        onClick={() => {
          track("tool_result", { tool: slug });
          onUnlock();
        }}
      >
        {cta}
        <Icon name="arrow" size={20} />
      </button>
    </div>
  );
}

/** Next-step block shown with the results */
export function ResultCtas({ primary = "Book Now" }: { service?: string; primary?: string }) {
  return (
    <div className="result-ctas">
      <BookNowLink location="tool-result">{primary}</BookNowLink>
      <CallLink className="btn btn-ghost" location="tool-result" />
    </div>
  );
}

export const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
