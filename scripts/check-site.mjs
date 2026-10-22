#!/usr/bin/env node
/**
 * Pre-launch checks against a running server (default http://localhost:3000):
 *  1. every URL in /sitemap.xml returns 200 with a unique <title>, meta description, canonical and exactly one <h1>
 *  2. every legacy WordPress URL 301s to a page that returns 200
 *
 *   npm run build && npm start   # in one terminal
 *   node scripts/check-site.mjs [http://localhost:3000]
 */
const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://waveheatingandcooling.com";

const LEGACY = [
  "/testimonials/", "/financing/", "/tips-articles/", "/specials/", "/faq/", "/blog/", "/gallery/", "/our-team/",
  "/services-2/", "/team-details/", "/team/", "/about-us-2/", "/contact-us-2/", "/faqs/", "/service-details/",
  "/my-account/", "/blog-2/", "/cooling-services/", "/heating-services/", "/indoor-air-quality/",
  "/maintenance-services/", "/service-area-las-vegas/", "/referral-program/", "/summer-savings/",
  "/hvac-ductowork-las-vegas/", "/indoor-air-quality-las-vegas/", "/heating-services-las-vegas/",
  "/hvac-maintenance-las-vegas/", "/hvac-repairs-in-las-vegas/", "/ac-installations-in-las-vegas/",
  "/ac-replacement-in-las-vegas/", "/ac-maintenance-in-las-vegas/", "/hvac-heating-repair-in-las-vegas/",
  "/hvac-heating-installation-in-las-vegas/", "/hvac-heating-replacement-in-las-vegas/",
  "/hvac-heating-maintenance-in-las-vegas/", "/ductless-mini-split-systems-in-las-vegas/",
  "/hvac-ductless-mini-split-systems/", "/ac-services/",
  "/2025/04/28/combatting-dust-enhancing-indoor-air-quality-in-las-vegas-homes/",
  "/2025/05/06/hvac-maintenance-in-las-vegas-your-guide-to-comfort-efficiency-and-longevity/",
  "/2025/05/13/sealing-the-deal-the-importance-of-airtight-ductwork-in-energy-efficiency/",
  "/2025/06/03/prepare-for-the-heat-wave-secure-your-home-cooling-systems-in-las-vegas/",
  "/2025/06/09/when-to-replace-vs-repair/", "/2025/06/17/mastering-the-mojave/", "/2025/06/19/behind-the-thermostat/",
  "/2025/07/07/the-hidden-dangers-of-poor-ventilation/", "/2025/07/11/smart-thermostats-and-zoning-systems/",
  "/2025/07/15/how-to-choose-the-right-sized-ac/", "/2025/07/18/emergency-cooling-failures-in-las-vegas/",
  "/2025/08/05/why-duct-sealing-is-crucial/", "/2025/08/08/the-science-of-airflow/",
  "/2025/10/24/duct-leaks-steal-your-heat/", "/2025/10/29/duct-leaks-steal-your-heat-part-two/",
  "/2025/11/05/duct-leaks-steal-your-heat-final-take/", "/2025/11/13/carbon-monoxide-winter-hvac-safety/",
  "/2025/11/19/the-calm-homeowners-guide-part-two/", "/2025/11/25/carbon-monoxide-final-what-to-do/",
  "/category/uncategorized/", "/feed/", "/wp-sitemap.xml", "/about-us-2", "/2025/07/",
];

const pick = (html, re) => (html.match(re) || [])[1]?.trim();
let failures = 0;
const fail = (msg) => {
  failures++;
  console.log("  ✗", msg);
};

async function checkPages() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ""));
  console.log(`\nSitemap: ${urls.length} URLs`);
  const titles = new Map();
  const descs = new Map();
  for (const path of urls) {
    const res = await fetch(BASE + path, { redirect: "manual" });
    const html = await res.text();
    if (res.status !== 200) {
      fail(`${path} → ${res.status}`);
      continue;
    }
    const title = pick(html, /<title>([^<]*)<\/title>/);
    const desc = pick(html, /<meta name="description" content="([^"]*)"/);
    const canon = pick(html, /<link rel="canonical" href="([^"]*)"/);
    const h1s = (html.match(/<h1[\s>]/g) || []).length;
    if (!title) fail(`${path} missing <title>`);
    else if (title.length > 70) console.log(`  ! ${path} title ${title.length} chars`);
    if (!desc) fail(`${path} missing meta description`);
    else if (desc.length > 165) console.log(`  ! ${path} description ${desc.length} chars`);
    if (canon !== SITE + path) fail(`${path} canonical = ${canon}`);
    if (h1s !== 1) fail(`${path} has ${h1s} <h1>`);
    if (titles.has(title)) fail(`${path} duplicate title with ${titles.get(title)}`);
    if (descs.has(desc)) fail(`${path} duplicate description with ${descs.get(desc)}`);
    titles.set(title, path);
    descs.set(desc, path);
  }
}

async function checkLegacy() {
  console.log(`\nLegacy URLs: ${LEGACY.length}`);
  for (const path of LEGACY) {
    let url = BASE + path;
    let hops = 0;
    let status;
    let saw301 = false;
    for (;;) {
      const res = await fetch(url, { redirect: "manual" });
      status = res.status;
      if (status >= 300 && status < 400) {
        if (status === 301 || status === 308) saw301 = true;
        url = new URL(res.headers.get("location"), url).href;
        if (++hops > 5) break;
        continue;
      }
      break;
    }
    const final = url.replace(BASE, "");
    if (status !== 200) fail(`${path} → ${final} (${status})`);
    else if (hops > 2) console.log(`  ! ${path} takes ${hops} hops`);
    else if (final !== path && !saw301) fail(`${path} redirect is not permanent`);
  }
}

await checkPages();
await checkLegacy();
console.log(failures ? `\n${failures} problem(s) found` : "\nAll checks passed ✓");
process.exit(failures ? 1 : 0);
