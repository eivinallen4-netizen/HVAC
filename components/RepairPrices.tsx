import { fees, priceList, type PriceKey } from "@/lib/estimate/config";
import { priceText } from "@/lib/estimate/logic";
import { CallLink, EstimateButton } from "./Cta";
import { type IconName } from "@/lib/site";
import { Icon } from "./Icon";
import { SecHead } from "./Sections";

/** The repairs Wave's techs fix most, in the order people search for them. Prices come from lib/estimate/config.ts. */
const common: PriceKey[] = ["capacitor", "contactor", "condenserFanMotor", "drainLine", "thermostatBasic", "igniter"];

const terms: { icon: IconName; b: string; t: string }[] = [
  {
    icon: "check",
    b: "Say yes during a weekday visit",
    t: `(Mon–Fri, 7am–6pm) and the $${fees.diagnostic} is waived. You pay for the repair only.`,
  },
  { icon: "tag", b: "Say no", t: `and the $${fees.diagnostic} diagnostic is all you pay.` },
  { icon: "clock", b: "Same-day visits", t: "in most of the valley, with no after-hours, weekend or holiday surcharge." },
  { icon: "wrench", b: "Parts on the van", t: "Most repairs are done on the first visit." },
];

/** Homepage, right under the hero: real repair prices so price is answered before anyone has to call. */
export function RepairPrices() {
  return (
    <section className="sec sec-alt" id="repair-prices">
      <div className="wrap">
        <SecHead
          variant="split"
          kicker="Repair prices, up front"
          title="Know the Price Before We Touch Anything"
          lead="These are Wave's real prices, parts and labor included, no sales tax added. Your tech confirms the exact number before any work starts."
        />
        <div className="cmp2 rp-grid">
          <div className="receipt paper" data-reveal>
            <h3>Common repairs</h3>
            <ul className="rcpt-lines rp-lines">
              {common.map((k) => (
                <li key={k}>
                  <span>{priceList[k].label}</span>
                  <b>{priceText(priceList[k].price)}</b>
                </li>
              ))}
            </ul>
            <p className="rcpt-foot">
              <Icon name="question" size={18} />
              <span>
                <b>Not sure what&apos;s wrong?</b> Answer a few taps and see the likely causes and price range for your
                problem.
              </span>
            </p>
          </div>

          <div className="score rp-terms" data-reveal style={{ transitionDelay: "80ms" }}>
            <span className="rp-fee">
              ${fees.diagnostic} <small>diagnostic visit</small>
            </span>
            <ul className="rp-list">
              {terms.map((t) => (
                <li key={t.b}>
                  <Icon name={t.icon} size={18} />
                  <span>
                    <b>{t.b}</b> {t.t}
                  </span>
                </li>
              ))}
            </ul>
            <div className="rp-acts">
              <EstimateButton pick="Repair" icon="arrow">
                See My Repair Price
              </EstimateButton>
              <CallLink className="btn btn-ghost" location="repair-prices" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
