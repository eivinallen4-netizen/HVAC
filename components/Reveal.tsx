"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Adds a gentle fade-up to any element with [data-reveal] as it scrolls into view. Re-runs on client navigation. */
export function RevealOnScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          // reveal when visible — or if the user already scrolled past it (fast scroll / anchor jump)
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
