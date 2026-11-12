// Single source of truth for business facts — edit here, the whole site updates.

export const site = {
  name: "Wave Heating & Cooling",
  legalName: "Wave Heating & Cooling LLC",
  url: "https://waveheatingandcooling.com",
  phone: "(702) 881-4713",
  phoneHref: "tel:+17028814713",
  smsHref: "sms:+17028814713",
  license: "#0086052",
  /** Housecall Pro online booking — every "book" CTA and form on the site goes here */
  bookingUrl:
    "https://book.housecallpro.com/book/Wave-Heating--Cooling-LLC/e66436b677af472c937279994c3ba3e4?v2=true",
  address: {
    street: "4225 Plumeria Mist St",
    city: "Las Vegas",
    state: "NV",
    zip: "89129",
  },
  tagline: "Las Vegas' Most Trusted Heating and Cooling Solutions",
  geo: { lat: 36.2379451, lng: -115.280182 },
  /** Google Business Profile listing */
  googleMapsUrl:
    "https://www.google.com/maps/place/Wave+Heating+%26+Cooling+LLC/@36.2379494,-115.2827569,17z/data=!4m6!3m5!1s0x80c8c120faee6b8d:0xc04b392b77dc6c59!8m2!3d36.2379451!4d-115.280182!16s%2Fg%2F11fph2r492",
  /** Business hours. Wave does NOT offer 24/7 service; it offers same-day visits in most of the valley. */
  hours: "[Wave to confirm business hours]",
  googleReviewsUrl:
    "https://www.google.com/search?q=Wave+Heating+%26+Cooling+Las+Vegas+reviews",
  ratings: [
    { platform: "Google", score: "5.0" },
    { platform: "Facebook", score: "5.0" },
    { platform: "Yelp", score: "4.8" },
  ],
};

/** Internal routes (trailing slash matches next.config `trailingSlash: true`) */
const page = (path: string) => `/${path}/`;

export const pages = {
  about: page("about-us"),
  contact: page("contact"),
  reviews: page("reviews"),
  referral: page("referral-program"),
  financing: page("financing"),
  specials: page("specials"),
  faq: page("faq"),
  team: page("our-team"),
  services: page("services"),
  areas: page("service-area-las-vegas"),
  tools: page("tools"),
  blog: page("blog"),
  privacy: page("privacy-policy"),
  terms: page("terms"),
  thankYou: page("thank-you"),
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
  | "plus" | "lock" | "power" | "question" | "star" | "bolt" | "drop" | "menu" | "close"
  | "sun" | "drag" | "moon" | "boot" | "ladder" | "sheet" | "broom" | "permit";

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
  { value: "New system / replacement estimate", title: "I need a new system", sub: "Replacement or new install", icon: "unitPlus" },
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
  /** Full service page */
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
    cta: "Get an estimate",
  },
  {
    title: "AC Installation & Replacement",
    text: "Full matched systems, sized to your home, permitted and safety-inspected, with your home protected and cleaned up after.",
    img: "/images/svc-ac-install.jpg",
    icon: "unitPlus",
    pick: "New system / replacement estimate",
    href: page("ac-replacement-in-las-vegas"),
    cta: "Schedule an assessment",
  },
  {
    title: "Heating Repair & Installation",
    text: "Furnace and heat pump repair, replacement and installation so cold desert nights stay comfortable.",
    img: "/images/svc-heating.jpg",
    icon: "flame",
    pick: "Heat not working",
    href: page("heating-services"),
    cta: "Get an estimate",
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
    href: page("ductless-mini-split-systems-in-las-vegas"),
    cta: "Get an estimate",
  },
  {
    title: "Ductwork & Indoor Air Quality",
    text: "Leaky or crushed ducts repaired and sealed, plus air quality solutions for cleaner air in a dusty climate.",
    img: "/images/svc-ducts.jpg",
    icon: "duct",
    pick: "Ductwork / indoor air quality",
    href: page("indoor-air-quality-las-vegas"),
    cta: "Get an estimate",
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
    q: "How do I book service or an estimate?",
    a: "Book online in about a minute — pick what's going on and choose a time that works for you. Or call us and we'll set it up.",
  },
  {
    q: "Do you offer same-day service?",
    a: `In most of the Las Vegas valley, yes, depending on demand during heat waves. We put no-cooling calls first, and there's no after-hours, weekend or holiday surcharge. Call ${site.phone}.`,
  },
  {
    q: "How much is a repair visit?",
    a: "Repair visits start with an $89 diagnostic. On weekdays (Mon–Fri, 7am–6pm), if you approve the repair during the visit, the $89 is waived. Nights, weekends and holidays cost the same as weekdays. Our vans carry the most common parts, so many repairs are done on the first visit, and you get the price before any work starts.",
  },
  {
    q: "Are you licensed and insured?",
    a: `Absolutely. Wave Heating & Cooling is licensed, bonded and insured in Nevada (license ${site.license}), and most of our technicians are NATE-certified.`,
  },
  {
    q: "Should I repair or replace my AC?",
    a: "Most of the time, repair. If your system is under 15 years old and the repair is a common one like a capacitor, contactor or fan motor, fixing it is the better value. On a system over 15 years old, once a repair reaches about $2,000, or the compressor has burned out, replacing usually makes more sense. We'll give you honest advice either way.",
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

/** Homepage FAQs: what replacement buyers ask before they call (also shown on /faq/) */
export const replacementFaqs = [
  {
    q: "Will you try to sell me a new system I don't need?",
    a: "No. We diagnose first and show you what we find. If a repair will get you more good years, we'll tell you and fix it. If replacement makes more sense, we'll show you the numbers, and the decision is always yours.",
  },
  {
    q: "I already have a quote. Can you look at it?",
    a: "Yes. Bring it to your assessment and we'll go through it with you line by line: what's included, what's missing, and how it compares with what your home actually needs.",
  },
  {
    q: "Why do AC replacement quotes in Las Vegas vary so much?",
    a: "Because they don't always include the same things. The equipment is only part of the price. A full installed price also covers the matched indoor unit, line set, pad, electrical, permit, a full day of labor, the safety inspection and haul-away. Some quotes leave pieces out, so always ask for everything in writing.",
  },
  {
    q: "Do you pull permits?",
    a: "Yes, on every replacement. The county inspects the install, not just us, and we handle all the paperwork.",
  },
  {
    q: "Do you replace the whole system or just one unit?",
    a: "Usually the whole system, indoor and outdoor, so every part is matched. We can replace just one unit when the new part matches your system's refrigerant and the equipment is available. Refrigerants have changed (R-22, then R-410A, now R-32 and R-454B), so we check that at your visit before we quote it.",
  },
  {
    q: "Can you give me a price over the phone?",
    a: "Our estimate form gives you a range in about a minute, from $9,800 for a complete system in a smaller home. For an exact quote we come out and look: your ductwork was built for a certain size of system, so we match it, and we check access, electrical and refrigerant before we put a number in writing.",
  },
  {
    q: "Will you make a mess in my house?",
    a: "No. We wear booties, put padding down before any ladder touches the floor, cover walls, closets and beds in plastic, and sweep and vacuum when we're done. Your home looks the way we found it, or better.",
  },
  {
    q: "How long does a replacement take?",
    a: "Most replacements take about a full day, and we can often install as early as the same day you say yes. We'll tell you what to expect for your home when we come out for the assessment.",
  },
  {
    q: "What safety checks do you do?",
    a: "Before we call any job done we check electrical connections and breaker sizing, furnace gas lines and venting (including a carbon monoxide check), refrigerant pressures and the drain line.",
  },
  {
    q: "How do I know if I should repair or replace?",
    a: "If your system is over 15 years old and needs a repair of about $2,000 or more, replacement usually makes more sense. A burned-out compressor or a refrigerant leak in a spot we can't reach usually means replace too. Older R-22 systems get more expensive to repair every year as parts and refrigerant get harder to find. We'll show you the numbers and you decide. If a repair makes more sense, we'll tell you.",
  },
  {
    q: "What should I have ready when I call?",
    a: "Four things: your system's age (it's on the sticker on the outside unit), what's going wrong, your home's rough square footage, and your timeline. With those, the call takes about 10 minutes.",
  },
  {
    q: "Can I pay monthly?",
    a: "Yes. Financing is available with approved credit on jobs of $1,500 or more, from about $114 a month for every $10,000 financed. We'll show you the monthly payment and the total side by side.",
  },
];

/** Featured posts from the client's blog ("Best Practices") */
export const guides = [
  {
    title: "How to Choose the Right-Sized AC for Las Vegas Weather Extremes",
    text: "Too big or too small both cost you. What to look for before you replace your system.",
    img: "/images/blog/how-to-choose-the-right-sized-ac.jpg",
    tag: "Buying a system",
    href: "/blog/how-to-choose-the-right-sized-ac/",
  },
  {
    title: "Duct Leaks Steal Your Heat: Warmer Rooms and Lower Bills",
    text: "How leaky ducts waste the air you pay for, and the signs your home has them.",
    img: "/images/blog/duct-leaks-steal-your-heat.png",
    tag: "Ductwork",
    href: "/blog/duct-leaks-steal-your-heat/",
  },
  {
    title: "Carbon Monoxide & Winter HVAC Safety: A Calm Homeowner's Guide",
    text: "What every Las Vegas homeowner should check before turning on the heat this winter.",
    img: "/images/blog/carbon-monoxide-winter-hvac-safety.png",
    tag: "Safety",
    href: "/blog/carbon-monoxide-winter-hvac-safety/",
  },
];
