"use client";

import { motion } from "framer-motion";
import { KeywordIntelligenceData } from "../../lib/keywordIntelligence";

type Props = {
  data: KeywordIntelligenceData;
  language: string;
};

export default function TrendForecastCard({
  data,
  language,
}: Props) {
  const verdict = (() => {
    switch (data.verdict) {
      case "publish":
        return {
          label:
            language === "ko"
              ? "🟢 즉시 제작 추천"
              : "🟢 Publish Now",
          color:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        };

      case "test":
        return {
          label:
            language === "ko"
              ? "🟡 테스트 추천"
              : "🟡 Worth Testing",
          color:
            "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
        };

      default:
        return {
          label:
            language === "ko"
              ? "🔴 우선순위 낮음"
              : "🔴 Low Priority",
          color:
            "border-red-500/30 bg-red-500/10 text-red-300",
        };
    }
  })();

  const cards = [
    {
      title:
        language === "ko"
          ? "성장 추세"
          : "Growth Trend",
      value: `${data.trend}/100`,
      icon: "📈",
    },
    {
      title:
        language === "ko"
          ? "예상 CTR"
          : "Expected CTR",
      value: `${data.expectedCTR}%`,
      icon: "👀",
    },
    {
      title:
        language === "ko"
          ? "예상 RPM"
          : "Expected RPM",
      value: `$${data.expectedRPM}`,
      icon: "💰",
    },
    {
      title:
        language === "ko"
          ? "예상 수익"
          : "Estimated Revenue",
      value: `$${data.estimatedRevenue.toLocaleString()}`,
      icon: "💵",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            FORECAST
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            {language === "ko"
              ? "AI 예측"
              : "AI Forecast"}
          </h2>
        </div>

        <div
          className={`rounded-full border px-4 py-2 text-sm font-bold ${verdict.color}`}
        >
          {verdict.label}
        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {cards.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            className="rounded-2xl border border-white/10 bg-black/20 p-5"
          >
            <div className="flex items-center justify-between">

              <span className="text-3xl">
                {item.icon}
              </span>

              <span className="text-xl font-black text-white">
                {item.value}
              </span>

            </div>

            <p className="mt-4 text-sm text-zinc-400">
              {item.title}
            </p>

          </motion.div>
        ))}

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <p className="text-sm font-semibold text-cyan-300">
          {language === "ko"
            ? "AI 종합 의견"
            : "AI Recommendation"}
        </p>

        <p className="mt-3 leading-7 text-zinc-200">

          {data.verdict === "publish"
            ? language === "ko"
              ? "현재 시장 상황에서는 높은 성장 가능성이 예상됩니다. 지금 콘텐츠를 제작하는 것이 가장 유리합니다."
              : "Current market conditions indicate strong growth potential. Publishing now is recommended."

            : data.verdict === "test"
            ? language === "ko"
              ? "시장성이 충분합니다. 여러 제목과 썸네일을 테스트하면 좋은 성과를 기대할 수 있습니다."
              : "The keyword has solid potential. Test multiple titles and thumbnails for better performance."

            : language === "ko"
            ? "현재는 경쟁 대비 기대 수익이 낮습니다. 다른 키워드도 함께 비교해 보세요."
            : "Expected return is currently limited compared to competition. Consider evaluating additional keywords."}

        </p>

      </div>

    </div>
  );
}