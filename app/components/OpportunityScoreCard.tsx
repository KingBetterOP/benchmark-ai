"use client";

import { calculateOpportunityScoreV2 } from "../lib/opportunityScoreV2";

interface OpportunityScoreCardProps {
  opportunityScoreV2: ReturnType<
    typeof calculateOpportunityScoreV2
  >;
}

export default function OpportunityScoreCard({
  opportunityScoreV2,
}: OpportunityScoreCardProps) {
  const metrics = [
    {
      label: "Demand",
      value: opportunityScoreV2.demand,
      max: 20,
    },
    {
      label: "Competition",
      value: opportunityScoreV2.competition,
      max: 20,
    },
    {
      label: "Trend",
      value: opportunityScoreV2.trend,
      max: 15,
    },
    {
      label: "CTR",
      value: opportunityScoreV2.ctr,
      max: 10,
    },
    {
      label: "Thumbnail",
      value: opportunityScoreV2.thumbnail,
      max: 10,
    },
    {
      label: "Title",
      value: opportunityScoreV2.title,
      max: 10,
    },
    {
      label: "Freshness",
      value: opportunityScoreV2.freshness,
      max: 10,
    },
    {
      label: "Gap",
      value: opportunityScoreV2.gap,
      max: 5,
    },
  ];

  return (
    <section className="mt-10">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-white/50">
              BENCHMARK AI
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Opportunity Score
            </h2>

            <p className="mt-1 text-sm text-white/50">
              How strong is this keyword opportunity?
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-4xl font-black">
                {opportunityScoreV2.total}

                <span className="text-lg text-white/40">
                  /100
                </span>
              </div>

              <div className="text-sm text-white/50">
                Confidence{" "}
                {opportunityScoreV2.confidence}%
              </div>
            </div>

            <div
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                opportunityScoreV2.verdict === "MAKE"
                  ? "bg-green-500/20 text-green-400"
                  : opportunityScoreV2.verdict === "WAIT"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
              }`}
            >
              {opportunityScoreV2.verdict}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-white/70">
                  {item.label}
                </span>

                <span className="text-sm font-bold">
                  {item.value}/{item.max}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (item.value / item.max) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-white/40">
              Recent Uploads
            </p>

            <p className="mt-1 text-xl font-bold">
              {
                opportunityScoreV2
                  .trendEngine
                  .recentUploads
              }
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-white/40">
              Avg Video Age
            </p>

            <p className="mt-1 text-xl font-bold">
              {
                opportunityScoreV2
                  .trendEngine
                  .averageAge
              }{" "}
              days
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs text-white/40">
              Gap Opportunity
            </p>

            <p className="mt-1 text-xl font-bold">
              {
                opportunityScoreV2
                  .gapEngine
                  .opportunity
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}