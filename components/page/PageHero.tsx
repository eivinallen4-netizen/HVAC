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
  variant = "photo",
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
  /**
   * photo: full-bleed photo behind the copy (service & area pages) ·
   * split: no form, the real photo framed on the right behind a diagonal edge (company pages) ·
   * compact: short, no image (tools, legal, FAQ)
   */
  variant?: "photo" | "split" | "compact";
  children?: React.ReactNode;
}) {
  if (variant === "split" || variant === "compact") {
    return (
      <section className={`phero phero-${variant}`}>
        {variant === "split" && (
          <div className="phero-frame" aria-hidden="true">
            <Image src={img} alt="" fill priority sizes="(max-width: 860px) 100vw, 46vw" />
          </div>
        )}
        <Frost count={6} className="hero-frost" seed={7} />
        <div className="wrap">
          <Breadcrumbs crumbs={crumbs} />
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
        </div>
      </section>
    );
  }
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
