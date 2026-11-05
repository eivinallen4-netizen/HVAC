import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/Cards";
import { ContentSection } from "@/components/page/ContentSection";
import { FinalCta, Reviews, TrustBar, WhyWave } from "@/components/Sections";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Team | NATE-Certified HVAC Techs | Wave Heating & Cooling",
  description:
    "Meet the family-owned team behind Wave Heating & Cooling: NATE-certified Las Vegas HVAC technicians who treat your home like their own.",
  path: "/our-team/",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "About Us", path: "/about-us/" },
          { name: "Our Team", path: "/our-team/" },
        ]}
        kicker="The people behind Wave"
        h1="Meet the Wave Team"
        intro="Family-owned means the owners stand behind every job — and our technicians are trained, certified and committed to doing it right."
        form={false}
        img="/images/crew.jpg"
      />
      <TrustBar />
      <WhyWave />
      <ContentSection
        section={{
          h2: "What You Can Expect From Every Wave Technician",
          cards: [
            { t: "NATE-certified", d: "Most of our techs hold NATE certification in heating, cooling and air quality systems." },
            { t: "Licensed, bonded & insured", d: "Nevada license #0086052 — full peace of mind every time we're in your home." },
            { t: "Clear communication", d: "You'll see what we see and get your options and pricing before work begins." },
            { t: "Clean, careful work", d: "On time, respectful of your home, and we leave the work area spotless." },
          ],
          body: [
            "Our low employee turnover means the technician who services your system this year is likely to be the one who knows it next year. It's one of the reasons our customers keep calling us back — and keep [leaving great reviews](/reviews/).",
          ],
        }}
      />
      <Reviews />
      <CtaBand title="Work With a Team You Can Trust" />
      <FinalCta />
    </>
  );
}
