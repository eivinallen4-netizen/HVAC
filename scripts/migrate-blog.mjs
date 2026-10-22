#!/usr/bin/env node
/**
 * One-off migration: pulls every post from the old WordPress site's REST API and writes
 * content/blog/<slug>.md (front matter + Markdown), downloading featured and inline images
 * to public/images/blog/. Safe to re-run — it overwrites the generated files.
 *
 *   node scripts/migrate-blog.mjs [https://waveheatingandcooling.com]
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import TurndownService from "turndown";

const SITE = (process.argv[2] || "https://waveheatingandcooling.com").replace(/\/$/, "");
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "content", "blog");
const IMG = path.join(ROOT, "public", "images", "blog");

/** WordPress put almost everything in "Uncategorized", so derive a useful category from the slug. */
const CATEGORY_RULES = [
  [/carbon-monoxide|calm-homeowner/, "Safety"],
  [/duct|sealing|airflow/, "Ductwork & Airflow"],
  [/dust|ventilation|air-quality/, "Indoor Air Quality"],
  [/thermostat|zoning/, "Smart Home & Efficiency"],
  [/right-sized|replace-vs-repair|when-to-replace/, "Buying a System"],
  [/maintenance/, "Maintenance"],
  [/heat-wave|mojave|emergency-cooling/, "Beating the Heat"],
];
const categoryFor = (slug) => CATEGORY_RULES.find(([re]) => re.test(slug))?.[1] ?? "HVAC Tips";

const decode = (s) =>
  s
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const stripTags = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function description(text) {
  if (text.length <= 155) return text;
  const cut = text.slice(0, 152);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

async function download(url, name) {
  const ext = (path.extname(new URL(url).pathname) || ".jpg").toLowerCase();
  const file = `${name}${ext}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`image ${res.status}: ${url}`);
  await writeFile(path.join(IMG, file), Buffer.from(await res.arrayBuffer()));
  return `/images/blog/${file}`;
}

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
// WordPress wraps whole headings in <strong>; drop the redundant bold inside headings
td.addRule("headingStrong", {
  filter: (node) => node.nodeName === "STRONG" && /^H[1-6]$/.test(node.parentNode?.nodeName ?? ""),
  replacement: (content) => content,
});

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(IMG, { recursive: true });

  const res = await fetch(`${SITE}/wp-json/wp/v2/posts?per_page=100&_embed`);
  if (!res.ok) throw new Error(`WP API ${res.status}`);
  const posts = await res.json();
  console.log(`Fetched ${posts.length} posts`);

  for (const p of posts) {
    let html = p.content.rendered;

    // inline images → local copies
    let n = 0;
    for (const [, src] of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
      try {
        const local = await download(src, `${p.slug}-${++n}`);
        html = html.split(src).join(local);
      } catch (e) {
        console.warn("  ! inline image failed", src, e.message);
      }
    }
    // strip srcset/sizes so they don't point back at WordPress
    html = html.replace(/\s(srcset|sizes)="[^"]*"/g, "");
    // old dated post links → new /blog/<slug>/ URLs; other site links → relative
    html = html
      .replace(new RegExp(`${SITE}/\\d{4}/\\d{2}/\\d{2}/([^/"]+)/?`, "g"), "/blog/$1/")
      .replace(new RegExp(`${SITE}/`, "g"), "/");

    let image = "";
    const fm = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
    if (fm) {
      try {
        image = await download(fm, p.slug);
      } catch (e) {
        console.warn("  ! featured image failed", fm, e.message);
      }
    }

    const body = td.turndown(html).replace(/\n{3,}/g, "\n\n").trim();
    const excerpt = stripTags(p.excerpt.rendered).replace(/\s*\[…\]$|\s*\[&hellip;\]$/, "").trim();

    const data = {
      title: stripTags(p.title.rendered),
      slug: p.slug,
      date: p.date_gmt + "Z",
      modified: p.modified_gmt + "Z",
      description: description(excerpt),
      category: categoryFor(p.slug),
      image: image || "/images/hero.jpg",
      legacyUrl: p.link,
    };
    await writeFile(path.join(OUT, `${p.slug}.md`), matter.stringify(body + "\n", data));
    console.log(`✓ ${p.slug}  [${data.category}]`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
