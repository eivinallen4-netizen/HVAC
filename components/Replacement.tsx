import Link from "next/link";
import { reviews, type IconName } from "@/lib/site";
import { EstimateButton } from "./Cta";
import { Hotspots, type Hotspot } from "./Hotspots";
import { Icon, Stars } from "./Icon";
import { SecHead } from "./Sections";
import { SignsCheck } from "./SignsCheck";
import { SystemTabs, type Part } from "./SystemTabs";
import { Timeline } from "./Timeline";

/** Hero form option that books a replacement visit */
const REPLACE = "New system / replacement estimate";

function AssessButton({ className = "btn btn-red" }: { className?: string }) {
  return (
    <EstimateButton pick={REPLACE} className={className}>
      Schedule My Assessment
    </EstimateButton>
  );
}

/* ═════════════════════════ STRAIGHT ANSWERS ═════════════════════════ */
/** What a ready-to-buy homeowner needs to hear before they trust anyone with a quote */
const promises: { icon: IconName; t: string; d: string }[] = [
  {
    icon: "search",
    t: "We diagnose before we sell",
    d: "Our techs find what's actually wrong first. If a repair will get you more good years, we'll tell you and fix it.",
  },
  {
    icon: "home",
    t: "Family-owned, not a franchise",
    d: "A local Las Vegas team with no corporate or franchise fees built into your price. The owners stand behind every install.",
  },
  {
    icon: "tag",
    t: "One written price, everything listed",
    d: "After we see your home, you get an exact written price that spells out the equipment, permit, labor, inspection and haul-away.",
  },
  {
    icon: "chat",
    t: "Bring us your other quote",
    d: "Already have a number from someone else? Show us. We'll go through it line by line so you know what you're comparing.",
  },
];

/** Editorial split: sticky headline left, large numbered promises right */
export function StraightAnswers() {
  return (
    <section className="sec" id="straight-answers">
      <div className="wrap ed">
        <div className="ed-side">
          <SecHead
            variant="side"
            kicker="Got a quote that made you sit down?"
            title="No Upsell. No Guesswork. Just Straight Answers."
            lead="A lot of Las Vegas homeowners call us after a quote that didn't add up. Here's how we work, so you know exactly what you're getting."
          />
          <div data-reveal>
            <AssessButton />
          </div>
        </div>
        <div>
          <ol className="num-rows">
            {promises.map((p, i) => (
              <li key={p.t} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="num-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>
                    <Icon name={p.icon} size={20} /> {p.t}
                  </h3>
                  <p>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="inline-note" data-reveal>
            <Icon name="tag" size={16} />
            <span>
              Want to know the monthly payment, not just the total? <b>Just ask.</b> Financing is available with approved
              credit, and we&apos;ll show you both numbers side by side.
            </span>
          </p>
        </div>
      </div>
    </section>
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

/** Interactive self-check: tap the signs, flip the age switch, the verdict slides in */
export function RepairOrReplace() {
  return (
    <section className="sec sec-alt art-sec" id="repair-or-replace">
      <div className="wrap">
        <SecHead
          kicker="Repair or replace?"
          title="Repair or Replace? We'll Tell You Honestly"
          lead="Las Vegas summers push an AC harder than almost anywhere, so systems here wear out sooner. Here are the 5 signs yours is done."
        />
        <div data-reveal>
          <SignsCheck
            signs={signs}
            ageLabel="System over 12 years old"
            note={
              <>
                <Icon name="snow" size={16} /> Older systems often run on <b>R-22 refrigerant</b>, which isn&apos;t made
                anymore. That&apos;s why every recharge costs more than the last.
              </>
            }
            verdict={
              <>
                <h3>System over 12 years old, or checked two of these?</h3>
                <p>
                  It&apos;s time to talk replacement. We&apos;ll show you the numbers and you decide, with no pressure. And if
                  a repair makes more sense, we&apos;ll tell you that too.
                </p>
                <div className="verdict-acts">
                  <AssessButton />
                  <Link className="text-link" href="/tools/repair-or-replace-calculator/">
                    Run the repair-or-replace calculator <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ HOME PROTECTION ═════════════════════════ */
/** Pins sit on the matching spot of the home cutaway illustration (% of the image) */
const protect: Hotspot[] = [
  { icon: "boot", t: "Booties on at the door", d: "Shoe covers go on before anyone on our crew steps inside your home.", x: 11, y: 58 },
  { icon: "ladder", t: "Padding under every ladder", d: "Floor padding goes down before a ladder touches your tile, wood or carpet.", x: 33, y: 82 },
  { icon: "sheet", t: "Plastic over walls, closets & beds", d: "Anything near the work gets covered, so attic dust stays in the attic.", x: 62, y: 58 },
  { icon: "broom", t: "Swept and vacuumed", d: "We clean every room we worked in before we pack up the truck.", x: 91, y: 72 },
];

export function HomeProtection() {
  const quote = reviews.find((r) => r.name === "trygg");
  return (
    <section className="sec protect-sec" id="home-protection">
      <div className="wrap">
        <SecHead
          variant="split"
          kicker="How we protect your home"
          title="We Treat Your Home Like It's Ours"
          lead="A new system shouldn't cost you a clean house. Our crew does this on every single install."
        />
        <div data-reveal>
          <Hotspots
            items={protect}
            dark="/images/illo/home-cutaway-dark.png"
            light="/images/illo/home-cutaway-light.png"
            width={1536}
            height={620}
            label="How we protect your home, step by step"
          />
        </div>
      </div>
      <div className="pull-band" data-reveal>
        <div className="wrap pull-row">
          <p className="pull-promise">
            When we leave, your home looks exactly how we found it, <span className="cool">or better.</span>
          </p>
          {quote && (
            <figure className="pull-quote">
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
const dayParts = ["Morning", "Late morning", "Midday", "Afternoon", "End of day"];

const talk = [
  "We greet you and go over the plan before we start.",
  "We show you what we find, with photos if it's up in the attic.",
  "We explain your options in plain words, and you decide.",
  "At the end, we show you how to run your new system.",
];

export function ReplacementDay() {
  return (
    <section className="sec sec-alt" id="install-day">
      <div className="wrap">
        <SecHead
          variant="split"
          kicker="Replacement day"
          title="What Replacement Day Looks Like"
          lead="Most replacements take about a full day. Here's how it goes, start to finish, so nothing catches you off guard."
        />
        <Timeline steps={day} labels={dayParts} arc />

        <div className="talk2" data-reveal>
          <div className="talk2-copy">
            <span className="ic-box tone-cool">
              <Icon name="chat" size={22} />
            </span>
            <h3>We actually talk to you</h3>
            <p>You&apos;ll always know what&apos;s happening in your home and why.</p>
            <AssessButton />
          </div>
          <div className="thread" aria-label="How we keep you in the loop">
            <ul>
              {talk.map((t, i) => (
                <li key={t} className={`bubble ${i % 2 ? "them" : "us"}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ WHAT'S INCLUDED ═════════════════════════ */
/** Callouts over the split-system illustration (% of the image) */
const parts: Part[] = [
  { id: "outdoor", label: "Outdoor unit", x: 17, y: 52 },
  { id: "line", label: "Line set", x: 38, y: 34 },
  { id: "coil", label: "Indoor coil", x: 74, y: 3 },
  { id: "furnace", label: "Furnace / air handler", x: 73, y: 60 },
  { id: "thermostat", label: "Thermostat", x: 92, y: 32 },
  { id: "drain", label: "Drain line", x: 86, y: 86 },
];

export function FullReplacement() {
  const tabs = [
    {
      tab: "Matched system",
      icon: "unit" as const,
      parts: ["outdoor", "line", "coil", "furnace", "thermostat", "drain"],
      content: (
        <>
          <h3>The whole system, matched</h3>
          <p>We replace indoor and outdoor together, so every part is matched and works as one system.</p>
          <ul className="incl-list">
            <li><Icon name="check" size={16} /> Matched indoor and outdoor units</li>
            <li><Icon name="check" size={16} /> New thermostat</li>
            <li><Icon name="check" size={16} /> Line set, drain and electrical checked</li>
            <li><Icon name="check" size={16} /> Old equipment hauled away</li>
          </ul>
          <p className="incl-note">Mixing old and new parts can wear the system out faster and cause warranty problems.</p>
        </>
      ),
    },
    {
      tab: "Sized right",
      icon: "gauge" as const,
      sizing: true,
      content: (
        <>
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
        </>
      ),
    },
    {
      tab: "Permits",
      icon: "permit" as const,
      stamp: true,
      content: (
        <>
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
        </>
      ),
    },
    {
      tab: "Safety inspection",
      icon: "shield" as const,
      parts: ["outdoor", "line", "furnace", "drain"],
      content: (
        <>
          <h3>Safety inspection before we call it done</h3>
          <p>A new system that isn&apos;t checked is a risk in your home. On every install we check:</p>
          <ul className="incl-list">
            <li><Icon name="check" size={16} /> Electrical connections and breaker sizing</li>
            <li><Icon name="check" size={16} /> Furnace gas lines and venting, plus a carbon monoxide check</li>
            <li><Icon name="check" size={16} /> Refrigerant pressures</li>
            <li><Icon name="check" size={16} /> Drain line, so there are no leaks or water damage</li>
          </ul>
          <p className="incl-note">Safety isn&apos;t an add-on with us. It&apos;s part of every job.</p>
        </>
      ),
    },
  ];
  return (
    <section className="sec art-sec" id="full-replacement">
      <div className="wrap">
        <SecHead
          kicker="What full replacement means"
          title="A Full HVAC Replacement, Not Just a New Box"
          lead="Some companies swap the outside unit and call it a new system. Here's what every Wave replacement in Las Vegas covers."
        />
        <div data-reveal>
          <SystemTabs
            tabs={tabs}
            parts={parts}
            dark="/images/illo/split-system-dark.png"
            light="/images/illo/split-system-light.png"
            width={1460}
            height={858}
            alt="Diagram of a split air conditioning system: the outdoor unit on its pad, the line set, the indoor furnace with its coil, the drain line and the thermostat"
          />
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
  "Is the price in writing, with everything listed?",
];

/** Receipt of what drives the price (no dollar amounts) + a low-quote vs Wave scorecard */
export function CompareQuotes() {
  return (
    <section className="sec" id="compare-quotes">
      <div className="wrap">
        <SecHead
          variant="split"
          kicker="Comparing quotes?"
          title="What Goes Into the Price of a New AC System"
          lead="Quotes for a new AC in Las Vegas can vary a lot. Here's what changes the price, and what to check before you compare."
        />
        <div className="cmp2">
          <div className="receipt paper" data-reveal>
            <h3>What affects the price</h3>
            <ul className="rcpt-lines">
              {priceFactors.map((f, i) => (
                <li key={f}>
                  <span className="rcpt-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="rcpt-foot">
              <Icon name="question" size={18} />
              <span>
                <b>Read online that a new AC unit only costs a few thousand dollars?</b> That&apos;s the equipment alone. An
                installed price also covers the matched indoor unit, line set, pad, electrical, permit, a full day of
                labor, the safety inspection and haul-away. Ask any company to break it out for you.
              </span>
            </p>
            <Link className="rcpt-link" href="/tools/ac-replacement-cost-estimator/">
              Get a ballpark with our cost estimator <Icon name="arrow" size={16} />
            </Link>
          </div>

          <div className="score" data-reveal style={{ transitionDelay: "80ms" }}>
            <h3>Before you take the lowest quote, check:</h3>
            <table className="score-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Check</span>
                  </th>
                  <th scope="col">Typical low quote</th>
                  <th scope="col" className="wave">Wave</th>
                </tr>
              </thead>
              <tbody>
                {quoteChecks.map((c) => (
                  <tr key={c}>
                    <th scope="row">{c}</th>
                    <td>
                      <span className="score-q" role="img" aria-label="Not always">?</span>
                    </td>
                    <td className="wave">
                      <span className="score-y" role="img" aria-label="Yes">
                        <Icon name="tick" size={16} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="compare-yes">
              <Icon name="check" size={18} /> Every item on this list is standard with Wave.
            </p>
            <p className="compare-bring">
              Already have a quote? Bring it to your assessment and we&apos;ll go through it with you line by line.
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

/** "Call prep card": an index card with four boxes to tick before you call */
export function BeReady() {
  return (
    <section className="ready-sec" id="be-ready" aria-labelledby="be-ready-h">
      <div className="wrap">
        <div className="prep paper" data-reveal>
          <span className="prep-clip" aria-hidden="true" />
          <div className="prep-head">
            <div>
              <span className="kicker">Before you call</span>
              <h2 id="be-ready-h">Have These 4 Things Ready</h2>
            </div>
            <span className="prep-badge">
              <Icon name="clock" size={15} /> ~10 min call
            </span>
          </div>
          <p className="prep-lead">
            With these handy, your call takes about 10 minutes. We&apos;ll go over your answers and set up a time to see your home.
          </p>
          <ol className="prep-rows">
            {ready.map((r) => (
              <li key={r.t}>
                <span className="prep-box" aria-hidden="true" />
                <div>
                  <b>{r.t}</b>
                  <span>{r.d}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
