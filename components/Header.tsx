import { servicesIn } from "@/lib/content/services";
import { pages } from "@/lib/site";
import { tools } from "@/lib/tools";
import { HeaderClient, type NavMenu } from "./HeaderClient";

const svc = (c: "cooling" | "heating" | "air") => servicesIn(c).map((s) => ({ href: `/${s.slug}/`, label: s.name }));

const menus: NavMenu[] = [
  {
    label: "Services",
    href: pages.services,
    groups: [
      { title: "Cooling", href: "/cooling-services/", items: svc("cooling") },
      { title: "Heating", href: "/heating-services/", items: svc("heating") },
      { title: "Air & More", items: svc("air") },
    ],
  },
  {
    label: "Free Tools",
    href: pages.tools,
    groups: [{ title: "Homeowner tools", href: pages.tools, items: tools.map((t) => ({ href: `/tools/${t.slug}/`, label: t.name })) }],
  },
  { label: "Service Areas", href: pages.areas },
  { label: "Reviews", href: pages.reviews },
  { label: "Specials", href: pages.specials },
  {
    label: "About",
    href: pages.about,
    groups: [
      {
        title: "Company",
        items: [
          { href: pages.about, label: "About Wave" },
          { href: pages.team, label: "Our Team" },
          { href: pages.financing, label: "Financing" },
          { href: pages.referral, label: "Referral Program" },
          { href: pages.blog, label: "HVAC Tips & Guides" },
          { href: pages.faq, label: "FAQ" },
          { href: pages.contact, label: "Contact" },
        ],
      },
    ],
  },
];

/** Server wrapper: builds the nav from content data so the content itself isn't shipped to the browser */
export function Header() {
  return <HeaderClient menus={menus} />;
}
