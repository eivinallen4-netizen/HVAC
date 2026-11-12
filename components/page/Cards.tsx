import Image from "next/image";
import Link from "next/link";
import type { ServicePage, ToolSlug } from "@/lib/content/types";
import { getTool, tools } from "@/lib/tools";
import { site } from "@/lib/site";
import { CallLink, EstimateButton } from "../Cta";
import { Icon } from "../Icon";
import { SecHead } from "../Sections";
import { SignsCheck } from "../SignsCheck";
import { Embers, Frost, HeatShimmer } from "../Art";

/**
 * Related services. `photo` (hub pages): image cards. `list` (service pages): compact
 * directory rows, so the two page types don't look alike.
 */
export function ServiceCards({
  items,
  kicker = "Related services",
  title = "More Ways We Can Help",
  alt = false,
  variant = "photo",
}: {
  items: ServicePage[];
  kicker?: string;
  title?: string;
  alt?: boolean;
  /** photo: image cards · list: directory rows · mag: one feature + thumbnail rows */
  variant?: "photo" | "list" | "mag";
}) {
  if (!items.length) return null;
  if (variant === "mag") {
    const [main, ...side] = items;
    return (
      <section className={`sec${alt ? " sec-alt" : ""}`}>
        <div className="wrap">
          <SecHead variant="split" kicker={kicker} title={title} />
          <div className="mag svc-mag">
            <Link className="mag-main" href={`/${main.slug}/`} data-reveal>
              <div className="mag-img">
                <Image src={main.img} alt="" fill sizes="(max-width: 1040px) 100vw, 700px" />
              </div>
              <div className="mag-body">
                <span className="mag-tag">
                  <Icon name={main.icon} size={14} /> {main.name}
                </span>
                <h3>{main.name}</h3>
                <p>{main.summary}</p>
                <span className="svc-link">
                  Learn more <Icon name="arrow" size={16} />
                </span>
              </div>
            </Link>
            <div className="mag-side">
              {side.map((s, i) => (
                <Link className="mag-item" key={s.slug} href={`/${s.slug}/`} data-reveal style={{ transitionDelay: `${(i + 1) * 60}ms` }}>
                  <div className="mag-thumb">
                    <Image src={s.img} alt="" fill sizes="(max-width: 760px) 100vw, 220px" />
                  </div>
                  <div>
                    <h3>{s.name}</h3>
                    <p>{s.summary}</p>
                    <span className="svc-link">
                      Learn more <Icon name="arrow" size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (variant === "list") {
    return (
      <section className={`sec${alt ? " sec-alt" : ""}`}>
        <div className="wrap">
          <SecHead variant="left" kicker={kicker} title={title} />
          <ul className="dir">
            {items.map((s, i) => (
              <li className="dir-row" key={s.slug} data-reveal style={{ transitionDelay: `${(i % 2) * 60}ms` }}>
                <span className="ic-box tone-cool">
                  <Icon name={s.icon} size={20} />
                </span>
                <div className="dir-copy">
                  <h3>
                    <Link className="dir-link" href={`/${s.slug}/`}>
                      {s.name}
                    </Link>
                  </h3>
                  <p>{s.summary}</p>
                </div>
                <span className="dir-arrow" aria-hidden="true">
                  <Icon name="arrow" size={18} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
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

/** Mini preview glyph per tool: gauge, slider, checklist, bars */
function ToolGlyph({ slug }: { slug: ToolSlug }) {
  const common = { viewBox: "0 0 64 40", "aria-hidden": true, className: "app-glyph" } as const;
  switch (slug) {
    case "repair-or-replace-calculator":
      return (
        <svg {...common}>
          <path d="M10 34a22 22 0 0 1 44 0" className="g-track" />
          <path d="M10 34a22 22 0 0 1 30-20.5" className="g-fill" />
          <path d="M32 34 44 18" className="g-ink" />
          <circle cx="32" cy="34" r="3" className="g-dot" />
        </svg>
      );
    case "ac-replacement-cost-estimator":
      return (
        <svg {...common}>
          <path d="M6 14h52M6 28h52" className="g-track" />
          <path d="M6 14h30M6 28h16" className="g-fill" />
          <circle cx="36" cy="14" r="5" className="g-dot" />
          <circle cx="22" cy="28" r="5" className="g-dot" />
        </svg>
      );
    case "ac-symptom-checker":
      return (
        <svg {...common}>
          <rect x="6" y="5" width="9" height="9" rx="2" className="g-ink" />
          <path d="m8 9.5 2 2 3.5-4" className="g-fill" />
          <path d="M20 9.5h36" className="g-track" />
          <rect x="6" y="23" width="9" height="9" rx="2" className="g-ink" />
          <path d="M20 27.5h26" className="g-track" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M10 34V22M22 34V14M34 34V18M46 34V8" className="g-bar" />
          <path d="M6 34h52" className="g-track" />
        </svg>
      );
  }
}

/** Lead-magnet tools as app tiles: time chip, preview glyph, a different tone per tile */
export function ToolCards({
  slugs,
  kicker = "Homeowner tools",
  title = "Get Answers in 60 Seconds",
  lead = "Quick calculators built for Las Vegas homes. Run your numbers before you call us.",
  alt = true,
  variant = "tiles",
}: {
  slugs?: ToolSlug[];
  kicker?: string;
  title?: string;
  lead?: string;
  alt?: boolean;
  /** tiles: app tiles · rows: one wide "question" row per tool */
  variant?: "tiles" | "rows";
}) {
  const list = slugs ? slugs.map((s) => getTool(s)!).filter(Boolean) : tools;
  if (variant === "rows") {
    return (
      <section className={`sec${alt ? " sec-alt" : ""}`} id="tools">
        <div className="wrap">
          <SecHead variant="split" kicker={kicker} title={title} lead={lead || undefined} />
          <ol className="tool-rows">
            {list.map((t, i) => (
              <li className={`tool-row tone-${i % 4}`} key={t.slug} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="tool-row-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ToolGlyph slug={t.slug} />
                <div className="tool-row-copy">
                  <h3>
                    <Link className="dir-link" href={`/tools/${t.slug}/`}>
                      <Icon name={t.icon} size={18} /> {t.name}
                    </Link>
                  </h3>
                  <p>{t.short}</p>
                </div>
                <span className="app-time">
                  <Icon name="clock" size={13} /> {t.time}
                </span>
                <span className="tool-row-go" aria-hidden="true">
                  Start <Icon name="arrow" size={16} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }
  return (
    <section className={`sec art-sec${alt ? " sec-alt" : ""}`} id="tools">
      <div className="wrap">
        <SecHead kicker={kicker} title={title} lead={lead || undefined} />
        <div className={`tool-cards n${list.length}`}>
          {list.map((t, i) => (
            <Link
              href={`/tools/${t.slug}/`}
              className={`app-tile tone-${i % 4}`}
              key={t.slug}
              data-reveal
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="app-top">
                <ToolGlyph slug={t.slug} />
                <span className="app-time">
                  <Icon name="clock" size={13} /> {t.time}
                </span>
              </div>
              <h3>
                <Icon name={t.icon} size={18} /> {t.name}
              </h3>
              <p>{t.short}</p>
              <span className="svc-link">
                Start <Icon name="arrow" size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** "Signs you need …": the self-check rows, read-only */
export function SignsGrid({ title, items }: { title: string; items: { t: string; d: string }[] }) {
  return (
    <section className="sec sec-alt">
      <div className="wrap">
        <SecHead variant="split" kicker="Know the signs" title={title} />
        <SignsCheck signs={items} mode="list" />
      </div>
    </section>
  );
}

/** Compact conversion band used between content sections */
export function CtaBand({
  title = "Ready for Honest, Fast Service?",
  text = "Book online in about a minute — pick a time that works for you. Or call us.",
  pick,
  cta = "Book Now",
  tone = "warm",
}: {
  title?: string;
  text?: string;
  pick?: string;
  cta?: string;
  /** warm: red band with embers · cool: blue band with frost */
  tone?: "warm" | "cool";
}) {
  return (
    <section className={`cta-band${tone === "cool" ? " cool" : ""}`}>
      <HeatShimmer tone="white" className="emerg-shimmer" />
      {tone === "cool" ? <Frost count={10} className="card-embers" seed={22} /> : <Embers count={10} className="card-embers" seed={21} />}
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
