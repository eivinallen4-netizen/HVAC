"use client";

import { site } from "@/lib/site";
import { openEstimate, track } from "@/lib/track";
import { Icon } from "./Icon";

/** Button/link that scrolls to the hero form (and can preselect a service) */
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
      href="#estimate"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        openEstimate(pick);
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
