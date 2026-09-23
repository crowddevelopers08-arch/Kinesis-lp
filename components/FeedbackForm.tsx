"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { site } from "@/lib/site";
import { ArrowIcon, CheckIcon } from "./Icons";

type Values = { name: string; email: string; phone: string; message: string };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const empty: Values = { name: "", email: "", phone: "", message: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name";
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address";
  const digits = v.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = "Please enter a valid 10-digit mobile number";
  if (v.message.trim().length < 3) e.message = "Please tell us what we could have done better";
  return e;
}

const label = "mb-2 block text-left text-[13px] font-bold uppercase tracking-wide text-plum-950/70";
const input =
  "w-full rounded-2xl border bg-mist px-4 py-3.5 text-[16px] text-plum-950 outline-none transition placeholder:text-mauve-600/70 focus:border-plum-600 focus:bg-white focus:ring-4 focus:ring-lilac-200/60";

export default function FeedbackForm() {
  const params = useSearchParams();
  const rating = Number(params.get("rating")) || undefined;
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };
  const border = (k: Field) => (errors[k] ? "border-red-400" : "border-plum-950/10");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: "feedback", rating, source: "feedback-page" }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const phones = (
    <p className="mt-6 text-sm text-mauve-600">
      Prefer to talk?{" "}
      {site.phones.map((p, i) => (
        <span key={p.href}>
          {i > 0 && " or "}
          <a href={p.href} className="font-bold text-plum-700 hover:underline">
            {p.label}
          </a>
        </span>
      ))}
    </p>
  );

  if (status === "sent") {
    return (
      <>
        <div className="mx-auto mt-8 grid h-20 w-20 place-items-center rounded-full bg-plum-700 text-white shadow-xl shadow-plum-700/30">
          <CheckIcon className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-plum-950 sm:text-5xl">Thank You</h1>
        <p className="mx-auto mt-4 max-w-sm leading-relaxed text-mauve-600">
          We&apos;ve received your feedback. Our team will review it and may contact you to make things right.
        </p>
        <a
          href={site.googleReviewUrl}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-plum-950/10 px-6 py-4 font-bold text-plum-950 transition hover:bg-mist"
        >
          Also share a public review on Google
        </a>
        {phones}
      </>
    );
  }

  return (
    <>
      <h1 className="mt-6 text-[2.5rem] font-extrabold leading-tight tracking-tight text-plum-950 sm:text-5xl">Help Us Improve</h1>
      <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-mauve-600">
        Tell us what didn&apos;t meet your expectations. We genuinely value your feedback and will work on making things better.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-7 space-y-5">
        <div>
          <label htmlFor="fb-name" className={label}>Full Name</label>
          <input id="fb-name" autoComplete="name" placeholder="Your full name" value={values.name} onChange={set("name")} className={`${input} ${border("name")}`} />
          {errors.name && <p className="mt-1 text-left text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="fb-email" className={label}>Email Address</label>
          <input id="fb-email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={set("email")} className={`${input} ${border("email")}`} />
          {errors.email && <p className="mt-1 text-left text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="fb-phone" className={label}>Phone Number</label>
          <input id="fb-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" value={values.phone} onChange={set("phone")} className={`${input} ${border("phone")}`} />
          {errors.phone && <p className="mt-1 text-left text-xs text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="fb-message" className={label}>Your Suggestions</label>
          <textarea id="fb-message" rows={4} placeholder="Tell us what we could have done better..." value={values.message} onChange={set("message")} className={`${input} ${border("message")} resize-y`} />
          {errors.message && <p className="mt-1 text-left text-xs text-red-500">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="!mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-plum-700 px-6 py-4 text-[17px] font-bold text-white shadow-xl shadow-plum-700/30 transition hover:bg-plum-600 disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            "Submit Feedback"
          )}
        </button>
        {status === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again or call us directly.</p>}

        <Link
          href="/review"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-plum-950/10 bg-white px-6 py-4 text-[17px] font-bold text-plum-950 transition hover:bg-mist"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          Back
        </Link>
      </form>

      {phones}
      <p className="mt-3 text-xs text-mauve-600/80">
        You can also{" "}
        <a href={site.googleReviewUrl} className="font-semibold text-plum-700 underline underline-offset-2">
          leave a public review on Google
        </a>
        .
      </p>
    </>
  );
}
