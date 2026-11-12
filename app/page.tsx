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
  Emergency,
  EstimateBand,
  Faq,
  FinalCta,
  Guides,
  Hero,
  Reviews,
  Services,
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
      {/* Repair is the way in: price, proof, then what we fix */}
      <RepairPrices />
      <Reviews title="What Las Vegas Homeowners Say About Wave" />
      <Services
        kicker="Repairs, every day"
        title="What We Fix Across Las Vegas"
        lead="AC, heating, ductless and ductwork. Same team, same upfront pricing, same-day in most of the valley."
        alt
      />
      <Emergency />
      {/* When it's time to replace (full detail lives on the replacement pages) */}
      <StraightAnswers />
      <RepairOrReplace />
      <HomeProtection />
      <ReplacementDay />
      <EstimateBand />
      <WhyWave />
      <Areas />
      <Guides />
      <Faq items={homeFaqs} title="HVAC Repair & Replacement Questions, Answered" alt />
      <BeReady />
      <FinalCta
        title="Book a Repair Visit"
        lead="Pick a time online. $89 diagnostic, waived when you approve the repair on a weekday visit. Thinking about a new system? Book a replacement assessment the same way."
      />
      <JsonLd data={faqLd(homeFaqs)} />
    </>
  );
}
