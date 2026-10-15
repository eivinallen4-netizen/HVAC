"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { CallLink, EstimateButton } from "./Cta";
import { Icon } from "./Icon";

const links = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Wave" },
  { href: "#reviews", label: "Reviews" },
  { href: "#areas", label: "Service Areas" },
  { href: "#guides", label: "Tips" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>
            <Icon name="home" size={15} /> Family-Owned &amp; Local
          </span>
          <span>
            <Icon name="clock" size={15} /> 24/7 Service
          </span>
          <span className="hide-sm">
            <Icon name="award" size={15} /> NATE-Certified Techs
          </span>
          <span className="hide-sm">
            <Icon name="shield" size={15} /> Licensed, Bonded &amp; Insured {site.license}
          </span>
        </div>
      </div>

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap">
          <a className="logo" href="#top" aria-label={`${site.name} home`}>
            <Image src="/images/logo-dark.png" alt={site.name} width={669} height={200} priority />
          </a>

          <nav className="main-nav" aria-label="Main">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hdr-cta">
            <EstimateButton className="btn btn-navy hide-sm">Free Estimate</EstimateButton>
            <CallLink className="btn btn-red" location="header">
              <span className="hide-xs">{site.phone}</span>
            </CallLink>
            <button
              className="menu-btn"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>

        <div className={`mobile-nav${open ? " open" : ""}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
              <Icon name="chev" size={18} />
            </a>
          ))}
        </div>
      </header>
    </>
  );
}
