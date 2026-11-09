import { Illo } from "@/components/page/Objects";
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
        variant="compact"
      />
      <TrustBar />
      <section className="sec relay-sec">
        <div className="wrap">
          <SecHead kicker="How it works" title="Refer, We Take Care of Them, You Get Rewarded" />
          <div className="relay" data-reveal>
            <Illo name="referral-relay" w={1500} h={500} className="relay-illo" sizes="(max-width: 1040px) 100vw, 920px" />
            <ol className="relay-points">
              {referral.points.map((p, i) => (
                <li key={p.t} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="relay-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="relay-form">
            <ul className="relay-checks" data-reveal>
              <li>
                <Icon name="check" size={18} /> No limit on referrals
              </li>
              <li>
                <Icon name="check" size={18} /> Rewards after completed service
              </li>
            </ul>
            <div className="offers-form">
              <ReferralForm />
            </div>
          </div>
        </div>
      </section>
      <Reviews variant="ticker" alt />
      <FinalCta />
    </>
  );
}
