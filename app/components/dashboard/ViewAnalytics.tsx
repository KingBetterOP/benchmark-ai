"use client";

import { motion } from "framer-motion";
import {
  DashboardStats,
  getDashboardSummary,
} from "../../lib/dashboardAnalytics";

type Props = {
  stats: DashboardStats;
  summary: ReturnType<typeof getDashboardSummary>;
  language: string;
};

export default function ViewAnalytics({
  stats,
  summary,
  language,
}: Props) {
  const highest =
    stats.highestViews === 0
      ? 0
      : Math.min(
          100,
          (stats.averageViews /
            stats.highestViews) *
            100
        );

  const average =
    stats.highestViews === 0
      ? 0
      : Math.min(
          100,
          (stats.averageViews /
            stats.highestViews) *
            100
        );

  const lowest =
    stats.highestViews === 0
      ? 0
      : Math.min(
          100,
          (stats.lowestViews /
            stats.highestViews) *
            100
        );

  const metrics = [
    {
      label:
        language === "ko"
          ? "최고 조회수"
          : "Highest Views",
      value: summary.highestViews,
      percent: 100,
      color: "from-cyan-400 to-blue-500",
    },
    {
      label:
        language === "ko"
          ? "평균 조회수"
          : "Average Views",
      value: summary.averageViews,
      percent: average,
      color: "from-emerald-400 to-green-500",
    },
    {
      label:
        language === "ko"
          ? "최저 조회수"
          : "Lowest Views",
      value: summary.lowestViews,
      percent: lowest,
      color: "from-orange-400 to-red-500",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          {language === "ko"
            ? "조회수"
            : "Views"}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          {language === "ko"
            ? "조회수 분석"
            : "View Analytics"}
        </h3>
      </div>

      <div className="space-y-5">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-300">
                {metric.label}
              </span>

              <span className="font-bold text-white">
                {metric.value}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${metric.percent}%`,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                }}
                className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">
            {language === "ko"
              ? "총 조회수"
              : "Total Views"}
          </span>

          <span className="text-xl font-bold text-cyan-300">
            {summary.totalViews}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-zinc-400">
            {language === "ko"
              ? "조회수 안정성"
              : "View Stability"}
          </span>

          <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-300">
            {highest >= 70
              ? language === "ko"
                ? "높음"
                : "High"
              : highest >= 40
              ? language === "ko"
                ? "보통"
                : "Medium"
              : language === "ko"
              ? "낮음"
              : "Low"}
          </span>
        </div>
      </div>
    </div>
  );
}