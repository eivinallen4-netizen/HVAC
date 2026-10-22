import type { NextConfig } from "next";

/**
 * 301s from the old WordPress site so existing Google rankings and backlinks carry over.
 * Every URL from the old wp-sitemap either still exists at the same path or is listed here.
 */
const legacy: [string, string][] = [
  // pages
  ["/about-us-2", "/about-us/"],
  ["/contact-us-2", "/contact/"],
  ["/testimonials", "/reviews/"],
  ["/faqs", "/faq/"],
  ["/services-2", "/services/"],
  ["/service-details", "/services/"],
  ["/ac-services", "/cooling-services/"],
  ["/heating-services-las-vegas", "/heating-services/"],
  ["/hvac-ductless-mini-split-systems", "/ductless-mini-split-systems-in-las-vegas/"],
  ["/hvac-ductowork-las-vegas", "/hvac-ductwork-las-vegas/"],
  ["/indoor-air-quality", "/indoor-air-quality-las-vegas/"],
  ["/maintenance-services", "/hvac-maintenance-las-vegas/"],
  ["/summer-savings", "/specials/"],
  ["/tips-articles", "/blog/"],
  ["/blog-2", "/blog/"],
  ["/team", "/our-team/"],
  ["/team-details", "/our-team/"],
  ["/gallery", "/about-us/"],
  ["/home-one", "/"],
  ["/my-account", "/"],
  ["/service-areas", "/service-area-las-vegas/"],
  ["/las-vegas-nv", "/service-area-las-vegas/"],
  // WordPress archives & feeds
  ["/feed", "/blog/"],
  ["/comments/feed", "/blog/"],
  ["/category/:slug*", "/blog/"],
  ["/tag/:slug*", "/blog/"],
  ["/author/:slug*", "/about-us/"],
  ["/bwg_gallery/:slug*", "/about-us/"],
  ["/ruffer_header/:slug*", "/"],
  ["/ruffer_footer_build/:slug*", "/"],
  ["/wp-sitemap.xml", "/sitemap.xml"],
  ["/sitemap_index.xml", "/sitemap.xml"],
  ["/wp-sitemap-:rest", "/sitemap.xml"],
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },

  async redirects() {
    return [
      // dated blog posts: /2025/07/15/slug/ → /blog/slug/  (plus their /feed/ and /amp/ variants)
      { source: "/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/:slug/:rest*", destination: "/blog/:slug/", permanent: true },
      // date archives
      { source: "/:y(\\d{4})/:m(\\d{2})", destination: "/blog/", permanent: true },
      { source: "/:y(\\d{4})", destination: "/blog/", permanent: true },
      ...legacy.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
