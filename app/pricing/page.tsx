"use client";

import { useEffect, useState } from "react";

import { translations } from "../lib/translations";
import { useLanguage } from "../hooks/useLanguage";
import { trackEvent } from "../lib/analytics";

type Plan = "pro" | "business";

export default function PricingPage() {
  const { language } = useLanguage();

  const t =
    translations[
      language as keyof typeof translations
    ];

  const [loadingPlan, setLoadingPlan] =
    useState<Plan | null>(null);

  /*
  ============================================================
  PRICING VIEW
  ============================================================
  */

  useEffect(() => {
    void trackEvent("pricing_view");
  }, []);

  /*
  ============================================================
  START CHECKOUT
  ============================================================
  */

  const handleUpgrade = async (
    plan: Plan
  ) => {
    if (loadingPlan) {
      return;
    }

    try {
      setLoadingPlan(plan);

      await trackEvent("checkout_start");
      
      const res =
        await fetch(
          "/api/checkout",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              plan,
            }),
          }
        );

      const body =
        await res.json();

      if (!res.ok) {
        alert(
          body?.error ??
            "Unable to start checkout."
        );

        return;
      }

      if (
        typeof body?.url !== "string"
      ) {
        alert(
          "Checkout URL was not returned."
        );

        return;
      }

      window.location.href =
        body.url;
    } catch (error) {
      console.error(
        "Checkout failed:",
        error
      );

      alert(
        t.pricingError ??
          "Something went wrong. Please try again."
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Benchmark AI
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            Choose the plan that
            fits your growth.
          </h1>

          <p className="mt-5 text-base leading-7 text-zinc-400 md:text-lg">
            Start with Benchmark AI and
            unlock the research, intelligence,
            and growth tools you need to build
            better YouTube content.
          </p>

        </div>

        {/* ====================================================
            PLANS
        ==================================================== */}

        <div className="mt-14 grid gap-6 lg:grid-cols-3">

          {/* ==================================================
              FREE
          ================================================== */}

          <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7">

            <div>

              <p className="text-sm font-semibold text-zinc-400">
                Free
              </p>

              <h2 className="mt-3 text-4xl font-black">
                $0
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                For exploring Benchmark AI.
              </p>

            </div>

            <div className="my-7 h-px bg-white/10" />

            <ul className="space-y-4 text-sm text-zinc-300">

              <li>
                ✓ 3 Benchmark analyses / day
              </li>

              <li>
                ✓ Core YouTube research
              </li>

              <li>
                ✓ Opportunity scoring
              </li>

              <li>
                ✓ Basic AI insights
              </li>

              <li>
                ✓ Project workspace
              </li>

            </ul>

            <div className="mt-auto pt-8">

              <div className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-zinc-500">
                Current Free Plan
              </div>

            </div>

          </div>

          {/* ==================================================
              PRO
          ================================================== */}

          <div className="relative flex flex-col rounded-3xl border border-emerald-400/40 bg-gradient-to-b from-emerald-400/10 to-white/[0.03] p-7 shadow-2xl shadow-emerald-500/5">

            <div className="absolute right-6 top-6 rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
              Most Popular
            </div>

            <div>

              <p className="text-sm font-semibold text-emerald-300">
                Pro
              </p>

              <div className="mt-3 flex items-end gap-2">

                <h2 className="text-4xl font-black">
                  $19
                </h2>

                <span className="pb-1 text-sm text-zinc-500">
                  / month
                </span>

              </div>

              <p className="mt-2 text-sm text-zinc-500">
                For serious creators and
                growing channels.
              </p>

            </div>

            <div className="my-7 h-px bg-white/10" />

            <ul className="space-y-4 text-sm text-zinc-300">

              <li>
                ✓ 100 Benchmark analyses / day
              </li>

              <li>
                ✓ Advanced opportunity intelligence
              </li>

              <li>
                ✓ Competitor research
              </li>

              <li>
                ✓ AI content strategy
              </li>

              <li>
                ✓ AI title & thumbnail intelligence
              </li>

              <li>
                ✓ Growth planning tools
              </li>

              <li>
                ✓ Advanced research reports
              </li>

            </ul>

            <div className="mt-auto pt-8">

              <button
                type="button"
                onClick={() =>
                  void handleUpgrade(
                    "pro"
                  )
                }
                disabled={
                  loadingPlan !== null
                }
                className="w-full rounded-xl bg-emerald-400 px-5 py-3.5 text-sm font-black text-black transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingPlan ===
                "pro"
                  ? "Opening Checkout..."
                  : "Upgrade to Pro"}
              </button>

            </div>

          </div>

          {/* ==================================================
              BUSINESS
          ================================================== */}

          <div className="flex flex-col rounded-3xl border border-cyan-400/30 bg-gradient-to-b from-cyan-400/10 to-white/[0.03] p-7">

            <div>

              <p className="text-sm font-semibold text-cyan-300">
                Business
              </p>

              <div className="mt-3 flex items-end gap-2">

                <h2 className="text-4xl font-black">
                  $49
                </h2>

                <span className="pb-1 text-sm text-zinc-500">
                  / month
                </span>

              </div>

              <p className="mt-2 text-sm text-zinc-500">
                For teams, agencies, and
                high-volume creators.
              </p>

            </div>

            <div className="my-7 h-px bg-white/10" />

            <ul className="space-y-4 text-sm text-zinc-300">

              <li>
                ✓ 500 Benchmark analyses / day
              </li>

              <li>
                ✓ Everything in Pro
              </li>

              <li>
                ✓ Advanced AI research workflows
              </li>

              <li>
                ✓ High-volume content intelligence
              </li>

              <li>
                ✓ Advanced competitor analysis
              </li>

              <li>
                ✓ Team & agency workflows
              </li>

              <li>
                ✓ Priority access to Benchmark AI
              </li>

            </ul>

            <div className="mt-auto pt-8">

              <button
                type="button"
                onClick={() =>
                  void handleUpgrade(
                    "business"
                  )
                }
                disabled={
                  loadingPlan !== null
                }
                className="w-full rounded-xl bg-cyan-400 px-5 py-3.5 text-sm font-black text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingPlan ===
                "business"
                  ? "Opening Checkout..."
                  : "Upgrade to Business"}
              </button>

            </div>

          </div>

        </div>

        {/* ====================================================
            TRUST / PAYMENT
        ==================================================== */}

        <div className="mt-10 text-center">

          <p className="text-xs text-zinc-600">
            Secure payments powered by Polar.
          </p>

          <p className="mt-2 text-xs text-zinc-700">
            You can manage your subscription
            and billing from your account.
          </p>

        </div>

      </div>
    </main>
  );
}