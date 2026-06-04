"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function DemoPageTracker() {
  useEffect(() => {
    trackEvent("demo_opened");
  }, []);

  return null;
}
