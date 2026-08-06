"use client";

import { motion } from "framer-motion";
import { CompetitorIntelligenceData } from "../../lib/competitorIntelligence";

type Props = {
  data: CompetitorIntelligenceData;
  language: string;
};

export default function WinProbabilityCard({
  data,
  language,
}: Props) {
  const color =
    data.winProbability >= 80
      ? "from-emerald-400 to-green-500"
      : data.winProbability >= 60
      ? "from-yellow-400 to-orange-500"
      : "from-red-400 to-red-600";

  const status =
    data.winProbability >= 80
      ? language === "ko"
        ? "매우 유리"
        : "Excellent"
      : data.winProbability >= 60
      ? language === "ko"
        ? "도전 가능"
        : "Competitive"
      : language === "ko"
      ? "신중 권장"
      : "High Risk";

  const action =
    data.recommendation === "attack"
      ? language === "ko"
        ? "🚀 지금 적극적으로 콘텐츠를 제작하세요."
        : "🚀 Publish aggressively now."
      : data.recommendation === "compete"
      ? language === "ko"
        ? "⚡ 차별화 전략과 함께 테스트를 추천합니다."
        : "⚡ Test with a strong differentiation strategy."
      : language === "ko"
      ? "🛑 우선순위를 낮추고 다른 키워드를 함께 검토하세요."
      : "🛑 Lower the priority and evaluate other keywords.";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            WIN RATE
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            {language === "ko"
              ? "AI 승률 예측"
              : "AI Win Probability"}
          </h2>
        </div>

        <div
          className={`rounded-full bg-gradient-to-r ${color} px-4 py-2 text-sm font-bold text-white`}
        >
          {status}
        </div>

      </div>

      <div className="mt-8 flex justify-center">

        <div className="relative flex h-56 w-56 items-center justify-center">

          <svg
            className="-rotate-90"
            width="220"
            height="220"
          >
            <circle
              cx="110"
              cy="110"
              r="90"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="14"
              fill="none"
            />

            <motion.circle
              cx="110"
              cy="110"
              r="90"
              fill="none"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={565}
              strokeDashoffset={
                565 -
                (565 * data.winProbability) / 100
              }
              initial={{
                strokeDashoffset: 565,
              }}
              animate={{
                strokeDashoffset:
                  565 -
                  (565 * data.winProbability) / 100,
              }}
              transition={{
                duration: 1,
              }}
              className="stroke-cyan-400"
            />
          </svg>

          <div className="absolute text-center">

            <h3 className="text-5xl font-black text-white">
              {data.winProbability}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              %
            </p>

          </div>

        </div>

      </div>

      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <p className="text-sm font-semibold text-cyan-300">
          {language === "ko"
            ? "AI 추천 액션"
            : "AI Recommended Action"}
        </p>

        <p className="mt-3 leading-7 text-zinc-200">
          {action}
        </p>

      </div>

    </div>
  );
}