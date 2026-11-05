import Link from "next/link";
import { reviews, type IconName } from "@/lib/site";
import { EstimateButton } from "./Cta";
import { Icon, Stars } from "./Icon";
import { SecHead } from "./Sections";

/** Hero form option that books a replacement visit */
const REPLACE = "New system / replacement estimate";

function AssessButton({ className = "btn btn-red" }: { className?: string }) {
  return (
    <EstimateButton pick={REPLACE} className={className}>
      Schedule My Assessment
    </EstimateButton>
  );
}

/* ═════════════════════════ REPAIR OR REPLACE ═════════════════════════ */
const signs: { icon: IconName; t: string; d: string }[] = [
  { icon: "wrench", t: "Repairs every summer", d: "You're paying for a fix every year just to get through July." },
  { icon: "bolt", t: "Bills keep climbing", d: "Your power bill keeps going up while you use the system the same way." },
  { icon: "home", t: "Rooms that never cool", d: "The upstairs or the back bedrooms never catch up, no matter the setting." },
  { icon: "gauge", t: "Loud or short-cycling", d: "It rattles, hums, or turns on and off every few minutes." },
  { icon: "flame", t: "Rust, leaks or a burning smell", d: "Any of these at the unit means it's time for a closer look." },
];

export function RepairOrReplace() {
  return (
    <section className="sec art-sec" id="repair-or-replace">
      <div className="wrap">
        <SecHead
          kicker="Repair or replace?"
          title="Repair or Replace? We'll Tell You Honestly"
          lead="Las Vegas summers push an AC harder than almost anywhere, so systems here wear out sooner. Here are the 5 signs yours is done."
        />
        <ol className="signs5">
          {signs.map((s, i) => (
            <li className="card sign-card" key={s.t} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="sign-n" aria-hidden="true">{i + 1}</span>
              <span className={`ic-box ${i % 2 ? "tone-cool" : "tone-warm"}`}>
                <Icon name={s.icon} size={22} />
              </span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="panel verdict" data-reveal>
          <div>
            <h3>System over 12 years old, or checked two of these?</h3>
            <p>
              It&apos;s time to talk replacement. We&apos;ll show you the numbers and you decide, with no pressure. And if a
              repair makes more sense, we&apos;ll tell you that too.
            </p>
            <p className="verdict-note">
              <Icon name="snow" size={16} /> Older systems often run on <b>R-22 refrigerant</b>, which isn&apos;t made
              anymore. That&apos;s why every recharge costs more than the last.
            </p>
          </div>
          <div className="verdict-acts">
            <AssessButton />
            <Link className="text-link" href="/tools/repair-or-replace-calculator/">
              Run the repair-or-replace calculator <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ HOME PROTECTION ═════════════════════════ */
const protect: { icon: IconName; t: string; d: string }[] = [
  { icon: "boot", t: "Booties on at the door", d: "Shoe covers go on before anyone on our crew steps inside your home." },
  { icon: "ladder", t: "Padding under every ladder", d: "Floor padding goes down before a ladder touches your tile, wood or carpet." },
  { icon: "sheet", t: "Plastic over walls, closets & beds", d: "Anything near the work gets covered, so attic dust stays in the attic." },
  { icon: "broom", t: "Swept and vacuumed", d: "We clean every room we worked in before we pack up the truck." },
];

export function HomeProtection() {
  const quote = reviews.find((r) => r.name === "trygg");
  return (
    <section className="sec sec-alt art-sec protect-sec" id="home-protection">
      <div className="wrap">
        <SecHead
          kicker="How we protect your home"
          title="We Treat Your Home Like It's Ours"
          lead="A new system shouldn't cost you a clean house. Our crew does this on every single install."
        />
        <ol className="grid-4 protect-grid">
          {protect.map((p, i) => (
            <li className="card protect-card" key={p.t} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="protect-step">Step {i + 1}</span>
              <span className="protect-ic">
                <Icon name={p.icon} size={34} />
              </span>
              <h4>{p.t}</h4>
              <p>{p.d}</p>
            </li>
          ))}
        </ol>
        <div className="protect-foot" data-reveal>
          <p className="protect-promise">
            When we leave, your home looks exactly how we found it, <span className="cool">or better.</span>
          </p>
          {quote && (
            <figure className="protect-quote">
              <Stars size={14} />
              <blockquote>&ldquo;{quote.text}&rdquo;</blockquote>
              <figcaption>{quote.name}, Google review</figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ REPLACEMENT DAY ═════════════════════════ */
const day = [
  { t: "Arrive & plan", d: "We greet you, walk you through the plan and answer your questions before any tools come out." },
  { t: "Protect", d: "Booties on, floor padding down, and plastic up over walls, closets and beds." },
  { t: "Replace", d: "Old system out. New matched indoor and outdoor system in." },
  { t: "Inspect", d: "Full safety inspection and testing on everything we touched." },
  { t: "Clean & walkthrough", d: "We sweep and vacuum, then show you how to use your new system and thermostat." },
];

const talk = [
  "We greet you and go over the plan before we start.",
  "We show you what we find, with photos if it's up in the attic.",
  "We explain your options in plain words, and you decide.",
  "At the end, we show you how to run your new system.",
];

export function ReplacementDay() {
  return (
    <section className="sec art-sec" id="install-day">
      <div className="wrap">
        <SecHead
          kicker="Replacement day"
          title="What Replacement Day Looks Like"
          lead="Most replacements take about a full day. Here's how it goes, start to finish, so nothing catches you off guard."
        />
        <ol className="day-steps">
          {day.map((s, i) => (
            <li className="day-step" key={s.t} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="day-num">{i + 1}</span>
              <div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="panel talk" data-reveal>
          <div className="talk-head">
            <span className="ic-box tone-cool">
              <Icon name="chat" size={22} />
            </span>
            <div>
              <h3>We actually talk to you</h3>
              <p>You&apos;ll always know what&apos;s happening in your home and why.</p>
            </div>
          </div>
          <ul className="talk-list">
            {talk.map((t) => (
              <li key={t}>
                <Icon name="check" size={18} /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="center-cta" data-reveal>
          <AssessButton />
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ WHAT'S INCLUDED ═════════════════════════ */
export function FullReplacement() {
  return (
    <section className="sec sec-alt art-sec" id="full-replacement">
      <div className="wrap">
        <SecHead
          kicker="What full replacement means"
          title="A Full HVAC Replacement, Not Just a New Box"
          lead="Some companies swap the outside unit and call it a new system. Here's what every Wave replacement in Las Vegas covers."
        />
        <div className="incl-grid">
          <article className="card incl-card" data-reveal>
            <span className="ic-box">
              <Icon name="unit" size={22} />
            </span>
            <h3>The whole system, matched</h3>
            <p>We replace indoor and outdoor together, so every part is matched and works as one system.</p>
            <ul className="incl-list">
              <li><Icon name="check" size={16} /> Matched indoor and outdoor units</li>
              <li><Icon name="check" size={16} /> New thermostat</li>
              <li><Icon name="check" size={16} /> Line set, drain and electrical checked</li>
              <li><Icon name="check" size={16} /> Old equipment hauled away</li>
            </ul>
            <p className="incl-note">Mixing old and new parts can wear the system out faster and cause warranty problems.</p>
          </article>

          <article className="card incl-card" data-reveal style={{ transitionDelay: "70ms" }}>
            <span className="ic-box tone-warm">
              <Icon name="gauge" size={22} />
            </span>
            <h3>Sized for your home, not a guess</h3>
            <p>The wrong size AC costs you every month, even when it&apos;s brand new.</p>
            <div className="size-pair">
              <div>
                <b>Too big</b>
                <span>Turns on and off constantly. Sticky air, extra wear.</span>
              </div>
              <div>
                <b>Too small</b>
                <span>Runs nonstop in July and never catches up.</span>
              </div>
            </div>
            <p className="incl-note">
              We measure square footage, windows, insulation and sun exposure first. That&apos;s why we come see your home
              instead of quoting over the phone.
            </p>
          </article>

          <article className="card incl-card" data-reveal>
            <span className="ic-box">
              <Icon name="permit" size={22} />
            </span>
            <h3>Permits on every replacement</h3>
            <p>
              A permit means the county inspects your install, not just us. Unpermitted work can come up when you sell your
              home or file an insurance claim. We handle the paperwork for you.
            </p>
            <p className="callout">
              <Icon name="question" size={18} />
              <span>
                Ask any company you call: <b>do you pull permits?</b> We always do.
              </span>
            </p>
          </article>

          <article className="card incl-card" data-reveal style={{ transitionDelay: "70ms" }}>
            <span className="ic-box tone-warm">
              <Icon name="shield" size={22} />
            </span>
            <h3>Safety inspection before we call it done</h3>
            <p>A new system that isn&apos;t checked is a risk in your home. On every install we check:</p>
            <ul className="incl-list">
              <li><Icon name="check" size={16} /> Electrical connections and breaker sizing</li>
              <li><Icon name="check" size={16} /> Furnace gas lines and venting, plus a carbon monoxide check</li>
              <li><Icon name="check" size={16} /> Refrigerant pressures</li>
              <li><Icon name="check" size={16} /> Drain line, so there are no leaks or water damage</li>
            </ul>
            <p className="incl-note">Safety isn&apos;t an add-on with us. It&apos;s part of every job.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ COMPARING QUOTES ═════════════════════════ */
const priceFactors = [
  "System size and efficiency rating (SEER2)",
  "Whether the ductwork, electrical or equipment pad need work",
  "Permits, safety inspection, haul-away and home protection (some quotes leave these out)",
  "Labor done right, which takes a full day, not two hours",
];
const quoteChecks = [
  "Is a permit included?",
  "Is it a full matched system, or just the outside unit?",
  "Is a safety inspection included?",
  "Do they protect your home and clean up after?",
];

export function CompareQuotes() {
  return (
    <section className="sec art-sec" id="compare-quotes">
      <div className="wrap">
        <SecHead
          kicker="Comparing quotes?"
          title="What Goes Into the Price of a New AC System"
          lead="Quotes for a new AC in Las Vegas can vary a lot. Here's what changes the price, and what to check before you compare."
        />
        <div className="compare" data-reveal>
          <div className="panel compare-col">
            <h3>What affects the price</h3>
            <ul className="incl-list">
              {priceFactors.map((f) => (
                <li key={f}>
                  <Icon name="tag" size={16} /> {f}
                </li>
              ))}
            </ul>
            <Link className="text-link" href="/tools/ac-replacement-cost-estimator/">
              Get a ballpark with our cost estimator <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="panel compare-col compare-check">
            <h3>Before you take the lowest quote, check:</h3>
            <ul className="checklist">
              {quoteChecks.map((c) => (
                <li key={c}>
                  <span className="box" aria-hidden="true">
                    <Icon name="tick" size={14} />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
            <p className="compare-yes">
              <Icon name="check" size={18} /> Every item on this list is standard with Wave.
            </p>
            <AssessButton />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ HAVE THESE READY ═════════════════════════ */
const ready = [
  { t: "System age", d: "It's on the sticker on your outside unit." },
  { t: "What's going wrong", d: "Or why you're thinking about replacing." },
  { t: "Rough square footage", d: "A ballpark is fine." },
  { t: "Your timeline", d: "This week, this month, or before next summer." },
];

export function BeReady() {
  return (
    <section className="ready-sec" id="be-ready" aria-labelledby="be-ready-h">
      <div className="wrap" data-reveal>
        <div className="ready-head">
          <span className="kicker">Before you call</span>
          <h2 id="be-ready-h">Have These 4 Things Ready</h2>
          <p>With these handy, your call takes about 10 minutes. We&apos;ll go over your answers and set up a time to see your home.</p>
        </div>
        <ol className="ready-grid">
          {ready.map((r, i) => (
            <li key={r.t}>
              <span className="day-num">{i + 1}</span>
              <div>
                <b>{r.t}</b>
                <span>{r.d}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
