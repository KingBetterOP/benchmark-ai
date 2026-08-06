"use client";

import { motion } from "framer-motion";

type Props = {
  score: number;
  language: string;
};

export default function KeywordScoreGauge({
  score,
  language,
}: Props) {
  const color =
    score >= 80
      ? "from-emerald-400 to-green-500"
      : score >= 60
      ? "from-yellow-400 to-orange-500"
      : "from-red-400 to-red-600";

  const status =
    score >= 80
      ? language === "ko"
        ? "매우 좋음"
        : "Excellent"
      : score >= 60
      ? language === "ko"
        ? "도전해볼 만함"
        : "Worth Testing"
      : language === "ko"
      ? "비추천"
      : "Not Recommended";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            AI
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            {language === "ko"
              ? "키워드 점수"
              : "Keyword Score"}
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
                565 - (565 * score) / 100
              }
              initial={{
                strokeDashoffset: 565,
              }}
              animate={{
                strokeDashoffset:
                  565 - (565 * score) / 100,
              }}
              transition={{
                duration: 1,
              }}
              className="stroke-cyan-400"
            />
          </svg>

          <div className="absolute text-center">
            <h3 className="text-5xl font-black text-white">
              {score}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              /100
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
        <p className="text-sm font-semibold text-cyan-300">
          {language === "ko"
            ? "AI 평가"
            : "AI Evaluation"}
        </p>

        <p className="mt-2 leading-7 text-zinc-200">
          {score >= 80
            ? language === "ko"
              ? "이 키워드는 높은 성장 가능성을 보입니다. 우선적으로 콘텐츠 제작을 고려해볼 만합니다."
              : "This keyword shows strong growth potential. It is a high-priority content opportunity."
            : score >= 60
            ? language === "ko"
              ? "잠재력이 있지만 경쟁 상황과 차별화 전략을 함께 검토하는 것이 좋습니다."
              : "This keyword has potential, but should be evaluated together with competition and differentiation."
            : language === "ko"
            ? "현재 기준으로는 우선순위가 낮습니다. 다른 키워드도 함께 검토해 보세요."
            : "This keyword is currently a lower priority. Consider evaluating alternative keywords as well."}
        </p>
      </div>
    </div>
  );
}