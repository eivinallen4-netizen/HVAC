import { airServices } from "./services-air";
import { coolingServices } from "./services-cooling";
import { heatingServices } from "./services-heating";
import type { HubPage, ServiceCategory, ServicePage } from "./types";

export const servicePages: ServicePage[] = [...coolingServices, ...heatingServices, ...airServices];

export const getService = (slug: string) => servicePages.find((s) => s.slug === slug);

export const servicesIn = (category: ServiceCategory) => servicePages.filter((s) => s.category === category);

export const categoryLabels: Record<ServiceCategory, { name: string; hub: string }> = {
  cooling: { name: "Cooling", hub: "/cooling-services/" },
  heating: { name: "Heating", hub: "/heating-services/" },
  air: { name: "Air Quality & More", hub: "/services/" },
};

export const hubPages: HubPage[] = [
  {
    slug: "services",
    name: "All Services",
    title: "HVAC Services in Las Vegas | Wave Heating & Cooling",
    description:
      "Complete HVAC services in Las Vegas: AC repair and installation, heating, heat pumps, ductless, ductwork, indoor air quality and maintenance plans. 24/7.",
    h1: "Heating & Cooling Services in Las Vegas",
    kicker: "Everything HVAC",
    intro:
      "From a 2 a.m. AC emergency to a whole-home system upgrade, Wave Heating & Cooling handles every part of your home's comfort. Family-owned, NATE-certified and available 24/7 across the Las Vegas valley.",
    img: "/images/hero.jpg",
    sections: [
      {
        h2: "One Local Team for Your Whole System",
        body: [
          "Your air conditioner, heater, ductwork and air quality all work together — so we look at the whole system, not just the part that broke. That means fewer callbacks, better efficiency and honest recommendations that make sense for your home and budget.",
          "Not sure what you need? Try the [AC Symptom Checker](/tools/ac-symptom-checker/), or call us and we'll point you in the right direction for free.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you work on both residential and commercial systems?",
        a: "We specialize in residential HVAC for homes across the Las Vegas valley. Call us to discuss light commercial needs.",
      },
      {
        q: "Are you licensed and insured?",
        a: "Yes. Wave Heating & Cooling is licensed, bonded and insured in Nevada (license #0086052), and most of our technicians are NATE-certified.",
      },
    ],
  },
  {
    slug: "cooling-services",
    category: "cooling",
    name: "Cooling Services",
    title: "AC Services Las Vegas | Repair, Install & Tune-Ups | Wave",
    description:
      "Las Vegas air conditioning services: 24/7 AC repair, new installations, replacements and tune-ups from a family-owned, NATE-certified team.",
    h1: "Air Conditioning Services in Las Vegas",
    kicker: "Cooling services",
    intro:
      "In the Mojave desert your air conditioner isn't a luxury — it's essential. Wave Heating & Cooling keeps Las Vegas homes cool with fast repairs, expert installations and preventative maintenance built for triple-digit summers.",
    img: "/images/svc-ac-repair.jpg",
    sections: [
      {
        h2: "Cooling Built for the Desert",
        body: [
          "Las Vegas air conditioners run longer and harder than almost anywhere in the country. Our technicians know how desert heat and dust affect equipment — which parts fail first, how to size a system for 115° days, and how to keep it running efficiently all summer.",
          "Every new installation starts with a load calculation, every repair starts with a real diagnosis, and every tune-up includes a thorough coil cleaning. Before you call, you can check what's going on with the [AC Symptom Checker](/tools/ac-symptom-checker/) or weigh your options with the [Repair or Replace Calculator](/tools/repair-or-replace-calculator/).",
        ],
      },
    ],
    faqs: [
      {
        q: "How long do air conditioners last in Las Vegas?",
        a: "Typically 10–15 years, depending on maintenance, installation quality and how hard the system works. Regular tune-ups are the biggest factor in a longer life.",
      },
      {
        q: "What temperature should I set my AC to in summer?",
        a: "Many homeowners find 76–78°F comfortable while home. Setting it higher when you're away — and using a smart thermostat — can reduce your bill without sacrificing comfort.",
      },
    ],
  },
  {
    slug: "heating-services",
    category: "heating",
    name: "Heating Services",
    title: "Heating Services Las Vegas | Furnace & Heat Pump | Wave",
    description:
      "Las Vegas heating services: furnace and heat pump repair, installation, replacement and fall tune-ups with carbon monoxide safety checks. 24/7 service.",
    h1: "Heating Services in Las Vegas",
    kicker: "Heating services",
    intro:
      "Desert winter nights can drop near freezing. Wave Heating & Cooling keeps your furnace or heat pump safe, efficient and ready — with repairs, installations, replacements and fall tune-ups from NATE-certified techs.",
    img: "/images/svc-heating.jpg",
    sections: [
      {
        h2: "Safe, Efficient Heat for Las Vegas Homes",
        body: [
          "Most Las Vegas homes heat with either a gas furnace or a heat pump. Both sit idle for most of the year, which is why a fall inspection matters: it catches dirty burners, weak igniters, failing defrost controls and — most importantly — carbon monoxide risks before you need the heat.",
          "Read our [carbon monoxide safety guide](/blog/carbon-monoxide-winter-hvac-safety/) for what every homeowner should check before turning on the heat.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I get a heat pump or a gas furnace?",
        a: "Both work well in Las Vegas. Heat pumps are very efficient in our mild winters and also cool your home; gas furnaces deliver strong heat and pair with a central AC. A dual-fuel system combines both.",
      },
      {
        q: "How often should my heater be serviced?",
        a: "Once a year, ideally in October or November before the first cold nights.",
      },
    ],
  },
];

export const getHub = (slug: string) => hubPages.find((h) => h.slug === slug);
