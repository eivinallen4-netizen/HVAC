"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ctaKey, ctas, type CtaKey } from "@/lib/ctas";
import { closesLabel, opensLabel } from "@/lib/hours";
import { ENGAGED_KEY, track } from "@/lib/track";
import { BookNowLink } from "./Booking";
import { CallLink, NoThanks } from "./Cta";
import { Icon } from "./Icon";

const SHOWN_KEY = "wave:exit-shown";
/** Seconds on the page before the popup can appear */
const ARM_AFTER_MS = 8000;
/** Mobile: must have scrolled this far down the page first */
const MIN_DEPTH = 0.4;
/** Mobile: upward flick speed (px per ms) that counts as "leaving" */
const FLICK_SPEED = 1.2;
const SKIP_PATHS = ["/thank-you", "/contact"];

const headings: Record<CtaKey, string> = {
  repair: "Still dealing with a broken AC?",
  heat: "Still dealing with no heat?",
  replace: "Still uncomfortable at home?",
  ductless: "Still have rooms that won't cool?",
  tuneup: "Want your system checked before it quits?",
  air: "Still breathing dusty air?",
};

const getFlag = (k: string) => {
  try {
    return sessionStorage.getItem(k) === "1";
  } catch {
    return false;
  }
};
const setFlag = (k: string) => {
  try {
    sessionStorage.setItem(k, "1");
  } catch {}
};

/**
 * One-time "before you go" popup. Desktop: mouse leaves through the top of the window.
 * Phones: a fast upward flick after reading part of the page. Once per session, never after
 * the visitor has booked, called or texted, and never on /contact or /thank-you.
 * `picks` maps a service-page slug to its estimate pick so the copy matches the page.
 */
export function ExitOffer({ picks }: { picks: Record<string, string> }) {
  const pathname = usePathname() || "/";
  const ref = useRef<HTMLDialogElement>(null);
  const slug = pathname.split("/").filter(Boolean)[0] ?? "";
  const key = ctaKey(picks[slug] ?? (slug.includes("heat") ? "heat" : undefined));
  const [pick, setPick] = useState<CtaKey>(key);
  const skip = SKIP_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (skip || getFlag(SHOWN_KEY)) return;
    let armed = false;
    const armTimer = window.setTimeout(() => (armed = true), ARM_AFTER_MS);

    const open = () => {
      const d = ref.current;
      if (!armed || !d || d.open || getFlag(SHOWN_KEY) || getFlag(ENGAGED_KEY)) return;
      // Don't interrupt the open mobile menu or another dialog
      if (document.querySelector(".mobile-nav.open, dialog[open]")) return;
      setPick(key);
      setFlag(SHOWN_KEY);
      d.showModal();
      track("exit_offer_shown", { page: pathname, offer: key });
      cleanup();
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) open();
    };

    let lastY = window.scrollY;
    let lastT = performance.now();
    let deepest = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) deepest = Math.max(deepest, y / max);
      const speed = (lastY - y) / Math.max(t - lastT, 1);
      // Never over the hero: a jump back to the top (e.g. "back to top") isn't someone leaving
      if (deepest >= MIN_DEPTH && speed > FLICK_SPEED && y > window.innerHeight) open();
      lastY = y;
      lastT = t;
    };

    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (touch) window.addEventListener("scroll", onScroll, { passive: true });
    else document.addEventListener("mouseout", onMouseOut);

    function cleanup() {
      window.clearTimeout(armTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    }
    return cleanup;
  }, [skip, key, pathname]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      className="exit-offer"
      aria-labelledby="exit-offer-title"
      onClick={(e) => {
        // Click on the backdrop (outside the panel) closes it
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="exit-panel">
        <button type="button" className="exit-x" aria-label="Close" onClick={close}>
          <Icon name="close" size={20} />
        </button>
        <span className="kicker">Before you go</span>
        <h2 id="exit-offer-title">{headings[pick]}</h2>
        <p>
          Same-day service most of the time, {opensLabel}–{closesLabel} every day. Book online in about a minute, or
          call us.
        </p>
        <div className="exit-acts" onClickCapture={() => track("exit_offer_click", { offer: pick })}>
          <BookNowLink className="btn btn-red btn-lg" location="exit-offer" pick={pick}>
            {/* Say exactly what tapping does */}
            {ctas[pick].cta}
          </BookNowLink>
          <CallLink className="btn btn-ghost btn-lg" location="exit-offer" />
        </div>
        <NoThanks
          pick={pick}
          location="exit-offer"
          onClick={() => {
            track("exit_offer_declined", { offer: pick });
            close();
          }}
        />
      </div>
    </dialog>
  );
}
