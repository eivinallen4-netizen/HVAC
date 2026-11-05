// Decorative fire & ice art drawn from the Wave logo (flame half / snowflake half).
// Everything here is aria-hidden and purely ornamental — pure SVG + CSS animation, no client JS.

import Image from "next/image";
import type { CSSProperties } from "react";

/* Deterministic pseudo-random so server and client render the same particles. */
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

/* One shared set of gradients/clips, rendered once in the page (never display:none). */
export function ArtDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="fl-outer" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e2372b" />
          <stop offset="0.55" stopColor="#f58a2a" />
          <stop offset="1" stopColor="#fbb040" />
        </linearGradient>
        <linearGradient id="fl-inner" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fbb040" />
          <stop offset="1" stopColor="#ffe3a8" />
        </linearGradient>
        <linearGradient id="sn-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#66d4fb" />
        </linearGradient>
      </defs>
    </svg>
  );
}

type Glyph = { size?: number; className?: string; style?: CSSProperties };

/* ─── Flame — the logo's curled flame, amber → red ─── */
export function Flame({ size = 64, className = "", style }: Glyph) {
  return (
    <svg className={`art-flame ${className}`} style={style} width={size} height={size * 1.35} viewBox="0 0 100 135" aria-hidden="true">
      <path
        fill="url(#fl-outer)"
        d="M50 133C24 133 7 115 7 92 7 66 25 52 31 27c11 9 17 22 15 36 9-6 13-19 11-34 7 4 12 10 15 16 12 13 21 29 21 47 0 23-17 41-43 41Z"
      />
      <path fill="url(#fl-outer)" opacity="0.85" d="M57 29c1-11-3-20-10-27 15 6 23 18 21 34-3-3-7-5-11-7Z" />
      <path fill="url(#fl-inner)" d="M50 133c-13 0-21-9-21-20 0-13 9-19 13-31 12 7 24 16 24 31 0 11-7 20-16 20Z" />
    </svg>
  );
}

/* ─── Snowflake — six branched arms, ice blue ─── */
export function Snowflake({ size = 64, className = "", style }: Glyph) {
  const arm = "M50 50V7M50 20l-9-8M50 20l9-8M50 33l-8-7M50 33l8-7";
  return (
    <svg className={`art-snow ${className}`} style={style} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <g fill="none" stroke="url(#sn-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <path key={r} d={arm} transform={`rotate(${r} 50 50)`} />
        ))}
        <path d="m50 41 8 4.5v9L50 59l-8-4.5v-9Z" strokeWidth="3.5" />
      </g>
    </svg>
  );
}

/* ─── Logo ball — the real Wave logo disc (flame left, snowflake right) ─── */
export function SplitEmblem({ size = 120, className = "", style }: Glyph) {
  return (
    <Image
      src="/images/art/logo-ball.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`art-emblem ${className}`}
      style={style}
    />
  );
}

/* ─── Ornamental divider: flame · line · emblem · line · snowflake ─── */
export function FireIceRule({ className = "" }: { className?: string }) {
  return (
    <div className={`fi-rule ${className}`} aria-hidden="true">
      <Flame size={20} />
      <i className="fi-line warm" />
      <SplitEmblem size={40} />
      <i className="fi-line cool" />
      <Snowflake size={22} />
    </div>
  );
}

/* ─── Rising embers ─── */
export function Embers({ count = 22, className = "", seed = 1 }: { count?: number; className?: string; seed?: number }) {
  return (
    <div className={`embers ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const r = (n: number) => rand(seed * 100 + i * 7 + n);
        return (
          <span
            key={i}
            style={
              {
                "--x": `${(r(1) * 100).toFixed(2)}%`,
                "--s": `${(2 + r(2) * 4).toFixed(1)}px`,
                "--d": `${(6 + r(3) * 8).toFixed(2)}s`,
                "--delay": `${(-r(4) * 14).toFixed(2)}s`,
                "--drift": `${((r(5) - 0.5) * 120).toFixed(0)}px`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

/* ─── Drifting frost ─── */
export function Frost({ count = 14, className = "", seed = 2 }: { count?: number; className?: string; seed?: number }) {
  return (
    <div className={`frost ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const r = (n: number) => rand(seed * 100 + i * 11 + n);
        return (
          <span
            key={i}
            style={
              {
                "--x": `${(r(1) * 100).toFixed(2)}%`,
                "--d": `${(12 + r(3) * 14).toFixed(2)}s`,
                "--delay": `${(-r(4) * 26).toFixed(2)}s`,
                "--drift": `${((r(5) - 0.5) * 160).toFixed(0)}px`,
                "--o": (0.25 + r(6) * 0.5).toFixed(2),
              } as CSSProperties
            }
          >
            <Snowflake size={Math.round(8 + r(2) * 14)} />
          </span>
        );
      })}
    </div>
  );
}

/* ─── Heat shimmer: wavy rising lines ─── */
export function HeatShimmer({ className = "", tone = "warm" }: { className?: string; tone?: "warm" | "cool" | "white" }) {
  const waves = [0, 1, 2, 3, 4];
  return (
    <svg className={`shimmer shimmer-${tone} ${className}`} viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
      {waves.map((w) => (
        <path
          key={w}
          d={`M-40 ${40 + w * 32} q 30 -16 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0`}
          style={{ animationDelay: `${-w * 1.3}s` }}
        />
      ))}
    </svg>
  );
}

/* ─── Airflow ribbons (cool) or heat ribbons (warm) ─── */
export function Ribbons({ className = "", tone = "cool" }: { className?: string; tone?: "warm" | "cool" }) {
  return (
    <svg className={`ribbons ribbons-${tone} ${className}`} viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-20 210C200 120 380 260 600 170s420-110 640-20" />
      <path d="M-20 240C220 170 400 290 620 200s400-90 620-30" />
      <path d="M-20 180C180 90 420 220 640 130s380-100 600-40" />
    </svg>
  );
}
