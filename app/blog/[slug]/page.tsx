import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/page/Breadcrumbs";
import { CtaBand, ToolCards } from "@/components/page/Cards";
import { FinalCta } from "@/components/Sections";
import { CallLink } from "@/components/Cta";
import { Icon } from "@/components/Icon";
import { getAllPosts, getPost, postPromo, relatedPosts } from "@/lib/blog";
import type { ToolSlug } from "@/lib/content/types";
import { blogPostingLd, buildMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    ...buildMetadata({
      // Keep the brand suffix only when the whole title still fits in Google's ~60-char display
      title: p.title.length <= 36 ? `${p.title} | Wave Heating & Cooling` : p.title.length <= 52 ? `${p.title} | Wave` : p.title,
      description: p.description,
      path: `/blog/${p.slug}/`,
      image: p.image,
      type: "article",
    }),
    other: { "article:published_time": p.date, "article:modified_time": p.modified },
  };
}

const fmtDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default async function PostPage({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}/`;
  const promo = postPromo[p.category];
  const tool = promo ? getTool(promo.tool) : undefined;
  const related = relatedPosts(p.slug);

  return (
    <>
      <article>
        <header className="post-hero">
          <div className="wrap post-wrap">
            <Breadcrumbs crumbs={[{ name: "HVAC Tips & Guides", path: "/blog/" }, { name: p.title, path }]} />
            <span className="guide-tag static">{p.category}</span>
            <h1>{p.title}</h1>
            <p className="post-meta">
              By the Wave Heating &amp; Cooling team · <time dateTime={p.date}>{fmtDate(p.date)}</time> · {p.readMinutes} min read
            </p>
          </div>
          <div className="wrap post-wrap">
            <div className="post-cover">
              <Image src={p.image} alt={p.title} fill priority sizes="(max-width: 900px) 100vw, 860px" />
            </div>
          </div>
        </header>

        <div className="wrap post-layout">
          <div className="post-body prose-wrap" dangerouslySetInnerHTML={{ __html: p.html }} />
          <aside className="post-side">
            {p.toc.length > 2 && (
              <nav className="toc rail-toc" aria-label="In this article">
                <small>In this article</small>
                <ol>
                  {p.toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="side-cta rail-cta">
              <strong>Need help now?</strong>
              <p>Wave&apos;s NATE-certified techs offer same-day service across most of the Las Vegas valley.</p>
              <CallLink className="btn btn-red btn-block" location="blog-side" />
              <Link href="/contact/" className="btn btn-ghost btn-block">
                Book Now
              </Link>
            </div>
            {tool && (
              <Link href={`/tools/${tool.slug}/`} className="side-tool rail-tool">
                <Icon name={tool.icon} size={22} />
                <strong>{tool.name}</strong>
                <span>{tool.short}</span>
                <span className="svc-link">
                  Try it free <Icon name="arrow" size={16} />
                </span>
              </Link>
            )}
          </aside>
        </div>
      </article>

      <CtaBand
        title={promo ? `Talk to a Pro About ${promo.serviceName}` : "Questions About Your System?"}
        text="A quick call is free. We'll give you an honest answer and, if you need us, a time that works for you."
      />

      {related.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <div className="rev-head">
              <div>
                <span className="kicker">Keep reading</span>
                <h2>Related Guides</h2>
              </div>
              <Link className="text-link" href="/blog/">
                All guides <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="rel-rows">
              {related.map((r, i) => (
                <Link href={`/blog/${r.slug}/`} className="mag-item rel-row" key={r.slug} data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="mag-thumb">
                    <Image src={r.image} alt="" fill sizes="(max-width: 760px) 100vw, 220px" />
                  </div>
                  <div>
                    <span className="mag-tag">{r.category}</span>
                    <h3>{r.title}</h3>
                    <p>{r.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {promo && <ToolCards slugs={[promo.tool as ToolSlug]} title="Try Our Free Tool" lead="" variant="rows" />}
      <FinalCta />
      <JsonLd data={blogPostingLd({ title: p.title, description: p.description, path, image: p.image, date: p.date, modified: p.modified })} />
    </>
  );
}
