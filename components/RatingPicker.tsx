"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

const faces = ["😌", "😞", "😕", "😐", "🙂", "😍"]; // index 0 = nothing chosen yet
const labels = ["Select your rating", "Very poor", "Poor", "Average", "Good", "Excellent"];

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <path
        d="M12 2.8l2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17.1 6.4 20l1.1-6.2L2.9 9.4l6.3-.9L12 2.8z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        className={`transition-colors duration-200 ${filled ? "text-amber-400" : "text-plum-950/15"}`}
      />
    </svg>
  );
}

export default function RatingPicker() {
  const router = useRouter();
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const shown = hover || rating;
  const leaving = rating >= 4;

  const choose = (value: number) => {
    if (rating) return;
    setRating(value);
    if (value >= 4) {
      // Happy patients go straight to the Google review form
      setTimeout(() => window.location.assign(site.googleReviewUrl), 900);
    } else {
      setTimeout(() => router.push(`/feedback?rating=${value}`), 450);
    }
  };

  return (
    <>
      <div className="mx-auto mt-7 grid h-24 w-24 place-items-center rounded-3xl border border-plum-950/10 bg-mist text-5xl">
        <span key={shown} className="animate-[pop_0.35s_ease-out]" aria-hidden>
          {faces[shown]}
        </span>
      </div>

      <h1 className="mt-7 text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-plum-700 sm:text-[3.4rem]">
        How was your experience?
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-[17px] leading-relaxed text-mauve-600">
        Please rate your visit. Your feedback helps us improve our care.
      </p>

      <div role="radiogroup" aria-label="Rate your visit" className="mt-8 flex justify-center gap-2 sm:gap-3" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={rating === v}
            aria-label={`${v} star${v > 1 ? "s" : ""} — ${labels[v]}`}
            disabled={rating > 0}
            onMouseEnter={() => setHover(v)}
            onFocus={() => setHover(v)}
            onBlur={() => setHover(0)}
            onClick={() => choose(v)}
            className={`grid h-14 w-14 place-items-center rounded-2xl border transition duration-200 sm:h-[4.25rem] sm:w-[4.25rem] ${
              v <= shown ? "border-amber-200 bg-amber-50" : "border-plum-950/10 bg-mist"
            } ${rating ? "cursor-default" : "hover:-translate-y-0.5"}`}
          >
            <Star filled={v <= shown} />
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-plum-700">
        {leaving ? "Thank you! Taking you to Google…" : labels[shown]}
      </p>
    </>
  );
}
