"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Icon } from "./Icon";

export type BeforeAfterPair = {
  before: string;
  after: string;
  /** Short label for the job, e.g. "Condenser tune-up" */
  label: string;
  beforeAlt: string;
  afterAlt: string;
};

export function BeforeAfter({
  before,
  after,
  beforeAlt = "Condenser before maintenance — debris built up",
  afterAlt = "Condenser after a Wave tune-up — clean and clear",
  className = "",
  sizes = "(max-width: 900px) 100vw, 560px",
}: {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  /** next/image sizes for both photos */
  sizes?: string;
}) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  // Pointer being tracked, where it started, and whether it has moved enough to count as a drag
  const drag = useRef<{ id: number; x: number; y: number; moved: boolean } | null>(null);

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const end = () => (drag.current = null);

  return (
    <div
      className={`ba${className ? ` ${className}` : ""}`}
      ref={box}
      // touch-action: pan-y (CSS) lets a vertical swipe scroll the page; the browser then
      // fires pointercancel. Horizontal swipes come to us and move the handle.
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: false };
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // pointer already gone; the move/up handlers still work without capture
        }
        // Mouse/pen jump straight to the click; touch waits so a scroll that starts here doesn't move it
        if (e.pointerType !== "touch") move(e.clientX);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d || d.id !== e.pointerId) return;
        if (!d.moved && Math.abs(e.clientX - d.x) < 4) return;
        d.moved = true;
        move(e.clientX);
      }}
      onPointerUp={(e) => {
        const d = drag.current;
        // A tap on a phone jumps the handle to that spot
        if (d && d.id === e.pointerId && !d.moved && e.pointerType === "touch") move(e.clientX);
        end();
      }}
      onPointerCancel={end}
      onLostPointerCapture={end}
    >
      <Image src={after} alt={afterAlt} fill sizes={sizes} />
      <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeAlt} fill sizes={sizes} />
      </div>
      <span className="ba-tag ba-tag-l">Before</span>
      <span className="ba-tag ba-tag-r">After</span>
      <div className="ba-handle" style={{ left: `${pos}%` }}>
        <span>
          <Icon name="drag" size={20} />
        </span>
      </div>
      <input
        className="ba-range"
        type="range"
        min={4}
        max={96}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Drag to compare before and after"
      />
    </div>
  );
}

/** Several before/after sliders: one shows at a time, with prev/next arrows and job tabs when there's more than one */
export function BeforeAfterGallery({ pairs }: { pairs: BeforeAfterPair[] }) {
  const [i, setI] = useState(0);
  const n = pairs.length;
  const cur = pairs[i];
  if (!cur) return null;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  return (
    <div className="ba-gallery">
      {/* key resets the handle to the middle for each job */}
      <BeforeAfter key={cur.before} before={cur.before} after={cur.after} beforeAlt={cur.beforeAlt} afterAlt={cur.afterAlt} />
      {n > 1 && (
        <div className="ba-nav">
          <button type="button" className="ba-arrow prev" onClick={() => go(-1)} aria-label="Previous job">
            <Icon name="chev" size={18} />
          </button>
          <ul className="ba-tabs">
            {pairs.map((p, j) => (
              <li key={p.before}>
                <button type="button" aria-pressed={j === i} onClick={() => setI(j)}>
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="ba-arrow" onClick={() => go(1)} aria-label="Next job">
            <Icon name="chev" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
