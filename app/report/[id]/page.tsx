"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ReportData = {
  id: string;

    visibility: "private" | "public";
  isOwner: boolean;

  benchmarkScore: number;

  

  opportunity: number;

  opportunityScoreV2: {
    total: number;
    confidence?: number;
    verdict?: string;

    demand?: number;
    competition?: number;
    trend?: number;
    ctr?: number;
    thumbnail?: number;
    title?: number;
    freshness?: number;
    gap?: number;
  };

  competition: string;

  expectedViews: string;

  uploadTime: string;

  titles: {
    title: string;
  }[];
};

export default function PublicReportPage() {
  const params = useParams();

  const id = params.id as string;

  const [data, setData] =
    useState<ReportData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [visibilityLoading, setVisibilityLoading] =
  useState(false);

  useEffect(() => {
    async function loadReport() {
      try {
        const response =
          await fetch(
            `/api/reports/${id}`
          );

        if (!response.ok) {
          throw new Error(
            "Report not found"
          );
        }

        const result =
          await response.json();

        setData(result);
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      void loadReport();
    }
  }, [id]);
  async function handleVisibilityChange(
    nextVisibility: "public" | "private"
  ) {
    if (!data?.isOwner) {
      return;
    }

    try {
      setVisibilityLoading(true);

      const response = await fetch(
        `/api/reports/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            visibility:
              nextVisibility,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ??
            "Failed to update visibility"
        );
      }

      setData({
        ...result,
        visibility:
          result.visibility ??
          nextVisibility,
        isOwner:
          result.isOwner ?? true,
      });
    } catch (error) {
      console.error(
        "Failed to update report visibility:",
        error
      );

      alert(
        "Failed to update report visibility."
      );
    } finally {
      setVisibilityLoading(false);
    }
  }
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-zinc-400">
          Loading report...
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Benchmark AI
          </p>

          <h1 className="mt-4 text-3xl font-bold">
            Report Not Found
          </h1>

          <p className="mt-3 text-zinc-400">
            This report may have been removed
            or does not exist.
          </p>

        </div>
      </main>
    );
  }

  const opportunityScore =
    data.opportunityScoreV2?.total ?? 0;

  const confidence =
    data.opportunityScoreV2?.confidence ?? 0;

  const verdict =
    data.opportunityScoreV2?.verdict ??
    "WAIT";

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="text-center">

  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
    Benchmark AI
  </p>

  <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
    YouTube Research Report
  </h1>

  <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
    AI-powered content opportunity
    analysis for your next YouTube video.
  </p>

  <div className="mt-6 flex flex-wrap justify-center gap-3">

    <span
      className={`rounded-full px-4 py-2 text-xs font-semibold ${
        data.visibility === "public"
          ? "bg-emerald-400/10 text-emerald-300"
          : "bg-white/10 text-zinc-400"
      }`}
    >
      {data.visibility === "public"
        ? "Public Report"
        : "Private Report"}
    </span>

    {data.isOwner && (
      <>
        <button
          type="button"
          disabled={visibilityLoading}
          onClick={() =>
            handleVisibilityChange(
              data.visibility === "public"
                ? "private"
                : "public"
            )
          }
          className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {visibilityLoading
            ? "Updating..."
            : data.visibility === "public"
            ? "Make Private"
            : "Make Public"}
        </button>

        {data.visibility === "public" && (
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  window.location.href
                );

                alert(
                  "Report link copied."
                );
              } catch (error) {
                console.error(
                  "Failed to copy report link:",
                  error
                );

                alert(
                  "Failed to copy report link."
                );
              }
            }}
            className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
          >
            Copy Share Link
          </button>
        )}
      </>
    )}

  </div>

</header>

        {/* =====================================================
            EXECUTIVE DECISION
        ===================================================== */}

        <section className="mt-12 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-blue-500/10 p-8">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                Executive Decision
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                {verdict}
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-zinc-400">
                Based on the current YouTube
                market signals, Benchmark AI
                estimates the overall opportunity
                at {opportunityScore}/100.
              </p>

            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-black/30 px-8 py-6 text-center">

              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Opportunity
              </p>

              <p className="mt-2 text-5xl font-black">
                {opportunityScore}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                / 100
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            CORE SCORE GRID
        ===================================================== */}

        <section className="mt-8">

          <SectionHeader
            eyebrow="01 / Core Metrics"
            title="Research Snapshot"
            description="The most important metrics from this YouTube market analysis."
          />

          <div className="grid gap-5 md:grid-cols-3">

            <Card
              title="Benchmark Score"
              value={`${data.benchmarkScore}/100`}
            />

            <Card
              title="Opportunity Score"
              value={`${opportunityScore}/100`}
            />

            <Card
              title="Competition"
              value={data.competition}
            />

            <Card
              title="AI Opportunity"
              value={`${data.opportunity}%`}
            />

            <Card
              title="Expected Views"
              value={data.expectedViews}
            />

            <Card
              title="Best Upload"
              value={data.uploadTime}
            />

          </div>

        </section>

        {/* =====================================================
            OPPORTUNITY ENGINE
        ===================================================== */}

        <section className="mt-12">

          <SectionHeader
            eyebrow="02 / Opportunity Engine"
            title="Why this opportunity exists"
            description="Benchmark AI breaks the opportunity score into the signals that drive the final decision."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            <MetricCard
              label="Demand"
              value={
                data.opportunityScoreV2
                  ?.demand
              }
            />

            <MetricCard
              label="Competition"
              value={
                data.opportunityScoreV2
                  ?.competition
              }
            />

            <MetricCard
              label="Trend"
              value={
                data.opportunityScoreV2
                  ?.trend
              }
            />

            <MetricCard
              label="CTR"
              value={
                data.opportunityScoreV2
                  ?.ctr
              }
            />

            <MetricCard
              label="Content Gap"
              value={
                data.opportunityScoreV2
                  ?.gap
              }
            />

          </div>

        </section>

        {/* =====================================================
            CREATIVE SIGNALS
        ===================================================== */}

        <section className="mt-12">

          <SectionHeader
            eyebrow="03 / Creative Intelligence"
            title="Click & Freshness Signals"
            description="Signals that influence whether viewers are likely to click and whether the topic still has room to grow."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <MetricCard
              label="Thumbnail"
              value={
                data.opportunityScoreV2
                  ?.thumbnail
              }
            />

            <MetricCard
              label="Title"
              value={
                data.opportunityScoreV2
                  ?.title
              }
            />

            <MetricCard
              label="Freshness"
              value={
                data.opportunityScoreV2
                  ?.freshness
              }
            />

            <MetricCard
              label="Confidence"
              value={confidence}
            />

          </div>

        </section>

        {/* =====================================================
            VERDICT
        ===================================================== */}

        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Decision Confidence
              </p>

              <h2 className="mt-3 text-2xl font-black">
                {confidence >= 75
                  ? "High confidence"
                  : confidence >= 50
                  ? "Moderate confidence"
                  : "Low confidence"}
              </h2>

              <p className="mt-2 max-w-2xl leading-6 text-zinc-500">
                Confidence reflects how strongly
                the available market signals support
                the current opportunity assessment.
              </p>

            </div>

            <div className="text-left md:text-right">

              <p className="text-5xl font-black text-emerald-400">
                {confidence}
              </p>

              <p className="mt-1 text-sm text-zinc-600">
                confidence / 100
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            BEST TITLE
        ===================================================== */}

        <section className="mt-12">

          <SectionHeader
            eyebrow="04 / Content"
            title="Recommended Title"
            description="The strongest title recommendation generated for this research."
          />

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

            <p className="text-sm text-zinc-500">
              Best Title
            </p>

            <h2 className="mt-4 text-2xl font-bold leading-9 md:text-3xl">
              {data.titles?.[0]?.title ??
                "No title available"}
            </h2>

          </div>

        </section>

        {/* =====================================================
            ADDITIONAL TITLES
        ===================================================== */}

        {data.titles &&
          data.titles.length > 1 && (
            <section className="mt-10">

              <SectionHeader
                eyebrow="05 / Alternatives"
                title="Alternative Titles"
                description="Additional title directions generated from the same research."
              />

              <div className="space-y-3">

                {data.titles
                  .slice(1, 6)
                  .map(
                    (item, index) => (
                      <div
                        key={`${item.title}-${index}`}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                      >

                        <div className="flex gap-4">

                          <span className="shrink-0 text-sm font-bold text-emerald-400">
                            {String(
                              index + 2
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <p className="font-semibold leading-6 text-zinc-200">
                            {item.title}
                          </p>

                        </div>

                      </div>
                    )
                  )}

              </div>

            </section>
          )}

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="mt-14 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Benchmark AI
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Want to analyze your own content?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
            Discover high-opportunity YouTube topics,
            analyze the competition, and build your
            next content strategy.
          </p>

          <a
            href="/"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-black transition hover:bg-zinc-200"
          >
            Analyze Your Keyword →
          </a>

        </section>

        <p className="mt-12 text-center text-sm text-zinc-600">
          Powered by Benchmark AI Intelligence Engine
        </p>

      </div>
    </main>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">

      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-black">
        {title}
      </h2>

      <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

/* ============================================================
   CORE CARD
============================================================ */

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <p className="mt-3 break-words text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}

/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
  label,
  value,
}: {
  label: string;
  value?: number;
}) {
  const safeValue =
    typeof value === "number" &&
    Number.isFinite(value)
      ? Math.round(value)
      : 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <div className="mt-3 flex items-end gap-1">

        <p className="text-3xl font-black">
          {safeValue}
        </p>

        <p className="pb-1 text-sm text-zinc-600">
          /100
        </p>

      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">

        <div
          className="h-full rounded-full bg-emerald-400"
          style={{
            width: `${Math.min(
              Math.max(
                safeValue,
                0
              ),
              100
            )}%`,
          }}
        />

      </div>

    </div>
  );
}