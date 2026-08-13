"use client";

import { useState } from "react";

type Props = {
  plan: string;
  dailyUsage: number;
};

export default function PlanCard({
  plan,
  dailyUsage,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleManageSubscription =
    async () => {
      if (loading) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response =
          await fetch(
            "/api/customer-portal",
            {
              method: "POST",
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "Failed to open customer portal."
          );
        }

        if (
          typeof data?.url !==
          "string"
        ) {
          throw new Error(
            "Customer portal URL was not returned."
          );
        }

        window.location.href =
          data.url;
      } catch (error) {
        console.error(
          "Customer portal error:",
          error
        );

        setError(
          "구독 관리 페이지를 열 수 없습니다. 잠시 후 다시 시도해주세요."
        );

        setLoading(false);
      }
    };

  return (
    <div className="mx-auto mt-6 max-w-md rounded-xl border border-zinc-700 bg-white/5 p-5 text-center backdrop-blur-xl">
      {plan === "pro" ? (
        <>
          <div className="text-2xl font-bold text-yellow-400">
            💎 PRO
          </div>

          <p className="mt-2 text-gray-300">
            Unlimited AI Analysis
          </p>

          <button
            type="button"
            onClick={
              handleManageSubscription
            }
            disabled={loading}
            className="mt-5 w-full rounded-lg bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Opening..."
              : "Manage Subscription"}
          </button>

          {error && (
            <p className="mt-3 text-sm text-red-400">
              {error}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="text-2xl font-bold">
            ⭐ FREE PLAN
          </div>

          <p className="mt-2 text-gray-300">
            {dailyUsage} / 3 analyses used
            today
          </p>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-700">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{
                width: `${Math.min(
                  (dailyUsage / 3) * 100,
                  100
                )}%`,
              }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {Math.max(
              3 - dailyUsage,
              0
            )}{" "}
            analyses remaining
          </p>
        </>
      )}
    </div>
  );
}