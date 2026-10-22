import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/Cards";
import { Faq, FinalCta, TrustBar } from "@/components/Sections";
import { servicePages } from "@/lib/content/services";
import { buildMetadata, faqLd } from "@/lib/seo";
import { faqs } from "@/lib/site";

export const metadata = buildMetadata({
  title: "HVAC FAQ | Las Vegas Heating & Cooling Questions | Wave",
  description:
    "Answers to common Las Vegas HVAC questions: estimates, 24/7 service, repair vs. replace, maintenance, AC sizing, heating safety and more.",
  path: "/faq/",
});

const pick = (slug: string) => servicePages.find((s) => s.slug === slug)?.faqs ?? [];

const groups = [
  { title: "General Questions", items: faqs },
  { title: "AC Repair & Emergencies", items: [...pick("hvac-repairs-in-las-vegas"), ...pick("emergency-ac-repair-las-vegas").slice(0, 2)] },
  { title: "New Systems & Replacement", items: [...pick("ac-replacement-in-las-vegas"), ...pick("ac-installations-in-las-vegas").slice(0, 2)] },
  { title: "Heating", items: [...pick("hvac-heating-repair-in-las-vegas"), ...pick("heat-pump-services-las-vegas").slice(0, 1)] },
  { title: "Maintenance & Wave Club", items: [...pick("hvac-maintenance-las-vegas"), ...pick("ac-maintenance-in-las-vegas").slice(0, 2)] },
];

export default function FaqPage() {
  const all = groups.flatMap((g) => g.items);
  const unique = all.filter((f, i) => all.findIndex((x) => x.q === f.q) === i);
  return (
    <>
      <PageHero
        crumbs={[{ name: "FAQ", path: "/faq/" }]}
        kicker="Answers & clarity"
        h1="Frequently Asked Questions"
        intro="Straight answers to the questions Las Vegas homeowners ask us most. Don't see yours? Call or text — we're happy to help, no strings attached."
        form={false}
      />
      <TrustBar />
      {groups.map((g, i) => (
        <Faq key={g.title} id={`faq-${i + 1}`} items={g.items} title={g.title} alt={i % 2 === 1} />
      ))}
      <CtaBand title="Still Have Questions?" />
      <FinalCta />
      <JsonLd data={faqLd(unique)} />
    </>
  );
}
