# Wave Heating & Cooling — Landing Page

Lead-generation landing page for **Wave Heating & Cooling** (Las Vegas HVAC), built with Next.js (App Router) + TypeScript.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Deploy (Vercel — recommended)

1. Import this repo at <https://vercel.com/new>.
2. Add environment variables (Settings → Environment Variables):
   - `LEAD_WEBHOOK_URL` — where new leads are POSTed as JSON (Zapier, Make, GoHighLevel, Housecall Pro, Formspree, Slack webhook…)
   - `NEXT_PUBLIC_GTM_ID` — optional Google Tag Manager ID
3. Deploy.

## Lead capture

- **Hero form** — 2-step quiz (pick issue → name / phone / ZIP). Service cards preselect the issue and scroll to the form.
- **Contact form** — single step, near the footer.
- Both POST to `/api/lead` (`app/api/lead/route.ts`), which validates and forwards to `LEAD_WEBHOOK_URL`.
  Without the env var, leads are logged to the server console.
- UTM / gclid / fbclid / msclkid, landing page and referrer are attached to every lead.
- `dataLayer` events: `generate_lead`, `lead_step`, `phone_click` (+ Meta `Lead` if the pixel is installed).
- Honeypot field blocks basic bots.

## Editing content

All business facts (phone, license, ratings, services, reviews, FAQs, service areas) live in **`lib/site.ts`**.

## Structure

```
app/
  layout.tsx        fonts, SEO metadata, JSON-LD (HVACBusiness), GTM
  page.tsx          section order
  globals.css       design system + all styles
  api/lead/route.ts lead endpoint
components/
  Sections.tsx      Hero, TrustBar, Services, Before/After, Why, Process, Reviews, FAQ, CTA, Footer
  LeadForm.tsx      hero quiz form + contact form
  Header.tsx        sticky header + mobile menu
  BeforeAfter.tsx   drag-to-compare slider
  Icon.tsx          custom SVG icon set
lib/
  site.ts           content
  track.ts          analytics + attribution helpers
public/images/      optimized client photos & logos
```

## To confirm with the client before launch

- Ratings shown (Google 5.0, Facebook 5.0, Yelp 4.8) and "24/7 service"
- Free estimates on new systems; "family-owned"; "call or text"
- Google Business Profile URL (`googleReviewsUrl` in `lib/site.ts`)
- Privacy Policy link in the footer
