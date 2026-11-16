"use client";

import { useEffect, useState } from "react";
import { closesLabel, openStatus, opensLabel, type OpenStatus } from "@/lib/hours";
import { site } from "@/lib/site";

/** Live open/closed status on Las Vegas time. Renders the neutral hours line on the server, then the live status after mount. */
function useOpenStatus() {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  useEffect(() => {
    const tick = () => setStatus(openStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}

export function OpenNow({ className = "" }: { className?: string }) {
  const status = useOpenStatus();
  const state = status ? (status.open ? "is-open" : "is-closed") : "";
  return (
    <span className={`open-now ${state} ${className}`} aria-live="polite">
      <i className="open-dot" aria-hidden="true" />
      {status ? status.label : `Open daily ${opensLabel} – ${closesLabel}`}
    </span>
  );
}

const short = (d: string) => d.slice(0, 3);

/** Day-by-day hours table, today highlighted */
export function HoursPanel() {
  const status = useOpenStatus();
  return (
    <div className="hours-panel">
      <div className="hours-head">
        <b>Service hours</b>
        <OpenNow />
      </div>
      <ul className="hours-list">
        {site.openingHours.days.map((d) => (
          <li key={d} className={status?.day === d ? "is-today" : undefined}>
            <span>
              {short(d)}
              {status?.day === d && <em>Today</em>}
            </span>
            <span className="hours-time">
              {opensLabel} – {closesLabel}
            </span>
          </li>
        ))}
      </ul>
      <p className="hours-note">Same hours on weekends and holidays. No after-hours surcharge.</p>
    </div>
  );
}
