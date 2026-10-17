import Image from "next/image";
import { guides, pages, reviews, serviceAreas, services, site } from "@/lib/site";
import { Embers, FireIceRule, Flame, Frost, HeatShimmer, Ribbons, Snowflake, SplitEmblem } from "./Art";
import { BeforeAfter } from "./BeforeAfter";
import { CallLink, EstimateButton, TextLink } from "./Cta";
import { FaqList } from "./Faq";
import { GoogleG, Icon, Stars } from "./Icon";
import { ContactForm, HeroLeadForm } from "./LeadForm";

const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

function SecHead({ kicker, title, lead, center = true }: { kicker: string; title: string; lead?: string; center?: boolean }) {
  return (
    <div className={`sec-head${center ? " center" : ""}`} data-reveal>
      <FireIceRule />
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

/* ═════════════════════════ HERO ═════════════════════════ */
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
            <Icon name="sun" size={15} /> 24/7 service across the Las Vegas valley
          </span>
          <h1>
            Las Vegas&apos; Most Trusted <span className="cool">Heating</span> &amp; <span className="cool">Cooling</span>{" "}
            Solutions
          </h1>
          <p className="hero-sub">
            AC and heating repair, new system installs and tune-ups from a family-owned team of NATE-certified techs.
            Available 24/7 — and every new-system estimate is free.
          </p>

          <div className="ratings">
            {site.ratings.map((r) => (
              <div className="rating" key={r.platform}>
                <b>
                  {r.score} <Icon name="star" size={14} filled />
                </b>
                <span>{r.platform}</span>
              </div>
            ))}
            <div className="rating">
              <b>
                <Image src="/images/nate.png" alt="" width={20} height={19} /> NATE
              </b>
              <span>Certified techs</span>
            </div>
          </div>

          <ul className="hero-checks">
            <li><Icon name="check" size={18} /> Licensed, bonded &amp; insured</li>
            <li><Icon name="check" size={18} /> Free estimates on new systems</li>
            <li><Icon name="check" size={18} /> NV License {site.license}</li>
          </ul>
        </div>

        <div className="hero-form">
          <div className="hero-orb" aria-hidden="true">
            <Image src="/images/art/fire-ice-orb.png" alt="" fill sizes="(max-width: 760px) 460px, 820px" priority />
          </div>
          <HeroLeadForm />
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ TRUST BAR ═════════════════════════ */
export function TrustBar() {
  const items = [
    { icon: "shield", t: `NV Lic ${site.license}`, s: "Licensed, bonded & insured" },
    { icon: "home", t: "Family-Owned", s: "Local Las Vegas team" },
    { icon: "clock", t: "True 24/7", s: "Nights, weekends & holidays" },
    { icon: "tag", t: "Free Estimates", s: "On new systems" },
    { icon: "award", t: "NATE-Certified", s: "Trained, tested & trusted" },
  ] as const;
  return (
    <section className="trust" aria-label="Credentials">
      <div className="wrap trust-row">
        {items.map((i) => (
          <div className="trust-item" key={i.t}>
            <span className="ic-box">
              <Icon name={i.icon} size={20} />
            </span>
            <div>
              <strong>{i.t}</strong>
              <span>{i.s}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═════════════════════════ EMERGENCY ═════════════════════════ */
export function Emergency() {
  return (
    <section className="emerg">
      <HeatShimmer tone="white" className="emerg-shimmer" />
      <Snowflake size={220} className="emerg-flake" />
      <div className="wrap emerg-row" data-reveal>
        <span className="emerg-ic">
          <Icon name="snow" size={28} />
        </span>
        <div className="emerg-copy">
          <h3>
            AC out in the desert heat? We answer 24/7. <span className="tag-urgent">Urgent service</span>
          </h3>
          <p>Call or text now and a NATE-certified tech will get your home cool again.</p>
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
export function Services() {
  return (
    <section className="sec art-sec" id="services">
      <div className="sec-art" aria-hidden="true">
        <Image src="/images/art/flame-cluster.png" alt="" width={420} height={630} className="art-img svc-flame" />
        <Image src="/images/art/ice-crystal.png" alt="" width={460} height={460} className="art-img svc-ice" />
      </div>
      <div className="wrap">
        <SecHead
          kicker="Precision climate care"
          title="Built for Desert Performance"
          lead="Cooling, heating and indoor air — one local team for all of it, built for the Mojave desert."
        />
        <div className="grid-3">
          {services.map((s, i) => (
            <article className={`card svc${s.hot ? " hot" : ""}`} key={s.title} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <div className="svc-img">
                <Image src={s.img} alt={s.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1040px) 50vw, 400px" />
                {s.hot ? <Embers count={10} className="card-embers" seed={i + 10} /> : null}
                <span className="ic-box ic-float">
                  <Icon name={s.icon} size={22} />
                </span>
              </div>
              <div className="svc-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              <div className="svc-foot">
                <EstimateButton pick={s.pick} className="svc-link" icon="arrow">
                  {s.cta}
                </EstimateButton>
                <a className="svc-more" href={s.href} target="_blank" rel="noopener">
                  Learn more
                </a>
              </div>
            </article>
          ))}
        </div>
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
  { icon: "award", t: "NATE-certified techs", d: "Industry-certified pros who know HVAC inside and out." },
  { icon: "tag", t: "Honest, competitive pricing", d: "If it's a simple fix, we'll tell you. No upselling." },
  { icon: "clock", t: "Here 24/7", d: "Heat waves don't wait for business hours — neither do we." },
  { icon: "shield", t: "Licensed, bonded & insured", d: `Nevada license ${site.license} for total peace of mind.` },
  { icon: "sparkle", t: "Clean, professional work", d: "On time, respectful, and we leave your home spotless." },
] as const;

export function WhyWave() {
  return (
    <section className="sec art-sec" id="why">
      <Frost count={10} className="sec-frost" seed={7} />
      <div className="wrap">
        <SecHead
          kicker="The integrity standard"
          title="Why Las Vegas Homeowners Choose Wave"
          lead="We're a family-owned local company. When you call Wave you get honest answers, skilled techs and the kind of service our neighbors keep recommending."
        />
        <div className="grid-3 why-grid">
          {why.map((w, i) => (
            <div className="card why-card" key={w.t} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <span className={`ic-box ${i % 2 ? "tone-cool" : "tone-warm"}`}>
                <Icon name={w.icon} size={22} />
              </span>
              {i % 2 ? <Snowflake size={90} className="why-glyph" /> : <Flame size={70} className="why-glyph" />}
              <h4>{w.t}</h4>
              <p>{w.d}</p>
            </div>
          ))}
        </div>

        <div className="panel team" data-reveal>
          <div className="team-copy">
            <span className="kicker">
              <Icon name="award" size={15} /> The people behind Wave
            </span>
            <h3>Trained for Nevada&apos;s Harshest Conditions</h3>
            <p>
              Every Wave technician is NATE-certified and works on homes built for triple-digit summers and cold desert
              nights. Family-owned means the owners stand behind every job.
            </p>
            <ul className="inline-checks">
              <li><Icon name="check" size={16} /> NATE Certified</li>
              <li><Icon name="check" size={16} /> Licensed &amp; Bonded</li>
              <li><Icon name="check" size={16} /> Fully Insured</li>
            </ul>
          </div>
          <div className="team-imgs">
            <div className="team-main">
              <Image src="/images/crew.jpg" alt="The Wave Heating & Cooling team" fill sizes="(max-width: 900px) 100vw, 420px" />
            </div>
            <div className="team-sub">
              <Image src="/images/family.jpg" alt="The family behind Wave Heating & Cooling" fill sizes="200px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ PROCESS ═════════════════════════ */
export function Process() {
  const steps = [
    { t: "Tell us what's going on", d: "Fill out the 60-second form or call us any time, day or night." },
    { t: "We confirm a time", d: "A Wave team member calls you back to schedule a visit that works for you." },
    { t: "Diagnosis & clear options", d: "Your tech finds the root cause and walks you through your options before any work begins." },
    { t: "Comfort restored", d: "The job is done right, cleaned up, and explained — so you know exactly what was fixed." },
  ];
  return (
    <section className="sec sec-alt art-sec">
      <HeatShimmer tone="cool" className="proc-shimmer" />
      <div className="wrap">
        <SecHead kicker="Streamlined resolution" title="How We Restore Your Comfort" lead="Simple, transparent and stress-free from the moment you reach out." />
        <ol className="grid-4 steps">
          <li className="steps-flow" aria-hidden="true">
            <i />
          </li>
          {steps.map((s, i) => (
            <li className="card step-card" key={s.t} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="step-ghost" aria-hidden="true">0{i + 1}</span>
              <span className="step-num">{i + 1}</span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="center-cta" data-reveal>
          <EstimateButton>Start My Free Estimate</EstimateButton>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ REVIEWS ═════════════════════════ */
export function Reviews() {
  return (
    <section className="sec art-sec" id="reviews">
      <Embers count={14} className="sec-embers" seed={9} />
      <div className="wrap">
        <div className="rev-head" data-reveal>
          <div>
            <span className="kicker">Real local voices</span>
            <h2>What Las Vegas Homeowners Are Saying</h2>
          </div>
          <div className="rev-score">
            {site.ratings.map((r) => (
              <div key={r.platform}>
                <b>{r.score}</b>
                <Stars size={13} />
                <span>{r.platform}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid-3">
          {reviews.map((r, i) => (
            <figure className="card rev" key={r.name} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <div className="rev-top">
                <Stars size={15} />
                <GoogleG size={18} />
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
        <div className="center-cta" data-reveal>
          <a className="btn btn-ghost" href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
            <GoogleG size={18} /> Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ ESTIMATE BAND ═════════════════════════ */
export function EstimateBand() {
  return (
    <section className="est">
      <Image src="/images/van-strip.jpg" alt="" fill sizes="100vw" className="est-bg" />
      <Image src="/images/art/desert-sun.png" alt="" width={720} height={480} className="est-sun" aria-hidden="true" />
      <HeatShimmer tone="warm" className="est-shimmer" />
      <div className="wrap est-row" data-reveal>
        <div>
          <span className="chip chip-warm">Thinking about a new system?</span>
          <h2>Free In-Home Estimates on New AC &amp; Heating Systems</h2>
          <p>
            Old, loud, or costing you a fortune to run? We&apos;ll size the right system for your home and give you a
            clear, no-pressure quote.
          </p>
        </div>
        <div className="est-acts">
          <EstimateButton pick="New system / replacement estimate" icon="arrow">
            Schedule Free Estimate
          </EstimateButton>
          <CallLink className="btn btn-ghost" location="estimate-band" />
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ SERVICE AREAS ═════════════════════════ */
export function Areas() {
  return (
    <section className="sec areas-sec" id="areas">
      <Image src="/images/valley-night.jpg" alt="" fill sizes="100vw" className="areas-bg" />
      <div className="wrap">
        <SecHead
          kicker="Valley-wide coverage"
          title="Proudly Serving the Las Vegas Valley"
          lead="Not sure if you're in our area? Give us a call — if you're in the valley, we can help."
        />
        <div className="areas" data-reveal>
          {serviceAreas.map((a) => (
            <span key={a}>
              <Icon name="pin" size={15} /> {a}
            </span>
          ))}
        </div>
        <div className="hq" data-reveal>
          <span>
            <Icon name="pin" size={18} /> Headquarters:{" "}
            <b>
              {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            </b>
          </span>
          <span className="hq-live">
            <i className="dot" /> Available 24/7
          </span>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ GUIDES ═════════════════════════ */
export function Guides() {
  return (
    <section className="sec sec-alt art-sec" id="guides">
      <div className="sec-art" aria-hidden="true">
        <Image src="/images/art/heat-waves.png" alt="" width={1200} height={800} className="art-img guide-heat" />
      </div>
      <Ribbons tone="warm" className="guide-ribbons" />
      <div className="wrap">
        <div className="rev-head" data-reveal>
          <div>
            <span className="kicker">HVAC advice &amp; insights</span>
            <h2>Desert Heating &amp; Cooling Guides</h2>
          </div>
          <a className="text-link" href={pages.blog} target="_blank" rel="noopener">
            View all guides <Icon name="arrow" size={16} />
          </a>
        </div>
        <div className="grid-3">
          {guides.map((g, i) => (
            <a className="card guide" key={g.href} href={g.href} target="_blank" rel="noopener" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="svc-img">
                <Image src={g.img} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1040px) 50vw, 400px" />
                <span className="guide-tag">{g.tag}</span>
              </div>
              <div className="svc-body">
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </div>
              <div className="svc-foot">
                <span className="svc-link">
                  Read guide <Icon name="arrow" size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ FAQ ═════════════════════════ */
export function Faq() {
  return (
    <section className="sec art-sec" id="faq">
      <SplitEmblem size={520} className="faq-emblem" />
      <div className="wrap faq-wrap">
        <SecHead kicker="Answers & clarity" title="Frequently Asked Questions" lead="Still unsure what you need? A quick call is free and we'll point you in the right direction." />
        <div data-reveal>
          <FaqList />
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ FINAL CTA ═════════════════════════ */
export function FinalCta() {
  const lines = [
    { icon: "phone", label: "Call or text 24/7", value: <CallLink location="final" icon={false} className="cl-phone" />, tone: "red" },
    { icon: "pin", label: "Headquarters", value: `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`, tone: "blue" },
    { icon: "clock", label: "Hours", value: "Open 24/7 — nights, weekends & holidays", tone: "warm" },
  ] as const;
  return (
    <section className="sec final art-sec" id="contact">
      <Embers count={20} className="final-embers" seed={12} />
      <Frost count={12} className="final-frost" seed={13} />
      <SplitEmblem size={640} className="final-emblem" />
      <div className="wrap final-grid">
        <div data-reveal>
          <span className="kicker">Direct service desk</span>
          <h2>Get Your Free Estimate Today</h2>
          <p className="lead">Tell us what you need and we&apos;ll get back to you fast. Or call — we&apos;re available 24/7.</p>
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
          <Image src="/images/logo-light.png" alt={site.name} width={190} height={57} className="foot-logo" />
          <p>{site.tagline}. Family-owned, NATE-certified, available 24/7.</p>
          <span className="chip">
            <Icon name="shield" size={14} /> NV License {site.license}
          </span>
        </div>
        <div>
          <h5>Services</h5>
          <ul>
            {services.map((s) => (
              <li key={s.title}>
                <a href={s.href}>{s.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href={pages.about}>About Us</a></li>
            <li><a href={pages.referral}>Referral Program</a></li>
            <li><a href={pages.blog}>HVAC Tips &amp; Guides</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#areas">Service Areas</a></li>
            <li><a href={pages.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
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
            <li className="hq-live"><i className="dot" /> Open 24/7</li>
          </ul>
        </div>
      </div>
      <div className="wrap legal">
        <span>
          © {new Date().getFullYear()} {site.legalName} · Licensed, Bonded &amp; Insured {site.license}
        </span>
        <a href="#">Privacy Policy</a>
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
      <EstimateButton className="btn btn-ghost" icon={null}>
        Estimate
      </EstimateButton>
    </div>
  );
}
