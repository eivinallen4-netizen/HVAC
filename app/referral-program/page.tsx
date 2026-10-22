import { PageHero } from "@/components/page/PageHero";
import { FinalCta, Reviews, SecHead, TrustBar } from "@/components/Sections";
import { ReferralForm } from "@/components/SpecialForms";
import { Icon } from "@/components/Icon";
import { referral } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Referral Program | Wave Heating & Cooling Las Vegas",
  description:
    "Refer friends and family to Wave Heating & Cooling and get rewarded. Unlimited referrals, easy redemption at your next service or as a gift card.",
  path: "/referral-program/",
});

export default function ReferralPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Referral Program", path: "/referral-program/" }]}
        kicker="Referral program"
        h1={referral.headline}
        intro="Most of our business comes from happy customers telling their friends and neighbors. When you refer someone to Wave, we say thank you with a reward."
        form={false}
      />
      <TrustBar />
      <section className="sec">
        <div className="wrap offers-layout">
          <div>
            <SecHead kicker="How it works" title="Refer, We Take Care of Them, You Get Rewarded" center={false} />
            <ol className="ref-steps">
              {referral.points.map((p, i) => (
                <li className="card" key={p.t} data-reveal>
                  <span className="step-num">{i + 1}</span>
                  <div>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ul className="inline-checks">
              <li>
                <Icon name="check" size={16} /> No limit on referrals
              </li>
              <li>
                <Icon name="check" size={16} /> Rewards after completed service
              </li>
            </ul>
          </div>
          <div className="offers-form">
            <ReferralForm />
          </div>
        </div>
      </section>
      <Reviews />
      <FinalCta />
    </>
  );
}
