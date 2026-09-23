import { NextResponse } from "next/server";

/**
 * Receives lead-form submissions and feedback-page submissions (type: "feedback").
 * Set LEAD_WEBHOOK_URL (Google Apps Script, Zapier, Make, CRM endpoint, etc.)
 * in .env.local / hosting env to forward every lead as JSON.
 */
type LeadBody = Record<string, unknown> & {
  name?: unknown;
  phone?: unknown;
  concern?: unknown;
};

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const type = body.type === "feedback" ? "feedback" : "lead";
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").replace(/\D/g, "");
  const concern = String(body.concern ?? "").trim();
  const message = String(body.message ?? "").trim().slice(0, 2000);
  const missing =
    type === "feedback"
      ? name.length < 2 || phone.length < 10 || message.length < 3
      : name.length < 2 || phone.length < 10 || !concern;
  if (missing) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  const lead = {
    ...body,
    type,
    name,
    phone,
    concern,
    message,
    submittedAt: new Date().toISOString(),
    page: req.headers.get("referer") ?? "",
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("Lead webhook failed:", err);
      return NextResponse.json({ ok: false, error: "Could not save enquiry" }, { status: 502 });
    }
  } else {
    console.log("New lead (no LEAD_WEBHOOK_URL set):", lead);
  }

  return NextResponse.json({ ok: true });
}
