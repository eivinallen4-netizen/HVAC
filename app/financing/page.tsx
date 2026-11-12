import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ToolCards } from "@/components/page/Cards";
import { ContentSection } from "@/components/page/ContentSection";
import { PageHero } from "@/components/page/PageHero";
import { Faq, FinalCta, Reviews, TrustBar } from "@/components/Sections";
import { paymentMethods } from "@/lib/content/company";
import { buildMetadata, faqLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HVAC Financing Las Vegas | New AC & Furnace Financing | Wave",
  description:
    "Financing available on new AC, heat pump and furnace systems in Las Vegas with approved credit. Get an estimate and see your monthly payment options.",
  path: "/financing/",
});

const faqs = [
  {
    q: "Do you offer financing on new HVAC systems?",
    a: "Yes. Financing is available with approved credit on jobs of $1,500 or more, including new system installations and replacements. Payments start around $114 a month for every $10,000 financed. Ask during your estimate and we'll walk you through the options.",
  },
  {
    q: "Will applying affect my credit?",
    a: "It depends on the lender and type of application. We'll explain how the application works before you apply.",
  },
  {
    q: "What payment methods do you accept?",
    a: `We accept ${paymentMethods.join(", ")}.`,
  },
];

export default function FinancingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Financing", path: "/financing/" }]}
        kicker="Flexible payment options"
        h1="HVAC Financing in Las Vegas"
        intro="A broken AC in July shouldn't have to wait for payday. Financing is available with approved credit on new air conditioners, heat pumps and furnaces, so you can get comfortable now and pay over time."
        highlights={["From about $114/mo per $10,000", "Jobs from $1,500 (OAC)", "Clear, written pricing"]}
        formTitle="Get an estimate"
      />
      <TrustBar />
      <ContentSection
        section={{
          h2: "How Financing Works",
          kind: "steps",
          list: [
            "Book a no-obligation in-home estimate",
            "Choose the system and efficiency level that fits your home and budget",
            "Ask about financing — we'll explain current terms and help you apply",
            "Once approved, we schedule your installation — often as early as the same day",
          ],
          body: [
            "Want a ballpark first? Our [AC Replacement Cost Estimator](/tools/ac-replacement-cost-estimator/) shows an estimated installed price range in about 90 seconds.",
          ],
        }}
      />
      <ContentSection
        alt
        section={{
          h2: "Payment Options",
          kind: "fit",
          list: paymentMethods,
        }}
      />
      <ToolCards slugs={["ac-replacement-cost-estimator", "energy-savings-calculator"]} alt={false} variant="rows" />
      <Reviews variant="ticker" alt />
      <Faq items={faqs} title="Financing FAQs" variant="stack" />
      <section className="fine-strip">
        <div className="wrap">
          <p className="table-note">
            Financing subject to credit approval. Terms vary by lender and program. See your estimate for details. Questions?{" "}
            <Link href="/contact/">Contact us</Link>.
          </p>
        </div>
      </section>
      <FinalCta />
      <JsonLd data={faqLd(faqs)} />
    </>
  );
}
