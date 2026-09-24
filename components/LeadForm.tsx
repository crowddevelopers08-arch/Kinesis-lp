"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { concerns, type Concern } from "@/lib/site";
import { ArrowIcon, ShieldIcon } from "./Icons";

type Values = { name: string; phone: string; email: string; concern: Concern | "" };
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

type LeadFormProps = {
  id?: string;
  source?: string;
  compact?: boolean;
};

const empty: Values = { name: "", phone: "", email: "", concern: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name";
  const digits = v.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) e.phone = "Please enter a valid 10-digit mobile number";
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address";
  if (!v.concern) e.concern = "Please select what you are looking for";
  return e;
}

export default function LeadForm({ id = "lead-form", source = "hero", compact = false }: LeadFormProps) {
  const router = useRouter();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (k: Field) => (e: ChangeEvent<HTMLInputElement> | string) => {
    const val = typeof e === "string" ? e : e.target.value;
    setValues((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    setServerError("");
    try {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      params.forEach((val, key) => {
        if (key.startsWith("utm_") || key === "gclid" || key === "fbclid") utm[key] = val;
      });
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source, pageUrl: window.location.href, ...utm }),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push(`/thank-you?concern=${encodeURIComponent(values.concern)}`);
    } catch {
      setServerError("Something went wrong. Please try again or call us directly.");
      setLoading(false);
    }
  }

  const field =
    "peer w-full rounded-xl border bg-white px-4 pb-2.5 pt-6 text-[15px] text-plum-950 outline-none transition placeholder:text-transparent focus:border-plum-600 focus:ring-4 focus:ring-lilac-200/60";
  const label =
    "pointer-events-none absolute left-4 top-2 text-[11px] font-semibold uppercase tracking-wider text-mauve-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-plum-700";
  const err = (k: Field) => (errors[k] ? "border-red-400" : "border-plum-950/10");

  return (
    <form id={id} onSubmit={onSubmit} noValidate className="space-y-3.5">
      <div className="relative">
        <input id={`${id}-name`} type="text" autoComplete="name" placeholder="Full Name" value={values.name} onChange={set("name")} className={`${field} ${err("name")}`} />
        <label htmlFor={`${id}-name`} className={label}>Full Name</label>
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div className={compact ? "space-y-3.5" : "grid gap-3.5 sm:grid-cols-2"}>
        <div className="relative">
          <input id={`${id}-phone`} type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone Number" value={values.phone} onChange={set("phone")} className={`${field} ${err("phone")}`} />
          <label htmlFor={`${id}-phone`} className={label}>Phone Number</label>
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
        <div className="relative">
          <input id={`${id}-email`} type="email" autoComplete="email" placeholder="Email Address" value={values.email} onChange={set("email")} className={`${field} ${err("email")}`} />
          <label htmlFor={`${id}-email`} className={label}>Email Address</label>
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-plum-950">What are you looking for?</legend>
        <div className="grid grid-cols-2 gap-2">
          {concerns.map((c) => {
            const active = values.concern === c;
            return (
              <button
                type="button"
                key={c}
                onClick={() => set("concern")(c)}
                aria-pressed={active}
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "border-plum-700 bg-plum-700 text-white shadow-lg shadow-plum-700/25"
                    : "border-plum-950/10 bg-white text-plum-950 hover:border-plum-600/40 hover:bg-lilac-50"
                }`}
              >
                <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${active ? "border-white" : "border-plum-950/25"}`}>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                {c}
              </button>
            );
          })}
        </div>
        {errors.concern && <p className="mt-1 text-xs text-red-500">{errors.concern}</p>}
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-plum-700 via-plum-600 to-plum-700 bg-[length:200%_100%] px-6 py-4 text-base font-semibold text-white shadow-xl shadow-plum-700/30 transition-all duration-500 hover:bg-right disabled:opacity-70"
      >
        {loading ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending…
          </>
        ) : (
          <>
            Request a Call Back
            <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      {serverError && <p className="text-center text-sm text-red-500">{serverError}</p>}

      <p className="flex items-start gap-2 text-xs leading-relaxed text-mauve-600">
        <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-plum-600" />
        <span>
          Your details will be used by our team to contact you regarding your appointment enquiry.{" "}
          <a href="/privacy-policy" className="font-medium text-plum-700 underline underline-offset-2">Privacy Policy</a>
        </span>
      </p>
    </form>
  );
}
