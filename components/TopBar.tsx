import Link from "next/link";
import { pages, site } from "@/lib/site";
import { CallLink } from "./Cta";
import { OpenNow } from "./Hours";
import { Icon } from "./Icon";

/** Thin utility bar above the header: where we work, whether we're open, and the phone. Hidden on phones (the sticky bar covers it). */
export function TopBar() {
  return (
    <div className="topbar" role="region" aria-label="Service info">
      <div className="wrap topbar-row">
        <Link href={pages.areas} className="topbar-area">
          <Icon name="pin" size={15} /> Serving the Las Vegas Valley
        </Link>
        <OpenNow />
        <span className="topbar-lic">NV License {site.license}</span>
        <CallLink location="topbar" className="topbar-phone" icon={false}>
          <Icon name="phone" size={15} /> {site.phone}
        </CallLink>
      </div>
    </div>
  );
}
