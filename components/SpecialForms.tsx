"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { pages } from "@/lib/site";
import { track } from "@/lib/track";
import { Icon } from "./Icon";
import { Consent, Field, formatPhone, Honeypot, PhoneInput, readForm, sendLead, validate, ZipInput } from "./LeadForm";

/** Claim a special offer → HCP lead with the offer in the note */
export function OfferForm({ offers }: { offers: string[] }) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = readForm(e.currentTarget, setErrors);
    if (!data || data.company_website) return;
    delete data.company_website;
    setSending(true);
    await sendLead({ ...data, service: data.offer, form: "specials" });
    track("generate_lead", { form_id: "specials", service: data.offer });
    router.push(`${pages.thankYou}?form=specials`);
  }

  return (
    <div className="form-card" id="estimate">
      <form onSubmit={onSubmit} noValidate>
        <h2 className="form-title">Claim an Offer</h2>
        <p className="form-hint">Pick an offer and we&apos;ll call to set up your appointment.</p>
        <div className="fields">
          <Field label="Offer" name="o-offer" full>
            <select id="o-offer" name="offer" defaultValue={offers[0]}>
              {offers.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Full name" name="o-name" error={errors.name}>
            <input id="o-name" name="name" autoComplete="name" placeholder="Jane Smith" />
          </Field>
          <Field label="Phone" name="o-phone" error={errors.phone}>
            <PhoneInput id="o-phone" value={phone} onChange={setPhone} />
          </Field>
          <Field label="ZIP code" name="o-zip" error={errors.zip}>
            <ZipInput id="o-zip" />
          </Field>
          <Field label="Email" name="o-email" optional error={errors.email}>
            <input id="o-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" />
          </Field>
        </div>
        <Honeypot />
        <button type="submit" className="btn btn-red btn-block btn-lg" disabled={sending}>
          {sending ? "Sending…" : "Claim My Offer"}
          <Icon name="arrow" size={20} />
        </button>
        <Consent />
      </form>
    </div>
  );
}

/** Refer a friend → HCP lead for the friend, with the referrer in the note */
export function ReferralForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [rPhone, setRPhone] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = readForm(form, setErrors);
    if (!data || data.company_website) return;
    const rErrs = validate({ name: data.referrer_name, phone: data.referrer_phone, zip: "00000" });
    if (rErrs.name || rErrs.phone) {
      setErrors({ referrer_name: rErrs.name ?? "", referrer_phone: rErrs.phone ?? "" });
      return;
    }
    delete data.company_website;
    setSending(true);
    await sendLead({ ...data, form: "referral" });
    track("generate_lead", { form_id: "referral" });
    router.push(`${pages.thankYou}?form=referral`);
  }

  return (
    <div className="form-card" id="estimate">
      <form onSubmit={onSubmit} noValidate>
        <h2 className="form-title">Refer a Friend</h2>
        <p className="form-hint">Tell us who to call. We&apos;ll reach out to them and make sure you get credit.</p>
        <p className="form-sub">Your info</p>
        <div className="fields">
          <Field label="Your name" name="r-rname" error={errors.referrer_name || undefined}>
            <input id="r-rname" name="referrer_name" autoComplete="name" placeholder="Jane Smith" />
          </Field>
          <Field label="Your phone" name="r-rphone" error={errors.referrer_phone || undefined}>
            <input
              id="r-rphone"
              name="referrer_phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(702) 555-0123"
              value={rPhone}
              onChange={(e) => setRPhone(formatPhone(e.target.value))}
            />
          </Field>
        </div>
        <p className="form-sub">Your friend&apos;s info</p>
        <div className="fields">
          <Field label="Friend's name" name="r-name" error={errors.name}>
            <input id="r-name" name="name" placeholder="John Doe" />
          </Field>
          <Field label="Friend's phone" name="r-phone" error={errors.phone}>
            <PhoneInput id="r-phone" value={phone} onChange={setPhone} />
          </Field>
          <Field label="Friend's ZIP" name="r-zip" error={errors.zip}>
            <ZipInput id="r-zip" />
          </Field>
          <Field label="What do they need?" name="r-service">
            <select id="r-service" name="service" defaultValue="Not sure / other">
              <option>AC repair</option>
              <option>Heating repair</option>
              <option>New system / replacement estimate</option>
              <option>Maintenance / tune-up</option>
              <option>Not sure / other</option>
            </select>
          </Field>
        </div>
        <Honeypot />
        <button type="submit" className="btn btn-red btn-block btn-lg" disabled={sending}>
          {sending ? "Sending…" : "Send My Referral"}
          <Icon name="arrow" size={20} />
        </button>
        <p className="consent">
          Please only refer people who&apos;ve agreed to hear from us. We&apos;ll contact your friend about HVAC service by phone or text.
        </p>
      </form>
    </div>
  );
}
