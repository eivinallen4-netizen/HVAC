"use client";

import { useState } from "react";
import type { IconName } from "@/lib/site";
import { Icon } from "./Icon";

type Sign = { icon?: IconName; t: string; d: string };

/** Row content shared by the interactive and list modes */
function Row({ s, i }: { s: Sign; i: number }) {
  return (
    <>
      <span className="sc-box" aria-hidden="true">
        <Icon name="tick" size={16} className="sc-tick" />
        <span className="sc-n">{String(i + 1).padStart(2, "0")}</span>
      </span>
      <span className="sc-copy">
        <b>{s.t}</b>
        <span>{s.d}</span>
      </span>
      {s.icon && (
        <span className="sc-ic" aria-hidden="true">
          <Icon name={s.icon} size={20} />
        </span>
      )}
    </>
  );
}

/**
 * "Sound familiar?" self-check. Interactive mode: tap rows, flip the age switch,
 * watch the gauge; at 2+ checks (or 12+ years) the verdict slides in.
 * List mode (inner pages): the same rows, read-only.
 */
export function SignsCheck({
  signs,
  mode = "interactive",
  ageLabel,
  note,
  verdict,
  threshold = 2,
}: {
  signs: Sign[];
  mode?: "interactive" | "list";
  /** Label for the age switch, e.g. "System over 12 years old" */
  ageLabel?: string;
  /** Small note shown beside the gauge */
  note?: React.ReactNode;
  /** Revealed once the threshold is met */
  verdict?: React.ReactNode;
  threshold?: number;
}) {
  const [checked, setChecked] = useState<boolean[]>(() => signs.map(() => false));
  const [old, setOld] = useState(false);

  if (mode === "list") {
    return (
      <ol className="sc sc-list">
        {signs.map((s, i) => (
          <li className="sc-row" key={s.t} data-reveal style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
            <Row s={s} i={i} />
          </li>
        ))}
      </ol>
    );
  }

  const count = checked.filter(Boolean).length;
  const ready = count >= threshold || old;
  // gauge: each sign is one notch, the age switch counts as two; full at threshold * 2
  const level = Math.min(1, (count + (old ? threshold : 0)) / (threshold * 2));
  const angle = -90 + level * 180;

  return (
    <div className={`sc sc-live${ready ? " ready" : ""}`}>
      <fieldset className="sc-rows">
        <legend className="sc-legend">Sound familiar?</legend>
        {signs.map((s, i) => (
          <label className={`sc-row${checked[i] ? " on" : ""}`} key={s.t}>
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={(e) => setChecked((c) => c.map((v, j) => (j === i ? e.target.checked : v)))}
            />
            <Row s={s} i={i} />
          </label>
        ))}
        {ageLabel && (
          <label className={`sc-age${old ? " on" : ""}`}>
            <input type="checkbox" role="switch" checked={old} onChange={(e) => setOld(e.target.checked)} />
            <span className="sc-switch" aria-hidden="true" />
            <span>{ageLabel}</span>
          </label>
        )}
      </fieldset>

      <div className="sc-side">
        <div className="sc-gauge" aria-hidden="true">
          <svg viewBox="0 0 220 128">
            <defs>
              <linearGradient id="sc-g" x1="0" x2="1">
                <stop offset="0" stopColor="var(--blue)" />
                <stop offset="0.55" stopColor="var(--amber)" />
                <stop offset="1" stopColor="var(--red)" />
              </linearGradient>
            </defs>
            <path d="M20 112a90 90 0 0 1 180 0" className="sc-track" />
            <path
              d="M20 112a90 90 0 0 1 180 0"
              className="sc-fill"
              pathLength={100}
              style={{ strokeDashoffset: 100 - level * 100, opacity: level > 0 ? 1 : 0 }}
            />
            <g className="sc-needle" style={{ transform: `rotate(${angle}deg)` }}>
              <line x1="110" y1="112" x2="110" y2="40" />
              <circle cx="110" cy="112" r="8" />
            </g>
          </svg>
          <div className="sc-ends">
            <span>Repair</span>
            <span>Replace</span>
          </div>
        </div>
        <p className="sc-count" aria-live="polite">
          <b>{count}</b> of {signs.length}
          {old ? " + 12 yrs" : ""}
        </p>
        {note && <p className="sc-note">{note}</p>}

        <div className="sc-verdict" inert={!ready} aria-hidden={!ready}>
          <div>{verdict}</div>
        </div>
      </div>
    </div>
  );
}
