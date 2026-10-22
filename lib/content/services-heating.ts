import type { ServicePage } from "./types";

export const heatingServices: ServicePage[] = [
  /* ─────────────────────────── HEATING REPAIR ─────────────────────────── */
  {
    slug: "hvac-heating-repair-in-las-vegas",
    category: "heating",
    name: "Heating Repair",
    title: "Heating & Furnace Repair Las Vegas | Wave Heating & Cooling",
    description:
      "Furnace and heat pump repair in Las Vegas. No heat, cold air, odd noises or a short-cycling heater — NATE-certified techs, 24/7. Call (702) 881-4713.",
    h1: "Heating Repair in Las Vegas — Furnaces & Heat Pumps",
    kicker: "Furnace & heat pump repair",
    intro:
      "Las Vegas winters are mild by day, but desert nights regularly drop near freezing — and that's when a failed furnace or heat pump becomes a real problem. Wave Heating & Cooling repairs gas furnaces, electric furnaces and heat pumps of every brand, with NATE-certified technicians available 24/7.",
    summary: "Furnace and heat pump repair so cold desert nights stay comfortable.",
    img: "/images/svc-heating.jpg",
    icon: "flame",
    pick: "Heat not working",
    highlights: ["Gas, electric & heat pump", "Carbon monoxide safety checks", "All brands repaired", "Available 24/7"],
    signs: {
      title: "Signs Your Heating System Needs Repair",
      items: [
        { t: "No heat or cold air", d: "Ignition, flame sensor, gas valve, thermostat or — on heat pumps — a reversing valve or defrost problem." },
        { t: "Uneven heating", d: "Some rooms cold, others warm: airflow, duct leaks or a struggling blower." },
        { t: "Strange noises", d: "Banging, rattling or squealing from the furnace usually means a mechanical or ignition issue." },
        { t: "Weak airflow", d: "A dirty filter, failing blower motor or blocked ducts — even when the heat is on high." },
        { t: "Short cycling", d: "A heater that turns on and off constantly can be overheating, which is a safety concern." },
        { t: "Burning or gas smell", d: "A dusty smell on first startup is normal. A gas (rotten egg) smell is not — leave the home and call your gas utility." },
        { t: "Higher bills", d: "An inefficient system burns more gas or electricity to heat the same home." },
      ],
    },
    sections: [
      {
        h2: "Furnace and Heat Pump Repairs We Handle",
        list: [
          "Igniter, flame sensor and pilot problems",
          "Gas valve and burner issues",
          "Blower motor and capacitor failures",
          "Limit switch and pressure switch faults",
          "Heat pump reversing valve and defrost control problems",
          "Auxiliary/emergency heat strip failures",
          "Thermostat wiring and control board diagnostics",
          "Carbon monoxide testing and heat exchanger inspection",
        ],
      },
      {
        h2: "Safety First: Carbon Monoxide",
        body: [
          "Every gas heating repair includes a safety check. A cracked heat exchanger or poor venting can let carbon monoxide into your home, and CO is colorless and odorless. We recommend a working CO detector on every level of your home and near sleeping areas.",
          "Learn more in our homeowner guide to [carbon monoxide and winter HVAC safety](/blog/carbon-monoxide-winter-hvac-safety/).",
        ],
      },
      {
        h2: "Repair Costs vs. Neglect",
        table: {
          head: ["", "Regularly maintained system", "Neglected system"],
          rows: [
            ["Typical lifespan", "15–20 years", "Often replaced in 8–12 years"],
            ["Typical repair cost", "Minor repairs, often $150–$500", "More frequent, costlier repairs ($500–$2,500+)"],
            ["Breakdown risk", "Low — issues caught early", "Higher — sudden failures on cold nights"],
          ],
          note: "Ranges are typical and vary by system and part. You'll always get exact pricing before work begins.",
        },
      },
      {
        h2: "Best Practices for Las Vegas Heating Systems",
        body: [
          "**Before winter (October–November):** schedule a [heating tune-up](/hvac-heating-maintenance-in-las-vegas/), replace your filter and test the system before the first cold night.",
          "**Off season:** spring and early fall are the best time for non-urgent repairs and for sealing [leaky ductwork](/hvac-ductwork-las-vegas/) that steals heat before it reaches your rooms.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is my furnace blowing cold air?",
        a: "Common causes include a dirty flame sensor, failed igniter, gas supply issue, tripped limit switch from a clogged filter, or a thermostat set to 'fan on'. On a heat pump, cool air during defrost cycles is normal for a few minutes.",
      },
      {
        q: "Do you repair heat pumps?",
        a: "Yes. Many Las Vegas homes use heat pumps for both cooling and heating, and our technicians repair all heat pump brands, including reversing valve, defrost and auxiliary heat problems.",
      },
      {
        q: "Is it safe to use my heater if it smells like burning?",
        a: "A light dusty smell the first time you turn on the heat each season is normal and should fade within an hour. A persistent burning, electrical or gas smell is not — turn the system off and call us. If you smell gas, leave the home and call your gas utility first.",
      },
      {
        q: "Should I repair or replace my furnace?",
        a: "If your system is over about 15 years old, needs a costly repair, or has a cracked heat exchanger, replacement is usually the better value. Our Repair or Replace Calculator can help you decide.",
      },
    ],
    related: ["hvac-heating-maintenance-in-las-vegas", "hvac-heating-replacement-in-las-vegas", "heat-pump-services-las-vegas"],
    tools: ["repair-or-replace-calculator"],
  },

  /* ─────────────────────────── HEATING INSTALLATION ─────────────────────────── */
  {
    slug: "hvac-heating-installation-in-las-vegas",
    category: "heating",
    name: "Heating Installation",
    title: "Furnace & Heat Pump Installation Las Vegas | Wave Heating & Cooling",
    description:
      "New furnace and heat pump installation in Las Vegas. Properly sized, efficient heating with free estimates and financing. Call (702) 881-4713.",
    h1: "Heating Installation in Las Vegas — Furnaces & Heat Pumps",
    kicker: "New heating systems",
    intro:
      "Whether you're building, adding on or upgrading, Wave Heating & Cooling installs gas furnaces, heat pumps and ductless heating systems sized correctly for Las Vegas homes. You'll get a free estimate, clear options and a clean, professional installation.",
    summary: "Gas furnaces, heat pumps and ductless heating — sized and installed correctly with a free estimate.",
    img: "/images/svc-heating.jpg",
    icon: "flame",
    pick: "New system / replacement estimate",
    highlights: ["Free in-home estimates", "Gas furnaces & heat pumps", "Load-calculated sizing", "Financing available (OAC)"],
    sections: [
      {
        h2: "Which Heating System Is Right for Your Home?",
        cards: [
          {
            t: "Gas furnace",
            d: "Strong, fast heat and low operating cost where natural gas is available. Paired with a central AC for cooling.",
          },
          {
            t: "Heat pump",
            d: "One system that heats and cools. Very efficient in Las Vegas' mild winters — and a popular choice for all-electric homes.",
          },
          {
            t: "Dual fuel",
            d: "A heat pump paired with a gas furnace that takes over on the coldest nights, for the best of both.",
          },
          {
            t: "Ductless mini-split",
            d: "Room-by-room heating and cooling for additions, garages and casitas. See [ductless mini-splits](/ductless-mini-split-systems-in-las-vegas/).",
          },
        ],
      },
      {
        h2: "Our Heating Installation Process",
        list: [
          "Free in-home consultation and load calculation",
          "Written options at different efficiency levels and price points",
          "Ductwork, venting and gas line evaluation",
          "Professional installation to manufacturer specifications and local code",
          "Combustion, gas pressure and carbon monoxide safety testing",
          "Thermostat setup, warranty registration and a full walk-through",
        ],
      },
      {
        h2: "Efficiency That Pays Off",
        body: [
          "Today's high-efficiency furnaces and heat pumps convert far more of your energy into usable heat than equipment from 15–20 years ago. Combined with sealed ducts and a smart thermostat, a new system can noticeably lower winter bills.",
          "We'll also help you take advantage of manufacturer rebates and efficiency incentives when they're available, and [financing](/financing/) is available with approved credit.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a heat pump a good choice in Las Vegas?",
        a: "Yes. Las Vegas winters are mild, which is where heat pumps are most efficient, and one heat pump handles both heating and cooling. For homes with natural gas, a dual-fuel system is also a great option.",
      },
      {
        q: "How long does a furnace installation take?",
        a: "Most furnace replacements are completed in one day. New installations requiring ductwork, gas lines or venting changes may take longer.",
      },
      {
        q: "Do you install systems in new additions or casitas?",
        a: "Yes. We can extend existing systems where capacity allows, or install a ductless mini-split for independent room-by-room comfort.",
      },
    ],
    related: ["hvac-heating-replacement-in-las-vegas", "heat-pump-services-las-vegas", "ac-installations-in-las-vegas"],
    tools: ["ac-replacement-cost-estimator"],
  },

  /* ─────────────────────────── HEATING REPLACEMENT ─────────────────────────── */
  {
    slug: "hvac-heating-replacement-in-las-vegas",
    category: "heating",
    name: "Heating Replacement",
    title: "Furnace Replacement Las Vegas | Free Estimate | Wave Heating & Cooling",
    description:
      "Time for a new furnace or heat pump? Honest advice, free estimates and efficient heating systems for Las Vegas homes. Financing available. (702) 881-4713.",
    h1: "Furnace & Heat Pump Replacement in Las Vegas",
    kicker: "Upgrade your heating",
    intro:
      "An aging furnace or heat pump costs more to run, breaks down more often and — in the case of gas furnaces — can become a safety concern. Wave Heating & Cooling will tell you honestly whether a repair still makes sense, and if it's time to replace, we'll install a safe, efficient system sized for your home.",
    summary: "Replace an aging, unsafe or inefficient furnace or heat pump with honest advice and a free estimate.",
    img: "/images/svc-heating.jpg",
    icon: "flame",
    pick: "New system / replacement estimate",
    highlights: ["Honest repair-vs-replace advice", "Free written estimates", "CO & combustion safety testing", "Financing available (OAC)"],
    signs: {
      title: "Signs Your Heating System Should Be Replaced",
      items: [
        { t: "15–20+ years old", d: "Furnaces and heat pumps near the end of their lifespan lose efficiency and reliability." },
        { t: "Cracked heat exchanger", d: "This can allow carbon monoxide into your home and is usually a replace-not-repair situation." },
        { t: "Frequent repairs", d: "If you're calling for service every winter, the repair costs add up quickly." },
        { t: "Rising heating bills", d: "Older systems burn more fuel or electricity to deliver the same heat." },
        { t: "Uneven or weak heat", d: "Cold rooms and weak airflow even after repairs and filter changes." },
        { t: "Yellow burner flame or soot", d: "Signs of incomplete combustion that need immediate attention." },
      ],
    },
    sections: [
      {
        h2: "Should You Replace Your Heating and Cooling Together?",
        body: [
          "In many Las Vegas homes the furnace or air handler and the outdoor AC unit were installed at the same time — and they wear out together. Replacing both at once ensures matched, rated efficiency, often qualifies for better rebates and warranties, and usually costs less than two separate projects.",
          "We'll always tell you if your existing equipment can be safely reused. Use the [Repair or Replace Calculator](/tools/repair-or-replace-calculator/) or the [Cost Estimator](/tools/ac-replacement-cost-estimator/) to plan ahead.",
        ],
      },
      {
        h2: "What's Included",
        list: [
          "Load calculation and equipment recommendations",
          "Removal and disposal of old equipment",
          "Venting, gas line and electrical updates as needed",
          "Combustion analysis and carbon monoxide testing on gas systems",
          "Thermostat setup and system walk-through",
          "Manufacturer warranty registration",
        ],
      },
      {
        h2: "Plan Ahead, Save Money",
        body: [
          "The best time to replace a heating system is before it fails. Spring and early fall offer the most scheduling flexibility, and you avoid making a rushed decision on a cold night. [Financing](/financing/) is available with approved credit.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long do furnaces last in Las Vegas?",
        a: "Because Las Vegas winters are mild, gas furnaces often last 15–20 years or more with regular maintenance. Heat pumps, which also cool all summer, typically last 10–15 years.",
      },
      {
        q: "Can I switch from a gas furnace to a heat pump?",
        a: "Yes. Many homeowners switch to a heat pump or a dual-fuel system. We'll evaluate your electrical service, ductwork and comfort goals to recommend the best option.",
      },
      {
        q: "Is a cracked heat exchanger dangerous?",
        a: "It can be. A crack can allow combustion gases, including carbon monoxide, into your home's air. If we find one, we'll show you and explain your options — usually replacement.",
      },
    ],
    related: ["hvac-heating-installation-in-las-vegas", "hvac-heating-repair-in-las-vegas", "ac-replacement-in-las-vegas"],
    tools: ["repair-or-replace-calculator", "ac-replacement-cost-estimator"],
  },

  /* ─────────────────────────── HEATING MAINTENANCE ─────────────────────────── */
  {
    slug: "hvac-heating-maintenance-in-las-vegas",
    category: "heating",
    name: "Heating Maintenance",
    title: "Furnace Tune-Up Las Vegas | Heating Maintenance | Wave Heating & Cooling",
    description:
      "Fall furnace and heat pump tune-ups in Las Vegas: safety checks, CO testing and efficiency cleaning by NATE-certified techs. Call (702) 881-4713.",
    h1: "Heating Maintenance & Furnace Tune-Ups in Las Vegas",
    kicker: "Fall tune-ups",
    intro:
      "Las Vegas heaters sit idle for most of the year — and then get switched on for the first cold night in November. A fall tune-up from Wave Heating & Cooling makes sure your furnace or heat pump starts safely, runs efficiently and doesn't leave you in the cold.",
    summary: "Fall furnace and heat pump tune-ups with safety and carbon monoxide checks.",
    img: "/images/svc-maintenance.jpg",
    icon: "gauge",
    pick: "Maintenance / tune-up",
    highlights: ["Carbon monoxide testing", "Burner & heat exchanger inspection", "Heat pump defrost check", "Included in Wave Club"],
    sections: [
      {
        h2: "What's Included in a Heating Tune-Up",
        list: [
          "Inspect and clean burners and flame sensor for safe, efficient operation",
          "Test for carbon monoxide",
          "Inspect the heat exchanger for cracks",
          "Check igniter, gas pressure and venting",
          "Test limit switches and safety controls",
          "Lubricate moving parts and check the blower",
          "Heat pumps: test reversing valve, defrost cycle and auxiliary heat strips",
          "Replace or check the air filter and calibrate the thermostat",
        ],
      },
      {
        h2: "Why Fall Maintenance Matters",
        body: [
          "After months of sitting unused, dust settles on burners and sensors, and small problems go unnoticed until the first cold snap — exactly when every HVAC company in town is busiest. A tune-up in **October or November** catches those problems early.",
          "Just as important is safety. Gas furnaces need to be checked for proper combustion and venting. Read our [carbon monoxide safety guide](/blog/carbon-monoxide-winter-hvac-safety/) for what every homeowner should know.",
        ],
      },
      {
        h2: "Save With Wave Club",
        body: [
          "Wave Club members get both a spring AC tune-up and a fall heating tune-up every year, plus 15% off repairs, priority service and extended warranty coverage. [See all Wave Club benefits](/hvac-maintenance-las-vegas/).",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I really need a heating tune-up in Las Vegas?",
        a: "Yes — especially for gas furnaces. Even with mild winters, an annual inspection checks for carbon monoxide risks, cleans burners and sensors, and prevents no-heat calls on the coldest nights.",
      },
      {
        q: "When should I schedule heating maintenance?",
        a: "October and November are ideal — before you need the heat, and before the winter rush.",
      },
      {
        q: "Do heat pumps need a separate heating tune-up?",
        a: "Heat pumps work year-round, so we recommend two visits: one before summer for cooling and one before winter to check the heating side, including the reversing valve and defrost controls.",
      },
    ],
    related: ["hvac-maintenance-las-vegas", "hvac-heating-repair-in-las-vegas", "ac-maintenance-in-las-vegas"],
  },

  /* ─────────────────────────── HEAT PUMPS ─────────────────────────── */
  {
    slug: "heat-pump-services-las-vegas",
    category: "heating",
    name: "Heat Pump Services",
    title: "Heat Pump Repair & Installation Las Vegas | Wave Heating & Cooling",
    description:
      "Heat pump repair, replacement and installation in Las Vegas. Efficient year-round heating and cooling from NATE-certified techs. Call (702) 881-4713.",
    h1: "Heat Pump Repair & Installation in Las Vegas",
    kicker: "Year-round comfort",
    intro:
      "A heat pump cools your home all summer and heats it all winter with a single outdoor unit — and in Las Vegas' mild winters, it does it very efficiently. Wave Heating & Cooling repairs, maintains and installs heat pumps of every major brand.",
    summary: "One efficient system for heating and cooling — repaired, maintained and installed by certified techs.",
    img: "/images/svc-heating.jpg",
    icon: "unit",
    pick: "Heat not working",
    highlights: ["Repair, replace & install", "All major brands", "High-efficiency inverter options", "Free replacement estimates"],
    signs: {
      title: "Common Heat Pump Problems",
      items: [
        { t: "Blows cool air in heat mode", d: "Could be a defrost cycle (normal for a few minutes), a reversing valve issue or low refrigerant." },
        { t: "Outdoor unit iced over", d: "Light frost is normal in winter; a solid block of ice means defrost isn't working." },
        { t: "Runs constantly", d: "Low charge, dirty coils or a system that's undersized for the home." },
        { t: "Emergency heat always on", d: "Auxiliary heat strips are expensive to run — if they're carrying the load, something's wrong." },
        { t: "Loud noises", d: "A whooshing sound during defrost is normal. Grinding, rattling or screeching is not." },
      ],
    },
    sections: [
      {
        h2: "Why Heat Pumps Make Sense in Las Vegas",
        body: [
          "Heat pumps move heat instead of creating it, which makes them highly efficient when winter temperatures are mild — and Las Vegas winter days are usually in the 50s and 60s. You get one system for heating and cooling, no gas combustion in the home, and modern inverter models that are quiet and precise.",
          "For homes with natural gas, a **dual-fuel** setup pairs a heat pump with a gas furnace that takes over on the coldest nights.",
        ],
      },
      {
        h2: "Our Heat Pump Services",
        cards: [
          { t: "Repair", d: "Reversing valves, defrost controls, capacitors, motors, refrigerant leaks and auxiliary heat." },
          { t: "Maintenance", d: "Two visits a year — before summer and before winter — since your heat pump works year-round." },
          { t: "Replacement", d: "Right-sized, high-efficiency heat pumps with honest advice on repair vs. replace." },
          { t: "Conversions", d: "Switching from gas or from an older AC + furnace? We'll design the right system." },
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a heat pump last in Las Vegas?",
        a: "Because heat pumps run in both summer and winter, they typically last about 10–15 years here. Regular maintenance makes a big difference.",
      },
      {
        q: "Why is my heat pump blowing cold air in winter?",
        a: "If it lasts a few minutes, it's probably a normal defrost cycle. If it continues, it could be a stuck reversing valve, low refrigerant or a thermostat setting issue — call us for a diagnosis.",
      },
      {
        q: "Is a heat pump cheaper to run than a gas furnace?",
        a: "In mild climates like Las Vegas, a modern heat pump is often very competitive with gas, and it also replaces your air conditioner. We can compare the options for your home during a free estimate.",
      },
    ],
    related: ["hvac-heating-repair-in-las-vegas", "hvac-heating-installation-in-las-vegas", "ductless-mini-split-systems-in-las-vegas"],
    tools: ["repair-or-replace-calculator", "energy-savings-calculator"],
  },
];
