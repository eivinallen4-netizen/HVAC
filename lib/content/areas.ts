import type { Faq } from "./types";

export type AreaPage = {
  slug: string;
  name: string;
  /** e.g. "Henderson, NV" */
  full: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** Local housing / climate paragraphs — unique per area */
  local: string[];
  zips: string[];
  neighborhoods: string[];
  /** Service slugs most requested in this area */
  popular: string[];
  faqs: Faq[];
};

const t = (name: string) => {
  const base = `HVAC & AC Repair ${name}, NV`;
  return base.length > 38 ? `${base} | Wave` : `${base} | Wave Heating & Cooling`;
};

export const areaPages: AreaPage[] = [
  {
    slug: "north-las-vegas-nv",
    name: "North Las Vegas",
    full: "North Las Vegas, NV",
    title: t("North Las Vegas"),
    description:
      "AC repair, heating and HVAC installation in North Las Vegas, NV. Family-owned, NATE-certified and available 24/7. Book online or call (702) 881-4713.",
    h1: "AC Repair & HVAC Services in North Las Vegas, NV",
    intro:
      "From established neighborhoods near Craig Road to newer master-planned communities like Aliante, Valley Vista and Tule Springs, North Las Vegas homeowners count on Wave Heating & Cooling for fast AC repair, reliable heating and honest advice on new systems.",
    local: [
      "North Las Vegas grew quickly through the 2000s, which means thousands of homes now have original HVAC systems that are 15–20 years old. Many of those systems are reaching the point where a repair-or-replace decision makes sense — especially units still running on R-22 refrigerant.",
      "The northern valley sits in open desert with fewer mature trees, so rooftop and side-yard condensers take the full force of the afternoon sun. Keeping condenser coils clean and capacitors healthy is the best way to avoid a mid-summer breakdown here.",
    ],
    zips: ["89030", "89031", "89032", "89081", "89084", "89085", "89086"],
    neighborhoods: ["Aliante", "Eldorado", "Craig Ranch", "Valley Vista", "Tule Springs", "Shadow Creek area"],
    popular: ["hvac-repairs-in-las-vegas", "ac-replacement-in-las-vegas", "ac-maintenance-in-las-vegas"],
    faqs: [
      {
        q: "Do you offer same-day AC repair in North Las Vegas?",
        a: "In most cases, yes. We answer 24/7 and prioritize no-cooling calls throughout North Las Vegas, depending on demand during heat waves.",
      },
      {
        q: "My North Las Vegas home still has its original AC. Should I replace it?",
        a: "If it's 15+ years old, uses R-22 refrigerant or needs a costly repair, replacement is often the better value. Try our Repair or Replace Calculator, or ask for an estimate.",
      },
    ],
  },
  {
    slug: "henderson-nv",
    name: "Henderson",
    full: "Henderson, NV",
    title: t("Henderson"),
    description:
      "Henderson, NV AC repair, heating, ductwork and new HVAC systems. Family-owned, NATE-certified, 24/7 service. Book online or call (702) 881-4713.",
    h1: "AC Repair & HVAC Services in Henderson, NV",
    intro:
      "Wave Heating & Cooling serves homeowners all across Henderson — from long-established Green Valley streets to hillside homes in Anthem and Seven Hills and newer builds in Inspirada and Cadence — with 24/7 AC repair, heating service and expert installations.",
    local: [
      "Henderson has one of the widest ranges of home ages in the valley. Older neighborhoods in Green Valley and around Whitney Ranch often have systems and ductwork from the 1980s and '90s, while Inspirada and Cadence homes are only a few years old. That means the right advice really depends on the house — and we tailor it to yours.",
      "Many Henderson homes are two stories with long duct runs to upstairs bedrooms. If your upstairs never cools down, the cause is often airflow or duct leakage rather than the AC itself — and duct sealing or a ductless mini-split can fix it without replacing your whole system.",
    ],
    zips: ["89002", "89011", "89012", "89014", "89015", "89044", "89052", "89074"],
    neighborhoods: ["Green Valley", "Anthem", "Seven Hills", "Inspirada", "Cadence", "MacDonald Ranch", "Lake Las Vegas", "Whitney Ranch"],
    popular: ["hvac-repairs-in-las-vegas", "hvac-ductwork-las-vegas", "ductless-mini-split-systems-in-las-vegas"],
    faqs: [
      {
        q: "Do you serve all of Henderson?",
        a: "Yes — including Green Valley, Anthem, Seven Hills, Inspirada, Cadence, MacDonald Ranch and Lake Las Vegas.",
      },
      {
        q: "Why is my upstairs so much hotter than downstairs?",
        a: "Heat rises, and upstairs rooms in two-story Henderson homes often sit under hot attics with long duct runs. Duct leaks, airflow problems and system sizing are the usual causes. We'll diagnose it and recommend the most cost-effective fix.",
      },
    ],
  },
  {
    slug: "summerlin-nv",
    name: "Summerlin",
    full: "Summerlin, Las Vegas, NV",
    title: t("Summerlin"),
    description:
      "HVAC and AC repair in Summerlin, Las Vegas. High-efficiency installs, heat pumps, zoning and 24/7 repair from a local, family-owned team. (702) 881-4713.",
    h1: "AC Repair & HVAC Services in Summerlin",
    intro:
      "Summerlin homeowners expect quality — and so do we. Wave Heating & Cooling provides 24/7 AC repair, heating service, high-efficiency system upgrades and indoor air quality solutions across Summerlin's villages, just minutes from our northwest Las Vegas headquarters.",
    local: [
      "Summerlin sits higher on the west side of the valley, so evenings run a few degrees cooler than central Las Vegas — but summer afternoons are just as brutal on equipment. Many Summerlin homes are larger, two-story floor plans where zoning, variable-speed systems and smart thermostats make a real difference in comfort and efficiency.",
      "With homes built from the early 1990s to today, Summerlin has a mix of systems nearing replacement and newer high-efficiency equipment that needs proper maintenance to keep its warranty and efficiency. Either way, we'll give you a straight answer.",
    ],
    zips: ["89134", "89135", "89138", "89144", "89145"],
    neighborhoods: ["The Ridges", "Red Rock Country Club", "The Paseos", "Stonebridge", "The Trails", "The Hills", "Downtown Summerlin area"],
    popular: ["ac-replacement-in-las-vegas", "indoor-air-quality-las-vegas", "hvac-maintenance-las-vegas"],
    faqs: [
      {
        q: "How close are you to Summerlin?",
        a: "Our headquarters is in northwest Las Vegas (89129), just minutes from most Summerlin villages, so we can usually get to you quickly.",
      },
      {
        q: "Do you install zoning systems in large Summerlin homes?",
        a: "Yes. Zoning, variable-speed equipment and ductless mini-splits are all great options for larger, multi-story homes with uneven temperatures.",
      },
    ],
  },
  {
    slug: "sun-city-summerlin-nv",
    name: "Sun City Summerlin",
    full: "Sun City Summerlin, NV",
    title: t("Sun City Summerlin"),
    description:
      "Trusted, honest HVAC service for Sun City Summerlin homeowners. 24/7 AC repair, heating, tune-ups and replacements. No pressure. Call (702) 881-4713.",
    h1: "Honest AC & Heating Service in Sun City Summerlin",
    intro:
      "For many Sun City Summerlin residents, a working air conditioner is a health and safety issue — not just comfort. Wave Heating & Cooling provides fast, respectful, no-pressure HVAC service to the community, with 24/7 availability and straight answers.",
    local: [
      "Sun City Summerlin homes were built from the late 1980s through the 1990s, and many have had their HVAC systems replaced once already — or are due. Older ductwork and original attic insulation are also common, which can make homes harder to keep cool even with a newer system.",
      "We know many residents prefer to deal with a company that explains things clearly and never pushes. If a repair makes sense, we'll fix it. If replacement is worth considering, we'll show you why and let you decide — with no pressure and no high-pressure sales tactics.",
    ],
    zips: ["89134", "89144"],
    neighborhoods: ["Sun City Summerlin", "Highland Falls area", "Eagle Crest area", "Palm Valley area"],
    popular: ["emergency-ac-repair-las-vegas", "hvac-maintenance-las-vegas", "ac-replacement-in-las-vegas"],
    faqs: [
      {
        q: "Do you prioritize no-AC calls for seniors?",
        a: "Yes. Loss of cooling is dangerous for older adults in Las Vegas heat, and we prioritize no-cooling calls for seniors and other vulnerable residents.",
      },
      {
        q: "Is the Wave Club plan worth it for a single-story Sun City home?",
        a: "For most homeowners, yes. Two tune-ups a year, priority service and 15% off repairs usually pay for the membership — and peace of mind matters too.",
      },
    ],
  },
  {
    slug: "centennial-hills-nv",
    name: "Centennial Hills",
    full: "Centennial Hills, Las Vegas, NV",
    title: t("Centennial Hills"),
    description:
      "Your neighborhood HVAC company in Centennial Hills, Las Vegas. Fast AC repair, heating, installs and tune-ups — based right here in 89129. (702) 881-4713.",
    h1: "AC Repair & HVAC Services in Centennial Hills",
    intro:
      "Wave Heating & Cooling is based in northwest Las Vegas, so Centennial Hills is home turf. We provide fast AC repair, heating service, new system installations and tune-ups for homes throughout Centennial Hills, Providence, Skye Canyon and the surrounding northwest valley.",
    local: [
      "Most Centennial Hills homes were built in the late 1990s and 2000s, which puts a lot of original HVAC equipment at 15–25 years old. We see plenty of tired capacitors, worn condenser fan motors and leaky refrigerant coils each summer — and plenty of homeowners weighing repair against a more efficient replacement.",
      "Newer communities like Providence and Skye Canyon have younger, higher-efficiency systems that benefit most from regular maintenance and clean coils. The northwest valley's open desert and spring winds also push a lot of dust into outdoor units and homes, so filtration and coil cleaning matter here.",
    ],
    zips: ["89129", "89131", "89143", "89149", "89166"],
    neighborhoods: ["Providence", "Skye Canyon", "Iron Mountain Ranch", "Lone Mountain", "Elkhorn Springs area"],
    popular: ["hvac-repairs-in-las-vegas", "ac-maintenance-in-las-vegas", "ac-replacement-in-las-vegas"],
    faqs: [
      {
        q: "Are you local to Centennial Hills?",
        a: "Yes — our headquarters is at 4225 Plumeria Mist St in 89129, right in the northwest valley.",
      },
      {
        q: "How often should I clean my AC in Centennial Hills?",
        a: "With the dust and wind in the northwest valley, we recommend a professional tune-up with coil cleaning every spring, and checking your air filter monthly.",
      },
    ],
  },
  {
    slug: "the-lakes-nv",
    name: "The Lakes",
    full: "The Lakes, Las Vegas, NV",
    title: t("The Lakes"),
    description:
      "AC repair and HVAC service for The Lakes and Desert Shores in Las Vegas. Older home specialists: ductwork, replacements and 24/7 repair. (702) 881-4713.",
    h1: "AC Repair & HVAC Services in The Lakes & Desert Shores",
    intro:
      "The Lakes and Desert Shores are some of west Las Vegas' most established communities — and their homes deserve HVAC service that understands older systems. Wave Heating & Cooling provides 24/7 repair, ductwork upgrades and right-sized replacements in the area.",
    local: [
      "Many homes around Lake Sahara and Desert Shores were built in the 1980s and early '90s. Even if the AC has been replaced, the ductwork, attic insulation and return air design are often original — and they're frequently the real reason rooms stay hot or bills stay high.",
      "When we replace a system in an older home, we inspect the ductwork and recommend sealing or upgrades where they'll make a measurable difference. A new high-efficiency system connected to leaky 35-year-old ducts can't deliver the comfort you're paying for.",
    ],
    zips: ["89117", "89128"],
    neighborhoods: ["The Lakes", "Lake Sahara", "Desert Shores", "Canyon Gate area"],
    popular: ["hvac-ductwork-las-vegas", "ac-replacement-in-las-vegas", "hvac-repairs-in-las-vegas"],
    faqs: [
      {
        q: "My home in The Lakes is older. Do I need new ductwork with a new AC?",
        a: "Not always. We inspect the existing ducts and only recommend replacement where they're damaged, undersized or badly leaking. Often sealing and repairs are enough.",
      },
      {
        q: "Do you work in Desert Shores too?",
        a: "Yes, we serve The Lakes, Desert Shores and the surrounding west Las Vegas neighborhoods.",
      },
    ],
  },
  {
    slug: "aliante-nv",
    name: "Aliante",
    full: "Aliante, North Las Vegas, NV",
    title: t("Aliante"),
    description:
      "HVAC and AC repair in Aliante, North Las Vegas. Repairs, tune-ups and replacement estimates for Aliante homes from a local, NATE-certified team. (702) 881-4713.",
    h1: "AC Repair & HVAC Services in Aliante",
    intro:
      "Aliante's master-planned neighborhoods in North Las Vegas are now old enough that many homes are on their original heating and cooling systems. Wave Heating & Cooling helps Aliante homeowners keep those systems running — and plan smart replacements when the time comes.",
    local: [
      "Most of Aliante was built in the early-to-mid 2000s. Builder-grade AC systems from that era were typically 10–13 SEER and are now near the end of their expected life in Las Vegas heat. If yours is struggling, our Repair or Replace Calculator can help you decide whether one more repair makes sense.",
      "Upgrading from a builder-grade system to a modern, properly sized high-efficiency unit can noticeably cut summer power bills. Our Energy Savings Calculator gives you an estimate in about a minute.",
    ],
    zips: ["89084", "89031"],
    neighborhoods: ["Aliante", "Aliante Golf Club area", "Nature Discovery Park area"],
    popular: ["ac-replacement-in-las-vegas", "hvac-repairs-in-las-vegas", "ac-maintenance-in-las-vegas"],
    faqs: [
      {
        q: "How old are most AC systems in Aliante?",
        a: "Many Aliante homes were built in the early-to-mid 2000s, so original systems are commonly 18–22 years old — past the typical lifespan for a Las Vegas air conditioner.",
      },
      {
        q: "Will a new AC lower my bills in Aliante?",
        a: "Usually, yes — especially if you're replacing an original builder-grade system. Try our Energy Savings Calculator for an estimate.",
      },
    ],
  },
  {
    slug: "green-valley-nv",
    name: "Green Valley",
    full: "Green Valley, Henderson, NV",
    title: t("Green Valley"),
    description:
      "HVAC and AC repair in Green Valley, Henderson. Older-home specialists for replacements, ductwork and air quality, plus 24/7 repair. (702) 881-4713.",
    h1: "AC Repair & HVAC Services in Green Valley, Henderson",
    intro:
      "Green Valley was one of Henderson's first master-planned communities, and its mature, well-loved homes often need HVAC expertise that goes beyond the basics. Wave Heating & Cooling provides repair, replacement, ductwork and air quality service throughout Green Valley and Green Valley Ranch.",
    local: [
      "Original Green Valley homes date back to the late 1970s and '80s, with Green Valley Ranch following in the '90s and 2000s. In older homes we often find undersized returns, aging ductwork and systems that were replaced without a proper load calculation. Fixing those issues is how you get real comfort — not just a new box outside.",
      "Mature landscaping in Green Valley also means more leaves, pollen and debris around outdoor units. Keeping condenser coils clear and upgrading filtration helps both efficiency and indoor air quality.",
    ],
    zips: ["89012", "89014", "89052", "89074"],
    neighborhoods: ["Green Valley", "Green Valley Ranch", "Green Valley South", "The Fountains area"],
    popular: ["hvac-ductwork-las-vegas", "indoor-air-quality-las-vegas", "ac-replacement-in-las-vegas"],
    faqs: [
      {
        q: "Do you service older homes in Green Valley?",
        a: "Yes — older homes are a specialty. We look at the whole system, including ductwork and return air, so upgrades actually improve comfort.",
      },
      {
        q: "Can better filtration help with pollen in Green Valley?",
        a: "Yes. A high-efficiency media filter or whole-home air purifier can significantly reduce pollen, dust and other allergens circulating in your home.",
      },
    ],
  },
  {
    slug: "seven-hills-nv",
    name: "Seven Hills",
    full: "Seven Hills, Henderson, NV",
    title: t("Seven Hills"),
    description:
      "HVAC service for Seven Hills, Henderson: zoning, multi-system homes, high-efficiency upgrades and 24/7 AC repair. Call (702) 881-4713.",
    h1: "AC Repair & HVAC Services in Seven Hills, Henderson",
    intro:
      "Seven Hills' larger, multi-story hillside homes often have two or more HVAC systems — and more ways for comfort to go wrong. Wave Heating & Cooling services, repairs and upgrades multi-system and zoned homes throughout Seven Hills.",
    local: [
      "Built largely in the late 1990s and 2000s, many Seven Hills homes are now on aging original equipment, often with a separate system for each floor. When one fails, the other gets overloaded. Regular maintenance on every system — and Wave Club's discounted rate for additional units — keeps them working together.",
      "Big windows and valley views are a Seven Hills highlight, but they add a lot of solar heat. Proper sizing, zoning and smart thermostats help keep sun-facing rooms comfortable without overcooling the rest of the house.",
    ],
    zips: ["89052"],
    neighborhoods: ["Seven Hills", "Rio Secco area", "Anthem Highlands area"],
    popular: ["hvac-maintenance-las-vegas", "ac-replacement-in-las-vegas", "indoor-air-quality-las-vegas"],
    faqs: [
      {
        q: "My home has two AC systems. Do you discount maintenance?",
        a: "Yes. Wave Club is $150/year for the first system and $140/year for each additional system at the same property.",
      },
      {
        q: "Should I replace both systems at once?",
        a: "Not necessarily. We'll evaluate each system on its own condition and give you honest recommendations — sometimes staggering replacements makes the most sense.",
      },
    ],
  },
  {
    slug: "spring-valley-nv",
    name: "Spring Valley",
    full: "Spring Valley, NV",
    title: t("Spring Valley"),
    description:
      "AC repair, heating and HVAC installation in Spring Valley, NV. Homes, townhomes and rentals. 24/7 service, book online. (702) 881-4713.",
    h1: "AC Repair & HVAC Services in Spring Valley, NV",
    intro:
      "Spring Valley stretches across the southwest-central valley with a mix of single-family homes, townhomes and rental properties. Wave Heating & Cooling provides fast AC repair, heating service and replacements for homeowners, landlords and property managers throughout the area.",
    local: [
      "Much of Spring Valley was built between the 1980s and 2000s, so we see a wide range of system ages — from units well past their prime to newer replacements. Package units on rooftops and split systems in tight side yards are both common, and each comes with its own access and maintenance needs.",
      "For rental owners and property managers, reliable equipment and quick response times protect tenants and investments alike. We offer straightforward repairs, honest replacement recommendations and maintenance plans that cover multiple systems.",
    ],
    zips: ["89103", "89117", "89146", "89147", "89148"],
    neighborhoods: ["Spring Valley", "Rancho Bel Air area", "Desert Inn area", "Chinatown area", "Spanish Trail area"],
    popular: ["hvac-repairs-in-las-vegas", "ac-replacement-in-las-vegas", "hvac-maintenance-las-vegas"],
    faqs: [
      {
        q: "Do you work with landlords and property managers?",
        a: "Yes. We service rental homes and townhomes throughout Spring Valley and can coordinate access with tenants.",
      },
      {
        q: "Do you service rooftop package units?",
        a: "Yes. We repair, maintain and replace both rooftop package units and split systems.",
      },
    ],
  },
  {
    slug: "inspirada-nv",
    name: "Inspirada",
    full: "Inspirada, Henderson, NV",
    title: t("Inspirada"),
    description:
      "HVAC service for Inspirada, Henderson: maintenance for newer systems, upstairs comfort fixes, mini-splits and 24/7 AC repair. (702) 881-4713.",
    h1: "AC Repair & HVAC Services in Inspirada, Henderson",
    intro:
      "Inspirada's newer homes come with modern, efficient HVAC systems — and they need the right care to stay that way. Wave Heating & Cooling helps Inspirada homeowners protect their equipment, fix comfort problems and get fast repairs when something goes wrong.",
    local: [
      "Most Inspirada homes were built in the 2010s and later, so systems are relatively young. The biggest risks to newer equipment are skipped maintenance (which can affect manufacturer warranties), clogged filters and dirty coils from construction dust that's still common in growing communities.",
      "Two-story floor plans are the norm, and hot upstairs bedrooms are one of the most common complaints we hear. Airflow balancing, duct fixes, zoning and ductless mini-splits are all ways to solve it — usually without replacing the main system.",
    ],
    zips: ["89044"],
    neighborhoods: ["Inspirada", "Cadence area", "Southern Highlands border"],
    popular: ["ac-maintenance-in-las-vegas", "ductless-mini-split-systems-in-las-vegas", "indoor-air-quality-las-vegas"],
    faqs: [
      {
        q: "My Inspirada home is new. Does it need maintenance?",
        a: "Yes. Annual maintenance keeps efficiency high, catches early problems and is often required to keep manufacturer warranties valid.",
      },
      {
        q: "How can I fix a hot upstairs bedroom?",
        a: "Common fixes include balancing airflow, sealing or adjusting ducts, adding a return, zoning, or installing a ductless mini-split. We'll find the cause first.",
      },
    ],
  },
];

export const getArea = (slug: string) => areaPages.find((a) => a.slug === slug);

/** Map of service-area names (from lib/site.ts) to their page path */
export const areaHref = (name: string) => {
  if (name === "Las Vegas") return "/service-area-las-vegas/";
  const a = areaPages.find((p) => p.name === name);
  return a ? `/service-areas/${a.slug}/` : "/service-area-las-vegas/";
};
