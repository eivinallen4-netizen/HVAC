import type { IconName } from "@/lib/site";

// Custom Wave icon set — 24px grid, 1.8px rounded stroke.
const paths: Record<IconName, React.ReactNode> = {
  phone: <path d="M5 3.5h3.2l1.6 4.2-2.2 1.5a11.5 11.5 0 0 0 7.2 7.2l1.5-2.2 4.2 1.6V19a1.8 1.8 0 0 1-1.9 1.8C10.4 20.3 3.7 13.6 3.2 5.4A1.8 1.8 0 0 1 5 3.5Z" />,
  snow: (
    <>
      <path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5" />
      <path d="m9.5 4 2.5 2 2.5-2M9.5 20l2.5-2 2.5 2M4.3 10.6l3.1-.6-1-3M19.7 13.4l-3.1.6 1 3M4.3 13.4l3.1.6-1 3M19.7 10.6l-3.1-.6 1-3" />
    </>
  ),
  flame: (
    <>
      <path d="M12 21.5c-4 0-6.8-2.7-6.8-6.4 0-3.9 3.1-6 3.9-9.6 2 1.2 3 3 3.1 5 1-.6 1.7-1.9 1.8-3.4 2.6 1.9 4.8 4.9 4.8 8 0 3.7-2.8 6.4-6.8 6.4Z" />
      <path d="M12 21.5c-1.7 0-2.9-1.2-2.9-2.8 0-1.8 1.6-2.7 2.1-4.3 1.9 1 3.6 2.4 3.6 4.3 0 1.6-1.2 2.8-2.8 2.8Z" />
    </>
  ),
  wrench: <path d="M14.7 6.3a4.5 4.5 0 0 0 5.6 5.6l-8.9 8.9a2.1 2.1 0 0 1-3-3l8.9-8.9a4.5 4.5 0 0 1 5.6-5.6l-3 3 .4 2.6 2.6.4" />,
  unit: (
    <>
      <rect x="2.5" y="5" width="19" height="13" rx="2" />
      <circle cx="9" cy="11.5" r="4" />
      <path d="M9 7.5v8M5 11.5h8M15.5 8.5h3M15.5 11.5h3M15.5 14.5h3M5 18v2M19 18v2" />
    </>
  ),
  unitPlus: (
    <>
      <rect x="2.5" y="7" width="15" height="12" rx="2" />
      <circle cx="8" cy="13" r="3.4" />
      <path d="M8 9.6v6.8M4.6 13h6.8M13.8 10h1.5M13.8 13h1.5M13.8 16h1.5M19.5 2.5v6M16.5 5.5h6" />
    </>
  ),
  gauge: (
    <>
      <path d="M3.5 16a8.5 8.5 0 1 1 17 0" />
      <path d="M12 16l4-5" />
      <circle cx="12" cy="16" r="1.6" />
      <path d="M6 12.2l1.2.7M12 7.5v1.4M18 12.2l-1.2.7M3 19.5h18" />
    </>
  ),
  split: (
    <>
      <rect x="2.5" y="4" width="19" height="7.5" rx="2.2" />
      <path d="M5.5 9h13M8 14.5c-.8 1.2-.8 2.3 0 3.5M12 14.5c-.8 1.2-.8 2.3 0 3.5M16 14.5c-.8 1.2-.8 2.3 0 3.5M17.5 6.6h1" />
    </>
  ),
  duct: (
    <>
      <path d="M2.5 7.5h9a4 4 0 0 1 4 4v10M2.5 13h6.5a1 1 0 0 1 1 1v7.5" />
      <path d="M5.5 7.5V13M15.5 16h-5.5" />
      <path d="M17.5 4.5c1.4 0 1.4 1.5 2.8 1.5M17.5 8c1.4 0 1.4 1.5 2.8 1.5M17.5 11.5c1.4 0 1.4 1.5 2.8 1.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M3 8.5h9.5a2.5 2.5 0 1 0-2.5-2.5M3 12.5h14.5a3 3 0 1 1-3 3M3 16.5h7" />
      <path d="M17 3.5c2.3 0 3.5 1.2 3.5 3.5-2.3 0-3.5-1.2-3.5-3.5Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 4.5 5.6v6c0 4.7 3.1 8.2 7.5 9.6 4.4-1.4 7.5-4.9 7.5-9.6v-6Z" />
      <path d="m8.6 12 2.4 2.4 4.6-4.8" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m9.7 9 1.6 1.6 3-3.1M8.4 13.8 7 21l5-2.6 5 2.6-1.4-7.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 8.5V13l3 2M9.5 2.5h5M19.5 5.5l1.3 1.3" />
    </>
  ),
  home: (
    <>
      <path d="M3 11 12 3.5 21 11M5.5 9v11.5h13V9" />
      <path d="M12 18.2s-3-1.8-3-3.9a1.7 1.7 0 0 1 3-1.1 1.7 1.7 0 0 1 3 1.1c0 2.1-3 3.9-3 3.9Z" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12.6V4.5A1.5 1.5 0 0 1 4.5 3h8.1l8.4 8.4a1.5 1.5 0 0 1 0 2.1l-7.5 7.5a1.5 1.5 0 0 1-2.1 0Z" />
      <circle cx="8" cy="8" r="1.6" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-9.5L6 21v-3.5H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" />
      <path d="M7.5 10h9M7.5 13.5h6" />
    </>
  ),
  cal: (
    <>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
      <path d="m8.8 15 2.2 2.2 4.2-4.2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5M8 10.5h5M10.5 8v5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m7.8 12.3 2.8 2.8 5.6-5.8" />
    </>
  ),
  tick: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  chev: <path d="m9 5 7 7-7 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  power: <path d="M12 3v8M7 6.3a7.5 7.5 0 1 0 10 0" />,
  question: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M9.4 9.3a2.7 2.7 0 1 1 3.6 2.6c-.6.3-1 .8-1 1.5v.8" />
      <circle cx="12" cy="17.2" r=".6" fill="currentColor" />
    </>
  ),
  star: <path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9Z" />,
  bolt: <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12Z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  drag: <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />,
};

export function Icon({
  name,
  size = 24,
  className,
  filled,
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  filled?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className ? `ico ${className}` : "ico"}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name]}
    </svg>
  );
}

export function Stars({ size = 14 }: { size?: number }) {
  return (
    <span className="stars" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" size={size} filled />
      ))}
    </span>
  );
}

/** Google "G" mark for review attribution */
export function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
