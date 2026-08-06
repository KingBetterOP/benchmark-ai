"use client";

import { motion } from "framer-motion";
import { KeywordIntelligenceData } from "../../lib/keywordIntelligence";

type Props = {
  data: KeywordIntelligenceData;
  language: string;
};

export default function MarketAnalysisCard({
  data,
  language,
}: Props) {
  const metrics = [
    {
  title:
    language === "ko"
      ? "검색 수요"
      : "Search Demand",
  value: `${data.demand}/100`,
  percent: data.demand,
  icon: "📈",
  color: "from-cyan-400 to-blue-500",
},
    {
      title:
        language === "ko"
          ? "경쟁도"
          : "Competition",
      value: `${data.competition}/100`,
percent: data.competition,
      icon: "📉",
      color: "from-red-400 to-red-600",
    },
    {
      title:
        language === "ko"
          ? "기회도"
          : "Opportunity",
      value: `${data.opportunity}/100`,
percent: data.opportunity,
      icon: "🚀",
      color: "from-emerald-400 to-green-500",
    },
    {
      title:
        language === "ko"
          ? "성장성"
          : "Growth Trend",
      value: `${data.trend}/100`,
percent: data.trend,
      icon: "📊",
      color: "from-purple-400 to-indigo-500",
    },
    {
      title:
        language === "ko"
          ? "계절성"
          : "Seasonality",
      value: `${data.seasonality}/100`,
percent: data.seasonality,
      icon: "🍂",
      color: "from-orange-400 to-yellow-500",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          MARKET
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          {language === "ko"
            ? "시장 분석"
            : "Market Analysis"}
        </h2>
      </div>

      <div className="space-y-5">
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
                {item.value}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
  width: `${item.percent}%`,
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
            ? "AI 시장 평가"
            : "AI Market Insight"}
        </p>

        <p className="mt-3 leading-7 text-zinc-200">
          {data.opportunity >= 80
            ? language === "ko"
              ? "시장 기회가 매우 높습니다. 경쟁보다 수요가 강하므로 우선적으로 공략할 가치가 있습니다."
              : "Market opportunity is very high. Demand exceeds competition, making this an excellent target."
            : data.opportunity >= 60
            ? language === "ko"
              ? "충분한 성장 가능성이 있습니다. 경쟁 채널과 차별화 전략을 함께 준비하면 좋습니다."
              : "The market has good potential. Pair it with a strong differentiation strategy."
            : language === "ko"
            ? "시장 기회가 제한적입니다. 다른 키워드와 비교하여 우선순위를 결정하는 것을 추천합니다."
            : "Market opportunity is limited. Compare it with other keywords before investing resources."}
        </p>
      </div>
    </div>
  );
}