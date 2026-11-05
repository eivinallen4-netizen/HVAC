"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/track";
import { Icon } from "./Icon";

/**
 * Housecall Pro online booking, embedded inline. HCP collects the customer's details — we never do.
 * The HCP page stays blank until its host sends "hcp:open" (same handshake as HCP's own widget script),
 * and it posts "hcp:close" / "hcp:redirect" back to us.
 */
export function BookingEmbed({
  location,
  service,
  onClose,
}: {
  location: string;
  service?: string;
  onClose?: () => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLIFrameElement>(null);
  // HCP focuses its first field on "hcp:open", and the browser then scrolls the page to the iframe.
  // So we only load it once the visitor scrolls near, and only open it once it's actually on screen.
  const [near, setNear] = useState(false);
  const visible = useRef(false);
  const ready = useRef(false);

  const open = useCallback(() => {
    if (ready.current && visible.current) ref.current?.contentWindow?.postMessage("hcp:open", "*");
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          nearObs.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    const visObs = new IntersectionObserver(
      ([e]) => {
        const was = visible.current;
        visible.current = e.isIntersecting;
        if (!was && visible.current) open();
      },
      { threshold: 0.3 },
    );
    nearObs.observe(el);
    visObs.observe(el);
    return () => {
      nearObs.disconnect();
      visObs.disconnect();
    };
  }, [open]);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow) return;
      if (e.data === "hcp:iframe-loaded") {
        ready.current = true;
        open();
        track("booking_view", { location, service });
      } else if (e.data === "hcp:close") {
        onClose?.();
        open(); // keep the form showing if there's nowhere to go back to
      } else if (e.data?.type === "hcp:redirect" && typeof e.data.url === "string") {
        window.location.href = e.data.url;
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [near, open, location, service, onClose]);

  return (
    <div className="booking">
      <div className="booking-frame" ref={wrap}>
        {near && (
          <iframe
            ref={ref}
            src={site.bookingUrl}
            title={`Book with ${site.name}`}
            allow="geolocation; payment"
            // fallback in case the ready message fired before our listener attached
            onLoad={() =>
              setTimeout(() => {
                ready.current = true;
                open();
              }, 600)
            }
          />
        )}
      </div>
      <a
        className="booking-open"
        href={site.bookingUrl}
        target="_blank"
        rel="noopener"
        onClick={() => track("book_click", { location, service })}
      >
        Trouble loading? Open booking in a new tab <Icon name="arrow" size={14} />
      </a>
    </div>
  );
}

/** Button/link that sends the visitor to the Housecall Pro booking page */
export function BookNowLink({
  children = "Book Now",
  className = "btn btn-red",
  location,
  icon = true,
  newTab = false,
}: {
  children?: React.ReactNode;
  className?: string;
  location: string;
  icon?: boolean;
  newTab?: boolean;
}) {
  return (
    <a
      href={site.bookingUrl}
      className={className}
      {...(newTab ? { target: "_blank", rel: "noopener" } : {})}
      onClick={() => track("book_click", { location })}
    >
      {icon && <Icon name="cal" size={20} />}
      {children}
    </a>
  );
}
