import "server-only";

/**
 * Housecall Pro Public API client — creates website leads in Job Inbox → "API Leads".
 * Requires the HCP MAX plan. Key: HCP → App Store → API → Generate API key,
 * then set HOUSECALL_API_KEY in Vercel.
 * Docs: https://docs.housecallpro.com/docs/housecall-public-api/8961eaf9f1c28-create-lead
 */
const BASE = "https://api.housecallpro.com";

export type HcpLead = {
  name: string;
  phone: string; // 10 digits
  zip: string;
  email?: string;
  form: string;
  note: string;
  tags: string[];
};

export type HcpResult = { ok: true; leadId?: string; customerId?: string } | { ok: false; error: string };

async function hcp(path: string, init: RequestInit = {}) {
  const key = process.env.HOUSECALL_API_KEY;
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Token ${key}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON error body */
  }
  return { ok: res.ok, status: res.status, json, text };
}

const digits = (v: unknown) => String(v ?? "").replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");

/** Find an existing customer by phone so repeat visitors don't create duplicates */
async function findCustomerId(phone: string): Promise<string | undefined> {
  const r = await hcp(`/customers?q=${encodeURIComponent(phone)}&page_size=5`);
  if (!r.ok) return undefined;
  const list = ((r.json as { customers?: Record<string, unknown>[] })?.customers ?? []) as Record<string, unknown>[];
  const match = list.find((c) =>
    ["mobile_number", "home_number", "work_number"].some((k) => digits(c[k]) === phone)
  );
  return match ? String(match.id) : undefined;
}

function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  return { first_name: parts[0], last_name: parts.slice(1).join(" ") || undefined };
}

export const housecallEnabled = () => Boolean(process.env.HOUSECALL_API_KEY);

export async function createHousecallLead(lead: HcpLead): Promise<HcpResult> {
  try {
    const address = { zip: lead.zip, state: "NV" };
    const existingId = await findCustomerId(lead.phone);

    const base: Record<string, unknown> = existingId
      ? { customer_id: existingId, address }
      : {
          customer: {
            ...splitName(lead.name),
            mobile_number: lead.phone,
            email: lead.email,
            notifications_enabled: true,
            lead_source: `Website – ${lead.form}`,
            notes: lead.note,
            tags: lead.tags,
            addresses: [address],
          },
          address,
        };

    // `note` on the lead itself is tried first; if HCP rejects the field we retry without it
    // (the full details are still on the customer record and in the webhook copy).
    let r = await hcp("/leads", { method: "POST", body: JSON.stringify({ ...base, note: lead.note, tags: lead.tags }) });
    if (!r.ok && (r.status === 400 || r.status === 422)) {
      r = await hcp("/leads", { method: "POST", body: JSON.stringify(base) });
    }
    if (!r.ok) return { ok: false, error: `HCP ${r.status}: ${r.text.slice(0, 300)}` };

    const j = (r.json ?? {}) as { id?: string; customer?: { id?: string } };
    return { ok: true, leadId: j.id, customerId: existingId ?? j.customer?.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
