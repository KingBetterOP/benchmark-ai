"use client";

import { motion } from "framer-motion";
import { RevenueIntelligenceData } from "../../lib/revenueIntelligence";

type Props = {
  data: RevenueIntelligenceData;
  language: string;
};

export default function RevenueScoreCard({
  data,
  language,
}: Props) {
  const recommendation = (() => {
    switch (data.recommendation) {
      case "excellent":
        return {
          text:
            language === "ko"
              ? "🟢 수익성 매우 높음"
              : "🟢 Excellent Revenue",
          color:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        };

      case "good":
        return {
          text:
            language === "ko"
              ? "🟡 수익성 양호"
              : "🟡 Good Revenue",
          color:
            "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
        };

      default:
        return {
          text:
            language === "ko"
              ? "🔴 개선 필요"
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
          ? "예상 RPM"
          : "Expected RPM",
      value: `$${data.expectedRPM}`,
      icon: "💰",
    },
    {
      title:
        language === "ko"
          ? "예상 CPM"
          : "Expected CPM",
      value: `$${data.expectedCPM}`,
      icon: "💵",
    },
    {
      title:
        language === "ko"
          ? "월 예상 수익"
          : "Monthly Revenue",
      value: `$${data.estimatedMonthlyRevenue.toLocaleString()}`,
      icon: "📅",
    },
    {
      title:
        language === "ko"
          ? "연 예상 수익"
          : "Yearly Revenue",
      value: `$${data.estimatedYearlyRevenue.toLocaleString()}`,
      icon: "📈",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            REVENUE
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            {language === "ko"
              ? "수익 분석"
              : "Revenue Intelligence"}
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
            <div className="flex items-center justify-between">

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

          </motion.div>
        ))}

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <p className="text-sm font-semibold text-cyan-300">
          {language === "ko"
            ? "수익성 점수"
            : "Profitability Score"}
        </p>

        <h3 className="mt-3 text-4xl font-black text-white">
          {data.profitabilityScore}/100
        </h3>

      </div>

    </div>
  );
}