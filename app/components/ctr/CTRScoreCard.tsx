"use client";

import { motion } from "framer-motion";
import { CTRIntelligenceData } from "../../lib/ctrIntelligence";

type Props = {
  data: CTRIntelligenceData;
  language: string;
};

export default function CTRScoreCard({
  data,
  language,
}: Props) {
  const recommendation = (() => {
    switch (data.recommendation) {
      case "excellent":
        return {
          text:
            language === "ko"
              ? "🟢 CTR 매우 우수"
              : "🟢 Excellent CTR",
          color:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        };

      case "good":
        return {
          text:
            language === "ko"
              ? "🟡 개선 가능"
              : "🟡 Good CTR",
          color:
            "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
        };

      default:
        return {
          text:
            language === "ko"
              ? "🔴 최적화 필요"
              : "🔴 Needs Improvement",
          color:
            "border-red-500/30 bg-red-500/10 text-red-300",
        };
    }
  })();

  const metrics = [
    {
      title:
        language === "ko"
          ? "썸네일"
          : "Thumbnail",
      value: data.thumbnailScore,
      icon: "🖼️",
      color: "from-cyan-400 to-blue-500",
    },
    {
      title:
        language === "ko"
          ? "제목"
          : "Title",
      value: data.titleScore,
      icon: "📝",
      color: "from-purple-400 to-indigo-500",
    },
    {
      title:
        language === "ko"
          ? "호기심"
          : "Curiosity",
      value: data.curiosityScore,
      icon: "🤔",
      color: "from-orange-400 to-red-500",
    },
    {
      title:
        language === "ko"
          ? "감정 유도"
          : "Emotion",
      value: data.emotionalScore,
      icon: "❤️",
      color: "from-pink-400 to-rose-500",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            CTR
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            {language === "ko"
              ? "CTR 분석"
              : "CTR Intelligence"}
          </h2>
        </div>

        <div
          className={`rounded-full border px-4 py-2 text-sm font-bold ${recommendation.color}`}
        >
          {recommendation.text}
        </div>

      </div>

      <div className="mt-8 space-y-5">

        {metrics.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-black/20 p-5"
          >
            <div className="mb-3 flex items-center justify-between">

              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {item.icon}
                </span>

                <span className="font-semibold text-white">
                  {item.title}
                </span>
              </div>

              <span className="text-xl font-black text-white">
                {item.value}/100
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">

              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${item.value}%`,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                }}
                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
              />

            </div>

          </motion.div>
        ))}

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <p className="text-sm font-semibold text-cyan-300">
          {language === "ko"
            ? "예상 CTR"
            : "Expected CTR"}
        </p>

        <h3 className="mt-3 text-4xl font-black text-white">
          {data.expectedCTR}%
        </h3>

        <p className="mt-4 text-zinc-300">
          {language === "ko"
            ? `예상 조회수 증가 ${data.expectedViewIncrease}%`
            : `Estimated view increase ${data.expectedViewIncrease}%`}
        </p>

      </div>

    </div>
  );
}