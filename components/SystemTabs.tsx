"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { IconName } from "@/lib/site";
import { Icon } from "./Icon";

/** Diagram parts, positioned over the split-system illustration (% of the image) */
export type Part = { id: string; label: string; x: number; y: number };

export type SystemTab = {
  tab: string;
  icon: IconName;
  /** Part ids to light up on the diagram */
  parts?: string[];
  /** Swap the diagram for the 3-state sizing graphic */
  sizing?: boolean;
  /** Show the permit stamp over the diagram */
  stamp?: boolean;
  content: React.ReactNode;
};

/** Three houses: too big / right size / too small */
export function SizeFit() {
  const states = [
    { k: "big", label: "Too big", w: 30 },
    { k: "right", label: "Right size", w: 20 },
    { k: "small", label: "Too small", w: 11 },
  ];
  return (
    <div className="sf" aria-hidden="true">
      {states.map((s) => (
        <figure className={`sf-item sf-${s.k}`} key={s.k}>
          <svg viewBox="0 0 120 110">
            <path className="sf-ground" d="M2 100h116" />
            <path className="sf-house" d="M8 54 46 22l38 32v46H8Z" />
            <path className="sf-door" d="M39 100V80h14v20" />
            <rect className="sf-unit" x={103 - s.w / 2} y={100 - s.w * 0.85} width={s.w} height={s.w * 0.85} rx="2" />
            {s.k === "right" && <path className="sf-ok" d="m36 62 7 7 13-14" />}
            {s.k === "big" && <path className="sf-mark" d="M30 60h4m4 0h4m4 0h4m4 0h4M30 68h4m4 0h4m4 0h4m4 0h4" />}
            {s.k === "small" && <path className="sf-mark" d="M30 58c3-3 6 3 9 0s6 3 9 0 6 3 9 0M30 68c3-3 6 3 9 0s6 3 9 0 6 3 9 0" />}
          </svg>
          <figcaption>{s.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * Tabbed "what's included" diagram. Left: the split-system illustration with HTML
 * callouts that light up per tab. Right: that tab's copy. Arrow keys move between tabs.
 */
export function SystemTabs({
  tabs,
  parts,
  dark,
  light,
  width,
  height,
  alt,
}: {
  tabs: SystemTab[];
  parts: Part[];
  dark: string;
  light: string;
  width: number;
  height: number;
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = tabs[active];

  const onKey = (e: React.KeyboardEvent) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? active === last ? 0 : active + 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? active === 0 ? last : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="st">
      <div className="st-tabs" role="tablist" aria-label="What a full replacement covers" onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.tab}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${uid}-p${i}`}
            tabIndex={i === active ? 0 : -1}
            className="st-tab"
            onClick={() => setActive(i)}
          >
            <Icon name={t.icon} size={18} />
            {t.tab}
          </button>
        ))}
      </div>

      <div className="st-body">
        <div className={`st-visual${cur.sizing ? " sizing" : ""}`}>
          <div className="st-diagram">
            <Image src={dark} alt={alt} width={width} height={height} className="logo-on-dark" sizes="(max-width: 1040px) 100vw, 640px" />
            <Image src={light} alt={alt} width={width} height={height} className="logo-on-light" sizes="(max-width: 1040px) 100vw, 640px" />
            {parts.map((p) => (
              <span
                key={p.id}
                className={`st-part${cur.parts?.includes(p.id) ? " on" : ""}${p.x > 94 ? " to-left" : ""}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <i aria-hidden="true" />
                {p.label}
              </span>
            ))}
            {cur.stamp && (
              <span className="st-stamp" aria-hidden="true">
                <Icon name="permit" size={30} />
              </span>
            )}
          </div>
          <SizeFit />
        </div>

        {tabs.map((t, i) => (
          <div
            key={t.tab}
            role="tabpanel"
            id={`${uid}-p${i}`}
            aria-labelledby={`${uid}-t${i}`}
            className="st-panel"
            hidden={i !== active}
            tabIndex={0}
          >
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
