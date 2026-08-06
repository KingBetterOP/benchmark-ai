"use client";

import { motion } from "framer-motion";
import { DashboardStats } from "../../lib/dashboardAnalytics";

type Props = {
  stats: DashboardStats;
  language: string;
};

export default function AISummaryCard({
  stats,
  language,
}: Props) {
  const averageViews = Math.round(stats.averageViews);
  const engagement = stats.engagementRate;

  const summary =
    language === "ko"
      ? [
          `총 ${stats.videoCount.toLocaleString()}개의 영상을 분석했습니다.`,
          `평균 조회수는 ${averageViews.toLocaleString()}회입니다.`,
          `평균 참여율은 ${engagement.toFixed(1)}%입니다.`,
          stats.topChannel
            ? `대표 채널은 "${stats.topChannel.channel.name}"입니다.`
            : "대표 채널 데이터를 찾을 수 없습니다.",
        ]
      : [
          `Analyzed ${stats.videoCount.toLocaleString()} videos.`,
          `Average views: ${averageViews.toLocaleString()}.`,
          `Average engagement: ${engagement.toFixed(1)}%.`,
          stats.topChannel
            ? `Top channel: ${stats.topChannel.channel.name}.`
            : "Top channel data is unavailable.",
        ];

  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            AI
          </p>

          <h3 className="mt-2 text-2xl font-black text-white">
            {language === "ko"
              ? "AI 종합 분석"
              : "AI Summary"}
          </h3>
        </div>

        <div className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-300">
          GPT
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {summary.map((item, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
            }}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="mt-1 text-cyan-400">
              ✓
            </div>

            <p className="leading-7 text-zinc-200">
              {item}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
        <p className="text-sm font-semibold text-emerald-300">
          {language === "ko"
            ? "AI 추천"
            : "AI Recommendation"}
        </p>

        <p className="mt-2 leading-7 text-zinc-200">
          {engagement >= 5
            ? language === "ko"
              ? "현재 키워드는 참여율이 높습니다. 경쟁 채널의 제목과 썸네일을 벤치마킹하여 콘텐츠를 제작하는 것을 추천합니다."
              : "This keyword shows strong engagement. Benchmark competitors' titles and thumbnails before creating content."
            : language === "ko"
            ? "참여율이 다소 낮습니다. 제목과 썸네일을 차별화하고 틈새 키워드를 함께 공략하는 전략을 추천합니다."
            : "Engagement is relatively low. Differentiate your titles and thumbnails while targeting niche keywords."}
        </p>
      </div>
    </div>
  );
}