import { PageHero } from "@/components/page/PageHero";
import { RecentWork } from "@/components/RecentWork";
import { CtaBand } from "@/components/page/Cards";
import { BadgeCard } from "@/components/page/Objects";
import { Rich } from "@/components/page/Rich";
import { FinalCta, Reviews, TrustBar, WhyWave } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Team | Las Vegas HVAC Technicians | Wave Heating & Cooling",
  description:
    "Meet the family-owned team behind Wave Heating & Cooling: Las Vegas HVAC technicians, most of them NATE-certified, who treat your home like their own.",
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
        intro="Family-owned means the owners stand behind every job — and our technicians are trained and committed to doing it right."
        form={false}
        img="/images/work/van-tech.jpg"
        variant="split"
      />
      <TrustBar />
      <WhyWave />
      <section className="sec sec-alt content-sec badge-sec">
        <div className="wrap badge-grid">
          <div className="cs-side" data-reveal>
            <span className="kicker">
              <Icon name="award" size={15} /> Every visit
            </span>
            <h2>What You Can Expect From Every Wave Technician</h2>
            <p>
              <Rich text="Our low employee turnover means the technician who services your system this year is likely to be the one who knows it next year. It's one of the reasons our customers keep calling us back — and keep [leaving great reviews](/reviews/)." />
            </p>
          </div>
          <BadgeCard
            items={[
              { t: "Every brand, every system", d: "Furnaces, heat pumps and central AC of every make found in Las Vegas homes." },
              { t: "Licensed, bonded & insured", d: "Nevada license #0086052 — full peace of mind every time we're in your home." },
              { t: "Clear communication", d: "You'll see what we see and get your options and pricing before work begins." },
              { t: "Clean, careful work", d: "On time, respectful of your home, and we leave the work area spotless." },
            ]}
          />
        </div>
      </section>
      <RecentWork kicker="Our techs at work" title="The Wave team on the job" />
      <Reviews variant="ticker" />
      <CtaBand title="Work With a Team You Can Trust" />
      <FinalCta />
    </>
  );
}
