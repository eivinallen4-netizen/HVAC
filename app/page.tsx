import { JsonLd } from "@/components/JsonLd";
import { RepairPrices } from "@/components/RepairPrices";
import {
  BeReady,
  HomeProtection,
  RepairOrReplace,
  ReplacementDay,
  StraightAnswers,
} from "@/components/Replacement";
import {
  Areas,
  Difference,
  Emergency,
  Faq,
  FinalCta,
  Guides,
  Hero,
  Process,
  Programs,
  Reviews,
  Services,
  Stats,
  TrustSeals,
  WhyWave,
} from "@/components/Sections";
import { buildMetadata, faqLd } from "@/lib/seo";
import { faqs, replacementFaqs } from "@/lib/site";

/** Repair and general questions first, then what replacement buyers ask */
const homeFaqs = [...faqs.filter((f) => !/^How do I book/.test(f.q)), ...replacementFaqs.slice(0, 6)];

export const metadata = buildMetadata({
  title: "Las Vegas HVAC & AC Repair Company | $89 Diagnostic | Wave",
  description:
    "Family-owned Las Vegas HVAC company for AC and heating repair. $89 diagnostic, waived when you approve the repair on a weekday visit. No after-hours surcharge.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSeals />
      {/* Repair is the way in: price, proof, then what we fix */}
      <RepairPrices />
      <Reviews title="What Las Vegas homeowners say about Wave" />
      <Services
        kicker="Repairs, every day"
        title="What we fix across Las Vegas"
        lead="AC, heating, ductless and ductwork. Same team, same upfront pricing, same-day most of the time."
        alt
      />
      <Process alt={false} />
      <Emergency />
      {/* When it's time to replace (full detail lives on the replacement pages) */}
      <StraightAnswers />
      <RepairOrReplace />
      <HomeProtection />
      {/* Before/after sliders of real Wave jobs */}
      <Difference />
      <ReplacementDay />
      <Programs />
      <WhyWave />
      <Stats />
      <Areas />
      <Guides />
      <Faq items={homeFaqs} title="HVAC repair & replacement questions, answered" alt />
      <BeReady />
      <FinalCta
        title="Book a repair visit"
        lead="Pick a time online. $89 diagnostic, waived when you approve the repair on a weekday visit. Thinking about a new system? Book a replacement assessment the same way."
      />
      <JsonLd data={faqLd(homeFaqs)} />
    </>
  );
}
