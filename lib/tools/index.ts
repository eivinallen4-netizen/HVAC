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
      "Should you repair or replace your AC? Answer 6 quick questions and get an honest recommendation based on age, repair cost and refrigerant, using the same rule our technicians use.",
    h1: "AC Repair or Replace Calculator",
    intro:
      "Facing a big repair bill on an older system? Answer six quick questions and we'll tell you whether repairing or replacing is likely the smarter move — using the same factors our technicians weigh in your home.",
    icon: "wrench",
    time: "60 seconds",
    about: [
      "The calculator starts with the rule our technicians use: **on a system over 15 years old, a repair of about $2,000 or more usually means it's time to replace.** Minor repairs make sense at almost any age. Then it adjusts for the things that matter most in Las Vegas — R-22 refrigerant, rising bills, comfort problems and how long you plan to stay.",
      "It's a starting point, not a sales pitch. If the answer is \"repair,\" that's what we'll recommend. If you'd like a second opinion, our technicians can give you a repair quote and a replacement estimate side by side.",
    ],
    faqs: [
      {
        q: "When should I replace instead of repair?",
        a: "When your system is over 15 years old and the repair is about $2,000 or more. A burned-out compressor or a refrigerant leak in a spot we can't reach usually means replace too. Common repairs like a capacitor ($254–$349) or contactor ($339–$569) are worth doing at almost any age.",
      },
      {
        q: "How long do AC units last in Las Vegas?",
        a: "About 15 years. Long, extremely hot summers are hard on equipment, so regular maintenance makes a big difference. Under 10 years, a well-maintained system usually has plenty of life left.",
      },
      {
        q: "Is it worth repairing an R-22 air conditioner?",
        a: "Yes, we still repair R-22 systems, and small electrical repairs often make sense. But R-22 refrigerant and parts get more expensive and harder to find every year, so if an R-22 system needs refrigerant or a major component, replacement is usually the better value.",
      },
    ],
  },
  {
    slug: "ac-replacement-cost-estimator",
    name: "AC Replacement Cost Estimator",
    short: "Get a ballpark installed price range for a new system.",
    title: "AC Replacement Cost Estimator Las Vegas | Wave Heating & Cooling",
    description:
      "How much does a new AC cost in Las Vegas? Get an installed price range from Wave's own pricing by system type and home size.",
    h1: "AC Replacement Cost Estimator for Las Vegas Homes",
    intro:
      "Planning for a new air conditioner or heat pump? Tell us about your home and your current system, and get a ballpark installed price range based on Wave's own pricing.",
    icon: "tag",
    time: "90 seconds",
    about: [
      "The biggest factors in what a new system costs are **size** (tons of cooling), **system type**, **efficiency level** and **how much ductwork or electrical work** is needed. Las Vegas homes typically need more cooling capacity per square foot than homes in milder climates.",
      "This estimator uses Wave's installed pricing by system type and home size to get you in the right range quickly. The price includes the permit, removal of the old system, a new thermostat, line set flush, electrical disconnect and drain safety parts. Your exact price depends on your existing system, access and any extra work, which is why every Wave quote is done in-home and in writing.",
    ],
    faqs: [
      {
        q: "How much does it cost to replace an AC in Las Vegas?",
        a: "With Wave, a complete split system for a home under 1,400 sq ft runs about $9,800–$14,500+, and a 3.5 to 5-ton system for a larger home about $11,600–$15,900+. Package units and heat pumps cost a little more. Use the estimator for your range, then book an in-home visit for an exact quote.",
      },
      {
        q: "What size AC do I need for my house?",
        a: "In Las Vegas, a rough rule of thumb is about one ton of cooling per 400 square feet. When we replace a system, we match the size your ductwork was built for so the air moves properly. Going to a two-stage or variable-speed system, or a remodeled home, can change that, and then we size it to the home.",
      },
      {
        q: "Is financing available?",
        a: "Yes, financing is available with approved credit on jobs of $1,500 or more, from about $114 a month for every $10,000 financed. We'll show you the monthly payment next to the total.",
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
