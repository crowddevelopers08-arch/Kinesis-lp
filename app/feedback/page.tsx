import { Suspense } from "react";
import type { Metadata } from "next";
import ReviewShell from "@/components/ReviewShell";
import FeedbackForm from "@/components/FeedbackForm";

export const metadata: Metadata = {
  title: "Share Your Feedback | Kinesis Pain Speciality Centre",
  robots: { index: false, follow: false },
};

export default function FeedbackPage() {
  return (
    <ReviewShell>
      {/* useSearchParams (for the rating) needs a Suspense boundary */}
      <Suspense>
        <FeedbackForm />
      </Suspense>
    </ReviewShell>
  );
}
