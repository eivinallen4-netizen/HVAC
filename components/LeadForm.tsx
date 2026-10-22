"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { issueOptions, pages, site } from "@/lib/site";
import { getAttribution, PICK_EVENT, track } from "@/lib/track";
import { CallLink } from "./Cta";
import { Icon } from "./Icon";

export type Status = "idle" | "sending" | "done";

export const formatPhone = (v: string) => {
  const d = v.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return d;
};

export function validate(data: Record<string, string>) {
  const errs: Record<string, string> = {};
  if ((data.name || "").trim().length < 2) errs.name = "Please enter your name";
  if ((data.phone || "").replace(/\D/g, "").length !== 10) errs.phone = "Enter a 10-digit phone number";
  if (!/^\d{5}$/.test(data.zip || "")) errs.zip = "Enter a 5-digit ZIP";
  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) errs.email = "Check your email address";
  return errs;
}

export async function sendLead(payload: Record<string, string>) {
  try {
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...getAttribution(), ...payload }),
    });
  } catch {
    /* never block the thank-you screen on a network hiccup */
  }
}

/** Phone + ZIP inputs shared by every form */
export function PhoneInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      id={id}
      name="phone"
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder="(702) 555-0123"
      value={value}
      onChange={(e) => onChange(formatPhone(e.target.value))}
    />
  );
}

export function ZipInput({ id }: { id: string }) {
  return (
    <input
      id={id}
      name="zip"
      inputMode="numeric"
      autoComplete="postal-code"
      maxLength={5}
      placeholder="89129"
      onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""))}
    />
  );
}

export function Honeypot() {
  return <input type="text" name="company_website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />;
}

/** TCPA-style consent line under every submit button */
export function Consent() {
  return (
    <p className="consent">
      By submitting, you agree that {site.name} may call or text you about your request at the number provided,
      including by automated means. Consent is not a condition of purchase. Msg &amp; data rates may apply. See our{" "}
      <a href={pages.privacy}>Privacy Policy</a>.
    </p>
  );
}

/** Read form fields, validate, and focus the first bad field. Returns null if invalid. */
export function readForm(form: HTMLFormElement, setErrors: (e: Record<string, string>) => void) {
  const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
  const errs = validate(data);
  setErrors(errs);
  if (Object.keys(errs).length) {
    (form.querySelector(`[name="${Object.keys(errs)[0]}"]`) as HTMLElement | null)?.focus();
    return null;
  }
  return data;
}

export function Field({
  label,
  name,
  error,
  optional,
  full,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`f${full ? " full" : ""}${error ? " has-err" : ""}`} htmlFor={name}>
      <span className="f-label">
        {label}
        {optional && <em> (optional)</em>}
      </span>
      {children}
      {error && <span className="f-err">{error}</span>}
    </label>
  );
}

export function Success({ short }: { short?: boolean }) {
  return (
    <div className="success" role="status">
      <div className="success-ic">
        <Icon name="tick" size={34} />
      </div>
      <h3>You&apos;re all set!</h3>
      <p>
        {short
          ? "Thanks — a Wave team member will call you shortly."
          : "Thanks — we got your request. A Wave team member will call you shortly to confirm your appointment."}
      </p>
      <CallLink className="btn btn-red btn-block" location="form-success">
        Need us now? Call {site.phone}
      </CallLink>
    </div>
  );
}

/** After a successful submit: fire the conversion event and go to the thank-you page */
function useFinish() {
  const router = useRouter();
  return (form: string, service?: string) => {
    track("generate_lead", { form_id: form, service });
    router.push(`${pages.thankYou}?form=${encodeURIComponent(form)}`);
  };
}

const contactServices = [
  "AC repair",
  "Heating repair",
  "New system / replacement estimate",
  "Maintenance / tune-up",
  "Ductless mini-split",
  "Ductwork / indoor air quality",
  "Not sure / other",
];

/* ───────────────────── HERO: 2-step quiz form ───────────────────── */
export function HeroLeadForm({ title = "What's going on?", formName = "hero" }: { title?: string; formName?: string }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [service, setService] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const finish = useFinish();

  const pick = (v: string) => {
    setService(v);
    setStep(2);
    track("lead_step", { step: 2, service: v });
    setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 350);
  };

  useEffect(() => {
    const onPick = (e: Event) => {
      setStatus("idle");
      pick((e as CustomEvent<string>).detail);
    };
    window.addEventListener(PICK_EVENT, onPick);
    // ?service=… from an EstimateButton on another page
    const pre = new URLSearchParams(window.location.search).get("service");
    if (pre) {
      setService(pre.slice(0, 80));
      setStep(2);
    }
    return () => window.removeEventListener(PICK_EVENT, onPick);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = readForm(e.currentTarget, setErrors);
    if (!data || data.company_website) return;
    delete data.company_website;
    setStatus("sending");
    await sendLead({ ...data, service, form: formName });
    finish(formName, service);
  }

  return (
    <div className="form-card form-hero" id="estimate">
      <div className="form-top">
        <span className="kicker">Free estimate finder</span>
        <span className="step-pill">Step {step} of 2</span>
      </div>
      <div className="progress" aria-hidden="true">
        <i style={{ width: step === 1 ? "50%" : "100%" }} />
      </div>

      {step === 1 ? (
        <div className="step" key="s1">
          <h2 className="form-title">{title}</h2>
          <p className="form-hint">Pick one — it takes about 60 seconds.</p>
          <div className="opts">
            {issueOptions.map((o) => (
              <button type="button" className="opt" key={o.value} onClick={() => pick(o.value)}>
                <span className={`oi${o.hot ? " hot" : ""}`}>
                  <Icon name={o.icon} size={22} />
                </span>
                <span className="opt-txt">
                  <strong>{o.title}</strong>
                  <small>{o.sub}</small>
                </span>
                <Icon name="chev" size={18} className="chev" />
              </button>
            ))}
          </div>
          <p className="fine">
            <Icon name="lock" size={14} /> No obligation · Takes 60 seconds
          </p>
        </div>
      ) : (
        <form className="step" key="s2" onSubmit={onSubmit} noValidate>
          <h2 className="form-title">Where should we reach you?</h2>
          <p className="form-hint">A real person from our team will call to confirm a time.</p>
          <div className="chosen">
            <span>
              <Icon name="check" size={18} /> {service}
            </span>
            <button type="button" onClick={() => setStep(1)}>
              Change
            </button>
          </div>
          <div className="fields">
            <Field label="Full name" name="h-name" error={errors.name}>
              <input ref={nameRef} id="h-name" name="name" autoComplete="name" placeholder="Jane Smith" />
            </Field>
            <Field label="Phone" name="h-phone" error={errors.phone}>
              <PhoneInput id="h-phone" value={phone} onChange={setPhone} />
            </Field>
            <Field label="ZIP code" name="h-zip" error={errors.zip}>
              <ZipInput id="h-zip" />
            </Field>
            <Field label="Best time to call" name="h-time">
              <select id="h-time" name="time" defaultValue="As soon as possible">
                <option>As soon as possible</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </Field>
            <Field label="Email" name="h-email" optional full error={errors.email}>
              <input id="h-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" />
            </Field>
          </div>
          <Honeypot />
          <button type="submit" className="btn btn-red btn-block btn-lg" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Get My Free Estimate"}
            <Icon name="arrow" size={20} />
          </button>
          <Consent />
        </form>
      )}

      <p className="or-call">
        Prefer to talk? <CallLink location="form" icon={false} /> — answered 24/7
      </p>
    </div>
  );
}

/* ───────────────────── CONTACT: single-step form ───────────────────── */
export function ContactForm({
  title = "Book Service or an Estimate",
  hint = "We'll call you back to confirm a time. Zero high-pressure sales.",
  defaultService = "AC repair",
  formName = "contact",
  cta = "Get My Free Estimate",
}: {
  title?: string;
  hint?: string;
  defaultService?: string;
  formName?: string;
  cta?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const finish = useFinish();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = readForm(e.currentTarget, setErrors);
    if (!data || data.company_website) return;
    delete data.company_website;
    setStatus("sending");
    await sendLead({ ...data, form: formName });
    finish(formName, data.service);
  }

  const options = contactServices.includes(defaultService) ? contactServices : [defaultService, ...contactServices];

  return (
    <div className="form-card">
      <form onSubmit={onSubmit} noValidate>
        <h2 className="form-title">{title}</h2>
        <p className="form-hint">{hint}</p>
        <div className="fields">
          <Field label="Full name" name="c-name" error={errors.name}>
            <input id="c-name" name="name" autoComplete="name" placeholder="Jane Smith" />
          </Field>
          <Field label="Phone" name="c-phone" error={errors.phone}>
            <PhoneInput id="c-phone" value={phone} onChange={setPhone} />
          </Field>
          <Field label="ZIP code" name="c-zip" error={errors.zip}>
            <ZipInput id="c-zip" />
          </Field>
          <Field label="Service needed" name="c-service">
            <select id="c-service" name="service" defaultValue={defaultService}>
              {options.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Email" name="c-email" optional full error={errors.email}>
            <input id="c-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" />
          </Field>
          <Field label="Anything we should know?" name="c-msg" optional full>
            <textarea id="c-msg" name="message" placeholder="e.g. AC is blowing warm air upstairs" />
          </Field>
        </div>
        <Honeypot />
        <button type="submit" className="btn btn-red btn-block btn-lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : cta}
          <Icon name="arrow" size={20} />
        </button>
        <Consent />
      </form>
    </div>
  );
}
