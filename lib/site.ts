// Single source of truth for business facts — edit here, the whole site updates.

export const site = {
  name: "Wave Heating & Cooling",
  legalName: "Wave Heating & Cooling LLC",
  url: "https://waveheatingandcooling.com",
  phone: "(702) 881-4713",
  phoneHref: "tel:+17028814713",
  smsHref: "sms:+17028814713",
  license: "#0086052",
  address: {
    street: "4225 Plumeria Mist St",
    city: "Las Vegas",
    state: "NV",
    zip: "89129",
  },
  tagline: "Las Vegas' Most Trusted Heating and Cooling Solutions",
  googleReviewsUrl:
    "https://www.google.com/search?q=Wave+Heating+%26+Cooling+Las+Vegas+reviews",
  ratings: [
    { platform: "Google", score: "5.0" },
    { platform: "Facebook", score: "5.0" },
    { platform: "Yelp", score: "4.8" },
  ],
};

/** Existing pages on the client's main site — linked to, not rebuilt here */
const page = (path: string) => `${site.url}/${path}/`;

export const pages = {
  about: page("about-us-2"),
  contact: page("contact-us-2"),
  referral: page("referral-program"),
  blog: page("blog"),
  facebook: "https://www.facebook.com/waveheatingandcooling",
};

export const serviceAreas = [
  "Las Vegas",
  "North Las Vegas",
  "Henderson",
  "Summerlin",
  "Sun City Summerlin",
  "Centennial Hills",
  "The Lakes",
  "Aliante",
  "Green Valley",
  "Seven Hills",
  "Spring Valley",
  "Inspirada",
];

export type IconName =
  | "phone" | "snow" | "flame" | "wrench" | "unit" | "unitPlus" | "gauge" | "split"
  | "duct" | "leaf" | "shield" | "award" | "clock" | "home" | "tag" | "sparkle"
  | "chat" | "cal" | "search" | "pin" | "check" | "tick" | "arrow" | "chev"
  | "plus" | "lock" | "power" | "question" | "star" | "bolt" | "menu" | "close"
  | "sun" | "drag";

/** Options shown in step 1 of the hero form */
export const issueOptions: {
  value: string;
  title: string;
  sub: string;
  icon: IconName;
  hot?: boolean;
}[] = [
  { value: "AC not cooling", title: "AC isn't cooling", sub: "Running, but blowing warm air", icon: "snow" },
  { value: "Heat not working", title: "Heat isn't working", sub: "No heat, or not warming up", icon: "flame", hot: true },
  { value: "System won't turn on / no airflow", title: "Won't turn on / no airflow", sub: "Nothing coming out of the vents", icon: "power" },
  { value: "New system / replacement estimate", title: "I need a new system", sub: "Free replacement or install estimate", icon: "unitPlus" },
  { value: "Maintenance / tune-up", title: "Tune-up or maintenance", sub: "Get ahead of the summer heat", icon: "gauge" },
  { value: "Not sure / other", title: "Something else / not sure", sub: "Ducts, mini-split, air quality, other", icon: "question" },
];

export const services: {
  title: string;
  text: string;
  img: string;
  icon: IconName;
  pick: string;
  cta: string;
  /** Full service page on the main site */
  href: string;
  hot?: boolean;
}[] = [
  {
    title: "AC Repair",
    text: "Warm air, strange noises, or an AC that won't kick on? We find the real problem and fix it right the first time.",
    img: "/images/svc-ac-repair.jpg",
    icon: "wrench",
    pick: "AC not cooling",
    href: page("hvac-repairs-in-las-vegas"),
    cta: "Get a free estimate",
  },
  {
    title: "AC Installation & Replacement",
    text: "Properly sized, energy-efficient systems installed clean and on schedule — with a free, no-pressure estimate.",
    img: "/images/svc-ac-install.jpg",
    icon: "unitPlus",
    pick: "New system / replacement estimate",
    href: page("ac-installations-in-las-vegas"),
    cta: "Get a free estimate",
  },
  {
    title: "Heating Repair & Installation",
    text: "Furnace and heat pump repair, replacement and installation so cold desert nights stay comfortable.",
    img: "/images/svc-heating.jpg",
    icon: "flame",
    pick: "Heat not working",
    href: page("heating-services"),
    cta: "Get a free estimate",
    hot: true,
  },
  {
    title: "Maintenance & Tune-Ups",
    text: "Seasonal tune-ups that catch problems early, lower your energy bill and help your system last longer.",
    img: "/images/svc-maintenance.jpg",
    icon: "gauge",
    pick: "Maintenance / tune-up",
    href: page("hvac-maintenance-las-vegas"),
    cta: "Book a tune-up",
  },
  {
    title: "Ductless Mini-Splits",
    text: "Room-by-room comfort for garages, casitas, additions and hot upstairs bedrooms — no ductwork needed.",
    img: "/images/svc-ductless.jpg",
    icon: "split",
    pick: "Ductless mini-split",
    href: page("hvac-ductless-mini-split-systems"),
    cta: "Get a free estimate",
  },
  {
    title: "Ductwork & Indoor Air Quality",
    text: "Leaky or crushed ducts repaired and sealed, plus air quality solutions for cleaner air in a dusty climate.",
    img: "/images/svc-ducts.jpg",
    icon: "duct",
    pick: "Ductwork / indoor air quality",
    href: page("indoor-air-quality-las-vegas"),
    cta: "Get a free estimate",
  },
];

/** Real Google review excerpts from the client's current site */
export const reviews = [
  { name: "Anthony Woo", text: "Very pleasant and professional, my guy got onto my 2 story roof in 100-degree weather.", color: "#2fa9cf" },
  { name: "Daniel Galbraith", text: "Bogdan was very professional and was able to diagnose the issue make the necessary part replacement right away.", color: "#e2372b" },
  { name: "Kirsten Meador", text: "Family owned — very professional — very honest.", color: "#0f3946" },
  { name: "trygg", text: "Their pricing was competitive, and the installation was timely and professional.", color: "#d9541e" },
  { name: "Adrienne Gutzwa", text: "The most knowledgeable technician Bogdan, we had the best service!", color: "#2fa9cf" },
  { name: "Marco Lecumberri", text: "Being honest, it was a simple fix in the interior fan.", color: "#0f3946" },
];

export const faqs = [
  {
    q: "Do you offer free estimates?",
    a: "Yes. Estimates for new AC and heating system installs and replacements are free with no obligation. Fill out the form above or give us a call to set one up.",
  },
  {
    q: "Do you offer 24/7 emergency service?",
    a: `Yes. AC failures in Las Vegas can't wait, so we're available 24/7 — including nights, weekends and holidays. Call ${site.phone}.`,
  },
  {
    q: "Are you licensed and insured?",
    a: `Absolutely. Wave Heating & Cooling is licensed, bonded and insured in Nevada (license ${site.license}), and our technicians are NATE-certified.`,
  },
  {
    q: "Should I repair or replace my AC?",
    a: "It depends on your system's age, the cost of the repair and how much you're spending to run it. If an older system needs frequent or costly repairs, replacement is often the better value. We'll give you honest advice either way — if it's a simple fix, we'll tell you.",
  },
  {
    q: "How often should my HVAC system be serviced?",
    a: "We recommend a tune-up twice a year — your AC in spring before the heat arrives and your heating in fall. In the Las Vegas climate, regular maintenance is the best way to prevent mid-summer breakdowns.",
  },
  {
    q: "What areas do you serve?",
    a: `The whole Las Vegas valley, including ${serviceAreas.slice(0, 9).join(", ")} and more.`,
  },
];

/** Featured posts from the client's blog ("Best Practices") */
export const guides = [
  {
    title: "How to Choose the Right-Sized AC for Las Vegas Weather Extremes",
    text: "Too big or too small both cost you. What to look for before you replace your system.",
    img: "/images/blog/right-sized-ac.jpg",
    tag: "Buying a system",
    href: `${site.url}/2025/07/15/how-to-choose-the-right-sized-ac/`,
  },
  {
    title: "Duct Leaks Steal Your Heat: Warmer Rooms and Lower Bills",
    text: "How leaky ducts waste the air you pay for, and the signs your home has them.",
    img: "/images/blog/duct-leaks.png",
    tag: "Ductwork",
    href: `${site.url}/2025/10/24/duct-leaks-steal-your-heat/`,
  },
  {
    title: "Carbon Monoxide & Winter HVAC Safety: A Calm Homeowner's Guide",
    text: "What every Las Vegas homeowner should check before turning on the heat this winter.",
    img: "/images/blog/carbon-monoxide.jpg",
    tag: "Safety",
    href: `${site.url}/2025/11/13/carbon-monoxide-winter-hvac-safety/`,
  },
];
