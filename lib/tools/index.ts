import type { IconName } from "../site";
import type { Faq, ToolSlug } from "../content/types";

export type ToolMeta = {
  slug: ToolSlug;
  name: string;
  short: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  icon: IconName;
  time: string;
  about: string[];
  faqs: Faq[];
};

export const tools: ToolMeta[] = [
  {
    slug: "repair-or-replace-calculator",
    name: "Repair or Replace Calculator",
    short: "Should you fix your AC or replace it? Get an honest recommendation in 60 seconds.",
    title: "AC Repair or Replace Calculator | Wave Heating & Cooling",
    description:
      "Should you repair or replace your AC? Answer 6 quick questions and get an honest recommendation based on age, repair cost, refrigerant and the $5,000 rule.",
    h1: "AC Repair or Replace Calculator",
    intro:
      "Facing a big repair bill on an older system? Answer six quick questions and we'll tell you whether repairing or replacing is likely the smarter move — using the same factors our technicians weigh in your home.",
    icon: "wrench",
    time: "60 seconds",
    about: [
      "The calculator starts with the industry's **$5,000 rule**: multiply your system's age by the repair cost. Above $5,000, replacement usually wins. Then it adjusts for the things that matter most in Las Vegas — system age in desert heat, recent repair history, R-22 refrigerant, rising bills, comfort problems and how long you plan to stay.",
      "It's a starting point, not a sales pitch. If the answer is \"repair,\" that's what we'll recommend. If you'd like a second opinion, our technicians can give you a repair quote and a free replacement estimate side by side.",
    ],
    faqs: [
      {
        q: "What is the $5,000 rule for AC replacement?",
        a: "Multiply the age of your system in years by the repair cost. If the result is more than $5,000, replacing the system is generally a better investment than repairing it. For example, a 14-year-old system with a $600 repair scores $8,400.",
      },
      {
        q: "How long do AC units last in Las Vegas?",
        a: "Typically 10–15 years. Long, extremely hot summers are harder on equipment than milder climates, so regular maintenance makes a big difference.",
      },
      {
        q: "Is it worth repairing an R-22 air conditioner?",
        a: "Small electrical repairs can make sense, but refrigerant repairs on R-22 systems are expensive because R-22 has been phased out. If an R-22 system needs refrigerant or a major component, replacement is usually the better value.",
      },
    ],
  },
  {
    slug: "ac-replacement-cost-estimator",
    name: "AC Replacement Cost Estimator",
    short: "Get a ballpark installed price range and monthly payment for a new system.",
    title: "AC Replacement Cost Estimator Las Vegas | Wave Heating & Cooling",
    description:
      "How much does a new AC cost in Las Vegas? Get an instant installed price range and estimated monthly payment by home size, system type and efficiency.",
    h1: "AC Replacement Cost Estimator for Las Vegas Homes",
    intro:
      "Planning for a new air conditioner or heat pump? Tell us about your home and the kind of system you're considering, and get a ballpark installed price range — plus an estimated monthly payment with financing.",
    icon: "tag",
    time: "90 seconds",
    about: [
      "The biggest factors in what a new system costs are **size** (tons of cooling), **system type**, **efficiency level** and **how much ductwork or electrical work** is needed. Las Vegas homes typically need more cooling capacity per square foot than homes in milder climates.",
      "This estimator uses a sizing rule of thumb to get you in the right range quickly. Your actual price depends on a proper load calculation, the specific equipment, access and any code upgrades — which is why every Wave estimate is free, in-home and in writing.",
    ],
    faqs: [
      {
        q: "How much does it cost to replace an AC in Las Vegas?",
        a: "It varies widely with home size, system type and efficiency. A smaller home with a standard-efficiency split system costs far less than a large two-story home with a variable-speed heat pump. Use the estimator for a ballpark, then get a free written estimate.",
      },
      {
        q: "What size AC do I need for my house?",
        a: "In Las Vegas, a rough rule of thumb is about one ton of cooling per 400–600 square feet, but insulation, windows, sun exposure, ceiling height and stories all matter. We do a load calculation to size it correctly.",
      },
      {
        q: "Is financing available?",
        a: "Yes, financing is available with approved credit. The monthly payment shown is an example only — your actual terms depend on the lender and your credit.",
      },
    ],
  },
  {
    slug: "ac-symptom-checker",
    name: "AC Symptom Checker",
    short: "What's wrong with my AC? Find the likely cause, safe DIY checks and how urgent it is.",
    title: "What's Wrong With My AC? Free Symptom Checker | Wave",
    description:
      "AC blowing warm air, freezing up, leaking or making noise? Our free AC symptom checker shows the likely cause, safe DIY checks and how urgent it is.",
    h1: "What's Wrong With My AC? Free Symptom Checker",
    intro:
      "Tell us what your air conditioner is doing and answer one quick follow-up question. You'll see the most likely causes, what's safe to check yourself, and whether it's an emergency or can wait.",
    icon: "search",
    time: "30 seconds",
    about: [
      "Most AC problems in Las Vegas come down to a handful of causes: failed capacitors and contactors, dirty coils, clogged filters and drains, refrigerant leaks and airflow problems. The symptom checker walks through the same questions our dispatchers ask on the phone.",
      "**Safety first:** if you smell gas, leave the home and call Southwest Gas or 911. If you smell burning or see smoke, turn the system off at the breaker.",
    ],
    faqs: [
      {
        q: "Why is my AC running but not cooling?",
        a: "The most common causes in Las Vegas are a failed capacitor, a dirty condenser coil, a clogged filter, low refrigerant from a leak or a frozen evaporator coil.",
      },
      {
        q: "Why is there ice on my AC lines?",
        a: "Ice usually means restricted airflow (dirty filter or coil) or low refrigerant. Turn the system off to let it thaw, replace the filter, and call for service if it happens again.",
      },
      {
        q: "Is a humming outdoor unit with no fan an emergency?",
        a: "Turn it off. It's usually a failed capacitor — a quick repair — but running the system that way can overheat and damage the compressor.",
      },
    ],
  },
  {
    slug: "energy-savings-calculator",
    name: "Summer Bill Savings Calculator",
    short: "See how much a tune-up, smart thermostat or high-efficiency upgrade could save you.",
    title: "AC Energy Savings Calculator Las Vegas | Lower Your Summer Bill | Wave",
    description:
      "How much could you save on your Las Vegas summer power bill? Estimate savings from an AC tune-up, smart thermostat or high-efficiency SEER2 upgrade.",
    h1: "Summer Bill Savings Calculator",
    intro:
      "Las Vegas summer power bills can be brutal — and your air conditioner is the biggest reason. Enter your average summer bill and a few details about your system to see how much a tune-up, a smart thermostat or a high-efficiency upgrade could save each year.",
    icon: "bolt",
    time: "45 seconds",
    about: [
      "Cooling is typically the single largest part of a Las Vegas summer electric bill. Efficiency is measured in **SEER/SEER2** — the higher the number, the less electricity it takes to deliver the same cooling. A system from 15–20 years ago may be rated around 10–13 SEER, while today's high-efficiency systems reach 17–22+.",
      "The calculator estimates the cooling share of your bill, then compares your current system to a tuned-up system, a smart thermostat and two upgrade levels. Results are estimates — your actual savings depend on your home, habits and rates.",
    ],
    faqs: [
      {
        q: "How much does AC add to a Las Vegas power bill?",
        a: "In summer, cooling is commonly well over half of a Las Vegas home's electric bill. That's why efficiency improvements pay off faster here than in milder climates.",
      },
      {
        q: "Does an AC tune-up really save money?",
        a: "Yes. Dirty coils, clogged filters and incorrect refrigerant charge all make a system run longer to deliver the same cooling. A tune-up restores lost efficiency and catches problems early.",
      },
      {
        q: "What SEER rating should I get in Las Vegas?",
        a: "Because Las Vegas cooling seasons are so long, higher-efficiency systems pay back faster here. Many homeowners find a mid-to-high efficiency system the best balance of upfront cost and long-term savings.",
      },
    ],
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
