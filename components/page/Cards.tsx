import Image from "next/image";
import Link from "next/link";
import type { ServicePage, ToolSlug } from "@/lib/content/types";
import { getTool, tools } from "@/lib/tools";
import { site } from "@/lib/site";
import { CallLink, EstimateButton } from "../Cta";
import { Icon } from "../Icon";
import { SecHead } from "../Sections";
import { Embers, HeatShimmer } from "../Art";

/** Grid of service cards linking to their pages */
export function ServiceCards({
  items,
  kicker = "Related services",
  title = "More Ways We Can Help",
  alt = false,
}: {
  items: ServicePage[];
  kicker?: string;
  title?: string;
  alt?: boolean;
}) {
  if (!items.length) return null;
  return (
    <section className={`sec art-sec${alt ? " sec-alt" : ""}`}>
      <div className="wrap">
        <SecHead kicker={kicker} title={title} />
        <div className="grid-3">
          {items.map((s, i) => (
            <Link
              href={`/${s.slug}/`}
              className="card svc guide"
              key={s.slug}
              data-reveal
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
            >
              <div className="svc-img">
                <Image src={s.img} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1040px) 50vw, 400px" />
                <span className="ic-box ic-float">
                  <Icon name={s.icon} size={22} />
                </span>
              </div>
              <div className="svc-body">
                <h3>{s.name}</h3>
                <p>{s.summary}</p>
              </div>
              <div className="svc-foot">
                <span className="svc-link">
                  Learn more <Icon name="arrow" size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Lead-magnet tool cards */
export function ToolCards({
  slugs,
  kicker = "Free homeowner tools",
  title = "Get Answers in 60 Seconds",
  lead = "Free calculators built for Las Vegas homes — no sales call required to use them.",
  alt = true,
}: {
  slugs?: ToolSlug[];
  kicker?: string;
  title?: string;
  lead?: string;
  alt?: boolean;
}) {
  const list = slugs ? slugs.map((s) => getTool(s)!).filter(Boolean) : tools;
  return (
    <section className={`sec art-sec${alt ? " sec-alt" : ""}`} id="tools">
      <div className="wrap">
        <SecHead kicker={kicker} title={title} lead={lead} />
        <div className={`tool-cards n${list.length}`}>
          {list.map((t, i) => (
            <Link
              href={`/tools/${t.slug}/`}
              className="card tool-card"
              key={t.slug}
              data-reveal
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className={`ic-box ${i % 2 ? "tone-cool" : "tone-warm"}`}>
                <Icon name={t.icon} size={22} />
              </span>
              <h3>{t.name}</h3>
              <p>{t.short}</p>
              <span className="svc-link">
                Start free · {t.time} <Icon name="arrow" size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** "Signs you need …" grid */
export function SignsGrid({ title, items }: { title: string; items: { t: string; d: string }[] }) {
  return (
    <section className="sec sec-alt art-sec">
      <div className="wrap">
        <SecHead kicker="Know the signs" title={title} />
        <div className="signs">
          {items.map((s, i) => (
            <div className="card sign" key={s.t} data-reveal style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
              <span className="sign-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Compact conversion band used between content sections */
export function CtaBand({
  title = "Ready for Honest, Fast Service?",
  text = "Book online in about a minute — pick a time that works for you. Or call us 24/7.",
  pick,
  cta = "Book Now",
}: {
  title?: string;
  text?: string;
  pick?: string;
  cta?: string;
}) {
  return (
    <section className="cta-band">
      <HeatShimmer tone="white" className="emerg-shimmer" />
      <Embers count={10} className="card-embers" seed={21} />
      <div className="wrap cta-band-row" data-reveal>
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band-acts">
          <EstimateButton pick={pick} className="btn btn-white" icon="arrow">
            {cta}
          </EstimateButton>
          <CallLink className="btn btn-ghost" location="cta-band">
            {site.phone}
          </CallLink>
        </div>
      </div>
    </section>
  );
}
