import Image from "next/image";
import type { Crumb } from "@/lib/seo";
import { site } from "@/lib/site";
import { Embers, Frost } from "../Art";
import { CallLink, TextLink } from "../Cta";
import { Icon } from "../Icon";
import { HeroLeadForm } from "../LeadForm";
import { Breadcrumbs } from "./Breadcrumbs";

/**
 * Inner-page hero: breadcrumbs, H1, intro, highlights, call buttons and
 * (optionally) the 2-step estimate form on the right.
 */
export function PageHero({
  crumbs,
  kicker,
  h1,
  intro,
  highlights,
  img = "/images/hero-dusk.jpg",
  form = true,
  formTitle,
  emergency = false,
  children,
}: {
  crumbs: Crumb[];
  kicker: string;
  h1: string;
  intro?: string;
  highlights?: string[];
  img?: string;
  form?: boolean;
  formTitle?: string;
  emergency?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={`phero${form ? "" : " phero-solo"}`}>
      <Image src={img} alt="" fill priority sizes="100vw" className="hero-bg" />
      <div className="hero-shade" aria-hidden="true" />
      <Embers count={14} className="hero-embers" seed={5} />
      <Frost count={8} className="hero-frost" seed={6} />
      <div className="wrap">
        <Breadcrumbs crumbs={crumbs} />
        <div className="phero-grid">
          <div className="phero-copy">
            <span className={`chip${emergency ? " chip-warm" : ""}`}>
              <Icon name={emergency ? "clock" : "sun"} size={15} /> {kicker}
            </span>
            <h1>{h1}</h1>
            {intro && <p className="hero-sub">{intro}</p>}
            {highlights && (
              <ul className="hero-checks">
                {highlights.map((h) => (
                  <li key={h}>
                    <Icon name="check" size={18} /> {h}
                  </li>
                ))}
              </ul>
            )}
            <div className="phero-acts">
              <CallLink className="btn btn-red" location="page-hero">
                Call {site.phone}
              </CallLink>
              <TextLink className="btn btn-ghost" location="page-hero">
                Text Us
              </TextLink>
            </div>
            {children}
          </div>
          {form && (
            <div className="hero-form">
              <HeroLeadForm title={formTitle} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
