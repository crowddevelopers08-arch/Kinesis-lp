export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

/**
 * Receives lead-form submissions and feedback-page submissions (type: "feedback").
 *
 * - Every submission is written to Google Sheets via the Apps Script web app
 *   (GOOGLE_SHEETS_WEBHOOK_URL) — leads and feedback go to separate tabs.
 * - Both are also pushed to TeleCRM (TELECRM_API_URL + TELECRM_API_KEY); feedback
 *   is tagged "Lead Request Type: feedback" with the rating and message as notes.
 *
 * Both destinations run in parallel; the request succeeds if at least one of
 * them stored the submission.
 */

const LEAD_ROUTE = {
  source: "Kinesis Pain LP",
  leadTab: "Kinesis Leads",
  feedbackTab: "Kinesis Feedback",
  telecrmPageName: "kinesis-pain-website",
  treatmentType: "Pain Management",
  /** Label of the TeleCRM custom field that holds the selected concern. */
  concernField: "Pain Concern",
  /** TeleCRM custom fields for the feedback page (also written as notes). */
  feedbackRatingField: "Feedback Rating",
  feedbackField: "Patient Feedback",
};

const TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
type Tracking = Partial<Record<(typeof TRACKING_KEYS)[number], string>>;

type Submission = {
  type: "lead" | "feedback";
  name: string;
  phone: string;
  email: string;
  concern: string;
  message: string;
  rating: string;
  form: string;
  pageUrl: string;
  tracking: Tracking;
};

const str = (v: unknown, max = 500) => String(v ?? "").trim().slice(0, max);

function normalisePhone(raw: string) {
  return raw.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
}

async function appendToGoogleSheet(s: Submission) {
  const endpoint = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
  if (!endpoint) throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");

  const payload = {
    type: s.type,
    sheetTab: s.type === "feedback" ? LEAD_ROUTE.feedbackTab : LEAD_ROUTE.leadTab,
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    name: s.name,
    phone: s.phone,
    email: s.email,
    concern: s.concern,
    message: s.message,
    rating: s.rating,
    form: s.form,
    source: LEAD_ROUTE.source,
    pageUrl: s.pageUrl,
    ...s.tracking,
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text || `Google Sheets responded with ${res.status}`);

  let json: { error?: string } = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    // Apps Script sometimes returns an HTML page (e.g. when the deployment isn't public).
    throw new Error("Google Sheets returned a non-JSON response - check the web app deployment access");
  }
  // Apps Script always answers 200, so errors come back in the body.
  if (json.error) throw new Error(json.error);
  return json;
}

async function sendToTeleCRM(s: Submission) {
  const endpoint = process.env.TELECRM_API_URL;
  if (!endpoint) throw new Error("TELECRM_API_URL is not set");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const isFeedback = s.type === "feedback";

  // TeleCRM ignores `fields` keys that don't match a field defined on the
  // enterprise, so only send canonical keys plus the page's own custom fields.
  const fields: Record<string, string> = {
    name: s.name,
    phone: s.phone,
    "Lead Request Type": isFeedback ? "feedback" : "consultation",
    "Treatment Type": LEAD_ROUTE.treatmentType,
    Source: s.tracking.utm_source || LEAD_ROUTE.source,
    PageName: LEAD_ROUTE.telecrmPageName,
    Country: "India",
  };
  // autoupdatelead matches on phone, so feedback from an existing patient updates
  // their record — don't reset their status back to "new" in that case.
  if (!isFeedback) fields["Lead Status"] = "new";
  if (s.email) fields.email = s.email;
  if (s.concern) fields[LEAD_ROUTE.concernField] = s.concern;
  if (isFeedback) {
    if (s.rating) fields[LEAD_ROUTE.feedbackRatingField] = s.rating;
    fields[LEAD_ROUTE.feedbackField] = s.message;
  }

  const t = s.tracking;
  const feedbackActions = [
    { type: "SYSTEM_NOTE", text: "Submission Type: Patient Feedback" },
    { type: "SYSTEM_NOTE", text: `Feedback Rating: ${s.rating ? `${s.rating} / 5` : "Not given"}` },
    { type: "SYSTEM_NOTE", text: `Feedback: ${s.message}` },
    { type: "SYSTEM_NOTE", text: `Page: ${s.pageUrl || "Not captured"}` },
    { type: "SYSTEM_NOTE", text: `Name: ${s.name}` },
    { type: "SYSTEM_NOTE", text: `Phone: ${s.phone}` },
    { type: "SYSTEM_NOTE", text: `Email: ${s.email || "Not provided"}` },
  ];

  const payload = {
    fields,
    actions: isFeedback ? feedbackActions : [
      { type: "SYSTEM_NOTE", text: `Lead Source: ${LEAD_ROUTE.source}` },
      { type: "SYSTEM_NOTE", text: `Landing Page: ${s.pageUrl || "Not captured"}` },
      { type: "SYSTEM_NOTE", text: `Form: ${s.form}` },
      { type: "SYSTEM_NOTE", text: `Treatment Type: ${LEAD_ROUTE.treatmentType}` },
      { type: "SYSTEM_NOTE", text: `Pain Concern: ${s.concern || "Not specified"}` },
      { type: "SYSTEM_NOTE", text: `Name: ${s.name}` },
      { type: "SYSTEM_NOTE", text: `Phone: ${s.phone}` },
      { type: "SYSTEM_NOTE", text: `Email: ${s.email || "Not provided"}` },
      {
        type: "SYSTEM_NOTE",
        text: `UTM: source=${t.utm_source || "-"}, medium=${t.utm_medium || "-"}, campaign=${t.utm_campaign || "-"}, term=${t.utm_term || "-"}, content=${t.utm_content || "-"}`,
      },
      ...(t.gclid ? [{ type: "SYSTEM_NOTE", text: `GCLID: ${t.gclid}` }] : []),
      ...(t.fbclid ? [{ type: "SYSTEM_NOTE", text: `FBCLID: ${t.fbclid}` }] : []),
      { type: "SYSTEM_NOTE", text: "Consent Given: Yes" },
    ],
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TELECRM_API_KEY}`,
        "X-Client-ID": LEAD_ROUTE.telecrmPageName,
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (res.status === 204) return { status: "success", message: "Lead created (204)" };

    const text = await res.text();
    if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
      throw new Error("TeleCRM returned an HTML response - check the API URL");
    }

    const json = text ? JSON.parse(text) : {};
    if (!res.ok) throw new Error(json.message || `TeleCRM HTTP ${res.status}`);
    return json;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const type = body.type === "feedback" ? "feedback" : "lead";
  const tracking: Tracking = {};
  for (const key of TRACKING_KEYS) {
    const v = str(body[key]);
    if (v) tracking[key] = v;
  }

  const submission: Submission = {
    type,
    name: str(body.name, 100),
    phone: normalisePhone(str(body.phone, 30)),
    email: str(body.email, 200),
    concern: str(body.concern, 100),
    message: str(body.message, 2000),
    rating: str(body.rating, 5),
    form: str(body.source, 50) || (type === "feedback" ? "feedback-page" : "lead-form"),
    pageUrl: str(body.pageUrl, 1000) || req.headers.get("referer") || "",
    tracking,
  };

  const s = submission;
  const invalid =
    s.name.length < 2 ||
    !/^[6-9]\d{9}$/.test(s.phone) ||
    (s.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email)) ||
    (type === "feedback" ? s.message.length < 3 : !s.concern);
  if (invalid) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 422 });
  }

  const sheetsConfigured = Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL);
  const crmConfigured = Boolean(process.env.TELECRM_API_URL);

  if (!sheetsConfigured && !crmConfigured) {
    console.log(`New ${type} (no GOOGLE_SHEETS_WEBHOOK_URL / TELECRM_API_URL set):`, submission);
    return NextResponse.json({ ok: true, sheet: "skipped", crm: "skipped" });
  }

  const [sheetResult, crmResult] = await Promise.allSettled([
    sheetsConfigured ? appendToGoogleSheet(submission) : Promise.reject(new Error("not configured")),
    crmConfigured ? sendToTeleCRM(submission) : Promise.reject(new Error("not configured")),
  ]);

  if (sheetsConfigured && sheetResult.status === "rejected") {
    console.error("[Google Sheets] Error:", sheetResult.reason?.message);
  }
  if (crmConfigured && crmResult.status === "rejected") {
    console.error("[TeleCRM] Error:", crmResult.reason?.message);
  }

  const sheet = !sheetsConfigured ? "skipped" : sheetResult.status === "fulfilled" ? "ok" : "failed";
  const crm = !crmConfigured ? "skipped" : crmResult.status === "fulfilled" ? "ok" : "failed";

  // Only fail the user's submission if nothing stored it.
  if (sheet !== "ok" && crm !== "ok") {
    return NextResponse.json({ ok: false, error: "Could not save enquiry", sheet, crm }, { status: 502 });
  }

  return NextResponse.json({ ok: true, sheet, crm });
}
