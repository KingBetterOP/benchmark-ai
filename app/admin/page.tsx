"use client";

import { useCallback, useEffect, useState } from "react";

type AnalyticsData = {
  success: boolean;
  generatedAt: number;

  users: {
    total: number;
    today: number;
    last7Days: number;
    last30Days: number;
  };

  events: {
    total: number;
    searchStarts: number;
    analysisCompleted: number;
    creatorGenerated: number;
    creatorRegenerated: number;
    pricingViews: number;
    checkoutStarts: number;
    purchaseSuccess: number;
    purchaseRefunded: number;
  };

  revenue: {
    grossRevenue: number;
    refundedRevenue: number;
    netRevenue: number;
    refundRate: number;
    currency: string;
    paidOrders: number;
  };

  conversion: {
    analysisRate: number;
    creatorRate: number;
    checkoutRate: number;
    purchaseRate: number;
    overallConversionRate: number;
  };

  funnel: {
    search: number;
    analysis: number;
    creator: number;
    pricing: number;
    checkout: number;
    purchase: number;
  };

  eventBreakdown: {
    event: string;
    count: number;
  }[];

  recentEvents: {
    event: string;
    userId: string | null;
    keyword: string | null;
    metadata: unknown;
    createdAt: number;
  }[];
};

type MetricCardProps = {
  label: string;
  value: string | number;
  description?: string;
};

function MetricCard({
  label,
  value,
  description,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <p className="text-sm text-zinc-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-white">
        {value}
      </p>

      {description && (
        <p className="mt-2 text-xs text-zinc-500">
          {description}
        </p>
      )}
    </div>
  );
}

function FunnelRow({
  label,
  value,
  base,
}: {
  label: string;
  value: number;
  base: number;
}) {
  const percentage =
    base > 0
      ? Math.min(
          (value / base) * 100,
          100
        )
      : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-300">
          {label}
        </span>

        <span className="text-sm font-semibold text-white">
          {value.toLocaleString()}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

function formatDate(
  timestamp: number
): string {
  if (!timestamp) {
    return "-";
  }

  return new Date(
    timestamp
  ).toLocaleString();
}

function formatMoney(
  amount: number,
  currency: string
): string {
  try {
    return new Intl.NumberFormat(
      undefined,
      {
        style: "currency",
        currency:
          currency.toUpperCase(),
        maximumFractionDigits: 2,
      }
    ).format(amount / 100);
  } catch {
    return `${(
      amount / 100
    ).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

export default function AdminPage() {
  const [data, setData] =
    useState<AnalyticsData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadAnalytics =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            "/api/admin/analytics",
            {
              cache: "no-store",
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result?.error ??
              "Failed to load analytics."
          );
        }

        setData(result);
      } catch (error) {
        console.error(
          "Admin dashboard failed:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load analytics."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#09090B] text-white">
        <div className="text-center">
          <div className="text-4xl">
            📊
          </div>

          <p className="mt-4 text-zinc-400">
            Loading Analytics...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#09090B] p-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <div className="text-4xl">
            ⚠️
          </div>

          <h1 className="mt-4 text-xl font-bold">
            Analytics unavailable
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            {error}
          </p>

          <button
            onClick={() =>
              void loadAnalytics()
            }
            className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#09090B] via-[#111827] to-[#09090B] px-4 py-8 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                📊
              </span>

              <h1 className="text-3xl font-bold md:text-4xl">
                Benchmark AI
                <span className="text-blue-400">
                  {" "}
                  Admin
                </span>
              </h1>
            </div>

            <p className="mt-2 text-zinc-400">
              Business Analytics Dashboard
            </p>
          </div>

          <button
            onClick={() =>
              void loadAnalytics()
            }
            className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10"
          >
            ↻ Refresh
          </button>
        </header>

        {/* ====================================================
            USER METRICS
        ==================================================== */}

        <section>
          <h2 className="mb-4 text-lg font-semibold">
            👥 Users
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Total Users"
              value={data.users.total}
            />

            <MetricCard
              label="Today"
              value={data.users.today}
            />

            <MetricCard
              label="Last 7 Days"
              value={
                data.users.last7Days
              }
            />

            <MetricCard
              label="Last 30 Days"
              value={
                data.users.last30Days
              }
            />
          </div>
        </section>

        {/* ====================================================
            BUSINESS METRICS
        ==================================================== */}

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">
            🚀 Product Activity
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Benchmark Searches"
              value={data.events.searchStarts}
            />

            <MetricCard
              label="Completed Analyses"
              value={
                data.events
                  .analysisCompleted
              }
            />

            <MetricCard
              label="Creator Generations"
              value={
                data.events
                  .creatorGenerated
              }
            />

            <MetricCard
              label="Creator Regenerations"
              value={
                data.events
                  .creatorRegenerated
              }
            />
          </div>
        </section>

{/* ====================================================
    REVENUE
==================================================== */}

<section className="mt-10">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-lg font-semibold">
      💵 Revenue
    </h2>

    <span className="text-xs text-zinc-500">
      {data.revenue.paidOrders.toLocaleString()} paid orders
    </span>
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <MetricCard
      label="Gross Revenue"
      value={formatMoney(
        data.revenue.grossRevenue,
        data.revenue.currency
      )}
      description="Total successful order value"
    />

    <MetricCard
      label="Refunded"
      value={formatMoney(
        data.revenue.refundedRevenue,
        data.revenue.currency
      )}
      description="Total refunded amount"
    />

    <MetricCard
      label="Net Revenue"
      value={formatMoney(
        data.revenue.netRevenue,
        data.revenue.currency
      )}
      description="Gross revenue − refunds"
    />

    <MetricCard
      label="Refund Rate"
      value={`${data.revenue.refundRate}%`}
      description="Refunded ÷ gross revenue"
    />
  </div>
</section>

        {/* ====================================================
            REVENUE FUNNEL METRICS
        ==================================================== */}

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">
            💰 Revenue Funnel
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <MetricCard
              label="Pricing Views"
              value={
                data.events.pricingViews
              }
            />

            <MetricCard
              label="Checkout Starts"
              value={
                data.events.checkoutStarts
              }
            />

            <MetricCard
              label="Successful Purchases"
              value={
                data.events.purchaseSuccess
              }
            />

            <MetricCard
             label="Refunded Orders"
             value={
               data.events.purchaseRefunded
              }
            />

            <MetricCard
              label="Overall Conversion"
              value={`${data.conversion.overallConversionRate}%`}
              description="Pricing → Purchase"
            />
          </div>
        </section>

        {/* ====================================================
            FUNNEL
        ==================================================== */}

        <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-6 text-lg font-semibold">
              📈 User Funnel
            </h2>

            <div className="space-y-6">
              <FunnelRow
                label="Benchmark Search"
                value={data.funnel.search}
                base={
                  data.funnel.search
                }
              />

              <FunnelRow
                label="Analysis Complete"
                value={data.funnel.analysis}
                base={
                  data.funnel.search
                }
              />

              <FunnelRow
                label="Creator Generated"
                value={data.funnel.creator}
                base={
                  data.funnel.search
                }
              />

              <FunnelRow
                label="Pricing Viewed"
                value={data.funnel.pricing}
                base={
                  data.funnel.search
                }
              />

              <FunnelRow
                label="Checkout Started"
                value={
                  data.funnel.checkout
                }
                base={
                  data.funnel.search
                }
              />

              <FunnelRow
                label="Purchase Completed"
                value={
                  data.funnel.purchase
                }
                base={
                  data.funnel.search
                }
              />
            </div>
          </div>

          {/* ==================================================
              CONVERSION
          ================================================== */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-6 text-lg font-semibold">
              🎯 Conversion Rates
            </h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-zinc-400">
                  Search → Analysis
                </span>

                <span className="font-bold text-white">
                  {data.conversion.analysisRate}%
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-zinc-400">
                  Analysis → Creator
                </span>

                <span className="font-bold text-white">
                  {data.conversion.creatorRate}%
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-zinc-400">
                  Pricing → Checkout
                </span>

                <span className="font-bold text-white">
                  {data.conversion.checkoutRate}%
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-zinc-400">
                  Checkout → Purchase
                </span>

                <span className="font-bold text-white">
                  {data.conversion.purchaseRate}%
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-zinc-200">
                  Overall Conversion
                </span>

                <span className="text-xl font-bold text-blue-400">
                  {data.conversion.overallConversionRate}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================
            EVENT BREAKDOWN
        ==================================================== */}

        <section className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-6 text-lg font-semibold">
              📊 Event Breakdown
            </h2>

            {data.eventBreakdown.length ===
            0 ? (
              <p className="text-sm text-zinc-500">
                No analytics events yet.
              </p>
            ) : (
              <div className="space-y-3">
                {data.eventBreakdown.map(
                  (item) => (
                    <div
                      key={item.event}
                      className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3"
                    >
                      <span className="font-mono text-sm text-zinc-300">
                        {item.event}
                      </span>

                      <span className="font-bold">
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>

        {/* ====================================================
            RECENT EVENTS
        ==================================================== */}

        <section className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-6 text-lg font-semibold">
              🕐 Recent Events
            </h2>

            {data.recentEvents.length ===
            0 ? (
              <p className="text-sm text-zinc-500">
                No recent events.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-500">
                      <th className="px-3 py-3">
                        Event
                      </th>

                      <th className="px-3 py-3">
                        Keyword
                      </th>

                      <th className="px-3 py-3">
                        User
                      </th>

                      <th className="px-3 py-3">
                        Time
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.recentEvents.map(
                      (
                        event,
                        index
                      ) => (
                        <tr
                          key={`${event.event}-${event.createdAt}-${index}`}
                          className="border-b border-white/5"
                        >
                          <td className="px-3 py-3 font-mono text-xs text-blue-400">
                            {event.event}
                          </td>

                          <td className="px-3 py-3 text-zinc-300">
                            {event.keyword ??
                              "-"}
                          </td>

                          <td className="px-3 py-3 font-mono text-xs text-zinc-500">
                            {event.userId
                              ? `${event.userId.slice(
                                  0,
                                  12
                                )}...`
                              : "-"}
                          </td>

                          <td className="px-3 py-3 text-zinc-500">
                            {formatDate(
                              event.createdAt
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ====================================================
            FOOTER INFO
        ==================================================== */}

        <div className="mt-8 pb-10 text-center text-xs text-zinc-600">
          Last updated:{" "}
          {formatDate(
            data.generatedAt
          )}
        </div>
      </div>
    </main>
  );
}