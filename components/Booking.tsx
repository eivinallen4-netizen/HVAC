"use client";

import { useEffect, useRef } from "react";
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
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    const open = () => frame.contentWindow?.postMessage("hcp:open", "*");
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow) return;
      if (e.data === "hcp:iframe-loaded") {
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
  }, [location, service, onClose]);

  return (
    <div className="booking">
      <div className="booking-frame">
        <iframe
          ref={ref}
          src={site.bookingUrl}
          title={`Book with ${site.name}`}
          allow="geolocation; payment"
          // fallback in case the ready message fired before our listener attached
          onLoad={() => setTimeout(() => ref.current?.contentWindow?.postMessage("hcp:open", "*"), 600)}
        />
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
