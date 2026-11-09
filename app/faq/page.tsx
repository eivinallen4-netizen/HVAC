import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/page/PageHero";
import { CtaBand } from "@/components/page/Cards";
import { FinalCta, TrustBar } from "@/components/Sections";
import { CallLink } from "@/components/Cta";
import { FaqList } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { servicePages } from "@/lib/content/services";
import { buildMetadata, faqLd } from "@/lib/seo";
import { faqs, replacementFaqs } from "@/lib/site";

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
  { title: "New Systems & Replacement", items: [...replacementFaqs, ...pick("ac-replacement-in-las-vegas"), ...pick("ac-installations-in-las-vegas").slice(0, 2)] },
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
        variant="compact"
      />
      <TrustBar />
      <section className="sec faq-book">
        <div className="wrap faq-book-grid">
          <aside className="faq-index">
            <span className="kicker">Answers &amp; clarity</span>
            <nav aria-label="FAQ topics">
              <ol>
                {groups.map((g, i) => (
                  <li key={g.title}>
                    <a href={`#faq-${i + 1}`}>
                      <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span> {g.title}
                      <small>{g.items.length}</small>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="faq-call">
              <p>Still unsure what you need? Give us a call and we&apos;ll point you in the right direction.</p>
              <CallLink className="btn btn-red" location="faq-page" />
            </div>
          </aside>
          <div className="faq-chapters">
            {groups.map((g, i) => (
              <section className="faq-chapter" id={`faq-${i + 1}`} key={g.title} aria-labelledby={`faq-${i + 1}-h`}>
                <h2 id={`faq-${i + 1}-h`}>
                  <Icon name="question" size={22} /> {g.title}
                </h2>
                <FaqList items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Still Have Questions?" />
      <FinalCta />
      <JsonLd data={faqLd(unique)} />
    </>
  );
}
