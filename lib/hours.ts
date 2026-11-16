import { site } from "./site";

/** Wave's clock: every open/closed check uses Las Vegas time, whatever the visitor's timezone */
const TZ = "America/Los_Angeles";

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "23:00" → "11 PM", "06:30" → "6:30 AM" */
export const fmtTime = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const h12 = h % 12 || 12;
  return `${h12}${m ? `:${String(m).padStart(2, "0")}` : ""} ${h < 12 ? "AM" : "PM"}`;
};

export const opensLabel = fmtTime(site.openingHours.opens);
export const closesLabel = fmtTime(site.openingHours.closes);

export type OpenStatus = { open: boolean; day: string; label: string };

/** Open/closed right now in Las Vegas. `now` is injectable so the status can be tested at any hour. */
export function openStatus(now: Date = new Date()): OpenStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = get("weekday");
  const mins = Number(get("hour")) * 60 + Number(get("minute"));
  const { days, opens, closes } = site.openingHours;
  const open = days.includes(day) && mins >= toMin(opens) && mins < toMin(closes);
  const label = open
    ? `Open now · until ${closesLabel}`
    : mins < toMin(opens)
      ? `Closed · opens ${opensLabel}`
      : `Closed · opens ${opensLabel} tomorrow`;
  return { open, day, label };
}
