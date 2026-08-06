"use client";

import { motion } from "framer-motion";
import { RevenueIntelligenceData } from "../../lib/revenueIntelligence";

type Props = {
  data: RevenueIntelligenceData;
  language: string;
};

export default function RevenueOptimizationCard({
  data,
  language,
}: Props) {
  const tips =
    data.profitabilityScore >= 80
      ? language === "ko"
        ? [
            "고 RPM 키워드를 계속 공략하세요.",
            "업로드 빈도를 유지하세요.",
            "브랜드 협찬을 병행하면 수익을 높일 수 있습니다.",
          ]
        : [
            "Continue targeting high-RPM keywords.",
            "Maintain your upload consistency.",
            "Combine with sponsorship opportunities.",
          ]
      : data.profitabilityScore >= 60
      ? language === "ko"
        ? [
            "광고 친화적인 키워드를 늘려보세요.",
            "영상 길이를 8~12분으로 유지해보세요.",
            "CTR을 높여 광고 노출을 늘리세요.",
          ]
        : [
            "Use more advertiser-friendly keywords.",
            "Keep videos around 8–12 minutes.",
            "Increase CTR to improve ad impressions.",
          ]
      : language === "ko"
      ? [
          "고수익 카테고리를 검토하세요.",
          "검색량이 높은 키워드로 전환해보세요.",
          "콘텐츠 전략을 재설계하는 것을 추천합니다.",
        ]
      : [
          "Consider higher-RPM niches.",
          "Target higher-demand keywords.",
          "Rework your overall content strategy.",
        ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          AI REVENUE
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          {language === "ko"
            ? "수익 최적화"
            : "Revenue Optimization"}
        </h2>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-2xl border border-white/10 bg-black/20 p-5"
      >
        <h3 className="font-bold text-white">
          {language === "ko"
            ? "AI 수익 개선 전략"
            : "AI Revenue Strategy"}
        </h3>

        <ul className="mt-5 space-y-3">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="text-zinc-300"
            >
              • {tip}
            </li>
          ))}
        </ul>

      </motion.div>

      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <h3 className="font-bold text-cyan-300">
          {language === "ko"
            ? "AI 추천"
            : "AI Recommendation"}
        </h3>

        <p className="mt-3 leading-7 text-zinc-200">

          {data.recommendation === "excellent"
            ? language === "ko"
              ? "현재 수익성이 매우 높습니다. 업로드 빈도를 유지하면서 규모를 확장하는 것이 좋습니다."
              : "Revenue potential is excellent. Scale your content while maintaining consistency."

            : data.recommendation === "good"
            ? language === "ko"
              ? "수익성이 양호합니다. CTR과 SEO를 함께 개선하면 더 높은 수익을 기대할 수 있습니다."
              : "Revenue potential is good. Improving CTR and SEO can further increase earnings."

            : language === "ko"
            ? "수익성이 낮습니다. 키워드와 콘텐츠 전략을 재검토하는 것을 추천합니다."
            : "Revenue potential is low. Reevaluate your keywords and content strategy."}

        </p>

      </div>

    </div>
  );
}