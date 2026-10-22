import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { Faq, Reviews, SecHead, TrustBar } from "@/components/Sections";
import { CallLink, TextLink } from "@/components/Cta";
import { Icon } from "@/components/Icon";
import { buildMetadata, faqLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Wave Heating & Cooling | Las Vegas HVAC | (702) 881-4713",
  description:
    "Contact Wave Heating & Cooling for AC repair, heating, installs or a free estimate. Call or text (702) 881-4713 — answered 24/7 — or request service online.",
  path: "/contact/",
});

const faqs = [
  { q: "How quickly will you call me back?", a: "As quickly as possible — usually the same day. For no-cooling or no-heat emergencies, call us directly — we answer 24/7." },
  { q: "Can I text you instead of calling?", a: `Yes — text ${site.phone} any time and a team member will respond.` },
  { q: "Do you charge for estimates?", a: "Estimates for new system installations and replacements are free. Repair visits include a diagnostic fee, which is waived for Wave Club members when the repair is done at the time of service." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact/" }]}
        kicker="We're here 24/7"
        h1="Contact Wave Heating & Cooling"
        intro="Request service, book a free estimate or just ask a question. Fill out the form and a real person from our team will call you back to confirm a time — or call or text us any time, day or night."
        highlights={["Answered 24/7", "Free estimates on new systems", "Call or text"]}
        formTitle="How can we help?"
      />
      <TrustBar />
      <section className="sec">
        <div className="wrap">
          <SecHead kicker="Reach us directly" title="Call, Text or Visit" />
          <div className="contact-cards">
            <div className="card contact-card" data-reveal>
              <span className="ic-box tone-red">
                <Icon name="phone" size={22} />
              </span>
              <h3>Call 24/7</h3>
              <CallLink className="cl-phone" location="contact-page" icon={false} />
              <p>Nights, weekends &amp; holidays</p>
            </div>
            <div className="card contact-card" data-reveal>
              <span className="ic-box tone-cool">
                <Icon name="chat" size={22} />
              </span>
              <h3>Text Us</h3>
              <TextLink className="cl-phone" location="contact-page">
                {site.phone}
              </TextLink>
              <p>Send a photo of your unit or issue</p>
            </div>
            <div className="card contact-card" data-reveal>
              <span className="ic-box tone-warm">
                <Icon name="pin" size={22} />
              </span>
              <h3>Headquarters</h3>
              <a href={site.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </a>
              <p>NV License {site.license}</p>
            </div>
          </div>
          <div className="map-embed card wide" data-reveal>
            <iframe
              title="Map to Wave Heating & Cooling"
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.name} ${site.address.street} ${site.address.city} ${site.address.state}`)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      <Reviews />
      <Faq items={faqs} title="Contact FAQs" alt />
      <JsonLd data={faqLd(faqs)} />
    </>
  );
}
