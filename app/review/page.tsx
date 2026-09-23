import type { Metadata } from "next";
import ReviewShell from "@/components/ReviewShell";
import RatingPicker from "@/components/RatingPicker";

export const metadata: Metadata = {
  title: "Rate Your Visit | Kinesis Pain Speciality Centre",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <ReviewShell divider>
      <RatingPicker />
    </ReviewShell>
  );
}
