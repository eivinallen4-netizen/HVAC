"use client";

type DL = Record<string, unknown>[];
declare global {
  interface Window {
    dataLayer?: DL;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
  if (event === "generate_lead") window.fbq?.("track", "Lead");
}

/** Ad / UTM attribution captured from the landing URL */
export function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid"].forEach((k) => {
    const v = p.get(k);
    if (v) out[k] = v;
  });
  out.landing_page = window.location.href.split("#")[0];
  out.referrer = document.referrer || "";
  return out;
}

export const PICK_EVENT = "wave:pick-service";

/** URL of the contact page with an optional preselected service */
export const estimateHref = (service?: string) =>
  `/contact/${service ? `?service=${encodeURIComponent(service)}` : ""}#estimate`;

/**
 * Scroll to the page's estimate form (optionally preselecting a service).
 * Returns false when the page has no form, so the caller can navigate to /contact/.
 */
export function openEstimate(service?: string): boolean {
  const card = document.getElementById("estimate");
  if (!card) return false;
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  if (service) window.dispatchEvent(new CustomEvent(PICK_EVENT, { detail: service }));
  return true;
}
