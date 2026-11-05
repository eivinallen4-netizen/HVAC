import type { ServicePage } from "./types";

export const coolingServices: ServicePage[] = [
  /* ─────────────────────────── AC REPAIR ─────────────────────────── */
  {
    slug: "hvac-repairs-in-las-vegas",
    category: "cooling",
    name: "AC Repair",
    title: "AC Repair Las Vegas | Same-Day & 24/7 | Wave Heating & Cooling",
    description:
      "Fast, honest AC repair in Las Vegas from NATE-certified techs. Warm air, noises, leaks or no power — we fix all brands, 24/7. Call (702) 881-4713.",
    h1: "AC Repair in Las Vegas — Fast, Honest & Done Right the First Time",
    kicker: "Air conditioning repair",
    intro:
      "When it's 110° outside, a broken AC isn't an inconvenience — it's an emergency. Wave Heating & Cooling diagnoses and repairs every make and model of central air conditioner and heat pump across the Las Vegas valley, with NATE-certified technicians available 24/7 and straight answers about what your system actually needs.",
    summary: "Warm air, strange noises, or an AC that won't kick on? We find the real problem and fix it right the first time.",
    img: "/images/svc-ac-repair.jpg",
    icon: "wrench",
    pick: "AC not cooling",
    highlights: ["NATE-certified technicians", "All brands repaired", "No corporate or franchise fees", "Available 24/7"],
    signs: {
      title: "Common AC Problems We Fix Every Day",
      items: [
        { t: "Blowing warm air", d: "Often a failed capacitor, a refrigerant leak, a dirty condenser coil or a tripped safety switch." },
        { t: "Won't turn on", d: "Thermostat, breaker, contactor, float switch or control board — we test each one instead of guessing." },
        { t: "Strange noises", d: "Grinding, squealing, banging or buzzing usually points to a motor, fan blade or electrical part on its way out." },
        { t: "Short cycling", d: "An AC that turns on and off every few minutes is wasting power and wearing out its compressor." },
        { t: "Water around the unit", d: "A clogged condensate drain or frozen coil — catch it before it damages drywall or ceilings." },
        { t: "Ice on the lines", d: "Frozen refrigerant lines mean low airflow or low charge. Turn the system off and call us." },
        { t: "Sky-high power bills", d: "A sudden jump in your NV Energy bill is often the first sign the system is struggling." },
        { t: "Uneven cooling", d: "Hot upstairs rooms can be duct leaks, airflow problems or a system that was never sized right." },
      ],
    },
    sections: [
      {
        h2: "What to Expect From a Wave AC Repair Visit",
        body: [
          "Every repair starts with a real diagnosis. Your technician checks electrical components, refrigerant pressures and temperatures, airflow, the condensate drain and the thermostat so we fix the cause — not just the symptom that showed up today.",
          "Before any work begins you'll get a clear explanation of what failed, why it failed and your options. If it's a simple fix, we'll tell you. If your system is old enough that a repair doesn't make financial sense, we'll tell you that too — and you can check our reasoning with the free [Repair or Replace Calculator](/tools/repair-or-replace-calculator/).",
          "Most common repairs — capacitors, contactors, fan motors, drain clogs, thermostat issues — are completed on the first visit because our trucks are stocked for the parts that fail most in desert heat.",
        ],
      },
      {
        h2: "Why Las Vegas Air Conditioners Break Down",
        body: [
          "Southern Nevada is one of the hardest places in the country to be an air conditioner. Systems here run for months straight, often against outdoor temperatures above 105°, and condenser units sit on rooftops or in side yards that bake in direct sun.",
          "That heat is hard on electrical parts. Capacitors and contactors are the most common failures we see each summer, followed by condenser fan motors and refrigerant leaks. Desert dust packs into condenser coils, which makes the whole system run hotter and longer.",
          "The good news: most of these failures are predictable. A seasonal [AC tune-up](/ac-maintenance-in-las-vegas/) catches weak capacitors, dirty coils and clogged drains before they leave you without cooling on the hottest day of the year.",
        ],
      },
      {
        h2: "Maintained vs. Neglected: What It Costs You",
        table: {
          head: ["Factor", "Maintained AC", "Neglected AC"],
          rows: [
            ["Expected lifespan*", "12–15+ years", "8–12 years"],
            ["Energy efficiency", "High — lower bills", "Low — higher bills"],
            ["Repair costs", "Small, preventative fixes", "Emergency repairs"],
            ["Cooling performance", "Consistent and even", "Hot spots and breakdowns"],
          ],
          note: "*Industry estimates. With proper installation and regular maintenance, many systems we install exceed these numbers.",
        },
      },
      {
        h2: "Why Homeowners Trust Wave for AC Repair",
        cards: [
          { t: "Honest diagnosis", d: "You see what we see. No scare tactics, no pressure to replace a system that just needs a part." },
          { t: "Fair, local pricing", d: "No corporate overhead or franchise fees — just competitive pricing from a family-owned company." },
          { t: "Experienced, certified techs", d: "NATE-certified technicians and low employee turnover mean consistent, high-quality work." },
          { t: "Here when it breaks", d: "Heat waves don't keep business hours. We answer 24/7, including nights, weekends and holidays." },
        ],
      },
      {
        h2: "Peak Season vs. Off Season",
        body: [
          "**Summer (peak season):** your AC is working its hardest and repair demand is highest. If something sounds or feels off, call early — small problems turn into compressor failures fast in 110° heat.",
          "**Spring and fall (off season):** the best time for tune-ups, small repairs and replacement planning. You'll get more scheduling flexibility and avoid a mid-July breakdown.",
        ],
      },
    ],
    faqs: [
      {
        q: "How fast can you get to me for an AC repair?",
        a: "We answer calls 24/7 and prioritize no-cooling calls, especially for homes with seniors, infants or pets. In most of the Las Vegas valley we can get a technician out the same day, depending on demand during heat waves.",
      },
      {
        q: "Do you repair all AC brands?",
        a: "Yes. Our technicians service every major brand of central air conditioner, heat pump and package unit, including Trane, Carrier, Lennox, Goodman, Rheem, American Standard, Daikin and more.",
      },
      {
        q: "Is it worth repairing an older AC?",
        a: "It depends on age, repair cost and how often it's breaking down. A common rule of thumb: multiply the system's age by the repair cost — if it's over about $5,000, replacement is usually the better value. Our free Repair or Replace Calculator walks you through it, and our techs will give you an honest opinion.",
      },
      {
        q: "Why is my AC running but not cooling?",
        a: "The most common causes are a failed capacitor (the outdoor fan or compressor won't start), a dirty condenser coil, a clogged filter, a refrigerant leak or a frozen evaporator coil. Check your filter and breaker first, then call us — running a system that isn't cooling can damage the compressor.",
      },
      {
        q: "Do Wave Club members get a discount on repairs?",
        a: "Yes. Wave Club maintenance members get 15% off repairs, priority service, no extra charge for after-hours, weekend or holiday calls, and the diagnostic fee waived when the repair is done at the time of service.",
      },
    ],
    related: ["emergency-ac-repair-las-vegas", "ac-maintenance-in-las-vegas", "ac-replacement-in-las-vegas"],
    tools: ["ac-symptom-checker", "repair-or-replace-calculator"],
  },

  /* ─────────────────────────── EMERGENCY AC ─────────────────────────── */
  {
    slug: "emergency-ac-repair-las-vegas",
    category: "cooling",
    name: "24/7 Emergency AC Repair",
    title: "24/7 Emergency AC Repair Las Vegas | Wave Heating & Cooling",
    description:
      "AC out in the Las Vegas heat? Wave answers 24/7 — nights, weekends and holidays. NATE-certified emergency AC repair across the valley. Call (702) 881-4713.",
    h1: "24/7 Emergency AC Repair in Las Vegas",
    kicker: "Emergency service",
    intro:
      "An air conditioner that dies at 9 p.m. in July can turn a Las Vegas home dangerously hot within hours. Wave Heating & Cooling answers the phone 24 hours a day, 7 days a week — nights, weekends and holidays — with NATE-certified technicians who can diagnose and fix most failures on the spot.",
    summary: "AC out at night, on a weekend or a holiday? A real person answers 24/7 and we dispatch fast.",
    img: "/images/svc-ac-repair.jpg",
    icon: "clock",
    pick: "AC not cooling",
    highlights: ["Answered 24/7/365", "Fast dispatch across the valley", "Trucks stocked for common failures", "Wave Club: no after-hours surcharge"],
    emergency: true,
    signs: {
      title: "When to Call for Emergency AC Service",
      items: [
        { t: "No cooling in extreme heat", d: "Indoor temperatures can climb past 90° within hours. Call immediately if anyone at home is elderly, very young, pregnant or has a medical condition." },
        { t: "Burning smell or smoke", d: "Turn the system off at the thermostat and breaker. This can be an electrical failure." },
        { t: "Loud grinding or screeching", d: "Shut the system off — a failing motor or compressor can do more damage if it keeps running." },
        { t: "Water pouring from the air handler", d: "Turn the system off to prevent ceiling and drywall damage, then call us." },
        { t: "Breaker keeps tripping", d: "Don't keep resetting it. Repeated trips point to an electrical fault that needs a technician." },
        { t: "Ice on the refrigerant lines", d: "Switch to 'fan only' or turn the system off so the coil can thaw, and call for service." },
      ],
    },
    sections: [
      {
        h2: "What to Do While You Wait",
        list: [
          "Check the thermostat is set to COOL and a few degrees below room temperature, with fresh batteries.",
          "Check the breakers for both the indoor unit and the outdoor condenser.",
          "Replace a dirty air filter — a clogged filter alone can freeze a coil.",
          "Close blinds on sun-facing windows and keep doors closed to hold in cool air.",
          "Run ceiling fans counter-clockwise and stay hydrated. Move to the lowest, coolest room in the house.",
          "If the outdoor unit is humming but the fan isn't spinning, turn the system off — that's usually a capacitor, and running it can damage the compressor.",
        ],
        body: [
          "Not sure how urgent it is? Our free [AC Symptom Checker](/tools/ac-symptom-checker/) walks you through the likely cause and what's safe to check yourself.",
        ],
      },
      {
        h2: "Why Emergency AC Failures Spike in Las Vegas",
        body: [
          "Most emergency calls come during the first long stretch of 105°+ days, when systems that limped through spring finally fail. Weak capacitors, worn contactors, dirty condenser coils and low refrigerant all show up under peak load.",
          "Heat waves also mean high demand. Homeowners on our [Wave Club maintenance plan](/hvac-maintenance-las-vegas/) get priority scheduling and no extra charge for after-hours, weekend or holiday service — one of the best reasons to join before summer.",
        ],
      },
      {
        h2: "How Our Emergency Service Works",
        cards: [
          { t: "1. You call or text", d: `A real person answers 24/7. Tell us what's happening and we'll get a tech headed your way.` },
          { t: "2. Fast diagnosis", d: "Your technician finds the root cause — electrical, refrigerant, airflow or controls." },
          { t: "3. Clear options", d: "You'll get the cost and your options before any work begins. No surprises." },
          { t: "4. Cool again", d: "Most common failures are fixed on the first visit with parts from our truck." },
        ],
      },
    ],
    faqs: [
      {
        q: "Do you really answer 24/7?",
        a: "Yes. Call (702) 881-4713 any time — nights, weekends and holidays — and a person will answer and get a technician scheduled.",
      },
      {
        q: "Is emergency AC service more expensive?",
        a: "After-hours service can carry an additional charge, which we'll tell you up front. Wave Club maintenance members pay no extra for after-hours, weekend or holiday service.",
      },
      {
        q: "My outdoor unit is humming but the fan isn't spinning. What should I do?",
        a: "Turn the system off at the thermostat. This is very often a failed capacitor, which is a quick repair — but running the system in this state can overheat and damage the compressor.",
      },
      {
        q: "How hot is too hot inside a home?",
        a: "Indoor temperatures above about 85°F become a health risk for seniors, infants, pregnant women, pets and anyone with heart or respiratory conditions. If your home is heading past that and you can't get cool, treat it as an emergency.",
      },
    ],
    related: ["hvac-repairs-in-las-vegas", "ac-maintenance-in-las-vegas", "ac-replacement-in-las-vegas"],
    tools: ["ac-symptom-checker"],
  },

  /* ─────────────────────────── AC INSTALLATION ─────────────────────────── */
  {
    slug: "ac-installations-in-las-vegas",
    category: "cooling",
    name: "AC Installation",
    title: "AC Installation Las Vegas | Book Online | Wave",
    description:
      "New AC installation in Las Vegas, sized and installed right for desert heat. In-home estimates, high-efficiency options and financing. Call (702) 881-4713.",
    h1: "AC Installation in Las Vegas — Sized Right, Installed Right",
    kicker: "New air conditioning systems",
    intro:
      "A new air conditioner is only as good as its installation. Wave Heating & Cooling designs and installs central air, heat pump and ductless systems for Las Vegas homes — properly sized for desert heat, installed clean and on schedule, and backed by a team that will still be here to service it.",
    summary: "Properly sized, energy-efficient systems installed clean and on schedule — with a no-pressure estimate.",
    img: "/images/svc-ac-install.jpg",
    icon: "unitPlus",
    pick: "New system / replacement estimate",
    highlights: ["Load calculation on every job", "Permits pulled", "Full safety inspection", "Home protected & cleaned up"],
    sections: [
      {
        h2: "New AC Installation vs. AC Replacement",
        cards: [
          {
            t: "New installation",
            d: "For new construction, additions, casitas, converted garages or homes that never had central air. We design the system and evaluate or install ductwork so every room cools evenly.",
          },
          {
            t: "Replacement",
            d: "For systems more than 10–15 years old, systems that keep breaking down, or R-22 systems that are expensive to recharge. See our [AC replacement](/ac-replacement-in-las-vegas/) page for details.",
          },
        ],
      },
      {
        h2: "Why Proper Sizing Matters So Much in the Desert",
        body: [
          "An oversized air conditioner cools the house quickly, shuts off, and starts again a few minutes later. That short cycling wears out the compressor, leaves rooms clammy and uneven, and wastes power. An undersized system runs nonstop on a 112° afternoon and still can't keep up.",
          "We don't size by square footage alone. Your estimate is based on a load calculation that considers insulation, window area and direction, ceiling height, roof type, number of stories and how your family actually uses the home. Read more in our guide on [choosing the right-sized AC for Las Vegas](/blog/how-to-choose-the-right-sized-ac/).",
        ],
      },
      {
        h2: "Our Installation Process",
        list: [
          "In-home consultation and load calculation",
          "Clear written options — standard, high-efficiency and premium — with no pressure",
          "Permit pulled for the job",
          "Home protection: booties at the door, floor padding under ladders, plastic over walls, closets and beds",
          "Ductwork inspection, and sealing or modification where needed",
          "Removal and disposal of your old equipment",
          "Professional installation to manufacturer specs, including line set, pad, electrical and drain",
          "Full safety inspection: electrical, refrigerant pressures, drain line, and gas venting with a CO check on furnaces",
          "Refrigerant charge verified, airflow measured and thermostat programmed",
          "Swept and vacuumed, then a walk-through of your new system, warranty registration and a maintenance plan option",
        ],
      },
      {
        h2: "Choosing the Right Efficiency Level",
        body: [
          "Higher-efficiency systems (higher SEER2) cost more up front but use less electricity — and in Las Vegas, where an AC can run for six months a year, that difference adds up. Variable-speed and two-stage systems also deliver more even temperatures and quieter operation.",
          "Want a ballpark before we visit? Try the [AC Replacement Cost Estimator](/tools/ac-replacement-cost-estimator/) or see how much an upgrade could save with the [Energy Savings Calculator](/tools/energy-savings-calculator/).",
        ],
      },
      {
        h2: "Rebates and Financing",
        body: [
          "We help you take advantage of manufacturer rebates and energy-efficiency incentives when they're available for your equipment, and [financing](/financing/) is available with approved credit so a new system fits your budget.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a new AC cost in Las Vegas?",
        a: "It depends on the size of your home, system type, efficiency rating and how much ductwork or electrical work is needed. We give clear, written in-home estimates, and our online cost estimator can give you a ballpark range first.",
      },
      {
        q: "How long does an AC installation take?",
        a: "Most straightforward replacements are completed in one day. New installations that need ductwork or electrical upgrades can take two to three days.",
      },
      {
        q: "What size AC do I need?",
        a: "The right size depends on far more than square footage — insulation, windows, sun exposure, ceiling height and number of stories all matter. We perform a load calculation during your in-home estimate to size the system correctly.",
      },
      {
        q: "Do you offer financing?",
        a: "Yes. Financing is available with approved credit. Ask during your estimate and we'll walk you through the options.",
      },
    ],
    related: ["ac-replacement-in-las-vegas", "ductless-mini-split-systems-in-las-vegas", "hvac-ductwork-las-vegas"],
    tools: ["ac-replacement-cost-estimator", "energy-savings-calculator"],
  },

  /* ─────────────────────────── AC REPLACEMENT ─────────────────────────── */
  {
    slug: "ac-replacement-in-las-vegas",
    category: "cooling",
    name: "AC Replacement",
    title: "AC Replacement Las Vegas | Book Online | Wave Heating & Cooling",
    description:
      "Is it time to replace your AC? Honest advice, in-home estimates and high-efficiency systems built for Las Vegas heat. Financing available. (702) 881-4713.",
    h1: "AC Replacement in Las Vegas — Permitted, Inspected, Done Right",
    kicker: "Upgrade your system",
    intro:
      "If your air conditioner is more than 12 years old, keeps breaking down or is driving your power bill through the roof, it may be time. Wave Heating & Cooling gives you honest, no-pressure advice. If replacement is the right call, we replace the whole matched system, pull the permit, run a full safety inspection, and protect your home from the front door to the final vacuum.",
    summary: "Old, loud or costing a fortune to run? Get a right-sized, high-efficiency replacement with an estimate.",
    img: "/images/svc-ac-install.jpg",
    icon: "unitPlus",
    pick: "New system / replacement estimate",
    highlights: ["Permits on every job", "Full matched system", "Safety inspection before we leave", "Home protected & cleaned up"],
    signs: {
      title: "Signs It's Time to Replace Your AC",
      items: [
        { t: "It's 12–15+ years old", d: "Desert systems work harder than most. Past this age, major repairs rarely make financial sense." },
        { t: "It uses R-22 refrigerant", d: "R-22 has been phased out, so recharging an older system is expensive and getting harder." },
        { t: "Repairs keep adding up", d: "Two or more significant repairs in two years is a strong sign the system is near the end." },
        { t: "Your bills keep climbing", d: "Older, lower-SEER systems can use far more electricity than a modern high-efficiency unit." },
        { t: "Rooms won't stay cool", d: "If it can't keep up in July, it may be undersized, worn out or both." },
        { t: "It's noisy or short-cycles", d: "Loud compressors and constant on/off cycling point to wear and inefficiency." },
      ],
    },
    sections: [
      {
        h2: "Repair or Replace? Here's How We Help You Decide",
        body: [
          "We look at your system's age, the cost of the current repair, your repair history, refrigerant type, efficiency and how long you plan to stay in the home. A popular rule of thumb is the **$5,000 rule**: multiply the system's age by the repair cost. If the result is over $5,000, replacement is usually the better investment.",
          "Run your own numbers with our [Repair or Replace Calculator](/tools/repair-or-replace-calculator/). It takes about a minute.",
        ],
      },
      {
        h2: "Benefits of a New Air Conditioner",
        cards: [
          { t: "Lower energy bills", d: "Modern high-SEER2 systems use significantly less electricity than units from 10–15 years ago." },
          { t: "Better comfort", d: "More consistent temperatures, better airflow and quieter operation — especially with variable-speed equipment." },
          { t: "Fewer breakdowns", d: "A new system with a manufacturer warranty means fewer surprise repair bills." },
          { t: "Cleaner air", d: "A replacement is the perfect time to upgrade filtration and seal leaky ducts." },
          { t: "Higher home value", d: "A newer, efficient HVAC system is a selling point for Las Vegas buyers." },
        ],
      },
      {
        h2: "Best Time to Replace Your AC",
        body: [
          "**Spring and fall are ideal.** You'll get more scheduling flexibility and avoid the risk of an emergency replacement during a heat wave, when demand is at its highest.",
          "If your system is struggling now, don't wait for it to fail in July. Book an in-home replacement assessment so you know your options — there's no obligation. You can also get a ballpark price first with our [AC Replacement Cost Estimator](/tools/ac-replacement-cost-estimator/).",
        ],
      },
      {
        h2: "What's Included in a Wave Replacement",
        list: [
          "Load calculation to size the new system correctly",
          "Full matched indoor and outdoor system, not just the outside unit",
          "Permit pulled on every replacement, so the county inspects the install too",
          "Booties at the door, floor padding under ladders, and plastic over walls, closets and beds",
          "Ductwork inspection and recommendations",
          "Removal and responsible disposal of old equipment and refrigerant",
          "New pad, line set and electrical work as needed",
          "Safety inspection: electrical and breaker sizing, refrigerant pressures, drain line, and gas venting with a CO check on furnaces",
          "Thermostat setup, warranty registration and a full walk-through",
          "Swept and vacuumed when we're done",
        ],
      },
      {
        h2: "Comparing AC Replacement Quotes in Las Vegas",
        body: [
          "Quotes can vary a lot, and the lowest number often leaves things out. Before you compare, ask each company: **Is a permit included? Is it a full matched system or just the outside unit? Is a safety inspection included? Do they protect your home and clean up after?**",
          "Every one of those is standard with Wave. Labor done right takes a full day, not two hours.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long do air conditioners last in Las Vegas?",
        a: "Most last roughly 10–15 years here, less if they've been poorly maintained. The extreme heat and long cooling season are harder on equipment than in milder climates. Regular maintenance is the biggest factor in getting more years out of a system.",
      },
      {
        q: "Should I replace my furnace or air handler at the same time?",
        a: "Often, yes. Matched indoor and outdoor equipment is required for rated efficiency and many warranties, and replacing both at once usually costs less than doing them separately. We'll tell you if your existing equipment can be safely reused.",
      },
      {
        q: "What does an AC replacement cost?",
        a: "Pricing depends on home size, equipment type, efficiency (SEER2) and whether ductwork, electrical or the pad need work. Our online estimator gives a ballpark range, and an in-home assessment gives you exact, written pricing.",
      },
      {
        q: "Do you pull permits on AC replacements?",
        a: "Yes, on every replacement. The county inspects the install, not just us, and we handle the paperwork. Unpermitted work can come up when you sell your home or file an insurance claim.",
      },
      {
        q: "Is financing available?",
        a: "Yes, financing is available with approved credit.",
      },
    ],
    related: ["ac-installations-in-las-vegas", "hvac-repairs-in-las-vegas", "hvac-heating-replacement-in-las-vegas"],
    tools: ["repair-or-replace-calculator", "ac-replacement-cost-estimator", "energy-savings-calculator"],
  },

  /* ─────────────────────────── AC MAINTENANCE ─────────────────────────── */
  {
    slug: "ac-maintenance-in-las-vegas",
    category: "cooling",
    name: "AC Maintenance & Tune-Ups",
    title: "AC Tune-Up & Maintenance Las Vegas | Wave Heating & Cooling",
    description:
      "Las Vegas AC tune-ups that prevent summer breakdowns, cut energy bills and extend system life. NATE-certified techs. Join Wave Club. Call (702) 881-4713.",
    h1: "AC Maintenance & Tune-Ups in Las Vegas",
    kicker: "Preventative maintenance",
    intro:
      "Most mid-summer breakdowns we see could have been caught weeks earlier. A professional AC tune-up from Wave Heating & Cooling cleans, tests and adjusts your system before the heat arrives — so it runs efficiently, costs less to operate and keeps going when you need it most.",
    summary: "Seasonal tune-ups that catch problems early, lower your energy bill and help your system last longer.",
    img: "/images/svc-maintenance.jpg",
    icon: "gauge",
    pick: "Maintenance / tune-up",
    highlights: ["Multi-point inspection", "Coil cleaning for desert dust", "Electrical & refrigerant checks", "Wave Club member savings"],
    sections: [
      {
        h2: "What's Included in an AC Tune-Up",
        list: [
          "Inspect and clean the condenser coil (desert dust is the #1 efficiency killer)",
          "Check refrigerant pressures and temperatures",
          "Test capacitors, contactors and electrical connections — and tighten connections",
          "Inspect condenser fan motor and blades",
          "Check the evaporator coil, blower and airflow",
          "Flush and test the condensate drain line and safety float switch",
          "Replace or check the air filter",
          "Calibrate and test the thermostat",
          "Written report of findings with honest recommendations",
        ],
      },
      {
        h2: "Why Maintenance Matters More in Las Vegas",
        body: [
          "A Las Vegas air conditioner can run for six months straight at outdoor temperatures that would push equipment in most other cities to the limit. Dust and debris coat the outdoor coil, capacitors weaken in the heat, and small refrigerant leaks get worse under load.",
          "A tune-up in **March or April** — before the first 100° day — is the single best way to avoid a breakdown in July. Our before-and-after photos show what a proper coil cleaning does for a system's ability to breathe.",
        ],
      },
      {
        h2: "Join Wave Club and Save All Year",
        body: [
          "Our maintenance membership covers two visits a year — AC before summer and heating before winter — plus member pricing and perks. See the full list of benefits on our [HVAC maintenance plan](/hvac-maintenance-las-vegas/) page.",
        ],
        cards: [
          { t: "2 tune-ups per year", d: "Spring AC check (Mar–Apr) and fall heating check (Oct–Nov)." },
          { t: "15% off repairs", d: "Plus 15% off upgrades like smart thermostats and air quality products." },
          { t: "Priority service", d: "Members move to the front of the line — and pay no after-hours surcharge." },
          { t: "Extended warranty", d: "1-year parts & labor and 1-year workmanship warranty while your plan is active." },
        ],
      },
    ],
    faqs: [
      {
        q: "How often should I get an AC tune-up in Las Vegas?",
        a: "At least once a year, ideally in spring before the summer heat. Because Las Vegas systems also heat in winter, we recommend a second visit in fall for the heating side.",
      },
      {
        q: "How long does an AC tune-up take?",
        a: "Most tune-ups take about 45 minutes to an hour per system, depending on its condition and how much cleaning the coils need.",
      },
      {
        q: "Will a tune-up lower my power bill?",
        a: "Usually, yes. Clean coils, a proper refrigerant charge and good airflow all help the system cool your home with less run time. Try our Energy Savings Calculator for an estimate.",
      },
      {
        q: "What does Wave Club cost?",
        a: "Wave Club is $150 per year for the first system and $140 for each additional system at the same property. You can cancel at any time.",
      },
    ],
    related: ["hvac-maintenance-las-vegas", "hvac-repairs-in-las-vegas", "hvac-heating-maintenance-in-las-vegas"],
    tools: ["energy-savings-calculator"],
  },
];
