import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, ServiceCards } from "@/components/page/Cards";
import { PageHero } from "@/components/page/PageHero";
import { Faq, FinalCta, Reviews, SecHead, TrustBar } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { areaPages } from "@/lib/content/areas";
import { getService } from "@/lib/content/services";
import { buildMetadata, faqLd, serviceLd } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/service-area-las-vegas/";

export const metadata = buildMetadata({
  title: "HVAC Service Areas | Las Vegas Valley | Wave Heating & Cooling",
  description:
    "Serving the entire Las Vegas valley: Las Vegas, Henderson, North Las Vegas, Summerlin, Centennial Hills and more. 24/7 AC & heating service.",
  path,
});

const faqs = [
  {
    q: "What areas do you serve?",
    a: "The entire Las Vegas valley, including Las Vegas, North Las Vegas, Henderson, Summerlin, Sun City Summerlin, Centennial Hills, The Lakes, Aliante, Green Valley, Seven Hills, Spring Valley and Inspirada.",
  },
  {
    q: "Do you charge extra for service outside Las Vegas city limits?",
    a: "No — we serve the whole valley. If you're not sure whether you're in our area, just call and ask.",
  },
  {
    q: "Where is Wave Heating & Cooling located?",
    a: `Our headquarters is at ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}, in the northwest valley.`,
  },
];

export default function ServiceAreaHub() {
  const core = ["hvac-repairs-in-las-vegas", "ac-replacement-in-las-vegas", "hvac-heating-repair-in-las-vegas"]
    .map(getService)
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <PageHero
        crumbs={[{ name: "Service Areas", path }]}
        kicker="Valley-wide coverage"
        h1="HVAC Service Across the Las Vegas Valley"
        intro="From Centennial Hills to Inspirada, Wave Heating & Cooling provides 24/7 AC repair, heating service, new system installations and maintenance to homes throughout Southern Nevada."
        highlights={["Las Vegas, Henderson & North Las Vegas", "Headquartered in northwest Las Vegas", "Available 24/7", "No extra trip charge across the valley"]}
        img="/images/valley-night.jpg"
      />
      <TrustBar />

      <section className="sec">
        <div className="wrap">
          <SecHead
            kicker="Find your area"
            title="Communities We Serve"
            lead="Select your area for local information, or call — if you're in the valley, we can help."
          />
          <div className="area-cards">
            <Link href={path} className="card area-card" aria-current="page">
              <Icon name="pin" size={20} />
              <strong>Las Vegas</strong>
              <small>89101–89183</small>
            </Link>
            {areaPages.map((a, i) => (
              <Link key={a.slug} href={`/service-areas/${a.slug}/`} className="card area-card" data-reveal style={{ transitionDelay: `${(i % 4) * 50}ms` }}>
                <Icon name="pin" size={20} />
                <strong>{a.name}</strong>
                <small>{a.zips.slice(0, 4).join(" · ")}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt content-sec">
        <div className="wrap area-grid">
          <div className="prose-wrap" data-reveal>
            <h2>Las Vegas HVAC Experts — Built for the Desert</h2>
            <p>
              Las Vegas is one of the toughest places in the country to keep a home comfortable. Summer afternoons regularly top
              110°F, condensers bake in direct sun on rooftops and side yards, and fine desert dust coats everything. Then winter
              nights drop toward freezing, and the heating system that sat idle for eight months has to start on the first try.
            </p>
            <p>
              Our NATE-certified technicians work on Las Vegas homes every day — from 1970s ranch homes near downtown to brand-new
              two-story builds in the southwest. We know which parts fail first in the heat, how to size systems for 115° days and
              how to fix hot upstairs rooms without replacing everything.
            </p>
            <p>
              Need help now? Our <Link href="/emergency-ac-repair-las-vegas/">24/7 emergency AC repair</Link> team answers day and
              night. Planning ahead? Get a <Link href="/ac-replacement-in-las-vegas/">replacement estimate</Link> or join{" "}
              <Link href="/hvac-maintenance-las-vegas/">Wave Club</Link> for two tune-ups a year.
            </p>
          </div>
          <div className="map-embed card" data-reveal>
            <iframe
              title="Wave Heating & Cooling location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.name} ${site.address.street} ${site.address.city} ${site.address.state}`)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <ServiceCards items={core} kicker="Popular services" title="What Las Vegas Homeowners Call Us For" />
      <CtaBand />
      <Reviews />
      <Faq items={faqs} title="Service Area FAQs" alt />
      <FinalCta />
      <JsonLd data={[faqLd(faqs), serviceLd({ name: "HVAC services in the Las Vegas valley", description: "AC repair, heating, installation and maintenance across the Las Vegas valley.", path })]} />
    </>
  );
}
