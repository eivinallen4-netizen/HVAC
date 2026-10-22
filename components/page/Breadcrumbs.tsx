import Link from "next/link";
import { breadcrumbLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "../JsonLd";
import { Icon } from "../Icon";

/** Visible breadcrumb trail + BreadcrumbList schema. The last crumb is the current page. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          {crumbs.map((c, i) => (
            <li key={c.path}>
              <Icon name="chev" size={13} />
              {i === crumbs.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
