import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page/PageHero";
import { ToolCards } from "@/components/page/Cards";
import { FinalCta } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HVAC Tips & Guides for Las Vegas Homes | Wave",
  description:
    "Practical heating and cooling advice for Las Vegas homes: AC sizing, duct leaks, carbon monoxide safety, air quality, maintenance and beating the desert heat.",
  path: "/blog/",
});

const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function BlogIndex() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        crumbs={[{ name: "HVAC Tips & Guides", path: "/blog/" }]}
        kicker="HVAC advice & insights"
        h1="Desert Heating & Cooling Guides"
        intro="Straight-talking advice from Wave's technicians on keeping a Las Vegas home comfortable, efficient and safe — all year long."
        form={false}
        img="/images/valley-night.jpg"
      />

      <section className="sec">
        <div className="wrap">
          {lead && (
            <Link href={`/blog/${lead.slug}/`} className="card post-lead" data-reveal>
              <div className="post-lead-img">
                <Image src={lead.image} alt="" fill priority sizes="(max-width: 900px) 100vw, 640px" />
              </div>
              <div className="post-lead-body">
                <span className="guide-tag static">{lead.category}</span>
                <h2>{lead.title}</h2>
                <p>{lead.description}</p>
                <span className="post-meta">
                  {fmtDate(lead.date)} · {lead.readMinutes} min read
                </span>
                <span className="svc-link">
                  Read guide <Icon name="arrow" size={16} />
                </span>
              </div>
            </Link>
          )}
          <div className="grid-3 post-grid">
            {rest.map((p, i) => (
              <Link href={`/blog/${p.slug}/`} className="card guide" key={p.slug} data-reveal style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <div className="svc-img">
                  <Image src={p.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1040px) 50vw, 400px" />
                  <span className="guide-tag">{p.category}</span>
                </div>
                <div className="svc-body">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </div>
                <div className="svc-foot">
                  <span className="post-meta">
                    {fmtDate(p.date)} · {p.readMinutes} min
                  </span>
                  <span className="svc-link">
                    Read <Icon name="arrow" size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ToolCards />
      <FinalCta />
    </>
  );
}
