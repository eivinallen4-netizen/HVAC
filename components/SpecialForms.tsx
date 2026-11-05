"use client";

import { BookNowLink } from "./Booking";
import { CallLink } from "./Cta";
import { Icon } from "./Icon";

/** Claim a special offer → book online and mention the offer */
export function OfferForm({ offers }: { offers: string[] }) {
  return (
    <div className="form-card" id="estimate">
      <h2 className="form-title">Claim an Offer</h2>
      <p className="form-hint">Book online and mention the offer you want in the notes — we&apos;ll apply it to your visit.</p>
      <ul className="check-list tight">
        {offers.map((o) => (
          <li key={o}>
            <Icon name="check" size={16} />
            <span>{o}</span>
          </li>
        ))}
      </ul>
      <BookNowLink className="btn btn-red btn-block btn-lg" location="specials">
        Book &amp; Claim My Offer
      </BookNowLink>
      <p className="or-call">
        Prefer to talk? <CallLink location="specials" icon={false} /> — answered 24/7
      </p>
    </div>
  );
}

/** Refer a friend → the friend books online and names who referred them */
export function ReferralForm() {
  return (
    <div className="form-card" id="estimate">
      <h2 className="form-title">Refer a Friend</h2>
      <p className="form-hint">
        Send your friend our booking link. When they book, they just add your name in the notes so you get credit.
      </p>
      <BookNowLink className="btn btn-red btn-block btn-lg" location="referral">
        Open the Booking Page
      </BookNowLink>
      <p className="or-call">
        Questions? <CallLink location="referral" icon={false} /> — answered 24/7
      </p>
    </div>
  );
}
