# Wave Heating & Cooling — Website

Full marketing site for **Wave Heating & Cooling** (Las Vegas HVAC), built with Next.js (App Router) + TypeScript.
It replaces the old WordPress site at waveheatingandcooling.com. Every old URL either still exists or 301-redirects.

## Quick start

```bash
npm install
npm run dev                 # http://localhost:3000
npm run build && npm start  # production build
npm run check               # with the server running: crawl sitemap + verify all legacy redirects
```

## Environment variables (Vercel → Settings → Environment Variables)

| Variable | Required | What it does |
|---|---|---|
| `HOUSECALL_API_KEY` | **Yes** | Sends every lead into Housecall Pro (Job Inbox → API Leads). HCP → App Store → API → Generate key. Requires HCP **MAX** plan. |
| `LEAD_WEBHOOK_URL` | Recommended | Backup JSON copy of every lead (Zapier/Make → email/SMS the office, or Slack). |
| `NEXT_PUBLIC_GTM_ID` | Optional | Google Tag Manager. Old site used `GTM-PG4H6BFL`. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional | Google Search Console meta-tag verification. |

## How leads flow into Housecall Pro

Every form posts to `/api/lead` (`app/api/lead/route.ts`), which:

1. Validates (name, 10-digit phone, 5-digit ZIP), drops honeypot bots and rate-limits per IP.
2. Looks up an existing HCP customer by phone (`GET /customers?q=`) to avoid duplicates.
3. Creates the lead (`POST /leads`) — with a new customer if needed — tagged `Website` + the form name.
   The note includes service, best time, message, tool results, offer/referral details, UTM/gclid and the page.
4. Sends the same payload to `LEAD_WEBHOOK_URL` if set.

Forms and their `form` tag in HCP:

| Form | Tag |
|---|---|
| Hero 2-step estimate form (every service/city page) | `hero` |
| Contact form (footer of most pages) | `contact` |
| Specials claim | `specials` |
| Referral (lead is the *friend*; referrer in note) | `referral` |
| Repair or Replace Calculator | `tool:repair-or-replace` |
| AC Replacement Cost Estimator | `tool:cost-estimator` |
| AC Symptom Checker | `tool:symptom-checker` |
| Summer Bill Savings Calculator | `tool:savings-calculator` |

**Conversion tracking:** hero/contact/specials/referral forms redirect to `/thank-you/` (noindex), and every
form fires a `generate_lead` dataLayer event (with `form_id`). Other events: `lead_step`, `tool_step`, `phone_click`, `sms_click`.

## Where to edit content

| What | File |
|---|---|
| Phone, address, license, ratings, reviews, home FAQs | `lib/site.ts` |
| Service pages (copy, FAQs, related links) | `lib/content/services-*.ts` |
| Hub pages (`/services/`, `/cooling-services/`, `/heating-services/`) | `lib/content/services.ts` |
| City pages | `lib/content/areas.ts` |
| Specials, referral copy, payment methods | `lib/content/company.ts` |
| Tool copy & FAQs | `lib/tools/index.ts` |
| **Cost estimator pricing** | `lib/tools/pricing.ts` |
| Blog posts | `content/blog/<slug>.md` — copy a file, edit front matter, write Markdown |

Body text in `lib/content` supports `[link text](/path/)` and `**bold**`.

## Site map

- `/` home · `/services/` · `/cooling-services/` · `/heating-services/`
- 14 service pages at their original WordPress URLs (e.g. `/hvac-repairs-in-las-vegas/`) + new `/emergency-ac-repair-las-vegas/` and `/heat-pump-services-las-vegas/`
- `/service-area-las-vegas/` + 11 city pages at `/service-areas/<city>-nv/`
- `/tools/` + 4 lead-magnet tools
- `/blog/` + 19 migrated posts at `/blog/<slug>/` (old `/2025/mm/dd/<slug>/` URLs 301 here)
- `/about-us/`, `/our-team/`, `/reviews/`, `/contact/`, `/financing/`, `/specials/`, `/referral-program/`, `/faq/`, `/privacy-policy/`, `/terms/`, `/thank-you/`
- `sitemap.xml` and `robots.txt` are generated (`app/sitemap.ts`, `app/robots.ts`). Vercel preview deployments are `noindex`.

SEO built in: per-page title/description/canonical/Open Graph, JSON-LD (`HVACBusiness`, `Service`, `FAQPage`,
`BreadcrumbList`, `BlogPosting`, `WebApplication`), legacy 301s in `next.config.ts`, security headers.

## Launch checklist

**Confirm with Wave before going live**
- [ ] `lib/tools/pricing.ts` — **all cost-estimator prices and financing terms are placeholders**
- [ ] `lib/content/company.ts` — current specials and the referral reward amount
- [ ] Ratings (Google 5.0, Facebook 5.0, Yelp 4.8), "24/7", "family-owned", Wave Club pricing ($150/$140)
- [ ] Service-page and city-page copy — read through once for accuracy
- [ ] Privacy Policy & Terms — have someone review them

**Housecall Pro**
- [ ] Generate the API key (MAX plan) and add `HOUSECALL_API_KEY` in Vercel
- [ ] On a preview deploy, submit one form and confirm the lead appears in Job Inbox → API Leads, then delete it
- [ ] Set `LEAD_WEBHOOK_URL` to an email/SMS alert so the office is notified instantly

**Go live**
- [ ] Lower the domain's DNS TTL a day before; add the domain in Vercel; point DNS at Vercel
- [ ] Run `npm run check` against the live domain: `node scripts/check-site.mjs https://waveheatingandcooling.com`
- [ ] Search Console: submit `/sitemap.xml`, then watch Pages → "Not found (404)" for 2 weeks
- [ ] Update the Google Business Profile website link if it pointed at an old URL
- [ ] GTM: add the Google Ads / GA4 conversion on `generate_lead` (or the `/thank-you/` page view)
- [ ] Keep a backup of the WordPress site for at least 30 days before deleting it

## Structure

```
app/
  layout.tsx                 header/footer shell, fonts, GTM, LocalBusiness JSON-LD
  page.tsx                   home
  [slug]/page.tsx            service + hub pages (static, legacy URLs)
  service-area-las-vegas/    area hub        service-areas/[city]/  city pages
  tools/  tools/[tool]/      lead-magnet tools
  blog/   blog/[slug]/       blog
  api/lead/route.ts          lead endpoint → Housecall Pro
  sitemap.ts robots.ts not-found.tsx
components/
  Sections.tsx               shared page sections (hero, reviews, FAQ, CTA, footer…)
  LeadForm.tsx               hero + contact forms and shared form helpers
  SpecialForms.tsx           specials + referral forms
  page/                      inner-page building blocks (hero, breadcrumbs, content, cards)
  tools/                     calculator UIs + unlock gate
lib/
  site.ts seo.ts blog.ts housecall.ts track.ts
  content/                   page copy
  tools/                     calculator logic + pricing
content/blog/                Markdown posts
scripts/migrate-blog.mjs     one-off WordPress → Markdown migration
scripts/check-site.mjs       pre-launch SEO + redirect checks
```
