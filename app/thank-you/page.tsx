import Link from "next/link";
import { CallLink } from "@/components/Cta";
import { Icon } from "@/components/Icon";
import { ToolCards } from "@/components/page/Cards";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/** Conversion page — noindex. Point Google Ads / GA4 "lead" conversions at this URL (or the generate_lead event). */
export const metadata = buildMetadata({
  title: "Thank You | Wave Heating & Cooling",
  description: "Thanks for contacting Wave Heating & Cooling. Your booking is in.",
  path: "/thank-you/",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <section className="sec thanks">
        <div className="wrap thanks-wrap">
          <div className="form-card success">
            <div className="success-ic">
              <Icon name="tick" size={34} />
            </div>
            <h1>You&apos;re all set!</h1>
            <p>
              Thanks — we got your request. A Wave team member will call you shortly to confirm the details and find a time that
              works for you.
            </p>
            <ol className="thanks-steps">
              <li>
                <Icon name="phone" size={18} /> Keep your phone handy — we&apos;ll call from {site.phone}.
              </li>
              <li>
                <Icon name="cal" size={18} /> We&apos;ll confirm your appointment window.
              </li>
              <li>
                <Icon name="wrench" size={18} /> Your Wave tech arrives, diagnoses and explains your options.
              </li>
            </ol>
            <CallLink className="btn btn-red btn-block" location="thank-you">
              Need us now? Call {site.phone}
            </CallLink>
            <Link href="/" className="text-link">
              Back to home <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>
      <ToolCards title="While You Wait — Free Homeowner Tools" lead="" alt={false} />
    </>
  );
}
