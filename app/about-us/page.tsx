import Image from "next/image";
import Link from "next/link";
import { CtaBand, ToolCards } from "@/components/page/Cards";
import { PageHero } from "@/components/page/PageHero";
import { Areas, FinalCta, Process, Reviews, TrustBar, WhyWave } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { paymentMethods } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Wave Heating & Cooling | Family-Owned Las Vegas HVAC",
  description:
    "Wave Heating & Cooling is a family-owned and operated Las Vegas HVAC company with NATE-certified techs, honest pricing and 24/7 service. Meet the team.",
  path: "/about-us/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About Us", path: "/about-us/" }]}
        kicker="Your trusted heating & AC company"
        h1="Family-Owned. NATE-Certified. Here for Las Vegas 24/7."
        intro="Wave Heating & Cooling is a family-owned and operated HVAC company serving homes across the Las Vegas valley. We treat you like family and your home like our own."
        highlights={["Family owned & operated", `NV License ${site.license}`, "Licensed, bonded & insured"]}
        form={false}
        img="/images/crew.jpg"
      />
      <TrustBar />

      <section className="sec content-sec">
        <div className="wrap area-grid">
          <div className="prose-wrap" data-reveal>
            <h2>Our Story</h2>
            <p>
              Wave Heating &amp; Cooling was built on a simple idea: Las Vegas homeowners deserve an HVAC company that tells them the
              truth. No scare tactics, no pushing a new system when a repair will do, and no disappearing after the install.
            </p>
            <p>
              As a family-owned business, we don&apos;t carry corporate overhead or franchise fees — so we can offer competitive,
              honest pricing while paying for the best-trained technicians in the valley. Our team is NATE-certified, our employee
              turnover is low, and many of our customers have been with us since day one.
            </p>
            <p>
              We provide heating and cooling services in Las Vegas, Henderson, North Las Vegas and the surrounding communities:{" "}
              <Link href="/hvac-repairs-in-las-vegas/">repairs</Link>, <Link href="/hvac-maintenance-las-vegas/">maintenance</Link>{" "}
              and <Link href="/ac-installations-in-las-vegas/">new system installations</Link> for any size home. And because the
              desert doesn&apos;t keep business hours, we offer 24-hour emergency service.
            </p>
            <h3>Payment options</h3>
            <ul className="inline-checks">
              {paymentMethods.map((m) => (
                <li key={m}>
                  <Icon name="check" size={16} /> {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="about-img card" data-reveal>
            <Image src="/images/family.jpg" alt="The family behind Wave Heating & Cooling" fill sizes="(max-width: 900px) 100vw, 480px" />
          </div>
        </div>
      </section>

      <WhyWave />
      <Process />
      <CtaBand title="Experience the Wave Difference" />
      <Reviews />
      <ToolCards />
      <Areas />
      <FinalCta />
    </>
  );
}
