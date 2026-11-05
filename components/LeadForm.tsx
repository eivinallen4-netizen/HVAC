"use client";

import { useEffect, useState } from "react";
import { issueOptions } from "@/lib/site";
import { PICK_EVENT, track } from "@/lib/track";
import { BookingEmbed } from "./Booking";
import { CallLink } from "./Cta";
import { Icon } from "./Icon";

/* ───────────────────── HERO: pick the issue → book on Housecall Pro ───────────────────── */
export function HeroLeadForm({ title = "What's going on?" }: { title?: string; formName?: string }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [service, setService] = useState("");

  const pick = (v: string) => {
    setService(v);
    setStep(2);
    track("lead_step", { step: 2, service: v });
  };

  useEffect(() => {
    const onPick = (e: Event) => pick((e as CustomEvent<string>).detail);
    window.addEventListener(PICK_EVENT, onPick);
    // ?service=… from a booking button on another page
    const pre = new URLSearchParams(window.location.search).get("service");
    if (pre) {
      setService(pre.slice(0, 80));
      setStep(2);
    }
    return () => window.removeEventListener(PICK_EVENT, onPick);
  }, []);

  return (
    <div className={`form-card form-hero${step === 2 ? " is-booking" : ""}`} id="estimate">
      <div className="form-top">
        <span className="kicker">Book online</span>
        <span className="step-pill">Step {step} of 2</span>
      </div>
      <div className="progress" aria-hidden="true">
        <i style={{ width: step === 1 ? "50%" : "100%" }} />
      </div>

      {step === 1 ? (
        <div className="step" key="s1">
          <h2 className="form-title">{title}</h2>
          <p className="form-hint">Pick one, then choose a time that works for you.</p>
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
            <Icon name="lock" size={14} /> No obligation · Book in about a minute
          </p>
        </div>
      ) : (
        <div className="step" key="s2">
          <h2 className="form-title">Pick a time that works</h2>
          <div className="chosen">
            <span>
              <Icon name="check" size={18} /> {service}
            </span>
            <button type="button" onClick={() => setStep(1)}>
              Change
            </button>
          </div>
          <BookingEmbed location="hero" service={service} onClose={() => setStep(1)} />
        </div>
      )}

      <p className="or-call">
        Prefer to talk? <CallLink location="form" icon={false} /> — answered 24/7
      </p>
    </div>
  );
}

/* ───────────────────── CONTACT: booking card ───────────────────── */
export function ContactForm({
  title = "Book Service Online",
  hint = "Choose a time that works for you — we'll confirm your appointment. Zero high-pressure sales.",
}: {
  title?: string;
  hint?: string;
  defaultService?: string;
  formName?: string;
  cta?: string;
}) {
  return (
    <div className="form-card is-booking">
      <h2 className="form-title">{title}</h2>
      <p className="form-hint">{hint}</p>
      <BookingEmbed location="contact" />
      <p className="or-call">
        Prefer to talk? <CallLink location="contact-form" icon={false} /> — answered 24/7
      </p>
    </div>
  );
}
