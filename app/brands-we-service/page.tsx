import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/page/Cards";
import { ContentSection } from "@/components/page/ContentSection";
import { PageHero } from "@/components/page/PageHero";
import { Faq, FinalCta, Reviews, TrustBar } from "@/components/Sections";
import { buildMetadata, faqLd, serviceLd } from "@/lib/seo";
import { brands, pages } from "@/lib/site";

export const metadata = buildMetadata({
  title: "HVAC Brands We Service in Las Vegas | Wave Heating & Cooling",
  description:
    "Air conditioning and heating repair for Carrier, Trane, Lennox, Goodman, Rheem, Daikin, York and other major brands across Las Vegas. Call (702) 881-4713.",
  path: "/brands-we-service/",
});

/** Equipment types Wave services, whatever the brand */
const equipment = ["Central air conditioners", "Gas furnaces", "Heat pumps", "Ductless mini-splits", "Packaged rooftop units"];

/**
 * One short line per brand: only what Wave does for it. No dealer, factory or affiliation
 * claims, and no brand-specific facts, model numbers or warranty terms.
 */
const brandNotes: Record<string, string> = {
  Carrier: "Diagnostics, repair and seasonal maintenance on Carrier air conditioning and heating equipment, plus an honest repair-or-replace answer when a system is getting old.",
  Trane: "We troubleshoot and repair Trane systems in Las Vegas homes, keep them tuned up for the summer, and replace them when that's the better value.",
  Lennox: "Lennox air conditioners, furnaces and heat pumps diagnosed, repaired and maintained by our technicians, with the price in writing before any work starts.",
  Goodman: "Goodman equipment is common across the valley. We diagnose it, repair it, tune it up, and quote a replacement only when a repair no longer makes sense.",
  Amana: "Repairs, maintenance and replacement for Amana air conditioning and heating systems, with the same upfront pricing we use on every job.",
  Daikin: "We service Daikin systems, including ductless mini-splits: diagnostics, repairs, cleaning and tune-ups, and replacement when it's time.",
  Rheem: "Rheem air conditioners, furnaces and heat pumps diagnosed and repaired, plus spring and fall maintenance to keep them running through Las Vegas extremes.",
  Ruud: "Ruud systems get the same repair-first approach: find the real problem, fix it right, and tell you honestly when replacement is the better call.",
  York: "York air conditioning and heating repair, tune-ups and replacement across the Las Vegas valley, with the exact price confirmed before work starts.",
  "American Standard": "We diagnose and repair American Standard equipment, maintain it twice a year, and help you compare options if the system is near the end of its life.",
  Bryant: "Bryant air conditioners, furnaces and heat pumps repaired and maintained by our team, with clear options and no sales pressure.",
  Coleman: "Diagnostics, repair and maintenance for Coleman heating and air conditioning systems, and replacement when a repair no longer adds up.",
  "AC Pro": "We work on AC Pro systems too: no-cooling calls, repairs, seasonal tune-ups and replacement estimates.",
};

const faqs = [
  {
    q: "Do you repair my brand of air conditioner or furnace?",
    a: `Very likely. We work with most major HVAC brands, including ${brands.slice(0, -1).join(", ")} and ${brands[brands.length - 1]}. If you don't see yours here, call and ask.`,
  },
  {
    q: "What types of equipment do you work on?",
    a: "Central air conditioners, gas furnaces, heat pumps, ductless mini-splits and packaged rooftop units, for diagnostics, repairs, maintenance and replacement.",
  },
  {
    q: "Can you tell me if my system is worth repairing?",
    a: "Yes. We diagnose first, explain what we find, and give you the repair price in writing. If replacement offers better long-term value, we'll explain why. The decision is always yours.",
  },
];

export default function BrandsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Brands We Service", path: pages.brands }]}
        kicker="All major brands"
        h1="HVAC Brands We Service & Repair in Las Vegas"
        intro="Whatever name is on your air conditioner or furnace, our technicians can diagnose it, repair it, maintain it and, when it's time, replace it. Same upfront pricing on every brand."
        highlights={["Most major brands", "Repair first, replace only when it makes sense", "Price confirmed before work starts"]}
        formTitle="What's going on with your system?"
      />
      <TrustBar />
      <ContentSection
        section={{
          h2: "Equipment we service",
          kind: "fit",
          body: ["Every brand below, in every one of these system types, for diagnostics, repair, maintenance and replacement."],
          list: equipment,
        }}
      />
      <ContentSection
        alt
        section={{
          h2: "Brands we work on",
          body: [
            "We service and repair most major heating and air conditioning brands found in Las Vegas homes. Not sure what you have? The brand name is usually on the outdoor unit or the furnace cabinet. Send us a photo by text and we'll take a look.",
            "Brand names are trademarks of their respective owners and are used only to identify the equipment we service.",
          ],
          cards: brands.map((b) => ({ t: b, d: brandNotes[b] })),
        }}
      />
      <CtaBand
        title="Book a repair for any brand"
        text="Book online in about a minute or call us. Your tech confirms the exact price before any work starts."
        pick="AC not cooling"
      />
      <Reviews variant="ticker" />
      <Faq items={faqs} title="Brand questions" variant="stack" />
      <section className="fine-strip">
        <div className="wrap">
          <p className="table-note">
            Don&apos;t see your brand? <Link href={pages.contact}>Contact us</Link> and we&apos;ll tell you whether we can help.
          </p>
        </div>
      </section>
      <FinalCta />
      <JsonLd data={serviceLd({ name: "HVAC repair for all major brands", description: metadata.description as string, path: pages.brands })} />
      <JsonLd data={faqLd(faqs)} />
    </>
  );
}
