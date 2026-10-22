import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { FinalCta, Reviews, SecHead, TrustBar } from "@/components/Sections";
import { OfferForm } from "@/components/SpecialForms";
import { Icon } from "@/components/Icon";
import { offers } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HVAC Specials & Offers Las Vegas | Wave Heating & Cooling",
  description:
    "Current HVAC specials from Wave: free estimates on new systems, Wave Club maintenance savings, 15% off repairs for members and referral rewards.",
  path: "/specials/",
});

export default function SpecialsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Specials", path: "/specials/" }]}
        kicker="Current offers"
        h1="HVAC Specials & Savings"
        intro="Ways to save on heating and cooling in Las Vegas — from free estimates on new systems to member pricing on every repair."
        form={false}
      />
      <TrustBar />
      <section className="sec">
        <div className="wrap offers-layout">
          <div>
            <SecHead kicker="Save with Wave" title="Current Offers" center={false} />
            <div className="offers">
              {offers.map((o, i) => (
                <div className="card offer" key={o.title} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="offer-val">{o.value}</span>
                  <div>
                    <h3>
                      <Icon name={o.icon} size={18} /> {o.title}
                    </h3>
                    <p>{o.text}</p>
                    <small>{o.fine}</small>
                  </div>
                </div>
              ))}
            </div>
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
      <Reviews />
      <FinalCta />
    </>
  );
}
