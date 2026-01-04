"use client";

import AddBusinessModal from "@/components/modules/Business/AddBusinessModal";
import OnboardingNav from "@/components/shared/OnboardingNav";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function OnboardingPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <OnboardingNav />

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-3xl font-semibold text-foreground">
            👋 Welcome, Nur
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            You’re logged in, but you haven’t created a business yet. Create one
            to start managing invoices, clients & reports.
          </p>

          <Button
            onClick={() => setOpen(true)}
            className="mt-8 h-12 px-8 rounded-full bg-primary text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(124,106,242,0.25),0_12px_45px_rgba(124,106,242,0.3)] hover:shadow-[0_0_0_1px_rgba(124,106,242,0.4),0_18px_60px_rgba(124,106,242,0.4)]"
          >
            + Add Business
          </Button>
        </div>
      </main>

      <AddBusinessModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
