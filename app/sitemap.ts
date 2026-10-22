import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { areaPages } from "@/lib/content/areas";
import { hubPages, servicePages } from "@/lib/content/services";
import { site } from "@/lib/site";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string) => `${site.url}${path}`;
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: u(path),
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),
    ...hubPages.map((h) => entry(`/${h.slug}/`, 0.9)),
    ...servicePages.map((s) => entry(`/${s.slug}/`, 0.9)),
    entry("/service-area-las-vegas/", 0.8),
    ...areaPages.map((a) => entry(`/service-areas/${a.slug}/`, 0.8)),
    entry("/tools/", 0.7),
    ...tools.map((t) => entry(`/tools/${t.slug}/`, 0.8)),
    entry("/blog/", 0.6, "weekly"),
    ...getAllPosts().map((p) => ({ url: u(`/blog/${p.slug}/`), lastModified: new Date(p.modified), changeFrequency: "yearly" as const, priority: 0.5 })),
    ...["/about-us/", "/our-team/", "/reviews/", "/contact/", "/financing/", "/specials/", "/referral-program/", "/faq/"].map((p) => entry(p, 0.6)),
    ...["/privacy-policy/", "/terms/"].map((p) => entry(p, 0.2, "yearly")),
  ];
}
