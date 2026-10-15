import { NextResponse } from "next/server";

/**
 * Receives leads from the site's forms.
 * Set LEAD_WEBHOOK_URL (Vercel → Settings → Environment Variables) to forward
 * every lead as JSON to Zapier / Make / GoHighLevel / Housecall Pro / Slack, etc.
 */
const FIELDS = [
  "name", "phone", "zip", "email", "time", "service", "message", "form",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "msclkid", "landing_page", "referrer",
] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const lead: Record<string, string> = {};
  for (const k of FIELDS) {
    const v = body[k];
    if (typeof v === "string" && v.trim()) lead[k] = v.trim().slice(0, 1000);
  }

  const digits = (lead.phone || "").replace(/\D/g, "");
  if (!lead.name || digits.length !== 10 || !/^\d{5}$/.test(lead.zip || "")) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 422 });
  }

  const payload = {
    ...lead,
    source: "Wave Heating & Cooling website",
    submitted_at: new Date().toISOString(),
  };

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) console.error("[lead] webhook responded", res.status);
    } catch (err) {
      console.error("[lead] webhook failed", err);
    }
  } else {
    console.log("[lead] LEAD_WEBHOOK_URL not set — lead received:", payload);
  }

  return NextResponse.json({ ok: true });
}
