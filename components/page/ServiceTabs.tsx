"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import type { IconName } from "@/lib/site";
import { Icon } from "../Icon";

type Item = { slug: string; name: string; summary: string; img: string; icon: IconName };
type Group = { title: string; icon: IconName; items: Item[] };

/**
 * Hub page: one tab per service category. Every panel is rendered (inactive ones `hidden`)
 * so all links stay in the HTML. Arrow keys / Home / End move between tabs.
 */
export function ServiceTabs({ groups, kicker, title }: { groups: Group[]; kicker: string; title: string }) {
  const [on, setOn] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const n = (i + groups.length) % groups.length;
    setOn(n);
    tabs.current[n]?.focus();
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(on + 1);
    else if (e.key === "ArrowLeft") go(on - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(groups.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <section className="sec svc-tabs-sec">
      <div className="wrap">
        <div className="svc-tabs-head" data-reveal>
          <div>
            <span className="kicker">{kicker}</span>
            <h2>{title}</h2>
          </div>
          <div className="svc-tablist" role="tablist" aria-label={title} onKeyDown={onKey}>
            {groups.map((g, i) => (
              <button
                key={g.title}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${id}-t${i}`}
                aria-selected={on === i}
                aria-controls={`${id}-p${i}`}
                tabIndex={on === i ? 0 : -1}
                onClick={() => setOn(i)}
              >
                <Icon name={g.icon} size={16} /> {g.title}
              </button>
            ))}
          </div>
        </div>
        {groups.map((g, gi) => (
          <div key={g.title} role="tabpanel" id={`${id}-p${gi}`} aria-labelledby={`${id}-t${gi}`} hidden={on !== gi} className="svc-shelf">
            <h3 className="sr-only">{g.title}</h3>
            <ul>
              {g.items.map((s) => (
                <li key={s.slug} className="shelf-row">
                  <span className="shelf-thumb">
                    <Image src={s.img} alt="" fill sizes="120px" />
                  </span>
                  <div>
                    <h4>
                      <Link className="dir-link" href={`/${s.slug}/`}>
                        {s.name}
                      </Link>
                    </h4>
                    <p>{s.summary}</p>
                  </div>
                  <span className="dir-arrow" aria-hidden="true">
                    <Icon name="arrow" size={18} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
