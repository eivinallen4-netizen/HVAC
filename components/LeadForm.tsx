"use client";

import { BookingEmbed } from "./Booking";
import { CallLink } from "./Cta";
import { EstimateForm } from "./EstimateForm";

/* ───────────────────── HERO: step-by-step estimate with real prices → book a visit ───────────────────── */
// The questions are fixed by Wave's estimate spec (lib/estimate/config.ts); `title` is kept for older callers.
export function HeroLeadForm(_props: { title?: string; formName?: string }) {
  return <EstimateForm />;
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
        Prefer to talk? <CallLink location="contact-form" icon={false} />
      </p>
    </div>
  );
}
