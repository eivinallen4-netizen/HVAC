import Image from "next/image";
import { SplitEmblem } from "../Art";
import { Icon } from "../Icon";
import { Rich } from "./Rich";

/**
 * Presentational "objects" for inner pages: each one gives a kind of information its own
 * shape (a rail of steps, a work order, a month strip…) so sections stop looking alike.
 * None of them owns copy: everything they print comes in through props.
 */

const pad = (n: number) => String(n).padStart(2, "0");

/** Light/dark illustration pair (swapped by the theme classes used across the site) */
export function Illo({
  name,
  w = 400,
  h = 400,
  className = "",
  sizes = "320px",
}: {
  name: string;
  w?: number;
  h?: number;
  className?: string;
  sizes?: string;
}) {
  return (
    <span className={`illo ${className}`} aria-hidden="true">
      <Image src={`/images/illo/${name}-dark.png`} alt="" width={w} height={h} className="logo-on-dark" sizes={sizes} />
      <Image src={`/images/illo/${name}-light.png`} alt="" width={w} height={h} className="logo-on-light" sizes={sizes} />
    </span>
  );
}

/** Vertical rail stepper. Titles written as "1. Something" put their number on the node. */
export function RailSteps({ items, className = "" }: { items: { t: string; d?: string }[]; className?: string }) {
  return (
    <ol className={`rail ${className}`}>
      {items.map((s, i) => {
        const m = s.t.match(/^(\d+)\.\s+/);
        const n = m ? Number(m[1]) : i + 1;
        const t = m ? s.t.slice(m[0].length) : s.t;
        return (
          <li className="rail-step" key={s.t} data-reveal style={{ transitionDelay: `${Math.min(i, 6) * 50}ms` }}>
            <span className="rail-n" aria-hidden="true">
              {pad(n)}
            </span>
            <div className="rail-body">
              {s.d ? (
                <>
                  <h3>
                    {m && <span className="sr-only">{n}. </span>}
                    <Rich text={t} />
                  </h3>
                  <p>
                    <Rich text={s.d} />
                  </p>
                </>
              ) : (
                <p className="rail-t">
                  <Rich text={t} />
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** "What's included": a technician's work-order sheet with every line ticked */
export function WorkOrder({ items, label = "Work order" }: { items: string[]; label?: string }) {
  return (
    <div className="wo paper" data-reveal>
      <span className="wo-clip" aria-hidden="true" />
      <div className="wo-head">
        <span className="wo-label">{label}</span>
        <span className="wo-stamp" aria-hidden="true">
          <Icon name="shield" size={22} />
        </span>
      </div>
      <ol className="wo-lines">
        {items.map((li, i) => (
          <li key={li}>
            <span className="wo-n" aria-hidden="true">
              {pad(i + 1)}
            </span>
            <span className="wo-box" aria-hidden="true">
              <Icon name="tick" size={14} />
            </span>
            <span>
              <Rich text={li} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Index card for "do this now" lists (red rule, clip, numbered lines) */
export function IndexCard({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="icard paper" data-reveal>
      <span className="prep-clip" aria-hidden="true" />
      <span className="icard-label">
        <Icon name="clock" size={14} /> {label}
      </span>
      <ol className="icard-lines">
        {items.map((li, i) => (
          <li key={li}>
            <span className="icard-n" aria-hidden="true">
              {i + 1}
            </span>
            <span>
              <Rich text={li} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** A year as 12 cells, with the months the copy names highlighted */
export function MonthStrip({ segs }: { segs: { m: number[]; label: string; tone?: "warm" | "cool" }[] }) {
  const tone = (i: number) => segs[i].tone ?? (i === 0 ? "cool" : "warm");
  return (
    <figure className="ms" data-reveal>
      <ol className="ms-row" aria-hidden="true">
        {MONTHS.map((m, i) => {
          const si = segs.findIndex((s) => s.m.includes(i));
          return (
            <li key={m} className={si >= 0 ? `on tone-${tone(si)}` : undefined}>
              <span>{m}</span>
            </li>
          );
        })}
      </ol>
      <figcaption className="ms-legend">
        {segs.map((s, i) => (
          <span key={s.label} className={`ms-key tone-${tone(i)}`}>
            <i aria-hidden="true" /> {s.label}
            <span className="sr-only">: {s.m.map((x) => MONTHS_FULL[x]).join(", ")}</span>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

/** Decorative Wave Club membership card */
export function MemberCard({ className = "" }: { className?: string }) {
  return (
    <div className={`mcard ${className}`} aria-hidden="true">
      <SplitEmblem size={220} className="mcard-emb" />
      <span className="mcard-chip" />
      <span className="mcard-top">
        <Icon name="shield" size={16} /> Member
      </span>
      <b className="mcard-name">Wave Club</b>
      <span className="mcard-row">
        <Icon name="snow" size={14} /> <Icon name="flame" size={14} />
      </span>
    </div>
  );
}

/** Technician credential badge on a lanyard; each credential is a real line of copy */
export function BadgeCard({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div className="badge-wrap" data-reveal>
      <span className="badge-strap" aria-hidden="true" />
      <div className="badge-card">
        <span className="badge-hole" aria-hidden="true" />
        <div className="badge-top">
          <SplitEmblem size={52} className="badge-emb" />
          <span className="badge-role">Wave technician</span>
        </div>
        <ul className="badge-lines">
          {items.map((c) => (
            <li key={c.t}>
              <span className="badge-tick" aria-hidden="true">
                <Icon name="check" size={14} />
              </span>
              <div>
                <h3>{c.t}</h3>
                <p>
                  <Rich text={c.d} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
