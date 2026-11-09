"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { IconName } from "@/lib/site";
import { Icon } from "./Icon";

export type Hotspot = { icon: IconName; t: string; d: string; /** pin position, % of the image */ x: number; y: number };

/**
 * Illustration with numbered pins. Desktop: hover, focus or tap a pin to show its card.
 * Mobile: the pins stay on the image as markers and the cards stack underneath as a list.
 */
export function Hotspots({
  items,
  dark,
  light,
  width,
  height,
  label,
}: {
  items: Hotspot[];
  dark: string;
  light: string;
  width: number;
  height: number;
  /** Accessible name for the group of pins */
  label: string;
}) {
  const [active, setActive] = useState(0);
  const uid = useId();
  return (
    <div className="hs" role="group" aria-label={label}>
      <div className="hs-stage">
        <Image src={dark} alt="" width={width} height={height} className="hs-img logo-on-dark" sizes="(max-width: 1040px) 100vw, 1180px" />
        <Image src={light} alt="" width={width} height={height} className="hs-img logo-on-light" sizes="(max-width: 1040px) 100vw, 1180px" />
        {items.map((h, i) => (
          <span className="hs-marker" key={h.t} style={{ left: `${h.x}%`, top: `${h.y}%` }} aria-hidden="true">
            {i + 1}
          </span>
        ))}
      </div>
      <ol className="hs-pins">
        {items.map((h, i) => {
          const on = i === active;
          const id = `${uid}-${i}`;
          return (
            <li
              key={h.t}
              className={`hs-pin${on ? " on" : ""}${h.x > 55 ? " to-left" : ""}${h.y < 40 ? " below" : ""}`}
              style={{ "--x": `${h.x}%`, "--y": `${h.y}%` } as React.CSSProperties}
              onMouseEnter={() => setActive(i)}
            >
              <button
                type="button"
                className="hs-btn"
                aria-expanded={on}
                aria-controls={id}
                aria-label={`Step ${i + 1}: ${h.t}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="hs-ring" aria-hidden="true" />
                {i + 1}
              </button>
              <div className="hs-card" id={id}>
                <span className="hs-step">
                  <Icon name={h.icon} size={18} /> Step {i + 1}
                </span>
                <h4>{h.t}</h4>
                <p>{h.d}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
