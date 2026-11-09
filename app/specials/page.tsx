import Link from "next/link";
import { MemberCard } from "@/components/page/Objects";
import { PageHero } from "@/components/page/PageHero";
import { FinalCta, Reviews, SecHead, TrustBar } from "@/components/Sections";
import { OfferForm } from "@/components/SpecialForms";
import { Icon } from "@/components/Icon";
import { offers, type Offer } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HVAC Specials & Offers Las Vegas | Wave Heating & Cooling",
  description:
    "Current HVAC specials from Wave: Wave Club maintenance savings, 15% off repairs for members and referral rewards.",
  path: "/specials/",
});

/** Each offer gets its own object: membership card, perk tag or gift card */
function OfferArt({ o }: { o: Offer }) {
  if (o.icon === "gauge") return <MemberCard className="mcard-sm" />;
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
        intro="Ways to save on heating and cooling in Las Vegas — from Wave Club maintenance to member pricing on every repair."
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
              Offers can&apos;t be combined unless noted and may change at any time. See{" "}
              <Link href="/hvac-maintenance-las-vegas/">Wave Club details</Link> and our{" "}
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
