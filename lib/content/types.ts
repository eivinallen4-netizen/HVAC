import type { IconName } from "../site";

export type Faq = { q: string; a: string };

/**
 * A content section. `body` paragraphs support [link text](/path/) and **bold**.
 */
export type Section = {
  h2: string;
  body?: string[];
  list?: string[];
  cards?: { t: string; d: string }[];
  table?: { head: string[]; rows: string[][]; note?: string };
  /**
   * Presentation hint only: how the section is laid out. Never changes the words.
   * steps → rail stepper · included → work-order sheet · options → choice columns ·
   * services → spec sheet · fit → tag cloud · wait → index card · safety → hazard panel ·
   * season → month strip · club → membership card · sizing → too big / right / too small · fine → terms box
   */
  kind?: SectionKind;
  /** For kind "season": months (0 = Jan) the copy names, with the label shown in the legend */
  season?: { m: number[]; label: string; tone?: "warm" | "cool" }[];
};

export type SectionKind =
  | "steps"
  | "included"
  | "options"
  | "services"
  | "fit"
  | "wait"
  | "safety"
  | "season"
  | "club"
  | "sizing"
  | "fine";

export type ToolSlug =
  | "repair-or-replace-calculator"
  | "ac-replacement-cost-estimator"
  | "ac-symptom-checker"
  | "energy-savings-calculator";

export type ServiceCategory = "cooling" | "heating" | "air";

export type ServicePage = {
  slug: string;
  category: ServiceCategory;
  /** Short name used in nav, cards and breadcrumbs */
  name: string;
  /** <title> — keep under ~60 chars */
  title: string;
  /** Meta description — keep under ~155 chars */
  description: string;
  h1: string;
  kicker: string;
  intro: string;
  /** One-line summary for cards */
  summary: string;
  img: string;
  icon: IconName;
  /** Preselected option in the estimate form */
  pick: string;
  highlights: string[];
  signs?: { title: string; items: { t: string; d: string }[] };
  sections: Section[];
  faqs: Faq[];
  related: string[];
  tools?: ToolSlug[];
  emergency?: boolean;
};

export type HubPage = {
  slug: string;
  category?: ServiceCategory;
  name: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  intro: string;
  img: string;
  sections: Section[];
  faqs: Faq[];
};
