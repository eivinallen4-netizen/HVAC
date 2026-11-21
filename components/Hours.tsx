import { openLabel } from "@/lib/hours";

/** Open status for the top bar. Wave is open 24/7, so it's always "open". */
export function OpenNow({ className = "" }: { className?: string }) {
  return (
    <span className={`open-now is-open ${className}`}>
      <i className="open-dot" aria-hidden="true" />
      {openLabel}
    </span>
  );
}
