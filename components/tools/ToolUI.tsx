"use client";

import Link from "next/link";
import { useState } from "react";
import type { IconName } from "@/lib/site";
import { track } from "@/lib/track";
import { CallLink } from "../Cta";
import { Icon } from "../Icon";
import { Consent, Field, Honeypot, PhoneInput, readForm, sendLead, ZipInput } from "../LeadForm";

export type Choice<T extends string | number> = { value: T; label: string; sub?: string; icon?: IconName };

/** Card shell with progress bar for multi-step tools */
export function ToolCard({
  step,
  total,
  label,
  onBack,
  children,
}: {
  step: number;
  total: number;
  label: string;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  const pct = Math.min(100, Math.round((step / total) * 100));
  return (
    <div className="form-card tool-ui">
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

/**
 * Lead gate: shows a teaser above, then collects name/phone/ZIP to unlock the full result.
 * The submission (with the result summary) goes to /api/lead → Housecall Pro.
 */
export function Gate({
  tool,
  slug,
  summary,
  service,
  cta = "Unlock My Full Results",
  onUnlock,
}: {
  tool: string;
  slug: string;
  summary: string;
  service: string;
  cta?: string;
  onUnlock: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = readForm(e.currentTarget, setErrors);
    if (!data || data.company_website) return;
    delete data.company_website;
    setSending(true);
    await sendLead({ ...data, service, form: `tool:${slug}`, tool, tool_result: summary });
    track("generate_lead", { form_id: `tool:${slug}`, service });
    onUnlock();
  }

  return (
    <form className="gate" onSubmit={onSubmit} noValidate>
      <div className="gate-head">
        <Icon name="lock" size={18} />
        <div>
          <strong>Get your full results — free</strong>
          <small>We&apos;ll also text you a copy and a Wave expert can answer questions. No spam, ever.</small>
        </div>
      </div>
      <div className="fields">
        <Field label="Full name" name={`${slug}-name`} error={errors.name}>
          <input id={`${slug}-name`} name="name" autoComplete="name" placeholder="Jane Smith" />
        </Field>
        <Field label="Phone" name={`${slug}-phone`} error={errors.phone}>
          <PhoneInput id={`${slug}-phone`} value={phone} onChange={setPhone} />
        </Field>
        <Field label="ZIP code" name={`${slug}-zip`} error={errors.zip}>
          <ZipInput id={`${slug}-zip`} />
        </Field>
        <Field label="Email" name={`${slug}-email`} optional error={errors.email}>
          <input id={`${slug}-email`} name="email" type="email" autoComplete="email" placeholder="you@email.com" />
        </Field>
      </div>
      <Honeypot />
      <button type="submit" className="btn btn-red btn-block btn-lg" disabled={sending}>
        {sending ? "Unlocking…" : cta}
        <Icon name="arrow" size={20} />
      </button>
      <Consent />
    </form>
  );
}

/** Next-step block shown after unlocking */
export function ResultCtas({ service, primary = "Book a Free Estimate" }: { service: string; primary?: string }) {
  return (
    <div className="result-ctas">
      <Link href={`/contact/?service=${encodeURIComponent(service)}#estimate`} className="btn btn-red">
        <Icon name="cal" size={20} /> {primary}
      </Link>
      <CallLink className="btn btn-ghost" location="tool-result" />
    </div>
  );
}

export const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
