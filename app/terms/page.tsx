import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Terms of Service | Wave Heating & Cooling",
  description: "Terms of use for the Wave Heating & Cooling website, online tools and offers.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Terms of Service", path: "/terms/" }]} kicker="Legal" h1="Terms of Service" form={false} intro="Last updated October 21, 2026" />
      <section className="sec">
        <div className="wrap prose-wrap legal-prose">
          <p>
            By using the {site.name} website (the &quot;Site&quot;), you agree to these terms. If you don&apos;t agree, please
            don&apos;t use the Site.
          </p>

          <h2>Information only — not a quote</h2>
          <p>
            Content on the Site, including articles and the results of our online calculators (such as the Repair or Replace
            Calculator, AC Replacement Cost Estimator, AC Symptom Checker and Summer Bill Savings Calculator), is general
            information and an estimate only. It is not a quote, diagnosis, guarantee of savings or professional advice for your
            specific home. Actual diagnoses, pricing and savings depend on an in-person evaluation. Written estimates from Wave
            govern any work performed.
          </p>

          <h2>Safety</h2>
          <p>
            Do not attempt electrical, gas or refrigerant work yourself. If you smell gas, leave the home and call your gas
            utility or 911. Any &quot;do it yourself&quot; checks on the Site are limited to simple, safe steps such as checking
            filters, breakers and thermostat settings.
          </p>

          <h2>Offers and pricing</h2>
          <p>
            Specials, memberships and offers are subject to the terms stated with each offer, may change or end at any time, and
            can&apos;t be combined unless stated. Financing is subject to credit approval by the lender.
          </p>

          <h2>Communications</h2>
          <p>
            When you submit a form, you agree to be contacted as described in our <Link href="/privacy-policy/">Privacy Policy</Link>.
          </p>

          <h2>Intellectual property</h2>
          <p>The Site&apos;s content, logos, photos and design belong to {site.legalName} and may not be copied without permission.</p>

          <h2>Limitation of liability</h2>
          <p>
            The Site is provided &quot;as is.&quot; To the fullest extent permitted by law, {site.legalName} is not liable for any
            damages arising from your use of the Site or reliance on its content.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the State of Nevada.</p>

          <h2>Contact</h2>
          <p>
            Questions? Call <a href={site.phoneHref}>{site.phone}</a> or visit our <Link href="/contact/">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
