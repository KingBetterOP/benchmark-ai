"use client";

import {
  BenchmarkReport,
  TitleSuggestion,
} from "@/app/lib/types";

type Props = {
  report: BenchmarkReport | null;
  benchmarkScore: number;
  opportunity: number;
  opportunityScoreV2: number;
  competition: string;
  expectedViews: string;
  uploadTime: string;
  titles: TitleSuggestion[];
};

export default function ProjectSummary({
  report,
  benchmarkScore,
  opportunity,
  opportunityScoreV2,
  competition,
  expectedViews,
  uploadTime,
  titles,
}: Props) {
  async function handleShare() {
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          report,
          benchmarkScore,
          opportunity,
          opportunityScoreV2,
          competition,
          expectedViews,
          uploadTime,
          titles,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ?? "Failed to create report"
        );
      }

      const shareUrl = `${window.location.origin}${data.url}`;

      if (navigator.share) {
        await navigator.share({
          title: "Benchmark AI Report",
          text: "Check out this Benchmark AI research report.",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);

        alert("Report link copied!");
      }
    } catch (error) {
      console.error("Share report error:", error);

      if (
        error instanceof Error &&
        error.name === "AbortError"
      ) {
        return;
      }

      alert("Failed to create report link.");
    }
  }

  return (
    <section className="mb-10 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8">

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-3xl font-extrabold">
            🚀 Project Summary
          </h2>

          <p className="mt-2 text-zinc-400">
            Everything you need to know at a glance.
          </p>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="rounded-xl bg-white px-5 py-3 font-bold text-black transition hover:bg-zinc-200"
        >
          🔗 Share Report
        </button>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <SummaryCard
          title="Benchmark Score"
          value={`${benchmarkScore}/100`}
        />

        <SummaryCard
          title="Opportunity Score"
          value={`${opportunityScoreV2}/100`}
        />

        <SummaryCard
          title="Competition"
          value={competition}
        />

        <SummaryCard
          title="AI Opportunity"
          value={`${opportunity}%`}
        />

        <SummaryCard
          title="Expected Views"
          value={expectedViews}
        />

        <SummaryCard
          title="Best Upload"
          value={uploadTime}
        />

        <SummaryCard
          title="Best Title"
          value={
            titles[0]?.title ??
            "No title generated"
          }
        />

      </div>

    </section>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <p className="mt-3 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}