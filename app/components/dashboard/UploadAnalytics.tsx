"use client";

import { motion } from "framer-motion";
import {
  DashboardStats,
  daysAgo,
  secondsToDuration,
} from "../../lib/dashboardAnalytics";

type Props = {
  stats: DashboardStats;
  language: string;
};

export default function UploadAnalytics({
  stats,
  language,
}: Props) {
  const cards = [
    {
      title:
        language === "ko"
          ? "평균 영상 길이"
          : "Average Duration",
      value: secondsToDuration(
        stats.averageDuration
      ),
      icon: "⏱️",
    },
    {
      title:
        language === "ko"
          ? "가장 긴 영상"
          : "Longest Video",
      value: secondsToDuration(
        stats.longestDuration
      ),
      icon: "🎬",
    },
    {
      title:
        language === "ko"
          ? "가장 짧은 영상"
          : "Shortest Video",
      value: secondsToDuration(
        stats.shortestDuration
      ),
      icon: "⚡",
    },
    {
      title:
        language === "ko"
          ? "최신 업로드"
          : "Latest Upload",
      value: stats.latestUpload
        ? language === "ko"
          ? `${daysAgo(stats.latestUpload)}일 전`
          : `${daysAgo(stats.latestUpload)} days ago`
        : "-",
      icon: "📅",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          {language === "ko"
            ? "업로드"
            : "Uploads"}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          {language === "ko"
            ? "업로드 분석"
            : "Upload Analytics"}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            className="rounded-2xl border border-white/10 bg-black/20 p-5"
          >
            <div className="text-3xl">
              {card.icon}
            </div>

            <h4 className="mt-4 text-xl font-black text-white">
              {card.value}
            </h4>

            <p className="mt-2 text-sm text-zinc-400">
              {card.title}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
        <p className="text-sm font-semibold text-cyan-300">
          {language === "ko"
            ? "AI 분석"
            : "AI Insight"}
        </p>

        <p className="mt-2 leading-7 text-zinc-200">
          {language === "ko"
            ? `평균 영상 길이는 ${secondsToDuration(
                stats.averageDuration
              )}이며 최근 업로드는 ${
                stats.latestUpload
                  ? `${daysAgo(stats.latestUpload)}일 전`
                  : "-"
              }입니다.`
            : `Average duration is ${secondsToDuration(
                stats.averageDuration
              )}. Latest upload was ${
                stats.latestUpload
                  ? `${daysAgo(stats.latestUpload)} days ago`
                  : "-"
              }.`}
        </p>
      </div>
    </div>
  );
}