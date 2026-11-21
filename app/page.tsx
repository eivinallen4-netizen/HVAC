import { JsonLd } from "@/components/JsonLd";
import { ToolCards } from "@/components/page/Cards";
import { RecentWork } from "@/components/RecentWork";
import { RepairPrices } from "@/components/RepairPrices";
import { HomeProtection, RepairOrReplace } from "@/components/Replacement";
import { Areas, Difference, Faq, FinalCta, Hero, Reviews, Services, TrustSeals } from "@/components/Sections";
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

/**
 * One job: get a repair call or booking. Every section answers price, trust or timing.
 * The before/after sliders, repair-or-replace checklist, home-protection walkthrough
 * and the homeowner tools stay here too; replacement detail,
 * guides, referrals and financing live on their own pages (linked from the nav).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustSeals />
      <RepairPrices />
      <Reviews title="What Las Vegas homeowners say about Wave" />
      <Services
        kicker="Repairs, every day"
        title="What we fix across Las Vegas"
        lead="Air conditioning, heating, ductless and ductwork. Same team, same upfront pricing, same-day."
        alt
      />
      {/* Before/after sliders of real Wave jobs */}
      <Difference />
      {/* Checklist self-check: 5 signs + the 15-year switch */}
      <RepairOrReplace />
      {/* Booties-to-vacuum walkthrough on the house cutaway */}
      <HomeProtection />
      <RecentWork alt />
      <ToolCards alt={false} />
      {/* Kept for the links to each city page */}
      <Areas />
      <Faq items={homeFaqs} title="HVAC repair & replacement questions, answered" alt />
      <FinalCta
        title="Book a repair visit"
        lead="Pick a time online. $89 diagnostic, waived when you approve the repair on a weekday visit. Thinking about a new system? Book a replacement assessment the same way."
      />
      <JsonLd data={faqLd(homeFaqs)} />
    </>
  );
}
