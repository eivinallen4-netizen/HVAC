import { JsonLd } from "@/components/JsonLd";
import { ToolCards } from "@/components/page/Cards";
import {
  BeReady,
  CompareQuotes,
  FullReplacement,
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

/** Replacement questions first, then the two general ones buyers still ask */
const homeFaqs = [...replacementFaqs, ...faqs.filter((f) => /licensed|24\/7/i.test(f.q))];

export const metadata = buildMetadata({
  title: "HVAC Replacement Las Vegas | Permitted & Inspected | Wave",
  description:
    "Full AC and furnace replacement in Las Vegas. Permits pulled, full safety inspection, your home protected and cleaned. Schedule your in-home assessment.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <StraightAnswers />
      <RepairOrReplace />
      <HomeProtection />
      <ReplacementDay />
      <FullReplacement />
      <Reviews title="What Las Vegas Homeowners Say About Wave" alt />
      <EstimateBand />
      <CompareQuotes />
      <Services
        kicker="Not ready to replace?"
        title="Repairs, Tune-Ups & Everything Else"
        lead="If your system still has life in it, we'll keep it running. Same team, same standards, 24/7."
        alt
      />
      <Emergency />
      <WhyWave />
      <ToolCards />
      <Areas />
      <Guides />
      <Faq items={homeFaqs} title="HVAC Replacement Questions, Answered" alt />
      <BeReady />
      <FinalCta
        title="Schedule Your Replacement Assessment"
        lead="Pick a time online and we'll call to go over your system and set up a visit to see your home. Need a repair instead? We're here 24/7."
      />
      <JsonLd data={faqLd(homeFaqs)} />
    </>
  );
}
