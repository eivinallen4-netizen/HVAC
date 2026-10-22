import { JsonLd } from "@/components/JsonLd";
import { ToolCards } from "@/components/page/Cards";
import {
  Areas,
  Difference,
  Emergency,
  EstimateBand,
  Faq,
  FinalCta,
  Guides,
  Hero,
  Process,
  Reviews,
  Services,
  TrustBar,
  WhyWave,
} from "@/components/Sections";
import { buildMetadata, faqLd } from "@/lib/seo";
import { faqs } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Las Vegas AC & Heating Repair | Free Estimates | Wave Heating & Cooling",
  description:
    "Family-owned Las Vegas HVAC company. AC repair, heating repair, new system installs and maintenance by NATE-certified techs. 24/7 service. Free estimates — call (702) 881-4713.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Emergency />
      <Services />
      <Difference />
      <WhyWave />
      <Process />
      <Reviews />
      <EstimateBand />
      <ToolCards alt={false} />
      <Areas />
      <Guides />
      <Faq />
      <FinalCta />
      <JsonLd data={faqLd(faqs)} />
    </>
  );
}
