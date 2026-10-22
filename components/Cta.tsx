"use client";

import { site } from "@/lib/site";
import { estimateHref, openEstimate, track } from "@/lib/track";
import { Icon } from "./Icon";

/** Scrolls to the page's estimate form (preselecting a service), or links to /contact/ if there isn't one */
export function EstimateButton({
  children,
  pick,
  className = "btn btn-red",
  icon = "cal",
}: {
  children: React.ReactNode;
  pick?: string;
  className?: string;
  icon?: "cal" | "arrow" | null;
}) {
  return (
    <a
      href={estimateHref(pick)}
      className={className}
      onClick={(e) => {
        if (openEstimate(pick)) e.preventDefault();
      }}
    >
      {icon === "cal" && <Icon name="cal" size={20} />}
      {children}
      {icon === "arrow" && <Icon name="arrow" size={18} className="arr" />}
    </a>
  );
}

/** Click-to-call link with tracking */
export function CallLink({
  children,
  className,
  location,
  icon = true,
}: {
  children?: React.ReactNode;
  className?: string;
  location: string;
  icon?: boolean;
}) {
  return (
    <a
      href={site.phoneHref}
      className={className}
      onClick={() => track("phone_click", { location })}
    >
      {icon && <Icon name="phone" size={20} />}
      {children ?? site.phone}
    </a>
  );
}

/** Text-message link with tracking */
export function TextLink({
  children,
  className,
  location,
}: {
  children?: React.ReactNode;
  className?: string;
  location: string;
}) {
  return (
    <a href={site.smsHref} className={className} onClick={() => track("sms_click", { location })}>
      <Icon name="chat" size={20} />
      {children ?? "Text Us"}
    </a>
  );
}
