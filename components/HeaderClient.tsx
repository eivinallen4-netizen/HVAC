"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { pages, site } from "@/lib/site";
import { CallLink } from "./Cta";
import { Icon } from "./Icon";

export type NavItem = { href: string; label: string };
export type NavMenu = { label: string; href: string; groups?: { title: string; href?: string; items: NavItem[] }[] };

export function HeaderClient({ menus }: { menus: NavMenu[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on navigation
  useEffect(() => {
    setOpen(false);
    setSub(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (m: NavMenu) =>
    pathname === m.href || m.groups?.some((g) => g.items.some((i) => i.href === pathname) || g.href === pathname);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " menu-open" : ""}`}>
      <div className="wrap hdr">
        <Link className="logo" href="/" aria-label={`${site.name} home`}>
          <Image src="/images/logo-light.png" alt={site.name} width={190} height={57} priority />
          <span className="logo-lic">NV Lic {site.license}</span>
        </Link>

        <nav className="main-nav" aria-label="Main">
          {menus.map((m) =>
            m.groups ? (
              <div
                className={`nav-dd${sub === m.label ? " open" : ""}`}
                key={m.label}
                onMouseEnter={() => setSub(m.label)}
                onMouseLeave={() => setSub(null)}
              >
                <Link
                  href={m.href}
                  className={isActive(m) ? "active" : undefined}
                  aria-haspopup="true"
                  aria-expanded={sub === m.label}
                  onFocus={() => setSub(m.label)}
                >
                  {m.label} <Icon name="chev" size={13} className="dd-chev" />
                </Link>
                <div className={`dd-panel${m.groups.length > 1 ? " wide" : ""}`} onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setSub(null);
                }}>
                  {m.groups.map((g) => (
                    <div className="dd-group" key={g.title}>
                      {g.href ? (
                        <Link href={g.href} className="dd-title">
                          {g.title}
                        </Link>
                      ) : (
                        <span className="dd-title">{g.title}</span>
                      )}
                      {g.items.map((i) => (
                        <Link key={i.href} href={i.href} aria-current={pathname === i.href ? "page" : undefined}>
                          {i.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={m.label} href={m.href} className={isActive(m) ? "active" : undefined}>
                {m.label}
              </Link>
            )
          )}
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
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <div className={`mobile-nav${open ? " open" : ""}`} id="mobile-nav">
        {menus.map((m) =>
          m.groups ? (
            <div className={`m-group${sub === m.label ? " open" : ""}`} key={m.label}>
              <button type="button" aria-expanded={sub === m.label} onClick={() => setSub(sub === m.label ? null : m.label)}>
                {m.label}
                <Icon name="chev" size={18} />
              </button>
              <div className="m-sub">
                {m.groups.map((g) => (
                  <div key={g.title}>
                    {g.href ? <Link href={g.href} className="m-title">{g.title}</Link> : <span className="m-title">{g.title}</span>}
                    {g.items.map((i) => (
                      <Link key={i.href} href={i.href}>
                        {i.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Link key={m.label} href={m.href}>
              {m.label}
              <Icon name="chev" size={18} />
            </Link>
          )
        )}
        <Link href={pages.contact} className="btn btn-red btn-block m-cta">
          Get a Free Estimate
        </Link>
      </div>
    </header>
  );
}
