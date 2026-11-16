export type Stat = { value: number; decimals?: number; suffix?: string; label: string };

/** A row of plain figures. Static on purpose: the numbers are facts, not a show. */
export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <ul className="stats-row">
      {stats.map((s) => (
        <li key={s.label}>
          <b className="stats-num">
            {s.value.toLocaleString("en-US", { minimumFractionDigits: s.decimals ?? 0, maximumFractionDigits: s.decimals ?? 0 })}
            {s.suffix}
          </b>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
