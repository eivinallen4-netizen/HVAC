/**
 * Connected step timeline. `arc` draws the replacement-day sun arc with the
 * stops riding on it; without it you get a straight stepper (used by Process).
 * Goes vertical on mobile.
 */
type Step = { t: string; d: string };

/** y on the quadratic arc M0,200 Q500,-160 1000,200 at t (0..1), as a 0..1 fraction of the arc box */
const arcY = (t: number) => (200 * (1 - t) ** 2 + 2 * t * (1 - t) * -160 + 200 * t ** 2) / 200;

export function Timeline({
  steps,
  labels,
  arc = false,
  className = "",
}: {
  steps: Step[];
  /** Optional stop labels, e.g. "Morning" … "End of day" */
  labels?: string[];
  arc?: boolean;
  className?: string;
}) {
  const n = steps.length;
  return (
    <div className={`tl${arc ? " tl-arc" : " tl-line"} ${className}`} style={{ "--n": n } as React.CSSProperties}>
      {arc && (
        <svg className="tl-sky" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="tl-sun" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="var(--amber)" />
              <stop offset="0.5" stopColor="var(--red)" />
              <stop offset="1" stopColor="var(--blue-hi)" />
            </linearGradient>
          </defs>
          <path d="M0,200 Q500,-160 1000,200" fill="none" stroke="url(#tl-sun)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeDasharray="2 7" strokeLinecap="round" />
        </svg>
      )}
      <ol className="tl-steps">
        {steps.map((s, i) => {
          const t = (i + 0.5) / n;
          return (
            <li
              className="tl-step"
              key={s.t}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms`, "--y": arc ? arcY(t).toFixed(3) : 0 } as React.CSSProperties}
            >
              <span className="tl-mark" aria-hidden="true">
                <span className="tl-dot">{i + 1}</span>
              </span>
              <div className="tl-body">
                {labels?.[i] && <span className="tl-label">{labels[i]}</span>}
                <h4>
                  <span className="sr-only">{i + 1}. </span>
                  {s.t}
                </h4>
                <p>{s.d}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
