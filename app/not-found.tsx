import Link from "next/link";
import { CallLink } from "@/components/Cta";
import { Icon } from "@/components/Icon";
import { ToolCards } from "@/components/page/Cards";
import { site } from "@/lib/site";

export const metadata = { title: "Page Not Found", robots: { index: false } };

const popular = [
  { href: "/hvac-repairs-in-las-vegas/", label: "AC Repair" },
  { href: "/emergency-ac-repair-las-vegas/", label: "Emergency AC Repair" },
  { href: "/ac-replacement-in-las-vegas/", label: "AC Replacement" },
  { href: "/hvac-heating-repair-in-las-vegas/", label: "Heating Repair" },
  { href: "/hvac-maintenance-las-vegas/", label: "Wave Club Maintenance" },
  { href: "/blog/", label: "HVAC Tips & Guides" },
  { href: "/contact/", label: "Contact Us" },
];

export default function NotFound() {
  return (
    <>
      <section className="sec thanks">
        <div className="wrap thanks-wrap">
          <div className="form-card">
            <span className="kicker">Error 404</span>
            <h1 className="form-title">We couldn&apos;t find that page</h1>
            <p className="form-hint">It may have moved when we updated our website. Try one of these instead:</p>
            <ul className="nf-links">
              {popular.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>
                    {p.label} <Icon name="chev" size={16} />
                  </Link>
                </li>
              ))}
            </ul>
            <CallLink className="btn btn-red btn-block" location="404">
              Call {site.phone}
            </CallLink>
          </div>
        </div>
      </section>
      <ToolCards alt={false} />
    </>
  );
}
