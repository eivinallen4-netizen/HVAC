import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";

/**
 * Blog posts live in content/blog/<slug>.md (front matter + Markdown).
 * To add a post: copy an existing file, change the front matter, write Markdown. That's it.
 */
const DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  modified: string;
  category: string;
  image: string;
  readMinutes: number;
};

export type Post = PostMeta & { html: string; toc: { id: string; text: string }[] };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z#0-9]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function read(file: string) {
  const { data, content } = matter(readFileSync(path.join(DIR, file), "utf8"));
  const slug = (data.slug as string) || file.replace(/\.md$/, "");
  const words = content.split(/\s+/).length;
  const meta: PostMeta = {
    slug,
    title: data.title,
    description: data.description,
    date: new Date(data.date).toISOString(),
    modified: new Date(data.modified ?? data.date).toISOString(),
    category: data.category ?? "HVAC Tips",
    image: data.image ?? "/images/hero.jpg",
    readMinutes: Math.max(2, Math.round(words / 230)),
  };
  return { meta, content };
}

let cache: PostMeta[] | null = null;

export function getAllPosts(): PostMeta[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  cache = readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => read(f).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

export function getPost(slug: string): Post | undefined {
  const file = `${slug}.md`;
  if (!readdirSync(DIR).includes(file)) return undefined;
  const { meta, content } = read(file);

  const toc: Post["toc"] = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        // Post titles are the page H1, so demote any H1 inside the body
        const level = Math.max(2, depth);
        const id = slugify(text);
        if (level === 2) toc.push({ id, text: text.replace(/<[^>]+>/g, "") });
        return `<h${level} id="${id}">${text}</h${level}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href) && !href.includes("waveheatingandcooling.com");
        const t = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`;
      },
      image({ href, text }) {
        return `<img src="${href}" alt="${text ?? ""}" loading="lazy" decoding="async" />`;
      },
    },
  });

  const html = marked.parse(content, { async: false }) as string;
  return { ...meta, html, toc };
}

export function relatedPosts(slug: string, n = 3) {
  const all = getAllPosts();
  const me = all.find((p) => p.slug === slug);
  const same = all.filter((p) => p.slug !== slug && p.category === me?.category);
  const rest = all.filter((p) => p.slug !== slug && p.category !== me?.category);
  return [...same, ...rest].slice(0, n);
}

export const categories = () => [...new Set(getAllPosts().map((p) => p.category))];

/** Which tool / service to promote inside a post, by category */
export const postPromo: Record<string, { tool: string; service: string; serviceName: string }> = {
  Safety: { tool: "ac-symptom-checker", service: "/hvac-heating-maintenance-in-las-vegas/", serviceName: "Heating tune-ups" },
  "Ductwork & Airflow": { tool: "energy-savings-calculator", service: "/hvac-ductwork-las-vegas/", serviceName: "Ductwork repair & sealing" },
  "Indoor Air Quality": { tool: "ac-symptom-checker", service: "/indoor-air-quality-las-vegas/", serviceName: "Indoor air quality" },
  "Smart Home & Efficiency": { tool: "energy-savings-calculator", service: "/indoor-air-quality-las-vegas/", serviceName: "Smart thermostats & zoning" },
  "Buying a System": { tool: "repair-or-replace-calculator", service: "/ac-replacement-in-las-vegas/", serviceName: "AC replacement" },
  Maintenance: { tool: "energy-savings-calculator", service: "/hvac-maintenance-las-vegas/", serviceName: "Wave Club maintenance" },
  "Beating the Heat": { tool: "ac-symptom-checker", service: "/emergency-ac-repair-las-vegas/", serviceName: "24/7 emergency AC repair" },
};
