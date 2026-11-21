import Image from "next/image";
import { CtaBand, ToolCards } from "@/components/page/Cards";
import { PageHero } from "@/components/page/PageHero";
import { RecentWork } from "@/components/RecentWork";
import { Areas, FinalCta, Process, Reviews, TrustBar, WhyWave } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { paymentMethods } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Wave Heating & Cooling | Family-Owned Las Vegas HVAC",
  description:
    "Family-owned Las Vegas heating and air conditioning company, founded in 2019 by Bogdan & Raluca. NATE-certified, honest pricing, same-day service 24/7.",
  path: "/about-us/",
});

/** "Our Story", in the owners' own words */
const story = [
  "Wave Heating & Cooling was founded in 2019, after ten years of experience in the HVAC industry. I started this company because I believed there was a better way to serve homeowners — one where technical expertise, honest recommendations, and quality workmanship come before sales targets.",
  "I understand that sales are necessary for any business to grow and succeed. But I also believe that success should come from earning customers' trust, not from selling them something they don't need. I wanted to build a company where I could take pride in my profession, support my family, and do what I genuinely enjoy: solving problems and helping people.",
  "Two years into our journey, my wife, Raluca, joined the business to manage our office operations and customer communications. Together, we have built Wave Heating & Cooling around the values we live by — honesty, attention to detail, hard work, and personal accountability.",
  "What makes us most proud isn't how many systems we've installed or how many service calls we've completed. It's the customers who have stayed with us throughout the years. Whether we performed a simple repair or replaced their entire HVAC system, they continue to trust us with their homes. To us, that is the true measure of success.",
  "Our vision is not to become the biggest HVAC company in Las Vegas, but to build a company that never loses its personal touch. A company where our employees are valued, fairly rewarded, and proud of their work. A company where the owner remains involved in the field and every customer receives the attention they deserve.",
  "Today, we proudly provide heating and air conditioning repair, maintenance, and installation services throughout Las Vegas, Henderson, North Las Vegas, and the surrounding communities.",
  "At Wave Heating & Cooling, we treat your home as if it were our own. We are meticulous in our work, honest in our recommendations, and determined to find the right solution.",
  "We believe that when you take care of your people and your customers, you build a business worth believing in.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About Us", path: "/about-us/" }]}
        kicker="Your trusted heating & AC company"
        h1="Family-Owned. Licensed & Insured. Same-Day Service Across Las Vegas."
        intro="Wave Heating & Cooling is a family-owned and operated HVAC company serving homes across the Las Vegas valley. We treat you like family and your home like our own."
        highlights={["Family owned & operated", `NV License ${site.license}`, "Licensed, bonded & insured"]}
        form={false}
        img="/images/work/team-expo.jpg"
        variant="split"
      />
      <TrustBar />

      <section className="sec content-sec story-sec">
        <div className="wrap story">
          <div className="story-copy" data-reveal>
            <h2>Our Story</h2>
            <p className="story-lead">Built with purpose. Driven by integrity. Committed to doing things right.</p>
            {story.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
            <div className="story-sign">
              <p className="story-names">Bogdan &amp; Raluca</p>
              <p className="story-role">Founders &amp; Owners | Wave Heating &amp; Cooling</p>
            </div>
            <h3>Payment options</h3>
            <ul className="pay-badges">
              {paymentMethods.map((m) => (
                <li key={m}>
                  <Icon name={/financ/i.test(m) ? "cal" : "check"} size={15} /> {m}
                </li>
              ))}
            </ul>
          </div>
          <figure className="story-print" data-reveal>
            <span className="print-tape" aria-hidden="true" />
            <div className="print-img">
              <Image src="/images/family.jpg" alt="The family behind Wave Heating & Cooling" fill sizes="(max-width: 900px) 100vw, 440px" />
            </div>
          </figure>
        </div>
      </section>

      <WhyWave variant="ledger" />
      <RecentWork alt />
      <Process variant="route" />
      <CtaBand title="Experience the Wave Difference" tone="cool" />
      <Reviews variant="ticker" />
      <ToolCards variant="rows" />
      <Areas variant="strip" />
      <FinalCta />
    </>
  );
}
