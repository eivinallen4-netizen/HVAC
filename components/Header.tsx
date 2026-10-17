"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { CallLink } from "./Cta";
import { Icon } from "./Icon";

const links = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Wave" },
  { href: "#reviews", label: "Reviews" },
  { href: "#areas", label: "Service Areas" },
  { href: "#guides", label: "Guides" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " menu-open" : ""}`}>
      <div className="wrap hdr">
        <a className="logo" href="#top" aria-label={`${site.name} home`}>
          <Image src="/images/logo-light.png" alt={site.name} width={190} height={57} priority />
          <span className="logo-lic">NV Lic {site.license}</span>
        </a>

        <nav className="main-nav" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hdr-cta">
          <span className="status-pill hide-md">
            <i className="dot" /> Available 24/7
          </span>
          <CallLink className="btn btn-red btn-hdr" location="header">
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
  );
}
