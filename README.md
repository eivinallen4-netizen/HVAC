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

No form on the site collects a name, phone or email. Every "book" step either embeds the Housecall Pro
booking page (`BookingEmbed` in `components/Booking.tsx`) or links to it (`BookNowLink`), so the visitor enters
their details in HCP and the job lands there directly. `site.bookingUrl` in `lib/site.ts` sets the booking page.

| Where | How it books |
|---|---|
| Hero estimate (every service/city page) | Answers questions → sees estimate → HCP embed under the result |
| Contact card | HCP embed |
| Specials / Referral | Button to the HCP booking page (mention the offer / referrer in the notes) |
| Tools (repair-or-replace, cost estimator, symptom checker, savings) | Results → "Book Now" to HCP |

`app/api/lead/route.ts` (HCP Public API lead creation) is still in the codebase but no form posts to it now.

**Tracking:** `booking_view`, `book_click`, `lead_step`, `tool_step`, `estimate_result`, `phone_click`, `sms_click` dataLayer events.

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
- [x] `lib/estimate/config.ts` — estimate form and cost estimator prices, from the tech questionnaire (Nov 2026). Update quarterly.
- [ ] `lib/content/company.ts` — current specials and the referral reward amount
- [ ] Ratings (Google 5.0, Facebook 5.0, Yelp 4.8), business hours (Wave is not 24/7; same-day only), "family-owned", Wave Club pricing ($150/$140)
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
