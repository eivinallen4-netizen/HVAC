import Image from "next/image";
import { CtaBand } from "@/components/page/Cards";
import { PageHero } from "@/components/page/PageHero";
import { FinalCta, RatingsRow, Reviews, TrustBar } from "@/components/Sections";
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
        variant="split"
        img="/images/family.jpg"
      >
        <RatingsRow />
      </PageHero>
      <TrustBar />
      <Reviews title="Recent Google Reviews" variant="wall" />

      <section className="sec sec-alt postcard-sec">
        <div className="wrap">
          <div className="postcard paper" data-reveal>
            <div className="pc-art">
              <Image src="/images/illo/postcard-street.png" alt="" width={1200} height={800} sizes="(max-width: 860px) 100vw, 520px" />
            </div>
            <div className="pc-copy">
              <span className="pc-stamp" aria-hidden="true">
                <Icon name="star" size={22} />
              </span>
              <span className="kicker">Already a customer?</span>
              <h2>Tell Your Neighbors About Wave</h2>
              <p className="lead">
                Reviews help other Las Vegas families find an HVAC company they can trust. It takes about a minute — thank you!
              </p>
              <div className="pc-acts">
                <a className="btn btn-red" href={site.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <GoogleG size={18} /> Leave a Google Review
                </a>
                <a className="btn btn-ghost pc-ghost" href="https://www.facebook.com/waveheatingandcooling" target="_blank" rel="noopener noreferrer">
                  <Stars size={13} /> Review us on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Ready to See for Yourself?" tone="cool" />
      <FinalCta />
    </>
  );
}
