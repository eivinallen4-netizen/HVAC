import { CtaBand } from "@/components/page/Cards";
import { PageHero } from "@/components/page/PageHero";
import { FinalCta, Reviews, SecHead, TrustBar } from "@/components/Sections";
import { GoogleG, Icon, Stars } from "@/components/Icon";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Reviews | Wave Heating & Cooling Las Vegas | 5.0 on Google",
  description:
    "See why Las Vegas homeowners rate Wave Heating & Cooling 5.0 on Google and Facebook. Honest, family-owned HVAC service with NATE-certified techs.",
  path: "/reviews/",
});

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Reviews", path: "/reviews/" }]}
        kicker="Real local voices"
        h1="What Our Customers Say"
        intro="We earn our reputation one home at a time. Here's what Las Vegas homeowners say about working with Wave — and you can read every review on Google."
        form={false}
      >
        <div className="ratings">
          {site.ratings.map((r) => (
            <div className="rating" key={r.platform}>
              <b>
                {r.score} <Icon name="star" size={14} filled />
              </b>
              <span>{r.platform}</span>
            </div>
          ))}
        </div>
      </PageHero>
      <TrustBar />
      <Reviews title="Recent Google Reviews" />

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead
            kicker="Already a customer?"
            title="Tell Your Neighbors About Wave"
            lead="Reviews help other Las Vegas families find an HVAC company they can trust. It takes about a minute — thank you!"
          />
          <div className="center-cta" data-reveal>
            <a className="btn btn-red" href={site.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <GoogleG size={18} /> Leave a Google Review
            </a>
            <a className="btn btn-ghost" href="https://www.facebook.com/waveheatingandcooling" target="_blank" rel="noopener noreferrer">
              <Stars size={13} /> Review us on Facebook
            </a>
          </div>
        </div>
      </section>

      <CtaBand title="Ready to See for Yourself?" />
      <FinalCta />
    </>
  );
}
