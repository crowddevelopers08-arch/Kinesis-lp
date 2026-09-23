"use client";

import { useEffect } from "react";

export default function ConversionTracker({ concern }: { concern?: string }) {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "lead_submitted", concern: concern || "" });
    if (typeof window.fbq === "function") window.fbq("track", "Lead", { content_name: concern || "" });
  }, [concern]);

  return null;
}
