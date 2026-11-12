import Image from "next/image";
import Link from "next/link";
import { areaHref } from "@/lib/content/areas";
import { servicesIn } from "@/lib/content/services";
import { tools } from "@/lib/tools";
import { fees } from "@/lib/estimate/config";
import { faqs as defaultFaqs, guides, pages, reviews, serviceAreas, services, site, type IconName } from "@/lib/site";
import { Embers, FireIceRule, Frost, HeatShimmer, Ribbons, Snowflake, SplitEmblem } from "./Art";
import { BeforeAfter } from "./BeforeAfter";
import { BookNowLink } from "./Booking";
import { CallLink, EstimateButton, TextLink } from "./Cta";
import { FaqList } from "./Faq";
import { GoogleG, Icon, PlatformLogo, Stars } from "./Icon";
import { ContactForm, HeroLeadForm } from "./LeadForm";
import { Timeline } from "./Timeline";

const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

/**
 * Section header.
 * - `center` (default): ornament rule, centered stack
 * - `split`: kicker + title on the left, lead on the right
 * - `side`: left-aligned stack for a sticky side column
 * - `left`: plain left-aligned stack (what `center={false}` gives)
 */
export function SecHead({
  kicker,
  title,
  lead,
  center = true,
  variant,
}: {
  kicker: string;
  title: string;
  lead?: string;
  center?: boolean;
  variant?: "center" | "split" | "side" | "left";
}) {
  const v = variant ?? (center ? "center" : "left");
  if (v === "split") {
    return (
      <div className="sec-head split" data-reveal>
        <div>
          <span className="kicker">{kicker}</span>
          <h2>{title}</h2>
        </div>
        {lead && <p className="lead">{lead}</p>}
      </div>
    );
  }
  return (
    <div className={`sec-head ${v}`} data-reveal>
      {v === "center" && <FireIceRule />}
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

/* ═════════════════════════ HERO ═════════════════════════ */
const stamps: { icon: IconName; t: string }[] = [
  { icon: "tag", t: `$${fees.diagnostic} diagnostic, waived with weekday repair` },
  { icon: "clock", t: "No after-hours or weekend surcharge" },
  { icon: "permit", t: "Permits pulled on every replacement" },
  { icon: "award", t: `NV License ${site.license}` },
];

export function Hero() {
  return (
    <section className="hero">
      <Image src="/images/hero-dusk.jpg" alt="" fill priority sizes="100vw" className="hero-bg" />
      <div className="hero-shade" aria-hidden="true" />
      <Embers count={28} className="hero-embers" seed={3} />
      <Frost count={16} className="hero-frost" seed={4} />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="chip chip-warm">
            <Icon name="wrench" size={15} /> AC &amp; heating repair across the Las Vegas valley
          </span>
          <h1>
            Las Vegas AC &amp; Heating Repair, <span className="cool">Priced Before We Start</span>
          </h1>
          <p className="hero-sub">
            Same-day visits in most of the valley, with no after-hours surcharge. ${fees.diagnostic} diagnostic, waived
            when you approve the repair on a weekday visit.
          </p>

          <RatingsRow nate />

          <ul className="proof-stamps">
            {stamps.map((s, i) => (
              <li key={s.t} className={i % 2 ? "cool" : "warm"}>
                <span className="stamp" aria-hidden="true">
                  <Icon name={s.icon} size={24} />
                </span>
                <span>{s.t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-form">
          <div className="hero-orb" aria-hidden="true">
            <Image src="/images/art/logo-ball.png" alt="" fill sizes="(max-width: 760px) 380px, 600px" priority />
          </div>
          <HeroLeadForm />
        </div>
      </div>
      <a className="hero-next" href="#repair-prices">
        <span>See repair prices</span>
        <Icon name="chev" size={20} />
      </a>
    </section>
  );
}

/* ═════════════════════════ RATINGS ═════════════════════════ */
export function RatingsRow({ nate = false }: { nate?: boolean }) {
  return (
    <ul className="ratings">
      {site.ratings.map((r) => (
        <li className="rating" key={r.platform}>
          <PlatformLogo platform={r.platform} size={30} />
          <div>
            <b>
              {r.score} <Stars size={13} />
            </b>
            <span>{r.platform}</span>
          </div>
        </li>
      ))}
      {nate && (
        <li className="rating rating-nate">
          <Image src="/images/nate.png" alt="NATE" width={34} height={32} />
          <div>
            <b>Certified</b>
            <span>NATE techs</span>
          </div>
        </li>
      )}
    </ul>
  );
}

/* ═════════════════════════ TRUST BAR ═════════════════════════ */
export function TrustBar() {
  const items = [
    { v: "Same-day", s: "Visits in most of the valley" },
    { v: "Upfront", s: "Written pricing before work starts" },
    { v: "Local", s: "Family-owned Las Vegas team" },
    { v: site.license, s: "NV licensed, bonded & insured" },
  ];
  return (
    <section className="trust" aria-label="Credentials">
      <ul className="wrap trust-row">
        {items.map((i) => (
          <li className="trust-item" key={i.s}>
            <strong>{i.v}</strong>
            <span>{i.s}</span>
          </li>
        ))}
        <li className="trust-item trust-nate">
          <Image src="/images/nate.png" alt="NATE" width={46} height={43} />
          <span>NATE-certified technicians</span>
        </li>
      </ul>
    </section>
  );
}

/* ═════════════════════════ EMERGENCY ═════════════════════════ */
export function Emergency() {
  return (
    <section className="emerg" id="urgent">
      <HeatShimmer tone="white" className="emerg-shimmer" />
      <Snowflake size={220} className="emerg-flake" />
      <div className="wrap emerg-row" data-reveal>
        <span className="emerg-ic">
          <Icon name="snow" size={28} />
        </span>
        <div className="emerg-copy">
          <h3>
            AC out in the desert heat? Same-day service in most of the valley. <span className="tag-urgent">Urgent service</span>
          </h3>
          <p>Call or text now and a Wave tech will get your home cool again.</p>
        </div>
        <div className="emerg-acts">
          <CallLink className="btn btn-white" location="emergency">
            Call {site.phone}
          </CallLink>
          <TextLink className="btn btn-ghost" location="emergency">
            Text Us
          </TextLink>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ SERVICES ═════════════════════════ */
/** Directory list: compact rows, two columns. On the homepage it's the first section: Wave leads with repair. */
export function Services({
  kicker = "Precision climate care",
  title = "Built for Desert Performance",
  lead = "Cooling, heating and indoor air — one local team for all of it, built for the Mojave desert.",
  alt = false,
}: {
  kicker?: string;
  title?: string;
  lead?: string;
  alt?: boolean;
} = {}) {
  return (
    <section className={`sec${alt ? " sec-alt" : ""}`} id="services">
      <div className="wrap">
        <SecHead variant="split" kicker={kicker} title={title} lead={lead} />
        <ul className="dir">
          {services.map((s, i) => (
            <li className={`dir-row${s.hot ? " hot" : ""}`} key={s.title} data-reveal style={{ transitionDelay: `${(i % 2) * 60}ms` }}>
              <span className={`ic-box ${s.hot ? "tone-warm" : "tone-cool"}`}>
                <Icon name={s.icon} size={20} />
              </span>
              <div className="dir-copy">
                <h3>
                  <Link className="dir-link" href={s.href}>
                    {s.title}
                  </Link>
                </h3>
                <p>{s.text}</p>
              </div>
              <EstimateButton pick={s.pick} className="dir-cta" icon="arrow">
                {s.cta}
              </EstimateButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═════════════════════════ BEFORE / AFTER ═════════════════════════ */
export function Difference() {
  const specs = [
    { t: "Coil & condenser cleaning", d: "Desert dust and debris cleared so your system breathes and stops working twice as hard.", tag: "Runs cooler" },
    { t: "Electrical & refrigerant checks", d: "Capacitors, contactors and charge tested before a 110° afternoon finds the weak spot.", tag: "Fewer breakdowns" },
    { t: "Honest findings, no upsell", d: "If it's a simple fix, we'll tell you. You see what we see before any work begins.", tag: "Clear options" },
  ];
  return (
    <section className="sec sec-alt diff art-sec">
      <div className="sec-art" aria-hidden="true">
        <Image src="/images/art/cool-airflow.png" alt="" width={1200} height={800} className="art-img diff-air" />
      </div>
      <Ribbons tone="cool" className="diff-ribbons" />
      <div className="wrap">
        <div className="diff-head" data-reveal>
          <div>
            <span className="kicker">The Wave difference</span>
            <h2>A Tune-Up You Can Actually See</h2>
          </div>
          <span className="chip">
            <Icon name="check" size={15} /> Real Wave job photos
          </span>
        </div>
        <div className="panel diff-grid" data-reveal>
          <div>
            <BeforeAfter before="/images/before.jpg" after="/images/after.jpg" />
            <p className="ba-caption">
              <Icon name="drag" size={14} /> Drag or tap across the image to compare
            </p>
          </div>
          <div className="specs">
            {specs.map((s) => (
              <div className="spec" key={s.t}>
                <div className="spec-top">
                  <h4>{s.t}</h4>
                  <span>{s.tag}</span>
                </div>
                <p>{s.d}</p>
              </div>
            ))}
            <EstimateButton pick="Maintenance / tune-up" className="btn btn-red">
              Book a Tune-Up
            </EstimateButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ WHY WAVE ═════════════════════════ */
const why = [
  { icon: "home", t: "Family-owned & local", d: "We live here, and we treat your home like our own." },
  { icon: "award", t: "NATE-certified techs", d: "Most of our team is NATE-certified — pros who know HVAC inside and out." },
  { icon: "tag", t: "Honest advice", d: "If it's a simple fix, we'll tell you. If it's time to replace, we'll show you why." },
  { icon: "clock", t: "Here when it breaks", d: "Heat waves don't wait, so in most of the valley we get a tech out the same day." },
  { icon: "shield", t: "Licensed, bonded & insured", d: `Nevada license ${site.license} for total peace of mind.` },
  { icon: "sparkle", t: "Your home protected", d: "Booties at the door, padding under ladders, plastic on walls and beds, and a full clean-up." },
] as const;

/** Bento grid: crew photo leads, stat tiles for same-day service and the license, small tiles for the rest */
export function WhyWave({ variant = "bento" }: { variant?: "bento" | "ledger" } = {}) {
  const [local, nate, honest, allDay, licensed, protect] = why;
  const small = [local, nate, honest, protect];
  if (variant === "ledger") return <WhyLedger />;
  return (
    <section className="sec art-sec" id="why">
      <div className="wrap">
        <SecHead
          variant="split"
          kicker="The integrity standard"
          title="Why Las Vegas Homeowners Choose Wave"
          lead="We're a family-owned local company. When you call Wave you get honest answers, skilled techs and the kind of service our neighbors keep recommending."
        />
        <div className="bento">
          <figure className="bt bt-crew" data-reveal>
            <Image src="/images/crew.jpg" alt="The Wave Heating & Cooling team" fill sizes="(max-width: 1040px) 100vw, 600px" />
          </figure>
          <figure className="bt bt-fam" data-reveal>
            <Image src="/images/family.jpg" alt="The family behind Wave Heating & Cooling" fill sizes="(max-width: 760px) 100vw, 300px" />
          </figure>
          <div className="bt bt-stat warm" data-reveal>
            <b aria-hidden="true">Same day</b>
            <h4>{allDay.t}</h4>
            <p>{allDay.d}</p>
          </div>
          <div className="bt bt-stat cool" data-reveal>
            <b aria-hidden="true">{site.license}</b>
            <h4>{licensed.t}</h4>
            <p>{licensed.d}</p>
          </div>
          <div className="bt bt-team" data-reveal>
            <span className="kicker">
              <Icon name="award" size={15} /> The people behind Wave
            </span>
            <h3>Trained for Nevada&apos;s Harshest Conditions</h3>
            <p>
              Most Wave technicians are NATE-certified, and every one works on homes built for triple-digit summers and cold desert
              nights. Family-owned means the owners stand behind every job.
            </p>
            <ul className="inline-checks">
              <li><Icon name="check" size={16} /> NATE Certified</li>
              <li><Icon name="check" size={16} /> Licensed &amp; Bonded</li>
              <li><Icon name="check" size={16} /> Fully Insured</li>
            </ul>
          </div>
          {small.map((w, i) => (
            <div className="bt bt-small" key={w.t} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
              <span className={`ic-box ${i % 2 ? "tone-cool" : "tone-warm"}`}>
                <Icon name={w.icon} size={20} />
              </span>
              <h4>{w.t}</h4>
              <p>{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Ledger: photos in a sticky column, the six reasons as numbered rows, then the team note */
function WhyLedger() {
  return (
    <section className="sec why-ledger" id="why">
      <div className="wrap ledger">
        <div className="ledger-side">
          <SecHead
            variant="side"
            kicker="The integrity standard"
            title="Why Las Vegas Homeowners Choose Wave"
            lead="We're a family-owned local company. When you call Wave you get honest answers, skilled techs and the kind of service our neighbors keep recommending."
          />
          <div className="ledger-photos" data-reveal>
            <figure className="lp-crew">
              <Image src="/images/crew.jpg" alt="The Wave Heating & Cooling team" fill sizes="(max-width: 1040px) 100vw, 480px" />
            </figure>
            <figure className="lp-fam">
              <Image src="/images/family.jpg" alt="The family behind Wave Heating & Cooling" fill sizes="220px" />
            </figure>
          </div>
        </div>
        <div>
          <ol className="num-rows ledger-rows">
            {why.map((w, i) => (
              <li key={w.t} data-reveal style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
                <span className="num-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>
                    <Icon name={w.icon} size={18} /> {w.t}
                  </h3>
                  <p>{w.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="ledger-team" data-reveal>
            <span className="kicker">
              <Icon name="award" size={15} /> The people behind Wave
            </span>
            <h3>Trained for Nevada&apos;s Harshest Conditions</h3>
            <p>
              Most Wave technicians are NATE-certified, and every one works on homes built for triple-digit summers and cold desert
              nights. Family-owned means the owners stand behind every job.
            </p>
            <ul className="inline-checks">
              <li><Icon name="check" size={16} /> NATE Certified</li>
              <li><Icon name="check" size={16} /> Licensed &amp; Bonded</li>
              <li><Icon name="check" size={16} /> Fully Insured</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ PROCESS ═════════════════════════ */
/** `line` (home): the connected stepper. `route` (inner pages): a slim band of numbered stops. */
export function Process({ variant = "line", alt = true }: { variant?: "line" | "route"; alt?: boolean } = {}) {
  const steps = [
    { t: "Tell us what's going on", d: "Fill out the 60-second form or give us a call." },
    { t: "We confirm a time", d: "A Wave team member calls you back to schedule a visit that works for you." },
    { t: "Diagnosis & clear options", d: "Your tech finds the root cause and walks you through your options before any work begins." },
    { t: "Comfort restored", d: "The job is done right, cleaned up, and explained — so you know exactly what was fixed." },
  ];
  if (variant === "route") {
    return (
      <section className={`sec route-sec${alt ? " sec-alt" : ""}`}>
        <div className="wrap">
          <div className="route-head" data-reveal>
            <div>
              <span className="kicker">Streamlined resolution</span>
              <h2>How We Restore Your Comfort</h2>
            </div>
            <p>Simple, transparent and stress-free from the moment you reach out.</p>
            <EstimateButton>Book Now</EstimateButton>
          </div>
          <ol className="route">
            {steps.map((s, i) => (
              <li key={s.t} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="route-stop" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>
                  <span className="sr-only">{i + 1}. </span>
                  {s.t}
                </h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }
  return (
    <section className={`sec proc-sec${alt ? " sec-alt" : ""}`}>
      <div className="wrap">
        <SecHead variant="split" kicker="Streamlined resolution" title="How We Restore Your Comfort" lead="Simple, transparent and stress-free from the moment you reach out." />
        <Timeline steps={steps} />
        <div className="center-cta" data-reveal>
          <EstimateButton>Book Now</EstimateButton>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ REVIEWS ═════════════════════════ */
/** One featured quote with the big rating numbers, then a scroll-snap strip of the rest */
export function Reviews({
  title = "What Las Vegas Homeowners Are Saying",
  alt = false,
  variant = "feature",
}: {
  title?: string;
  alt?: boolean;
  /** feature (home): big quote + strip · ticker (inner pages): slim drifting band · wall (reviews page): masonry */
  variant?: "feature" | "ticker" | "wall";
}) {
  const [lead, ...rest] = reviews;
  if (variant === "ticker") return <ReviewTicker title={title} alt={alt} />;
  if (variant === "wall") return <ReviewWall title={title} alt={alt} />;
  return (
    <section className={`sec rv-sec${alt ? " sec-alt" : ""}`} id="reviews">
      <div className="wrap">
        <div className="rv-top">
          <div className="rv-feature" data-reveal>
            <span className="kicker">Real local voices</span>
            <h2>{title}</h2>
            <figure className="rv-quote">
              <Stars size={18} />
              <blockquote>&ldquo;{lead.text}&rdquo;</blockquote>
              <figcaption>
                <span className="av">{initials(lead.name)}</span>
                <span>
                  {lead.name}
                  <small>
                    <Icon name="check" size={13} /> Verified Google review
                  </small>
                </span>
              </figcaption>
            </figure>
          </div>
          <ul className="rv-scores" data-reveal>
            {site.ratings.map((r) => (
              <li key={r.platform}>
                <b>{r.score}</b>
                <Stars size={14} />
                <span>
                  <PlatformLogo platform={r.platform} size={18} /> {r.platform}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rv-strip" role="region" aria-label="More Google reviews" tabIndex={0} data-reveal>
          {rest.map((r) => (
            <figure className="rv-card" key={r.name}>
              <div className="rev-top">
                <Stars size={14} />
                <GoogleG size={16} />
              </div>
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption>
                <span className="av">{initials(r.name)}</span>
                <span>
                  {r.name}
                  <small>
                    <Icon name="check" size={13} /> Verified Google review
                  </small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="rv-foot" data-reveal>
          <a className="btn btn-ghost" href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            <GoogleG size={18} /> Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewBubble({ r, hidden = false }: { r: (typeof reviews)[number]; hidden?: boolean }) {
  return (
    <li className="rv-bubble" aria-hidden={hidden || undefined}>
      <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
      <span className="rv-who">
        <span className="av">{initials(r.name)}</span>
        <span>
          {r.name}
          <small>
            <Icon name="check" size={13} /> Verified Google review
          </small>
        </span>
      </span>
    </li>
  );
}

/** Inner pages: scores in a row, then every review drifting past as speech bubbles */
function ReviewTicker({ title, alt }: { title: string; alt: boolean }) {
  return (
    <section className={`sec rv-tick-sec${alt ? " sec-alt" : ""}`} id="reviews">
      <div className="wrap rv-tick-head" data-reveal>
        <div>
          <span className="kicker">Real local voices</span>
          <h2>{title}</h2>
        </div>
        <ul className="rv-tick-scores">
          {site.ratings.map((r) => (
            <li key={r.platform}>
              <b>{r.score}</b>
              <span>
                <Stars size={12} />
                <span className="rv-plat">
                  <PlatformLogo platform={r.platform} size={16} /> {r.platform}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rv-tick" role="region" aria-label="Google reviews" tabIndex={0}>
        <ul className="rv-track">
          {reviews.map((r) => (
            <ReviewBubble key={r.name} r={r} />
          ))}
          {reviews.map((r) => (
            <ReviewBubble key={`${r.name}-loop`} r={r} hidden />
          ))}
        </ul>
      </div>
      <div className="wrap rv-tick-foot">
        <a className="text-link" href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
          <GoogleG size={16} /> Read all reviews on Google <Icon name="arrow" size={14} />
        </a>
      </div>
    </section>
  );
}

/** Reviews page: big scores, then every review on a masonry wall */
function ReviewWall({ title, alt }: { title: string; alt: boolean }) {
  return (
    <section className={`sec rv-wall-sec${alt ? " sec-alt" : ""}`} id="reviews">
      <div className="wrap">
        <div className="rv-wall-head" data-reveal>
          <div>
            <span className="kicker">Real local voices</span>
            <h2>{title}</h2>
          </div>
          <ul className="rv-scores">
            {site.ratings.map((r) => (
              <li key={r.platform}>
                <b>{r.score}</b>
                <Stars size={14} />
                <span>
                  <PlatformLogo platform={r.platform} size={18} /> {r.platform}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rv-wall">
          {reviews.map((r, i) => (
            <figure className={`rv-note${i % 3 === 0 ? " big" : ""}`} key={r.name} data-reveal style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
              <div className="rev-top">
                <Stars size={14} />
                <GoogleG size={16} />
              </div>
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption>
                <span className="av">{initials(r.name)}</span>
                <span>
                  {r.name}
                  <small>
                    <Icon name="check" size={13} /> Verified Google review
                  </small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="rv-foot" data-reveal>
          <a className="btn btn-ghost" href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            <GoogleG size={18} /> Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ ESTIMATE BAND ═════════════════════════ */
/** Split band: copy on the left, the van photo behind a diagonal edge on the right */
export function EstimateBand() {
  return (
    <section className="est">
      <div className="est-photo" aria-hidden="true">
        <Image src="/images/van-strip.jpg" alt="" fill sizes="(max-width: 760px) 100vw, 50vw" className="est-bg" />
        <span className="est-num">
          15+<small>yrs</small>
        </span>
      </div>
      <div className="wrap est-row" data-reveal>
        <div className="est-copy">
          <span className="chip chip-warm">System over 15 years old?</span>
          <h2>Let&apos;s Talk Replacement</h2>
          <p>
            Book an in-home replacement assessment. We&apos;ll check your system, ductwork and electrical, and give you a
            clear written price. Complete systems start around $9,800. Done right the first time, permitted and inspected.
          </p>
          <div className="est-acts">
            <EstimateButton pick="New system / replacement estimate" icon="arrow">
              Schedule My Assessment
            </EstimateButton>
            <CallLink className="btn btn-ghost" location="estimate-band" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ SERVICE AREAS ═════════════════════════ */
/** Coverage panel: illustrated valley with the HQ card, beside an A–Z city directory */
export function Areas({
  title = "Proudly Serving the Las Vegas Valley",
  variant = "panel",
}: {
  title?: string;
  /** panel (home): contour map + directory · strip (inner pages): one band of city links */
  variant?: "panel" | "strip";
}) {
  const cities = [...serviceAreas].sort((a, b) => a.localeCompare(b));
  if (variant === "strip") {
    return (
      <section className="sec cov-strip" id="areas">
        <Image src="/images/illo/valley-contour.png" alt="" fill sizes="100vw" className="cov-strip-bg" />
        <div className="wrap">
          <div className="strip-head" data-reveal>
            <div>
              <span className="kicker">Valley-wide coverage</span>
              <h2>{title}</h2>
              <p>Not sure if you&apos;re in our area? Give us a call — if you&apos;re in the valley, we can help.</p>
            </div>
            <div className="strip-hq">
              <Icon name="pin" size={20} />
              <div>
                <small>Headquarters:</small>
                <b>
                  {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
                </b>
                <span className="hq-live">
                  <i className="dot" /> Same-day service
                </span>
              </div>
            </div>
          </div>
          <ul className="strip-cities" data-reveal>
            {cities.map((a) => (
              <li key={a}>
                <Link href={areaHref(a)}>
                  <Icon name="pin" size={13} /> {a}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
  return (
    <section className="sec cov-sec" id="areas">
      <div className="wrap cov">
        <div className="cov-map" data-reveal>
          <Image src="/images/illo/valley-contour.png" alt="" fill sizes="(max-width: 1040px) 100vw, 560px" className="cov-contour" />
          <span className="cov-pin" aria-hidden="true">
            <Icon name="pin" size={22} />
          </span>
          <div className="cov-hq">
            <small>
              <Icon name="pin" size={14} /> Headquarters:
            </small>
            <b>
              {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            </b>
            <span className="hq-live">
              <i className="dot" /> Same-day service
            </span>
          </div>
        </div>
        <div className="cov-list">
          <SecHead
            variant="left"
            kicker="Valley-wide coverage"
            title={title}
            lead="Not sure if you're in our area? Give us a call — if you're in the valley, we can help."
          />
          <ul className="cov-dir" data-reveal>
            {cities.map((a) => (
              <li key={a}>
                <Link href={areaHref(a)}>
                  {a}
                  <Icon name="arrow" size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ GUIDES ═════════════════════════ */
/** Magazine layout: one feature, two stacked side items */
export function Guides() {
  const [main, ...side] = guides;
  return (
    <section className="sec" id="guides">
      <div className="wrap">
        <div className="rev-head" data-reveal>
          <div>
            <span className="kicker">HVAC advice &amp; insights</span>
            <h2>Desert Heating &amp; Cooling Guides</h2>
          </div>
          <Link className="text-link" href={pages.blog}>
            View all guides <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="mag">
          <Link className="mag-main" href={main.href} data-reveal>
            <div className="mag-img">
              <Image src={main.img} alt="" fill sizes="(max-width: 1040px) 100vw, 700px" />
            </div>
            <div className="mag-body">
              <span className="mag-tag">{main.tag}</span>
              <h3>{main.title}</h3>
              <p>{main.text}</p>
              <span className="svc-link">
                Read guide <Icon name="arrow" size={16} />
              </span>
            </div>
          </Link>
          <div className="mag-side">
            {side.map((g, i) => (
              <Link className="mag-item" key={g.href} href={g.href} data-reveal style={{ transitionDelay: `${(i + 1) * 80}ms` }}>
                <div className="mag-thumb">
                  <Image src={g.img} alt="" fill sizes="(max-width: 760px) 100vw, 220px" />
                </div>
                <div>
                  <span className="mag-tag">{g.tag}</span>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                  <span className="svc-link">
                    Read guide <Icon name="arrow" size={16} />
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

/* ═════════════════════════ FAQ ═════════════════════════ */
/** Two columns: sticky heading + call card on the left, the accordion on the right */
export function Faq({
  items = defaultFaqs,
  title = "Frequently Asked Questions",
  alt = false,
  id = "faq",
  variant = "split",
}: {
  items?: { q: string; a: string }[];
  title?: string;
  alt?: boolean;
  id?: string;
  /** split (home): sticky aside + accordion · stack (inner pages): one centered column, call row at the end */
  variant?: "split" | "stack";
}) {
  if (variant === "stack") {
    return (
      <section className={`sec faq-stack${alt ? " sec-alt" : ""}`} id={id}>
        <div className="wrap faq-narrow">
          <SecHead kicker="Answers & clarity" title={title} />
          <div data-reveal>
            <FaqList items={items} />
          </div>
          <div className="faq-call-row" data-reveal>
            <Icon name="chat" size={22} />
            <p>Still unsure what you need? Give us a call and we&apos;ll point you in the right direction.</p>
            <CallLink className="btn btn-red" location={`faq-${id}`} />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={`sec art-sec${alt ? " sec-alt" : ""}`} id={id}>
      <SplitEmblem size={520} className="faq-emblem" />
      <div className="wrap faq2">
        <div className="faq-aside">
          <SecHead variant="side" kicker="Answers & clarity" title={title} />
          <div className="faq-call" data-reveal>
            <p>Still unsure what you need? Give us a call and we&apos;ll point you in the right direction.</p>
            <CallLink className="btn btn-red" location={`faq-${id}`} />
          </div>
        </div>
        <div data-reveal>
          <FaqList items={items} />
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ FINAL CTA ═════════════════════════ */
export function FinalCta({
  title = "Book Your Service Today",
  lead = "Pick a time online and we'll confirm your appointment. Or call — same-day visits in most of the valley.",
}: {
  title?: string;
  lead?: string;
} = {}) {
  const lines = [
    { icon: "phone", label: "Call or text", value: <CallLink location="final" icon={false} className="cl-phone" />, tone: "red" },
    { icon: "pin", label: "Headquarters", value: `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`, tone: "blue" },
    { icon: "clock", label: "Hours", value: site.hours, tone: "warm" },
  ] as const;
  return (
    <section className="sec final art-sec" id="contact">
      <Embers count={20} className="final-embers" seed={12} />
      <Frost count={12} className="final-frost" seed={13} />
      <SplitEmblem size={640} className="final-emblem" />
      <div className="wrap final-grid">
        <div data-reveal>
          <span className="final-kicker">
            <i className="dot" /> Direct service desk
          </span>
          <h2 className="final-title">{title}</h2>
          <p className="lead">{lead}</p>
          <div className="contact-lines">
            {lines.map((l) => (
              <div className="cl" key={l.label}>
                <span className={`ic-box tone-${l.tone}`}>
                  <Icon name={l.icon} size={20} />
                </span>
                <div>
                  <small>{l.label}</small>
                  <b>{l.value}</b>
                </div>
              </div>
            ))}
            <div className="cl cl-lic">
              <span className="ic-box">
                <Icon name="shield" size={20} />
              </span>
              <div>
                <small>NV License {site.license}</small>
                Licensed, bonded &amp; insured for residential HVAC.
              </div>
            </div>
          </div>
        </div>
        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ FOOTER ═════════════════════════ */
export function Footer() {
  return (
    <footer className="footer">
      <SplitEmblem size={380} className="foot-emblem" />
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <Link href="/" aria-label={`${site.name} home`}>
            <Image src="/images/logo-light.png" alt={site.name} width={190} height={57} className="foot-logo" />
          </Link>
          <p>{site.tagline}. Family-owned, NATE-certified, same-day service.</p>
          <span className="chip">
            <Icon name="shield" size={14} /> NV License {site.license}
          </span>
        </div>
        <div>
          <h5>Cooling</h5>
          <ul>
            {servicesIn("cooling").map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`}>{s.name}</Link>
              </li>
            ))}
          </ul>
          <h5 className="foot-h-gap">Heating</h5>
          <ul>
            {servicesIn("heating").map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Air &amp; More</h5>
          <ul>
            {servicesIn("air").map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`}>{s.name}</Link>
              </li>
            ))}
          </ul>
          <h5 className="foot-h-gap">Homeowner Tools</h5>
          <ul>
            {tools.map((t) => (
              <li key={t.slug}>
                <Link href={`/tools/${t.slug}/`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><Link href={pages.about}>About Us</Link></li>
            <li><Link href={pages.team}>Our Team</Link></li>
            <li><Link href={pages.reviews}>Reviews</Link></li>
            <li><Link href={pages.specials}>Specials</Link></li>
            <li><Link href={pages.financing}>Financing</Link></li>
            <li><Link href={pages.referral}>Referral Program</Link></li>
            <li><Link href={pages.areas}>Service Areas</Link></li>
            <li><Link href={pages.blog}>HVAC Tips &amp; Guides</Link></li>
            <li><Link href={pages.faq}>FAQ</Link></li>
            <li><Link href={pages.contact}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li className="foot-phone"><CallLink location="footer" /></li>
            <li>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </li>
            <li className="hq-live"><i className="dot" /> Same-day service</li>
            <li>
              <a href={site.googleMapsUrl} target="_blank" rel="noopener noreferrer">Find us on Google</a>
            </li>
            <li>
              <a href={pages.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap legal">
        <span>
          © {new Date().getFullYear()} {site.legalName} · Licensed, Bonded &amp; Insured {site.license}
        </span>
        <span className="legal-links">
          <Link href={pages.privacy}>Privacy Policy</Link>
          <Link href={pages.terms}>Terms of Service</Link>
          <a href="/sitemap.xml">Sitemap</a>
        </span>
      </div>
    </footer>
  );
}

/* ═════════════════════════ STICKY BAR (mobile) ═════════════════════════ */
export function StickyBar() {
  return (
    <div className="sticky" role="complementary" aria-label="Quick contact">
      <CallLink className="btn btn-red" location="sticky-mobile">
        Call Now
      </CallLink>
      <TextLink className="btn btn-blue" location="sticky-mobile">
        Text Us
      </TextLink>
      <BookNowLink className="btn btn-ghost" location="sticky-mobile" icon={false}>
        Book Now
      </BookNowLink>
    </div>
  );
}
