import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { FinalCta, Reviews, SecHead, TrustBar } from "@/components/Sections";
import { OfferForm } from "@/components/SpecialForms";
import { Icon } from "@/components/Icon";
import { offers, type Offer } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HVAC Specials & Offers Las Vegas | Wave Heating & Cooling",
  description:
    "Wave Heating & Cooling's referral program: unlimited referrals, with rewards for you and the friend you refer — redeem at your next service or as a gift card.",
  path: "/specials/",
});

/** Each offer gets its own object: perk tag or gift card */
function OfferArt({ o }: { o: Offer }) {
  if (o.icon === "star")
    return (
      <span className="gift-card" aria-hidden="true">
        <span className="gift-ribbon" />
        <Icon name="star" size={26} />
      </span>
    );
  return (
    <span className="perk-tag" aria-hidden="true">
      <span className="perk-hole" />
      <Icon name={o.icon} size={26} />
    </span>
  );
}

export default function SpecialsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Specials", path: "/specials/" }]}
        kicker="Current offers"
        h1="HVAC Specials & Savings"
        intro="No coupons or gimmicks — just honest pricing and a thank-you for every friend and neighbor you send our way."
        form={false}
        variant="compact"
      />
      <TrustBar />
      <section className="sec">
        <div className="wrap offers-desk">
          <div>
            <SecHead kicker="Save with Wave" title="Current Offers" variant="left" />
            <ul className="offer-objs">
              {offers.map((o, i) => (
                <li className={`offer-obj ob-${o.icon}`} key={o.title} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="offer-art">
                    <OfferArt o={o} />
                  </div>
                  <div className="offer-copy">
                    <span className="offer-val">{o.value}</span>
                    <h3>{o.title}</h3>
                    <p>{o.text}</p>
                    <small>{o.fine}</small>
                  </div>
                </li>
              ))}
            </ul>
            <p className="table-note">
              Offers may change at any time. See the full{" "}
              <Link href="/referral-program/">referral program</Link>.
            </p>
          </div>
          <div className="offers-form">
            <OfferForm offers={offers.map((o) => o.title)} />
          </div>
        </div>
      </section>
      <Reviews variant="ticker" alt />
      <FinalCta />
    </>
  );
}
