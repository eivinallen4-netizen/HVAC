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
  WhyWave,
} from "@/components/Sections";
import { buildMetadata, faqLd } from "@/lib/seo";
import { faqs } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Las Vegas AC & Heating Repair | 24/7 | Wave Heating & Cooling",
  description:
    "Family-owned Las Vegas HVAC company. AC & heating repair, installs and tune-ups by NATE-certified techs. 24/7 service, book online. (702) 881-4713.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
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
