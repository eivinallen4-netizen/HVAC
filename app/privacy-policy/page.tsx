import { PageHero } from "@/components/page/PageHero";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy | Wave Heating & Cooling",
  description: "How Wave Heating & Cooling collects, uses and protects the information you share on our website.",
  path: "/privacy-policy/",
});

const updated = "October 21, 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy Policy", path: "/privacy-policy/" }]} kicker="Legal" h1="Privacy Policy" form={false} intro={`Last updated ${updated}`} />
      <section className="sec">
        <div className="wrap prose-wrap legal-prose">
          <p>
            {site.legalName} (&quot;Wave,&quot; &quot;we,&quot; &quot;us&quot;) respects your privacy. This policy explains what
            information we collect through {site.url.replace("https://", "")} (the &quot;Site&quot;), how we use it and the
            choices you have.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Information you give us</strong> — such as your name, phone number, email, ZIP code, service needs, messages
              and answers you enter into our calculators and forms.
            </li>
            <li>
              <strong>Referral information</strong> — if you refer someone, the name, phone and ZIP code you provide for them.
            </li>
            <li>
              <strong>Automatically collected information</strong> — such as pages viewed, referring website, approximate location,
              device and browser type, and advertising identifiers (e.g. UTM parameters, Google click ID, Meta click ID), collected
              through cookies and similar technologies.
            </li>
          </ul>

          <h2>How we use information</h2>
          <ul>
            <li>To respond to your request, schedule service and provide estimates.</li>
            <li>To call or text you about your request, appointments and service (see &quot;Calls and text messages&quot; below).</li>
            <li>To send you calculator results you request.</li>
            <li>To measure and improve our website and advertising.</li>
            <li>To comply with law and protect our rights.</li>
          </ul>

          <h2>Calls and text messages</h2>
          <p>
            By submitting a form on the Site, you agree that Wave may contact you at the phone number you provide, including by
            call and text message, and including by automated means, regarding your request and our services. Consent is not a
            condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out of text
            messages at any time, or HELP for help. You can also call us at {site.phone} to opt out.
          </p>

          <h2>How we share information</h2>
          <p>We do not sell your personal information. We share it only with:</p>
          <ul>
            <li>
              <strong>Service providers</strong> who help us run our business, such as our field-service and customer management
              software (Housecall Pro), website hosting, analytics and communication providers. They may use your information only
              to provide services to us.
            </li>
            <li>
              <strong>Advertising and analytics partners</strong> such as Google and Meta, which may use cookies to measure ad
              performance.
            </li>
            <li>
              <strong>Financing partners</strong>, only if you choose to apply for financing.
            </li>
            <li>When required by law or to protect rights and safety.</li>
          </ul>

          <h2>Cookies and analytics</h2>
          <p>
            We use cookies and similar technologies (including Google Tag Manager and Google Analytics) to understand how visitors
            use the Site and to measure advertising. You can control cookies through your browser settings, and opt out of Google
            Analytics with Google&apos;s browser add-on.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You may request access to, correction of or deletion of the personal information we hold about you by contacting us
            below. Nevada residents may submit a request directing us not to sell certain covered information; we do not sell
            covered information, but you may still contact us with such a request.
          </p>

          <h2>Data security and retention</h2>
          <p>
            We use reasonable safeguards to protect your information and keep it only as long as needed for the purposes above,
            including keeping service records for your home.
          </p>

          <h2>Children</h2>
          <p>The Site is not directed to children under 13, and we do not knowingly collect their information.</p>

          <h2>Changes</h2>
          <p>We may update this policy from time to time. The &quot;Last updated&quot; date shows when it last changed.</p>

          <h2>Contact us</h2>
          <p>
            {site.legalName}
            <br />
            {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}
            <br />
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>
      </section>
    </>
  );
}
