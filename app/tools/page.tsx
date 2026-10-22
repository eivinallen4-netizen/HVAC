import { ToolCards } from "@/components/page/Cards";
import { PageHero } from "@/components/page/PageHero";
import { FinalCta, Reviews, TrustBar } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free HVAC Calculators for Las Vegas Homeowners | Wave Heating & Cooling",
  description:
    "Free tools for Las Vegas homeowners: AC repair-or-replace calculator, replacement cost estimator, AC symptom checker and summer bill savings calculator.",
  path: "/tools/",
});

export default function ToolsHub() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Free Tools", path: "/tools/" }]}
        kicker="Free homeowner tools"
        h1="Free HVAC Tools for Las Vegas Homeowners"
        intro="Get straight answers before you call anyone. Figure out what's wrong with your AC, whether to repair or replace it, what a new system costs and how much you could save — in about a minute each."
        highlights={["No obligation", "Built for desert homes", "Honest, no-pressure advice"]}
        form={false}
      />
      <TrustBar />
      <ToolCards kicker="Pick a tool" title="What Would You Like to Know?" alt={false} />
      <Reviews />
      <FinalCta />
    </>
  );
}
