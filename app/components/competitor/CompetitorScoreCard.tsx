"use client";

import { motion } from "framer-motion";
import { CompetitorIntelligenceData } from "../../lib/competitorIntelligence";

type Props = {
  data: CompetitorIntelligenceData;
  language: string;
};

export default function CompetitorScoreCard({
  data,
  language,
}: Props) {
  const recommendation = (() => {
    switch (data.recommendation) {
      case "attack":
        return {
          text:
            language === "ko"
              ? "🟢 적극 공략 추천"
              : "🟢 Strong Opportunity",
          color:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        };

      case "compete":
        return {
          text:
            language === "ko"
              ? "🟡 경쟁 가능"
              : "🟡 Competitive",
          color:
            "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
        };

      default:
        return {
          text:
            language === "ko"
              ? "🔴 우선순위 낮음"
              : "🔴 Low Priority",
          color:
            "border-red-500/30 bg-red-500/10 text-red-300",
        };
    }
  })();

  const metrics = [
    {
      title:
        language === "ko"
          ? "강점"
          : "Strength",
      value: data.strengthScore,
      icon: "💪",
      color: "from-green-400 to-emerald-500",
    },
    {
      title:
        language === "ko"
          ? "약점"
          : "Weakness",
      value: data.weaknessScore,
      icon: "⚠️",
      color: "from-orange-400 to-red-500",
    },
    {
      title:
        language === "ko"
          ? "시장 기회"
          : "Opportunity",
      value: data.opportunityScore,
      icon: "🚀",
      color: "from-cyan-400 to-blue-500",
    },
    {
      title:
        language === "ko"
          ? "위협도"
          : "Threat",
      value: data.threatScore,
      icon: "🛡️",
      color: "from-purple-400 to-indigo-500",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            COMPETITOR
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            {language === "ko"
              ? "경쟁 분석"
              : "Competitor Analysis"}
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
            whileHover={{
              scale: 1.02,
            }}
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
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: `${item.value}%`,
                }}
                viewport={{
                  once: true,
                }}
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
            ? "AI 경쟁 분석"
            : "AI Competitor Insight"}
        </p>

        <p className="mt-3 leading-7 text-zinc-200">

          {data.winProbability >= 80
            ? language === "ko"
              ? "현재 경쟁 환경에서는 차별화 전략을 적용하면 높은 성공 가능성이 있습니다."
              : "The current competitive landscape offers a strong chance of success with proper differentiation."

            : data.winProbability >= 60
            ? language === "ko"
              ? "경쟁은 있지만 충분히 도전할 가치가 있습니다."
              : "Competition exists, but the niche is still worth pursuing."

            : language === "ko"
            ? "현재는 경쟁이 매우 치열합니다. 다른 키워드도 함께 검토하는 것이 좋습니다."
            : "Competition is currently very high. Consider evaluating alternative keywords as well."}

        </p>

      </div>

    </div>
  );
}