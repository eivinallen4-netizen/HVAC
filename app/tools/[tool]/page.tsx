import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ToolCards } from "@/components/page/Cards";
import { Breadcrumbs } from "@/components/page/Breadcrumbs";
import { ContentSection } from "@/components/page/ContentSection";
import { Faq, FinalCta, Reviews, TrustBar } from "@/components/Sections";
import { CostEstimatorTool } from "@/components/tools/CostEstimatorTool";
import { RepairReplaceTool } from "@/components/tools/RepairReplaceTool";
import { SavingsTool } from "@/components/tools/SavingsTool";
import { SymptomTool } from "@/components/tools/SymptomTool";
import { Icon } from "@/components/Icon";
import type { ToolSlug } from "@/lib/content/types";
import { buildMetadata, faqLd, webAppLd } from "@/lib/seo";
import { getTool, tools } from "@/lib/tools";

const components: Record<ToolSlug, () => React.ReactNode> = {
  "repair-or-replace-calculator": RepairReplaceTool,
  "ac-replacement-cost-estimator": CostEstimatorTool,
  "ac-symptom-checker": SymptomTool,
  "energy-savings-calculator": SavingsTool,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ tool: t.slug }));
}

type Props = { params: Promise<{ tool: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTool((await params).tool);
  if (!t) return {};
  return buildMetadata({ title: t.title, description: t.description, path: `/tools/${t.slug}/` });
}

export default async function ToolPage({ params }: Props) {
  const t = getTool((await params).tool);
  if (!t) notFound();
  const path = `/tools/${t.slug}/`;
  const Tool = components[t.slug];

  return (
    <>
      <section className="phero tool-hero">
        <div className="hero-shade" aria-hidden="true" />
        <div className="wrap">
          <Breadcrumbs crumbs={[{ name: "Free Tools", path: "/tools/" }, { name: t.name, path }]} />
          <div className="phero-grid">
            <div className="phero-copy">
              <span className="chip">
                <Icon name={t.icon} size={15} /> Free tool · {t.time}
              </span>
              <h1>{t.h1}</h1>
              <p className="hero-sub">{t.intro}</p>
              <ul className="hero-checks">
                <li>
                  <Icon name="check" size={18} /> Built for Las Vegas homes
                </li>
                <li>
                  <Icon name="check" size={18} /> Honest, no-pressure advice
                </li>
                <li>
                  <Icon name="check" size={18} /> 100% free
                </li>
              </ul>
            </div>
            <div className="hero-form" id="tool">
              <Tool />
            </div>
          </div>
        </div>
      </section>
      <TrustBar />
      <ContentSection section={{ h2: `How the ${t.name} Works`, body: t.about }} />
      <Faq items={t.faqs} title={`${t.name} FAQs`} alt variant="stack" />
      <ToolCards
        slugs={tools.filter((x) => x.slug !== t.slug).map((x) => x.slug)}
        kicker="More free tools"
        title="Try Another Calculator"
        alt={false}
      />
      <Reviews variant="ticker" alt />
      <FinalCta />
      <JsonLd data={[webAppLd({ name: t.name, description: t.description, path }), faqLd(t.faqs)]} />
    </>
  );
}
