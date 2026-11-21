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
  /** Business hours: open 24/7, every day (owner-approved Nov 2026; keep the Google Business Profile in step). */
  hours: "Open 7 days a week, 24/7",
  /** Same hours for LocalBusiness schema (24-hour clock; 00:00–23:59 every day = open around the clock) */
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
  googleReviewsUrl:
    "https://www.google.com/search?q=Wave+Heating+%26+Cooling+Las+Vegas+reviews",
  /** Yelp listing. Search link until Wave sends the exact listing URL. */
  yelpUrl: "https://www.yelp.com/search?find_desc=Wave+Heating+%26+Cooling&find_loc=Las+Vegas%2C+NV",
  /** Each rating's logo and score link to that platform's reviews */
  /**
   * Optional proof points. Each one stays hidden on the site until it's filled in.
   * TODO: client to confirm real numbers before setting any of these.
   */
  stats: {} as { years?: number; homesServed?: number; reviewCount?: number },
  /**
   * One-line workmanship guarantee shown in the hero and on the $89 card, e.g.
   * "Fixed right, or we come back free for 30 days." Hidden until set.
   * TODO: client to confirm the exact terms before setting this.
   */
  guarantee: undefined as string | undefined,
  /** BBB rating, e.g. "A+". TODO: set only if Wave is BBB accredited. */
  bbb: undefined as string | undefined,
  /** `count` (number of reviews) shows next to the score once set. TODO: client to confirm each count. */
  ratings: [
    {
      platform: "Google",
      score: "5.0",
      href: "https://www.google.com/search?q=Wave+Heating+%26+Cooling+Las+Vegas+reviews",
    },
    { platform: "Facebook", score: "5.0", href: "https://www.facebook.com/waveheatingandcooling/reviews" },
    {
      platform: "Yelp",
      score: "4.8",
      href: "https://www.yelp.com/search?find_desc=Wave+Heating+%26+Cooling&find_loc=Las+Vegas%2C+NV",
    },
  ] as { platform: string; score: string; href: string; count?: number }[],
};

/** "Google" or, once a review count is set, "Google · 120 reviews" */
export const ratingLabel = (r: { platform: string; count?: number }) =>
  r.count ? `${r.platform} · ${r.count.toLocaleString()} reviews` : r.platform;

/** Internal routes (trailing slash matches next.config `trailingSlash: true`) */
const page = (path: string) => `/${path}/`;

export const pages = {
  about: page("about-us"),
  contact: page("contact"),
  reviews: page("reviews"),
  referral: page("referral-program"),
  financing: page("financing"),
  faq: page("faq"),
  team: page("our-team"),
  services: page("services"),
  areas: page("service-area-las-vegas"),
  tools: page("tools"),
  blog: page("blog"),
  privacy: page("privacy-policy"),
  terms: page("terms"),
  thankYou: page("thank-you"),
  brands: page("brands-we-service"),
  facebook: "https://www.facebook.com/waveheatingandcooling",
};

/**
 * Social profiles. The footer shows an icon link only for the ones that are set.
 * TODO: Wave to send the TikTok, YouTube and Instagram URLs once those accounts are posting.
 */
export const social: { facebook?: string; instagram?: string; tiktok?: string; youtube?: string } = {
  facebook: pages.facebook,
  instagram: undefined,
  tiktok: undefined,
  youtube: undefined,
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
  /** Describes the photo; leave out for decorative stock images */
  alt?: string;
  icon: IconName;
  pick: string;
  /** Full service page */
  href: string;
  hot?: boolean;
}[] = [
  {
    title: "Air Conditioning Repair",
    text: "Warm air, strange noises, or an air conditioner that won't kick on? We find the real problem and fix it right the first time.",
    img: "/images/work/rooftop-ac-repair.jpg",
    alt: "Wave technician testing a rooftop packaged air conditioning unit with refrigerant gauges, its service panel open",
    icon: "wrench",
    pick: "AC not cooling",
    href: page("hvac-repairs-in-las-vegas"),
  },
  {
    title: "AC Installation & Replacement",
    text: "Full matched systems, sized to your home, permitted and safety-inspected, with your home protected and cleaned up after.",
    img: "/images/work/new-condensers.jpg",
    icon: "unitPlus",
    pick: "New system / replacement estimate",
    href: page("ac-replacement-in-las-vegas"),
  },
  {
    title: "Heating Repair & Installation",
    text: "Furnace and heat pump repair, replacement and installation so cold desert nights stay comfortable.",
    img: "/images/work/furnace-garage.jpg",
    icon: "flame",
    pick: "Heat not working",
    href: page("heating-services"),
    hot: true,
  },
  {
    title: "Maintenance & Tune-Ups",
    text: "Seasonal tune-ups that catch problems early, lower your energy bill and help your system last longer.",
    img: "/images/work/condenser-inside.jpg",
    icon: "gauge",
    pick: "Maintenance / tune-up",
    href: page("hvac-maintenance-las-vegas"),
  },
  {
    title: "Ductless Mini-Splits",
    text: "Room-by-room comfort for garages, casitas, additions and hot upstairs bedrooms — no ductwork needed.",
    img: "/images/svc-ductless.jpg",
    icon: "split",
    pick: "Ductless mini-split",
    href: page("ductless-mini-split-systems-in-las-vegas"),
  },
  {
    title: "Ductwork & Indoor Air Quality",
    text: "Leaky or crushed ducts repaired and sealed, plus air quality solutions for cleaner air in a dusty climate.",
    img: "/images/work/attic-air-handler-ductwork.jpg",
    alt: "Attic air handler with a foil-lined supply plenum and new insulated flex ductwork",
    icon: "duct",
    pick: "Ductwork / indoor air quality",
    href: page("indoor-air-quality-las-vegas"),
  },
];

/** Real Google review excerpts from the client's current site */
export const reviews = [
  { name: "Anthony Woo", text: "Very pleasant and professional, my guy got onto my 2 story roof in 100-degree weather.", color: "#2fa9cf" },
  { name: "Tommy Sang Lee", text: "Oscar, our technician, came out to perform our AC’s annual maintenance. He’s honest and thorough in his inspection, providing excellent service. I’m glad he didn’t upsell or offer unnecessary services.", color: "#0f3946" },
  { name: "Daniel Galbraith", text: "Bogdan was very professional and was able to diagnose the issue make the necessary part replacement right away.", color: "#e2372b" },
  { name: "Kirsten Meador", text: "Family owned — very professional — very honest.", color: "#0f3946" },
  { name: "trygg", text: "Their pricing was competitive, and the installation was timely and professional.", color: "#d9541e" },
  { name: "Adrienne Gutzwa", text: "The most knowledgeable technician Bogdan, we had the best service!", color: "#2fa9cf" },
  { name: "Marco Lecumberri", text: "Being honest, it was a simple fix in the interior fan.", color: "#0f3946" },
];

/** FAQ answers can hold several paragraphs: separate them with a blank line ("\n\n") */
export const faqParagraphs = (a: string) =>
  a
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

/** Brands Wave services and repairs (homepage FAQ answer and the /brands-we-service/ page) */
export const brands = [
  "Carrier",
  "Trane",
  "Lennox",
  "Goodman",
  "Amana",
  "Daikin",
  "Rheem",
  "Ruud",
  "York",
  "American Standard",
  "Bryant",
  "Coleman",
  "AC Pro",
];

export const faqs = [
  {
    q: "What types and brands of HVAC equipment do you service and repair?",
    a: "We service and repair central air conditioners, gas furnaces, heat pumps, ductless mini-splits, and packaged rooftop units. We work with most major HVAC brands, including Carrier, Trane, Lennox, Goodman, Amana, Daikin, Rheem, Ruud, York, American Standard, Bryant, Coleman, and AC Pro. We provide professional diagnostics and reliable repairs throughout the Las Vegas Valley.",
  },
  {
    q: "How do I book service or an estimate?",
    a: "Book online in about a minute — pick what's going on and choose a time that works for you. Or call us and we'll set it up.",
  },
  {
    q: "Do you offer same day and emergency HVAC service?",
    a: `Yes! We offer same-day HVAC service, subject to availability, and prioritize homes without heating or cooling. No additional charges for after-hours, weekends, or holidays. Call ${site.phone} to schedule your service.`,
  },
  {
    q: "How much is a repair visit?",
    a: "Our diagnostic fee is $89 and is waived when you approve the repair during your visit, Monday–Friday, 7 AM–6 PM. We never charge extra for evenings, weekends, or holidays. Our fully stocked service vehicles allow us to complete many repairs on the first visit, with transparent, upfront pricing and no surprises.",
  },
  {
    q: "Are you licensed and insured?",
    a: `Absolutely. Wave Heating & Cooling is licensed, bonded and insured in Nevada (license ${site.license}), and we are NATE certified.`,
  },
  {
    q: "Should I repair or replace my AC?",
    a: [
      "Not every AC problem requires a new system. In many cases, a properly diagnosed repair is the most practical and cost-effective solution.",
      "When recommending repair or replacement, we consider the age of your equipment, its overall condition, repair history, energy efficiency, and long-term reliability. In the demanding Las Vegas climate, we also understand how important it is to have a system you can depend on during extreme summer temperatures.",
      "At Wave Heating & Cooling, we explain your options, provide transparent pricing, and help you understand the short-term and long-term value of each solution.",
      "Our goal is not to sell you a new system. It's to help you make the right decision for your home, comfort, and budget.",
    ].join("\n\n"),
  },
  {
    q: "How often should my HVAC system be serviced?",
    a: "We recommend professional maintenance twice a year — cooling in the spring and heating in the fall. Regular maintenance helps improve energy efficiency, extend equipment lifespan, and reduce unexpected breakdowns. Our Wave Club maintenance plan makes it easy to keep your system running reliably year-round.",
  },
  {
    q: "What areas do you serve?",
    a: `The whole Las Vegas valley, including ${serviceAreas.slice(0, 9).join(", ")} and more. We provide professional heating and air conditioning repair, maintenance, and installation services.`,
  },
];

/** Homepage FAQs: what replacement buyers ask before they call (also shown on /faq/) */
export const replacementFaqs = [
  {
    q: "Will you try to sell me a new system I don't need?",
    a: "Absolutely not. We diagnose first, explain our findings, and recommend what's best for your home and budget. If a repair is a reliable solution, we'll recommend it. If replacement offers better long-term value, we'll explain why. No unnecessary upselling, no sales pressure. The decision is always yours.",
  },
  {
    q: "I already have a quote. Can you look at it?",
    a: "Absolutely! We'll help you compare estimates apples to apples, including equipment specifications, installation scope, warranties, and overall value. Our goal is to help you make an informed decision with confidence, without any sales pressure.",
  },
  {
    q: "Why do AC replacement quotes in Las Vegas vary so much?",
    a: "Not all AC replacement quotes include the same equipment, materials, installation standards, permits, or warranty coverage. A quality installation is just as important as the equipment itself. At Wave Heating & Cooling, we provide detailed, transparent estimates so you know exactly what you're paying for and can compare true long-term value, not just the initial price.",
  },
  {
    q: "Do you pull permits?",
    a: "Yes! We obtain all required permits, handle the paperwork, and coordinate inspections with the local building department to ensure your HVAC installation meets applicable building codes and safety standards.",
  },
  {
    q: "Do you replace the whole system or just one unit?",
    a: "We offer both options, depending on your equipment's age, condition, compatibility, and refrigerant type. While a properly matched complete system often provides better efficiency, reliability, and long-term value, a partial replacement may be a practical solution. We'll evaluate your existing equipment and recommend what's best for your home and budget.",
  },
  {
    q: "How does the warranty work?",
    a: "Warranty coverage varies depending on the equipment and installation package selected. We clearly explain your manufacturer's parts warranty and labor warranty, handle equipment registration on your behalf, and assist you with warranty-related service when needed. Our commitment to your comfort continues long after installation.",
  },
  {
    q: "Can you give me a price over the phone?",
    a: "Our estimate form gives you a range in about a minute, from $9,800 for a complete system in a smaller home. For an exact quote we come out and look: your ductwork was built for a certain size of system, so we match it, and we check access, electrical and refrigerant before we put a number in writing.",
  },
  {
    q: "Will you make a mess in my house?",
    a: "No. We wear booties, lay protective tarp from your entrance all the way to the indoor unit, cover walls, closets and beds in plastic, and sweep and vacuum when we're done. Your home looks the way we found it, or better.",
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
    a: "Four things: your system's approximate age (usually on the data plate on the unit), what's going wrong, your home's rough square footage, and your timeline. With those, the call takes about 10 minutes.",
  },
  {
    q: "Can I pay monthly?",
    a: "Yes. Financing is available with approved credit on jobs of $1,500 or more, from about $114 a month for every $10,000 financed. We'll show you the monthly payment and the total side by side.",
  },
];

/**
 * Real Wave job photos for the homepage before/after sliders. Add a pair here (same framing, before and after)
 * and the homepage shows arrows and a tab for each job.
 */
export const beforeAfter = [
  {
    label: "Condenser tune-up",
    before: "/images/before.jpg",
    after: "/images/after.jpg",
    beforeAlt: "Condenser before maintenance — debris built up",
    afterAlt: "Condenser after a Wave tune-up — clean and clear",
  },
  {
    label: "Attic coil plenum",
    before: "/images/work/coil-plenum-before.jpg",
    after: "/images/work/coil-plenum-after.jpg",
    beforeAlt: "Attic coil plenum before Wave's repair, with torn, taped-over openings and loose insulation",
    afterAlt: "The same attic coil plenum rebuilt by Wave with new foil-faced duct board and clean, sealed openings",
  },
];

/** Featured posts from the client's blog ("Best Practices") */
export const guides = [
  {
    title: "Professional HVAC Maintenance in Las Vegas",
    text: "How regular tune-ups keep your system efficient, comfortable and running longer in the desert heat.",
    img: "/images/svc-maintenance.jpg",
    tag: "Maintenance",
    href: "/blog/hvac-maintenance-in-las-vegas-your-guide-to-comfort-efficiency-and-longevity/",
  },
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
];
