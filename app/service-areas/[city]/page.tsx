import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, ServiceCards, ToolCards } from "@/components/page/Cards";
import { PageHero } from "@/components/page/PageHero";
import { Faq, FinalCta, Process, Reviews, SecHead, TrustBar } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { areaPages, getArea } from "@/lib/content/areas";
import { getService } from "@/lib/content/services";
import { buildMetadata, faqLd, serviceLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return areaPages.map((a) => ({ city: a.slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArea((await params).city);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.description, path: `/service-areas/${a.slug}/` });
}

export default async function AreaPage({ params }: Props) {
  const a = getArea((await params).city);
  if (!a) notFound();
  const path = `/service-areas/${a.slug}/`;
  const popular = a.popular.map(getService).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const others = areaPages.filter((o) => o.slug !== a.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Service Areas", path: "/service-area-las-vegas/" },
          { name: a.name, path },
        ]}
        kicker={`Serving ${a.full}`}
        h1={a.h1}
        intro={a.intro}
        highlights={["Family-owned & local", "NATE-certified technicians", "Same-day service", "Upfront, written pricing"]}
      />
      <TrustBar />

      <section className="sec content-sec">
        <div className="wrap loc-grid">
          <div className="cs-col loc-copy" data-reveal>
            <h2>Heating &amp; Cooling Built Around {a.name} Homes</h2>
            {a.local.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              Whatever your home needs — <Link href="/hvac-repairs-in-las-vegas/">AC repair</Link>,{" "}
              <Link href="/hvac-heating-repair-in-las-vegas/">heating repair</Link>, a{" "}
              <Link href="/ac-replacement-in-las-vegas/">new system</Link> or a{" "}
              <Link href="/hvac-maintenance-las-vegas/">maintenance plan</Link> — you&apos;ll get a NATE-certified
              technician, honest recommendations and fair, local pricing from a family-owned company.
            </p>
          </div>
          <aside className="loc-ticket" data-reveal>
            <Image src="/images/illo/valley-contour.png" alt="" fill sizes="420px" className="loc-contour" />
            <h3>
              <span className="loc-pin" aria-hidden="true">
                <Icon name="pin" size={20} />
              </span>
              {a.full}
            </h3>
            <div>
              <small>ZIP codes we serve</small>
              <ul className="zip-chips">
                {a.zips.map((z) => (
                  <li key={z}>{z}</li>
                ))}
              </ul>
            </div>
            <div>
              <small>Neighborhoods</small>
              <ul className="loc-hoods">
                {a.neighborhoods.map((n) => (
                  <li key={n}>
                    <Icon name="check" size={15} /> {n}
                  </li>
                ))}
              </ul>
            </div>
            <div className="loc-call">
              <small>Call or text</small>
              <a className="area-phone" href={site.phoneHref}>
                {site.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <ServiceCards items={popular} kicker={`Popular in ${a.name}`} title={`Most-Requested Services in ${a.name}`} alt variant="list" />
      <CtaBand title={`Fast HVAC Service in ${a.name}`} tone="cool" />
      <Reviews title={`Why ${a.name} Homeowners Choose Wave`} variant="ticker" />
      <Process variant="route" />
      <ToolCards variant="rows" alt={false} />
      <Faq items={a.faqs} title={`${a.name} HVAC FAQs`} variant="stack" alt />

      <section className="sec near-sec">
        <div className="wrap near">
          <SecHead kicker="Nearby" title="Other Areas We Serve" variant="left" />
          <div className="areas near-pins" data-reveal>
            <Link href="/service-area-las-vegas/">
              <Icon name="pin" size={15} /> Las Vegas
            </Link>
            {others.map((o) => (
              <Link key={o.slug} href={`/service-areas/${o.slug}/`}>
                <Icon name="pin" size={15} /> {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd
        data={[
          faqLd(a.faqs),
          serviceLd({ name: `HVAC services in ${a.full}`, description: a.description, path, area: a.full }),
        ]}
      />
    </>
  );
}
