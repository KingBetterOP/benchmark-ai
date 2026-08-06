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

export default function SearchOverview({
  stats,
  summary,
  language,
}: Props) {
  const cards = [
    {
      label:
        language === "ko"
          ? "분석 영상"
          : "Videos",
      value: stats.videoCount.toString(),
      icon: "🎥",
    },
    {
      label:
        language === "ko"
          ? "총 조회수"
          : "Total Views",
      value: summary.totalViews,
      icon: "👀",
    },
    {
      label:
        language === "ko"
          ? "평균 조회수"
          : "Average Views",
      value: summary.averageViews,
      icon: "📈",
    },
    {
      label:
        language === "ko"
          ? "참여율"
          : "Engagement",
      value: summary.engagementRate,
      icon: "🔥",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            {language === "ko"
              ? "개요"
              : "Overview"}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            {language === "ko"
              ? "검색 요약"
              : "Search Summary"}
          </h3>
        </div>

        <div className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-300">
          AI
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.label}
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            className="rounded-2xl border border-white/10 bg-black/20 p-5"
          >
            <div className="text-3xl">
              {card.icon}
            </div>

            <h4 className="mt-4 text-2xl font-black text-white">
              {card.value}
            </h4>

            <p className="mt-1 text-sm text-zinc-400">
              {card.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
        <p className="text-sm font-semibold text-cyan-300">
          {language === "ko"
            ? "AI 한줄 요약"
            : "AI Summary"}
        </p>

        <p className="mt-2 leading-7 text-zinc-200">
          {language === "ko"
            ? `총 ${summary.totalViews}회의 조회수와 평균 ${summary.averageViews} 조회수를 기록한 ${stats.videoCount}개의 영상을 분석했습니다. 평균 참여율은 ${summary.engagementRate}입니다.`
            : `Analyzed ${stats.videoCount} videos with ${summary.totalViews} total views, ${summary.averageViews} average views and an engagement rate of ${summary.engagementRate}.`}
        </p>
      </div>
    </div>
  );
}