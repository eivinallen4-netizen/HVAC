import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, ServiceCards, SignsGrid, ToolCards } from "@/components/page/Cards";
import { ContentSection } from "@/components/page/ContentSection";
import { PageHero } from "@/components/page/PageHero";
import { Areas, Emergency, Faq, FinalCta, Process, Reviews, TrustBar } from "@/components/Sections";
import { categoryLabels, getHub, getService, hubPages, servicePages, servicesIn } from "@/lib/content/services";
import { buildMetadata, faqLd, serviceLd } from "@/lib/seo";

/** Service pages + hub pages, all at top-level slugs that match the old WordPress URLs */
export const dynamicParams = false;

export function generateStaticParams() {
  return [...servicePages, ...hubPages].map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getService(slug) ?? getHub(slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.description, path: `/${p.slug}/`, image: p.img });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (service) return <ServiceTemplate slug={slug} />;
  const hub = getHub(slug);
  if (hub) return <HubTemplate slug={slug} />;
  notFound();
}

function ServiceTemplate({ slug }: { slug: string }) {
  const s = getService(slug)!;
  const path = `/${s.slug}/`;
  const cat = categoryLabels[s.category];
  const crumbs =
    s.category === "air"
      ? [{ name: "Services", path: "/services/" }, { name: s.name, path }]
      : [{ name: cat.name, path: cat.hub }, { name: s.name, path }];
  const related = s.related.map(getService).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <PageHero
        crumbs={crumbs}
        kicker={s.kicker}
        h1={s.h1}
        intro={s.intro}
        highlights={s.highlights}
        img={s.img}
        emergency={s.emergency}
      />
      <TrustBar />
      {s.emergency && <Emergency />}
      {s.signs && <SignsGrid title={s.signs.title} items={s.signs.items} />}
      {s.sections.map((sec, i) => (
        <ContentSection key={sec.h2} section={sec} alt={s.signs ? i % 2 === 1 : i % 2 === 0} />
      ))}
      <CtaBand pick={s.pick} title={`Need ${s.name} in Las Vegas?`} />
      {s.tools && <ToolCards slugs={s.tools} alt={false} />}
      <Reviews />
      <Process />
      <ServiceCards items={related} />
      <Faq items={s.faqs} title={`${s.name} FAQs`} alt />
      <Areas title={`${s.name} Across the Las Vegas Valley`} />
      <FinalCta />
      <JsonLd data={[serviceLd({ name: s.name, description: s.description, path }), faqLd(s.faqs)]} />
    </>
  );
}

function HubTemplate({ slug }: { slug: string }) {
  const h = getHub(slug)!;
  const path = `/${h.slug}/`;
  const groups = h.category
    ? [{ title: `${categoryLabels[h.category].name} Services`, items: servicesIn(h.category) }]
    : (["cooling", "heating", "air"] as const).map((c) => ({ title: `${categoryLabels[c].name} Services`, items: servicesIn(c) }));

  return (
    <>
      <PageHero crumbs={[{ name: h.name, path }]} kicker={h.kicker} h1={h.h1} intro={h.intro} img={h.img} />
      <TrustBar />
      {groups.map((g, i) => (
        <ServiceCards key={g.title} items={g.items} kicker="What we do" title={g.title} alt={i % 2 === 1} />
      ))}
      {h.sections.map((sec, i) => (
        <ContentSection key={sec.h2} section={sec} alt={(groups.length + i) % 2 === 1} />
      ))}
      <ToolCards />
      <Reviews />
      <Faq items={h.faqs} title={`${h.name} FAQs`} alt />
      <Areas />
      <FinalCta />
      <JsonLd data={faqLd(h.faqs)} />
    </>
  );
}
