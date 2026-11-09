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
    "Contact Wave Heating & Cooling for AC repair, heating, installs or an estimate. Call or text (702) 881-4713 — answered 24/7 — or request service online.",
  path: "/contact/",
});

const faqs = [
  { q: "How quickly can I get an appointment?", a: "Book online to see open times — often the same or next day. For no-cooling or no-heat emergencies, call us directly — we answer 24/7." },
  { q: "Can I text you instead of calling?", a: `Yes — text ${site.phone} any time and a team member will respond.` },
  { q: "Do you charge for estimates?", a: "We'll go over pricing before any work starts. Repair visits have an $89 diagnostic fee. On weekdays (Mon–Fri, 7am–6pm), if you approve the repair during the visit, the $89 is included in the repair price." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact/" }]}
        kicker="We're here 24/7"
        h1="Contact Wave Heating & Cooling"
        intro="Book service or an estimate online in about a minute and pick a time that works — or call or text us any time, day or night."
        highlights={["Answered 24/7", "Upfront, written pricing", "Call or text"]}
        formTitle="How can we help?"
      />
      <TrustBar />
      <section className="sec">
        <div className="wrap">
          <SecHead variant="split" kicker="Reach us directly" title="Call, Text or Visit" />
          <div className="switchboard">
            <ul className="sb-lines">
              <li className="sb-line tone-red" data-reveal>
                <span className="ic-box tone-red">
                  <Icon name="phone" size={22} />
                </span>
                <div>
                  <h3>Call 24/7</h3>
                  <p>Nights, weekends &amp; holidays</p>
                </div>
                <CallLink className="cl-phone" location="contact-page" icon={false} />
              </li>
              <li className="sb-line tone-cool" data-reveal>
                <span className="ic-box tone-cool">
                  <Icon name="chat" size={22} />
                </span>
                <div>
                  <h3>Text Us</h3>
                  <p>Send a photo of your unit or issue</p>
                </div>
                <TextLink className="cl-phone" location="contact-page">
                  {site.phone}
                </TextLink>
              </li>
              <li className="sb-line tone-warm" data-reveal>
                <span className="ic-box tone-warm">
                  <Icon name="pin" size={22} />
                </span>
                <div>
                  <h3>Headquarters</h3>
                  <p>NV License {site.license}</p>
                </div>
                <a className="sb-addr" href={site.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </a>
              </li>
            </ul>
            <div className="map-frame sb-map" data-reveal>
              <iframe
                title="Map to Wave Heating & Cooling"
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.name} ${site.address.street} ${site.address.city} ${site.address.state}`)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
      <Reviews variant="ticker" alt />
      <Faq items={faqs} title="Contact FAQs" variant="stack" />
      <JsonLd data={faqLd(faqs)} />
    </>
  );
}
