import type { Section } from "@/lib/content/types";
import { Icon } from "../Icon";
import { Rich } from "./Rich";

/** Renders one long-form content section (paragraphs, checklist, cards, comparison table). */
export function ContentSection({ section, alt = false }: { section: Section; alt?: boolean }) {
  const { h2, body, list, cards, table } = section;
  return (
    <section className={`sec content-sec${alt ? " sec-alt" : ""}`}>
      <div className="wrap prose-wrap" data-reveal>
        <h2>{h2}</h2>
        {body?.map((p, i) => (
          <p key={i}>
            <Rich text={p} />
          </p>
        ))}
        {list && (
          <ul className="check-list">
            {list.map((li) => (
              <li key={li}>
                <Icon name="check" size={18} />
                <span>
                  <Rich text={li} />
                </span>
              </li>
            ))}
          </ul>
        )}
        {cards && (
          <div className="mini-cards">
            {cards.map((c) => (
              <div className="card mini-card" key={c.t}>
                <h3>{c.t}</h3>
                <p>
                  <Rich text={c.d} />
                </p>
              </div>
            ))}
          </div>
        )}
        {table && (
          <div className="table-wrap">
            <table className="cmp-table">
              <thead>
                <tr>
                  {table.head.map((h, i) => (
                    <th key={i} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
            {table.note && <p className="table-note">{table.note}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
