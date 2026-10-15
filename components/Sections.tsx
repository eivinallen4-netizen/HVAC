import Image from "next/image";
import { guides, pages, reviews, serviceAreas, services, site } from "@/lib/site";
import { BeforeAfter } from "./BeforeAfter";
import { CallLink, EstimateButton } from "./Cta";
import { FaqList } from "./Faq";
import { GoogleG, Icon, Stars } from "./Icon";
import { ContactForm, HeroLeadForm } from "./LeadForm";

/* ═════════════════════════ HERO ═════════════════════════ */
export function Hero() {
  return (
    <section className="hero">
      <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" className="hero-bg" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="hero-chip">
            <Icon name="pin" size={15} /> Las Vegas · Henderson · Summerlin
          </span>
          <h1>
            Heating &amp; Air Conditioning Services in <span className="grad">Las Vegas, NV</span>
          </h1>
          <p className="hero-sub">
            AC and heating repair, new system installs and tune-ups from a family-owned team of NATE-certified techs.
            Available 24/7 — and every new-system estimate is free.
          </p>

          <div className="hero-ctas">
            <EstimateButton>Get My Free Estimate</EstimateButton>
            <CallLink className="btn btn-glass" location="hero">
              Call {site.phone}
            </CallLink>
          </div>

          <ul className="hero-checks">
            <li><Icon name="check" size={20} /> Licensed, bonded &amp; insured</li>
            <li><Icon name="check" size={20} /> NATE-certified technicians</li>
            <li><Icon name="check" size={20} /> 24/7 emergency service</li>
            <li><Icon name="check" size={20} /> Free estimates on new systems</li>
          </ul>

          <div className="proof">
            <div className="avatars" aria-hidden="true">
              {reviews.slice(0, 4).map((r) => (
                <span key={r.name} style={{ background: r.color }}>
                  {r.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                </span>
              ))}
            </div>
            <div>
              <div className="proof-top">
                <GoogleG size={16} /> <b>5.0</b> <Stars size={14} />
              </div>
              <small>Rated 5-stars by Las Vegas homeowners</small>
            </div>
          </div>
        </div>

        <HeroLeadForm />
      </div>

      <svg className="hero-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 52c160 26 320 38 480 30C700 70 860 20 1060 14c150-4 270 14 380 34v42H0Z" />
      </svg>
    </section>
  );
}

/* ═════════════════════════ TRUST BAR ═════════════════════════ */
export function TrustBar() {
  const items = [
    { icon: <Icon name="shield" size={24} />, t: "Licensed, Bonded & Insured", s: `NV License ${site.license}`, tone: "blue" },
    { icon: <Image src="/images/nate.png" alt="NATE" width={38} height={36} />, t: "NATE-Certified", s: "Certified for excellence", tone: "white" },
    { icon: <Icon name="star" size={24} filled />, t: "5-Star Rated", s: "Google & Facebook", tone: "gold" },
    { icon: <Icon name="clock" size={24} />, t: "24/7 Service", s: "Nights, weekends & holidays", tone: "red" },
  ];
  return (
    <section className="trust" aria-label="Credentials">
      <div className="wrap">
        <div className="trust-card" data-reveal>
          {items.map((i) => (
            <div className="trust-item" key={i.t}>
              <span className={`trust-ic tone-${i.tone}`}>{i.icon}</span>
              <div>
                <strong>{i.t}</strong>
                <span>{i.s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ EMERGENCY ═════════════════════════ */
export function Emergency() {
  return (
    <section className="emerg">
      <div className="wrap">
        <div className="emerg-box" data-reveal>
          <div className="emerg-ic">
            <Icon name="sun" size={30} />
          </div>
          <div className="emerg-copy">
            <h3>AC out in the Las Vegas heat?</h3>
            <p>We answer 24/7. Call now and a NATE-certified tech will get your home cool again.</p>
          </div>
          <div className="emerg-acts">
            <CallLink className="btn btn-white" location="emergency">
              Call Now
            </CallLink>
            <EstimateButton className="btn btn-outline-white" icon={null}>
              Request Service
            </EstimateButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ SERVICES ═════════════════════════ */
export function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">What we do</span>
          <h2>HVAC Services We Provide</h2>
          <p className="lead">Cooling, heating and indoor air — one local team for all of it, built for the Mojave desert.</p>
        </div>
        <div className="svc-grid">
          {services.map((s, i) => (
            <article className="svc" key={s.title} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <div className="svc-img">
                <Image src={s.img} alt={s.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1040px) 50vw, 380px" />
              </div>
              <span className={`svc-ic${s.hot ? " hot" : ""}`}>
                <Icon name={s.icon} size={28} />
              </span>
              <div className="svc-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="svc-acts">
                  <EstimateButton pick={s.pick} className="svc-link" icon="arrow">
                    {s.cta}
                  </EstimateButton>
                  <a className="svc-more" href={s.href} target="_blank" rel="noopener">
                    Learn more
                  </a>
                </div>
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
  return (
    <section className="sec diff">
      <div className="wrap diff-grid">
        <div data-reveal>
          <span className="eyebrow">The Wave difference</span>
          <h2>A Tune-Up You Can Actually See</h2>
          <p className="lead">
            Desert dust, leaves and debris choke your condenser and make your AC work twice as hard. Our maintenance
            visits clean it out so your system runs cooler, cheaper and longer.
          </p>
          <ul className="tick-list">
            <li><Icon name="tick" size={20} /> Coil &amp; condenser cleaning</li>
            <li><Icon name="tick" size={20} /> Electrical &amp; refrigerant checks</li>
            <li><Icon name="tick" size={20} /> Catch small problems before they become breakdowns</li>
          </ul>
          <EstimateButton pick="Maintenance / tune-up">Book a Tune-Up</EstimateButton>
        </div>
        <div data-reveal>
          <BeforeAfter before="/images/before.jpg" after="/images/after.jpg" />
          <p className="ba-caption">
            <Icon name="drag" size={16} /> Drag to compare — real Wave job photos
          </p>
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
    <section className="sec why" id="why">
      <div className="wrap why-grid">
        <div className="collage" data-reveal>
          <div className="collage-main">
            <Image src="/images/crew.jpg" alt="The Wave Heating & Cooling team" fill sizes="(max-width: 1040px) 100vw, 520px" />
          </div>
          <div className="collage-sub">
            <Image src="/images/family.jpg" alt="The family behind Wave Heating & Cooling" fill sizes="260px" />
          </div>
          <div className="float-card fc-nate">
            <Image src="/images/nate.png" alt="" width={44} height={41} />
            <div>
              <b>NATE-Certified</b>
              <span>Trained, tested &amp; trusted</span>
            </div>
          </div>
          <div className="float-card fc-247">
            <span className="fc-ic">
              <Icon name="clock" size={22} />
            </span>
            <div>
              <b>24/7</b>
              <span>Emergency service</span>
            </div>
          </div>
        </div>

        <div>
          <div data-reveal>
            <span className="eyebrow">Why homeowners choose Wave</span>
            <h2>Las Vegas&apos; Most Trusted Heating &amp; Cooling Team</h2>
            <p className="lead">
              We&apos;re a family-owned local company. When you call Wave you get honest answers, skilled techs and the
              kind of service our neighbors keep recommending.
            </p>
          </div>
          <div className="why-list">
            {why.map((w, i) => (
              <div className="wi" key={w.t} data-reveal style={{ transitionDelay: `${(i % 2) * 70}ms` }}>
                <span className="wic">
                  <Icon name={w.icon} size={22} />
                </span>
                <div>
                  <h4>{w.t}</h4>
                  <p>{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ PROCESS ═════════════════════════ */
export function Process() {
  const steps = [
    { icon: "chat", t: "Tell us what's going on", d: "Fill out the 60-second form or call us any time, day or night." },
    { icon: "cal", t: "We confirm a time", d: "A Wave team member calls you back to schedule a visit that works for you." },
    { icon: "search", t: "Diagnosis & clear options", d: "Your tech finds the root cause and walks you through your options before any work begins." },
  ] as const;
  return (
    <section className="sec process">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">How it works</span>
          <h2>Comfort Restored in 3 Simple Steps</h2>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li className="st" key={s.t} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="st-num">{i + 1}</span>
              <span className="st-ic">
                <Icon name={s.icon} size={28} />
              </span>
              <h3>{s.t}</h3>
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
    <section className="sec reviews" id="reviews">
      <div className="wrap rev-grid">
        <aside className="rev-summary" data-reveal>
          <span className="eyebrow eyebrow-light">Real reviews, real neighbors</span>
          <h2>What Las Vegas Homeowners Are Saying</h2>
          <div className="score">
            <b>5.0</b>
            <div>
              <Stars size={20} />
              <small>Average Google rating</small>
            </div>
          </div>
          <ul className="platforms">
            {site.ratings.map((r) => (
              <li key={r.platform}>
                <span>{r.platform}</span>
                <span className="bar">
                  <i style={{ width: `${(Number(r.score) / 5) * 100}%` }} />
                </span>
                <b>{r.score}</b>
              </li>
            ))}
          </ul>
          <div className="rev-ctas">
            <EstimateButton icon={null}>Join Our Happy Customers</EstimateButton>
            <a className="btn btn-glass" href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer">
              <GoogleG size={18} /> Read All Reviews
            </a>
          </div>
        </aside>

        <div className="rev-cards">
          {reviews.map((r, i) => (
            <figure className="rev" key={r.name} data-reveal style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
              <div className="rev-top">
                <Stars size={15} />
                <GoogleG size={18} />
              </div>
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption>
                <span className="av" style={{ background: r.color }}>
                  {r.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                </span>
                <span>
                  {r.name}
                  <small>Verified Google review</small>
                </span>
              </figcaption>
            </figure>
          ))}
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
      <div className="wrap">
        <div className="est-inner" data-reveal>
          <span className="eyebrow eyebrow-warm">Thinking about a new system?</span>
          <h2>Free Estimates on New AC &amp; Heating Systems</h2>
          <p>
            Old, loud, or costing you a fortune to run? We&apos;ll size the right system for your home and give you a
            clear, no-pressure quote — free.
          </p>
          <ul className="tick-list light">
            <li><Icon name="tick" size={20} /> In-home assessment by a NATE-certified tech</li>
            <li><Icon name="tick" size={20} /> Repair-vs-replace advice you can trust</li>
            <li><Icon name="tick" size={20} /> Systems sized for Las Vegas summers</li>
          </ul>
          <div className="hero-ctas">
            <EstimateButton pick="New system / replacement estimate">Get My Free Estimate</EstimateButton>
            <CallLink className="btn btn-glass" location="estimate-band" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ SERVICE AREAS ═════════════════════════ */
export function Areas() {
  return (
    <section className="sec areas-sec" id="areas">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">Where we work</span>
          <h2>Proudly Serving the Las Vegas Valley</h2>
          <p className="lead">Not sure if you&apos;re in our area? Give us a call — if you&apos;re in the valley, we can help.</p>
        </div>
        <div className="areas" data-reveal>
          {serviceAreas.map((a) => (
            <span key={a}>
              <Icon name="pin" size={16} /> {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ GUIDES ═════════════════════════ */
export function Guides() {
  return (
    <section className="sec guides" id="guides">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">Homeowner guides</span>
          <h2>HVAC Tips for Las Vegas Homes</h2>
          <p className="lead">Straight answers from our techs on keeping your system efficient, safe and ready for desert weather.</p>
        </div>
        <div className="svc-grid">
          {guides.map((g, i) => (
            <a
              className="guide"
              key={g.href}
              href={g.href}
              target="_blank"
              rel="noopener"
              data-reveal
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="svc-img">
                <Image src={g.img} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1040px) 50vw, 380px" />
              </div>
              <div className="svc-body">
                <span className="guide-tag">{g.tag}</span>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                <span className="svc-link">
                  Read the guide <Icon name="arrow" size={18} />
                </span>
              </div>
            </a>
          ))}
        </div>
        <div className="center-cta" data-reveal>
          <a className="btn btn-outline" href={pages.blog} target="_blank" rel="noopener">
            See all guides
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ FAQ ═════════════════════════ */
export function Faq() {
  return (
    <section className="sec faq" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-side" data-reveal>
          <span className="eyebrow">FAQ</span>
          <h2>Questions? We&apos;ve Got Answers.</h2>
          <p className="lead">Still unsure what you need? A quick call is free and we&apos;ll point you in the right direction.</p>
          <CallLink className="btn btn-red" location="faq" />
        </div>
        <div data-reveal>
          <FaqList />
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ FINAL CTA ═════════════════════════ */
export function FinalCta() {
  return (
    <section className="sec final" id="contact">
      <div className="wrap final-grid">
        <div data-reveal>
          <span className="eyebrow eyebrow-warm">Ready when you are</span>
          <h2>Get Your Free Estimate Today</h2>
          <p className="lead">Tell us what you need and we&apos;ll get back to you fast. Or call — we&apos;re available 24/7.</p>
          <div className="contact-lines">
            <div className="cl">
              <span className="cl-ic">
                <Icon name="phone" size={22} />
              </span>
              <div>
                <small>Call or text 24/7</small>
                <CallLink location="final" icon={false} className="cl-phone" />
              </div>
            </div>
            <div className="cl">
              <span className="cl-ic">
                <Icon name="pin" size={22} />
              </span>
              <div>
                <small>Visit us</small>
                {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
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
      <div className="wrap foot-grid">
        <div>
          <Image src="/images/logo-light.png" alt={site.name} width={190} height={57} className="foot-logo" />
          <p>{site.tagline}. Family-owned, NATE-certified, available 24/7.</p>
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
            <li><CallLink location="footer" icon={false} /></li>
            <li>
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
            </li>
            <li>Open 24/7</li>
            <li>NV License {site.license}</li>
          </ul>
        </div>
      </div>
      <div className="legal">
        © {new Date().getFullYear()} {site.legalName} · Licensed, Bonded &amp; Insured {site.license} ·{" "}
        <a href="#">Privacy Policy</a>
      </div>
    </footer>
  );
}

/* ═════════════════════════ STICKY BAR ═════════════════════════ */
export function StickyBar() {
  return (
    <div className="sticky" role="complementary" aria-label="Quick contact">
      <div className="wrap sticky-desk">
        <span className="sticky-msg">
          Available 24/7 · Free estimates on new systems
        </span>
        <CallLink className="sticky-phone" location="sticky" />
        <EstimateButton className="btn btn-navy btn-sm" icon={null}>
          Get Free Estimate
        </EstimateButton>
      </div>
      <div className="sticky-mob">
        <CallLink className="btn btn-red" location="sticky-mobile">
          Call Now
        </CallLink>
        <EstimateButton className="btn btn-navy">Free Estimate</EstimateButton>
      </div>
    </div>
  );
}
