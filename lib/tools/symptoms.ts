import type { IconName } from "../site";

export type Urgency = "emergency" | "soon" | "can-wait";

export type Diagnosis = {
  title: string;
  urgency: Urgency;
  causes: string[];
  diy: string[];
  tech: string;
  /** Service preselected in the booking form */
  service: string;
  link: { label: string; href: string };
};

type Answer = { label: string; result: Diagnosis };

export type Symptom = {
  id: string;
  label: string;
  sub: string;
  icon: IconName;
  question: string;
  answers: Answer[];
};

const repair = { label: "AC repair in Las Vegas", href: "/hvac-repairs-in-las-vegas/" };
const emergency = { label: "24/7 emergency AC repair", href: "/emergency-ac-repair-las-vegas/" };
const filterTip = "Check your air filter — if it's gray and clogged, replace it.";
const breakerTip = "Check the breakers for both the indoor unit and the outdoor condenser.";
const thermostatTip = "Make sure the thermostat is on COOL, set below room temperature, with fresh batteries.";

export const symptoms: Symptom[] = [
  {
    id: "warm-air",
    label: "Blowing warm air",
    sub: "Running, but not cooling",
    icon: "sun",
    question: "Go outside and look at the outdoor unit. What's it doing?",
    answers: [
      {
        label: "Humming, but the fan isn't spinning",
        result: {
          title: "Likely a failed capacitor or fan motor",
          urgency: "emergency",
          causes: ["Failed run/start capacitor (the most common summer failure in Las Vegas)", "Failed condenser fan motor", "Seized compressor (less common)"],
          diy: ["Turn the system OFF at the thermostat now — running it like this can overheat and damage the compressor.", breakerTip],
          tech: "Test the capacitor and fan motor, replace the failed part (usually from stock on the truck) and check compressor health.",
          service: "AC not cooling",
          link: emergency,
        },
      },
      {
        label: "Fan is spinning, unit is running",
        result: {
          title: "Likely a refrigerant, airflow or coil issue",
          urgency: "soon",
          causes: ["Low refrigerant from a leak", "Dirty condenser coil packed with desert dust", "Clogged air filter or dirty evaporator coil", "Undersized or failing system on very hot days"],
          diy: [filterTip, "Gently rinse dust off the outdoor coil with a garden hose (power off first).", "Make sure nothing is blocking the outdoor unit within 2 feet."],
          tech: "Measure refrigerant pressures and temperatures, check for leaks, clean coils and test airflow.",
          service: "AC not cooling",
          link: repair,
        },
      },
      {
        label: "Outdoor unit isn't running at all",
        result: {
          title: "Likely an electrical or control problem",
          urgency: "soon",
          causes: ["Tripped breaker or blown disconnect fuse", "Failed contactor", "Thermostat or low-voltage wiring issue", "Tripped condensate safety switch"],
          diy: [breakerTip, thermostatTip, "Check if the indoor drain pan has water in it — a full pan can shut the system off."],
          tech: "Trace power from the panel to the condenser, test the contactor and control wiring, and clear any safety switch faults.",
          service: "AC not cooling",
          link: repair,
        },
      },
    ],
  },
  {
    id: "wont-turn-on",
    label: "Won't turn on",
    sub: "Nothing happens at all",
    icon: "power",
    question: "Does the thermostat screen have power?",
    answers: [
      {
        label: "Screen is blank",
        result: {
          title: "Likely a power, thermostat or safety switch issue",
          urgency: "soon",
          causes: ["Dead thermostat batteries", "Tripped breaker for the indoor unit", "Blown low-voltage fuse on the control board", "Tripped float switch from a clogged drain"],
          diy: ["Replace the thermostat batteries.", breakerTip, "Check the furnace/air-handler door is fully closed — a safety switch cuts power if it isn't."],
          tech: "Test transformer and fuse, check the float switch and drain line, and verify thermostat wiring.",
          service: "System won't turn on / no airflow",
          link: repair,
        },
      },
      {
        label: "Screen works, but nothing turns on",
        result: {
          title: "Likely a control board, contactor or wiring fault",
          urgency: "soon",
          causes: ["Failed contactor or relay", "Control board fault", "Broken thermostat wire", "Blower motor or capacitor failure"],
          diy: [thermostatTip, breakerTip],
          tech: "Diagnose the control circuit end-to-end and repair the failed component.",
          service: "System won't turn on / no airflow",
          link: repair,
        },
      },
    ],
  },
  {
    id: "ice",
    label: "Ice on the lines or coil",
    sub: "Frost on copper pipes",
    icon: "snow",
    question: "Is your air filter dirty or older than 2–3 months?",
    answers: [
      {
        label: "Yes / not sure",
        result: {
          title: "Likely restricted airflow",
          urgency: "soon",
          causes: ["Clogged air filter", "Dirty evaporator coil", "Closed or blocked vents and returns", "Failing blower motor"],
          diy: ["Turn the system to OFF (or fan-only) to let the ice melt — this can take several hours.", "Replace the air filter.", "Open all supply vents and clear return grilles."],
          tech: "Clean the evaporator coil, test the blower and verify refrigerant charge once the coil has thawed.",
          service: "AC not cooling",
          link: repair,
        },
      },
      {
        label: "No, the filter is clean",
        result: {
          title: "Likely low refrigerant",
          urgency: "soon",
          causes: ["Refrigerant leak causing a low charge", "Metering device restriction", "Blower running too slowly"],
          diy: ["Turn the system OFF to let the ice melt.", "Place towels under the indoor unit in case the drain overflows while thawing."],
          tech: "Leak-search the system, repair the leak and restore the correct refrigerant charge.",
          service: "AC not cooling",
          link: repair,
        },
      },
    ],
  },
  {
    id: "noise",
    label: "Strange noises",
    sub: "Grinding, buzzing, banging",
    icon: "bolt",
    question: "What does it sound like?",
    answers: [
      {
        label: "Grinding, screeching or squealing",
        result: {
          title: "Likely a failing motor or bearing",
          urgency: "emergency",
          causes: ["Worn motor bearings (blower or condenser fan)", "Failing compressor", "Loose or damaged fan blade"],
          diy: ["Turn the system OFF to prevent more damage.", "Don't open electrical panels yourself."],
          tech: "Identify the failing motor or component and replace it before it causes a bigger failure.",
          service: "AC not cooling",
          link: emergency,
        },
      },
      {
        label: "Loud buzzing or clicking",
        result: {
          title: "Likely an electrical component",
          urgency: "soon",
          causes: ["Failing contactor", "Weak capacitor", "Loose electrical connection", "Compressor struggling to start"],
          diy: [breakerTip, "If you smell burning, turn the system off at the breaker."],
          tech: "Test and replace failing electrical parts and tighten connections.",
          service: "AC not cooling",
          link: repair,
        },
      },
      {
        label: "Rattling or banging",
        result: {
          title: "Likely something loose",
          urgency: "can-wait",
          causes: ["Loose panel or screws", "Debris in the outdoor unit", "Loose fan blade or blower wheel", "Ducts expanding and contracting"],
          diy: ["Check for sticks or debris in the outdoor unit (power off first).", "Make sure access panels are secure."],
          tech: "Tighten and secure components, clear debris and inspect the fan and blower assemblies.",
          service: "AC not cooling",
          link: repair,
        },
      },
    ],
  },
  {
    id: "leak",
    label: "Water leaking",
    sub: "Puddles near the indoor unit",
    icon: "duct",
    question: "Where is the water?",
    answers: [
      {
        label: "Around the indoor unit / in the closet or attic",
        result: {
          title: "Likely a clogged condensate drain",
          urgency: "soon",
          causes: ["Clogged condensate drain line (algae and dust)", "Cracked or rusted drain pan", "Frozen coil melting", "Failed condensate pump"],
          diy: ["Turn the system off to stop more water from collecting.", "Use towels or a wet vac to remove standing water.", "If accessible, check whether the drain line outlet outside is dripping."],
          tech: "Clear and flush the drain line, check the pan and safety switch, and look for a frozen-coil cause.",
          service: "AC not cooling",
          link: repair,
        },
      },
      {
        label: "Coming through a ceiling",
        result: {
          title: "Overflowing drain pan above your ceiling",
          urgency: "emergency",
          causes: ["Clogged drain with a failed or missing float switch", "Cracked secondary pan in the attic"],
          diy: ["Turn the system OFF immediately to prevent ceiling damage.", "Put a bucket under the drip and move valuables."],
          tech: "Clear the drain, inspect pans, and install or repair a safety float switch so it can't happen again.",
          service: "AC not cooling",
          link: emergency,
        },
      },
    ],
  },
  {
    id: "short-cycle",
    label: "Turns on and off a lot",
    sub: "Short cycling",
    icon: "clock",
    question: "How often does it turn on and off?",
    answers: [
      {
        label: "Every few minutes",
        result: {
          title: "Short cycling — the system is stressing itself",
          urgency: "soon",
          causes: ["Oversized system", "Low refrigerant", "Overheating from a dirty coil or filter", "Thermostat in a bad location or failing"],
          diy: [filterTip, "Make sure the thermostat isn't in direct sun or near a supply vent."],
          tech: "Check refrigerant charge, airflow and electrical controls, and evaluate system sizing.",
          service: "AC not cooling",
          link: repair,
        },
      },
      {
        label: "It runs nonstop and never shuts off",
        result: {
          title: "System can't keep up",
          urgency: "soon",
          causes: ["Low refrigerant", "Dirty condenser coil", "Leaky ductwork losing cool air to the attic", "Undersized or aging system"],
          diy: [filterTip, "Rinse dust from the outdoor coil (power off first)."],
          tech: "Test capacity, refrigerant charge and airflow, and inspect ducts for leaks.",
          service: "AC not cooling",
          link: repair,
        },
      },
    ],
  },
  {
    id: "smell",
    label: "Strange smell",
    sub: "Burning, musty or gas",
    icon: "flame",
    question: "What does it smell like?",
    answers: [
      {
        label: "Burning or electrical",
        result: {
          title: "Possible electrical overheating",
          urgency: "emergency",
          causes: ["Overheating motor", "Burnt wiring or electrical component"],
          diy: ["Turn the system OFF at the thermostat AND the breaker.", "If you see smoke or flames, leave the home and call 911."],
          tech: "Find and repair the overheating component and check all wiring for damage.",
          service: "System won't turn on / no airflow",
          link: emergency,
        },
      },
      {
        label: "Rotten eggs / gas",
        result: {
          title: "Possible gas leak — act now",
          urgency: "emergency",
          causes: ["Natural gas leak at the furnace, water heater or gas line"],
          diy: ["Leave the home immediately. Don't use light switches or phones inside.", "Call Southwest Gas or 911 from outside.", "Once the utility clears it, call us to repair the appliance."],
          tech: "After the gas company has made it safe, repair the source and perform a full combustion safety check.",
          service: "Heat not working",
          link: { label: "Heating repair", href: "/hvac-heating-repair-in-las-vegas/" },
        },
      },
      {
        label: "Musty or moldy",
        result: {
          title: "Likely moisture or microbial growth",
          urgency: "can-wait",
          causes: ["Standing water in the drain pan", "Mold on the evaporator coil", "Dirty ductwork"],
          diy: ["Replace the air filter.", "Check the drain pan for standing water."],
          tech: "Clean the coil and drain pan, and recommend UV treatment or filtration to prevent regrowth.",
          service: "Ductwork / indoor air quality",
          link: { label: "Indoor air quality", href: "/indoor-air-quality-las-vegas/" },
        },
      },
    ],
  },
  {
    id: "uneven",
    label: "Some rooms too hot",
    sub: "Uneven temperatures",
    icon: "home",
    question: "Which best describes it?",
    answers: [
      {
        label: "Upstairs is much hotter than downstairs",
        result: {
          title: "Likely airflow or duct issues",
          urgency: "can-wait",
          causes: ["Long or leaky duct runs to upstairs rooms", "Not enough return air upstairs", "Hot attic over upstairs rooms", "System not sized or zoned for a two-story home"],
          diy: ["Make sure upstairs vents are fully open.", "Try running the fan on ON instead of AUTO to mix air."],
          tech: "Measure airflow room by room, inspect ducts, and recommend balancing, zoning or a ductless mini-split.",
          service: "Ductwork / indoor air quality",
          link: { label: "Ductwork repair & sealing", href: "/hvac-ductwork-las-vegas/" },
        },
      },
      {
        label: "One or two rooms are always warm",
        result: {
          title: "Likely a duct or sun-load issue",
          urgency: "can-wait",
          causes: ["Disconnected or crushed duct to that room", "West- or south-facing windows", "Room addition the system wasn't designed for"],
          diy: ["Check that the room's vent is open and has strong airflow.", "Close blinds on sun-facing windows in the afternoon."],
          tech: "Inspect the duct run, measure airflow and recommend repairs or a mini-split for that room.",
          service: "Ductless mini-split",
          link: { label: "Ductless mini-splits", href: "/ductless-mini-split-systems-in-las-vegas/" },
        },
      },
    ],
  },
];

export const urgencyCopy: Record<Urgency, { label: string; text: string }> = {
  emergency: { label: "Urgent", text: "Turn the system off and call now — continuing to run it could cause more damage or a safety risk." },
  soon: { label: "Schedule soon", text: "Book a repair in the next day or two before a small problem becomes a big one." },
  "can-wait": { label: "Can wait", text: "Not an emergency, but worth fixing — schedule at your convenience." },
};
