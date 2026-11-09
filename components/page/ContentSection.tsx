import type { Section } from "@/lib/content/types";
import type { IconName } from "@/lib/site";
import { Icon } from "../Icon";
import { SizeFit } from "../SystemTabs";
import { IndexCard, Illo, MemberCard, MonthStrip, RailSteps, WorkOrder } from "./Objects";
import { Rich } from "./Rich";

/** Split the first sentence off a paragraph for the pull-out, unless that would cut a link or bold run in half */
function firstSentence(p: string): [string, string] | null {
  const m = p.match(/^([\s\S]+?[.!?])\s+([\s\S]+)$/);
  if (!m) return null;
  const head = m[1];
  const balanced = (head.split("**").length - 1) % 2 === 0 && (head.match(/\[/g) || []).length === (head.match(/\]/g) || []).length;
  return balanced ? [head, m[2]] : null;
}

function Body({ body }: { body?: string[] }) {
  return (
    <>
      {body?.map((p, i) => (
        <p key={i}>
          <Rich text={p} />
        </p>
      ))}
    </>
  );
}

/** Equipment illustration(s) for an option, matched on its title */
function optionArt(t: string): string[] {
  if (/dual fuel/i.test(t)) return ["equip-heatpump", "equip-furnace"];
  if (/furnace/i.test(t)) return ["equip-furnace"];
  if (/heat pump/i.test(t)) return ["equip-heatpump"];
  if (/ductless|mini-split/i.test(t)) return ["equip-minisplit"];
  return [];
}

/** Icon for an option or service row, matched on its title */
function optionIcon(t: string): IconName {
  const map: [RegExp, IconName][] = [
    [/garage|casita|guest|addition|conversion/i, "home"],
    [/hot or cold|sun/i, "sun"],
    [/zoning|thermostat/i, "gauge"],
    [/cooling|\bac\b/i, "snow"],
    [/heating/i, "flame"],
    [/air quality|filtration|purification|ventilation/i, "leaf"],
    [/uv/i, "sparkle"],
    [/new installation|installation/i, "unitPlus"],
    [/replacement|conversion/i, "unit"],
    [/repair/i, "wrench"],
    [/maintenance|inspection/i, "search"],
    [/seal|duct/i, "duct"],
  ];
  return map.find(([re]) => re.test(t))?.[1] ?? "check";
}

/** Side illustration for a spec sheet, matched on the heading */
function specArt(h2: string): string | null {
  if (/air quality/i.test(h2)) return "equip-purifier";
  if (/duct/i.test(h2)) return "equip-ducts";
  if (/heat pump/i.test(h2)) return "equip-heatpump";
  return null;
}

/**
 * One long-form content section. Laid out by `kind` (what the information is) when the
 * data says so, otherwise by what it holds: table → comparison (2 options → facing panels),
 * cards → numbered rows, list → sticky heading + 2-column checklist, paragraphs → editorial column.
 */
export function ContentSection({ section, alt = false }: { section: Section; alt?: boolean }) {
  const { h2, body, list, cards, table, kind } = section;
  const cls = (extra = "") => `sec content-sec${alt ? " sec-alt" : ""}${extra ? ` ${extra}` : ""}`;

  /* ── steps: sticky intro + vertical rail ── */
  if (kind === "steps" && (list || cards)) {
    const items = cards ?? list!.map((t) => ({ t }));
    return (
      <section className={cls()}>
        <div className="wrap cs-split">
          <div className="cs-side" data-reveal>
            <span className="kicker">
              <Icon name="arrow" size={14} /> Step by step
            </span>
            <h2>{h2}</h2>
            <Body body={body} />
          </div>
          <RailSteps items={items} />
        </div>
      </section>
    );
  }

  /* ── included: work-order sheet beside the heading ── */
  if (kind === "included" && list) {
    return (
      <section className={cls("cs-wo")}>
        <div className="wrap cs-split rev">
          <WorkOrder items={list} />
          <div className="cs-side" data-reveal>
            <h2>{h2}</h2>
            <Body body={body} />
          </div>
        </div>
      </section>
    );
  }

  /* ── options: choice columns (2 → versus split) ── */
  if (kind === "options" && cards) {
    const vs = cards.length === 2;
    return (
      <section className={cls()}>
        <div className="wrap">
          <div className="sec-head split" data-reveal>
            <div>
              <h2>{h2}</h2>
            </div>
            {body && (
              <div className="lead">
                <Body body={body} />
              </div>
            )}
          </div>
          <ul className={`choice n${cards.length}${vs ? " vs" : ""}`}>
            {cards.map((c, i) => {
              const art = optionArt(c.t);
              return (
                <li className={`choice-col tone-${i % 2 ? "warm" : "cool"}`} key={c.t} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className={`choice-art${art.length > 1 ? " pair" : ""}`}>
                    {art.length ? (
                      art.map((a) => <Illo key={a} name={a} w={360} h={360} />)
                    ) : (
                      <span className="choice-ic" aria-hidden="true">
                        <Icon name={optionIcon(c.t)} size={30} />
                      </span>
                    )}
                  </div>
                  <h3>{c.t}</h3>
                  <p>
                    <Rich text={c.d} />
                  </p>
                </li>
              );
            })}
            {vs && (
              <li className="choice-vs" aria-hidden="true">
                vs
              </li>
            )}
          </ul>
        </div>
      </section>
    );
  }

  /* ── services: spec sheet (definition list) ── */
  if (kind === "services" && cards) {
    const art = specArt(h2);
    return (
      <section className={cls()}>
        <div className="wrap cs-split">
          <div className="cs-side" data-reveal>
            <h2>{h2}</h2>
            <Body body={body} />
            {art && <Illo name={art} w={360} h={360} className="spec-illo" />}
          </div>
          <dl className="spec-sheet" data-reveal>
            {cards.map((c, i) => (
              <div className="spec-row" key={c.t}>
                <dt>
                  <span className="spec-ic" aria-hidden="true">
                    <Icon name={optionIcon(c.t)} size={18} />
                  </span>
                  <span className="spec-n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {c.t}
                </dt>
                <dd>
                  <Rich text={c.d} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  }

  /* ── fit: centered tag cloud ── */
  if (kind === "fit" && list) {
    return (
      <section className={cls("cs-fit")}>
        <div className="wrap" data-reveal>
          <h2>{h2}</h2>
          <Body body={body} />
          <ul className="tag-cloud">
            {list.map((li, i) => (
              <li key={li} className={i % 3 === 1 ? "warm" : undefined}>
                <Icon name="check" size={16} />
                <Rich text={li} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  /* ── wait: deep band + index card ── */
  if (kind === "wait" && list) {
    return (
      <section className="sec content-sec cs-wait">
        <div className="wrap cs-split">
          <div className="cs-side" data-reveal>
            <span className="kicker">
              <Icon name="snow" size={14} /> Right now
            </span>
            <h2>{h2}</h2>
            <Body body={body} />
          </div>
          <IndexCard items={list} label="Checklist" />
        </div>
      </section>
    );
  }

  /* ── safety: hazard panel ── */
  if (kind === "safety") {
    return (
      <section className={cls()}>
        <div className="wrap">
          <div className="hazard" data-reveal>
            <Illo name="co-detector" w={360} h={360} className="hazard-illo" />
            <div className="hazard-copy">
              <span className="hazard-tag">
                <Icon name="shield" size={14} /> Safety
              </span>
              <h2>{h2}</h2>
              <Body body={body} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── season: month strip + seasonal notes ── */
  if (kind === "season" && section.season) {
    const notes = body?.every((p) => /^\*\*[^*]+\*\*/.test(p)) && (body?.length ?? 0) > 1;
    return (
      <section className={cls()}>
        <div className="wrap cs-season">
          <div className="season-head" data-reveal>
            <h2>{h2}</h2>
            <MonthStrip segs={section.season} />
          </div>
          {notes ? (
            <div className="season-notes" data-reveal>
              {body!.map((p, i) => (
                <p key={i} className={`season-note tone-${section.season![i]?.tone ?? (i === 0 ? "cool" : "warm")}`}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
          ) : (
            <div className="cs-col season-col" data-reveal>
              <Body body={body} />
            </div>
          )}
        </div>
      </section>
    );
  }

  /* ── club: membership card + perks ── */
  if (kind === "club") {
    return (
      <section className={cls("cs-club")}>
        <div className="wrap club">
          <div className="club-card" data-reveal>
            <MemberCard />
          </div>
          <div className="club-copy" data-reveal>
            <h2>{h2}</h2>
            <Body body={body} />
            {cards && (
              <ul className="perk-rows">
                {cards.map((c) => (
                  <li key={c.t}>
                    <Icon name="check" size={18} />
                    <div>
                      <h3>{c.t}</h3>
                      <p>
                        <Rich text={c.d} />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {list && (
              <ul className="perk-list">
                {list.map((li) => (
                  <li key={li}>
                    <Icon name="check" size={16} />
                    <span>
                      <Rich text={li} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    );
  }

  /* ── sizing: too big / right / too small graphic beside the text ── */
  if (kind === "sizing") {
    return (
      <section className={cls()}>
        <div className="wrap cs-sizing">
          <div className="sizing-fig" data-reveal>
            <SizeFit />
          </div>
          <div className="cs-col" data-reveal>
            <h2>{h2}</h2>
            <Body body={body} />
          </div>
        </div>
      </section>
    );
  }

  /* ── fine: plan terms box ── */
  if (kind === "fine") {
    return (
      <section className={cls("cs-fine")}>
        <div className="wrap">
          <div className="fine-box" data-reveal>
            <h2>
              <Icon name="sheet" size={20} /> {h2}
            </h2>
            <Body body={body} />
          </div>
        </div>
      </section>
    );
  }

  if (table) {
    // Two options side by side (maintained vs neglected) → facing panels
    if (table.head.length === 3) {
      return (
        <section className={cls()}>
          <div className="wrap cs-vs" data-reveal>
            <div className="cs-intro">
              <h2>{h2}</h2>
              <Body body={body} />
            </div>
            <table className="vs-table">
              <thead>
                <tr>
                  <td aria-hidden={table.head[0] ? undefined : true}>{table.head[0] && <span className="sr-only">{table.head[0]}</span>}</td>
                  <th scope="col" className="vs-good">
                    <span>
                      <Icon name="check" size={16} /> {table.head[1]}
                    </span>
                  </th>
                  <th scope="col" className="vs-bad">
                    <span>
                      <Icon name="close" size={16} /> {table.head[2]}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map((r) => (
                  <tr key={r[0]}>
                    <th scope="row">{r[0]}</th>
                    <td className="vs-good">{r[1]}</td>
                    <td className="vs-bad">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {table.note && <p className="table-note">{table.note}</p>}
            {list && <Checklist list={list} />}
          </div>
        </section>
      );
    }
    // highlight a Wave column where there is one
    const waveCol = table.head.findIndex((h) => /wave/i.test(h));
    const hi = waveCol > 0 ? waveCol : -1;
    return (
      <section className={cls()}>
        <div className="wrap cs-table" data-reveal>
          <div className="cs-intro">
            <h2>{h2}</h2>
            <Body body={body} />
          </div>
          <div className="table-wrap">
            <table className="cmp-table">
              <thead>
                <tr>
                  {table.head.map((h, i) => (
                    <th key={i} scope="col" className={i === hi ? "hi" : undefined}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          {c}
                        </th>
                      ) : (
                        <td key={i} className={i === hi ? "hi" : undefined}>
                          {c}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {table.note && <p className="table-note">{table.note}</p>}
          </div>
          {list && <Checklist list={list} />}
        </div>
      </section>
    );
  }

  if (cards || list) {
    return (
      <section className={cls()}>
        <div className="wrap cs-split">
          <div className="cs-side" data-reveal>
            <h2>{h2}</h2>
            <Body body={body} />
          </div>
          <div data-reveal>
            {cards && (
              <ol className="num-rows compact">
                {cards.map((c, i) => (
                  <li key={c.t}>
                    <span className="num-n" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{c.t}</h3>
                      <p>
                        <Rich text={c.d} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            {list && <Checklist list={list} cols={!cards} />}
          </div>
        </div>
      </section>
    );
  }

  const [first, ...rest] = body ?? [];
  const split = first ? firstSentence(first) : null;
  return (
    <section className={cls()}>
      <div className="wrap cs-edit" data-reveal>
        <h2>{h2}</h2>
        <div className="cs-col">
          {first && (
            <p className="cs-pull">
              <Rich text={split ? split[0] : first} />
            </p>
          )}
          {split && (
            <p>
              <Rich text={split[1]} />
            </p>
          )}
          <Body body={rest} />
        </div>
      </div>
    </section>
  );
}

function Checklist({ list, cols = true }: { list: string[]; cols?: boolean }) {
  return (
    <ul className={`check-list${cols ? " cols" : ""}`}>
      {list.map((li) => (
        <li key={li}>
          <Icon name="check" size={18} />
          <span>
            <Rich text={li} />
          </span>
        </li>
      ))}
    </ul>
  );
}
