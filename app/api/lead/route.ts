import { NextResponse } from "next/server";
import { createHousecallLead, housecallEnabled } from "@/lib/housecall";

/**
 * Receives leads from every form on the site.
 * 1. HOUSECALL_API_KEY set → lead + customer created in Housecall Pro (Job Inbox → API Leads).
 * 2. LEAD_WEBHOOK_URL set → a JSON copy is also POSTed there (Zapier / Slack / email backup),
 *    so nothing is lost if HCP is down.
 * Without either, leads are logged to the server console.
 */
const FIELDS = [
  "name", "phone", "zip", "email", "time", "service", "message", "form",
  "tool", "tool_result", "referrer_name", "referrer_phone", "offer",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "msclkid", "landing_page", "referrer",
] as const;

/* Best-effort per-IP rate limit (per serverless instance) */
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const MAX = 6;
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX;
}

function buildNote(lead: Record<string, string>) {
  const lines = [
    `Website lead — ${lead.form ?? "form"}`,
    lead.service && `Service: ${lead.service}`,
    lead.time && `Best time to call: ${lead.time}`,
    lead.offer && `Offer claimed: ${lead.offer}`,
    lead.message && `Message: ${lead.message}`,
    lead.tool && `Tool: ${lead.tool}`,
    lead.tool_result && `Result: ${lead.tool_result}`,
    lead.referrer_name && `Referred by: ${lead.referrer_name}${lead.referrer_phone ? ` (${lead.referrer_phone})` : ""}`,
    lead.email && `Email: ${lead.email}`,
    `ZIP: ${lead.zip}`,
  ];
  const attrib = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "gclid", "fbclid", "msclkid"]
    .filter((k) => lead[k])
    .map((k) => `${k}=${lead[k]}`)
    .join(" · ");
  if (attrib) lines.push(`Attribution: ${attrib}`);
  if (lead.landing_page) lines.push(`Page: ${lead.landing_page}`);
  return lines.filter(Boolean).join("\n");
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — pretend success so bots move on
  if (typeof body.company_website === "string" && body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const lead: Record<string, string> = {};
  for (const k of FIELDS) {
    const v = body[k];
    if (typeof v === "string" && v.trim()) lead[k] = v.trim().slice(0, 1500);
  }

  const phone = (lead.phone || "").replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (!lead.name || phone.length !== 10 || !/^\d{5}$/.test(lead.zip || "")) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 422 });
  }

  const note = buildNote(lead);
  const payload = {
    ...lead,
    phone,
    note,
    source: "Wave Heating & Cooling website",
    submitted_at: new Date().toISOString(),
  };

  const [hcp] = await Promise.all([
    housecallEnabled()
      ? createHousecallLead({
          name: lead.name,
          phone,
          zip: lead.zip,
          email: lead.email,
          form: lead.form ?? "website",
          note,
          tags: ["Website", lead.form ?? "website"],
        })
      : Promise.resolve(null),
    forwardToWebhook(payload),
  ]);

  if (hcp && !hcp.ok) console.error("[lead] Housecall Pro failed:", hcp.error, payload);
  if (!hcp && !process.env.LEAD_WEBHOOK_URL) {
    console.log("[lead] No HOUSECALL_API_KEY or LEAD_WEBHOOK_URL set — lead received:", payload);
  }

  return NextResponse.json({ ok: true });
}

async function forwardToWebhook(payload: Record<string, unknown>) {
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) return;
  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[lead] webhook responded", res.status);
  } catch (err) {
    console.error("[lead] webhook failed", err);
  }
}
