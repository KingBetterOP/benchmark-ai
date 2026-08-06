"use client";

import { motion } from "framer-motion";
import { CTRIntelligenceData } from "../../lib/ctrIntelligence";

type Props = {
  data: CTRIntelligenceData;
  language: string;
};

export default function CTROptimizationCard({
  data,
  language,
}: Props) {
  const suggestions =
    data.overallScore >= 80
      ? language === "ko"
        ? [
            "현재 썸네일 스타일을 유지하세요.",
            "제목 구조를 유지하면서 신선한 키워드를 추가하세요.",
            "A/B 테스트로 CTR을 더욱 높여보세요.",
          ]
        : [
            "Keep your current thumbnail style.",
            "Maintain the title structure while adding fresh keywords.",
            "Run A/B tests to maximize CTR.",
          ]
      : data.overallScore >= 60
      ? language === "ko"
        ? [
            "썸네일의 대비를 더 높여보세요.",
            "제목 앞부분에 핵심 키워드를 배치하세요.",
            "호기심을 유발하는 문구를 추가하세요.",
          ]
        : [
            "Increase thumbnail contrast.",
            "Move the primary keyword to the beginning of the title.",
            "Add curiosity-driven wording.",
          ]
      : language === "ko"
      ? [
          "썸네일을 새로 디자인하세요.",
          "제목을 더 짧고 강하게 만드세요.",
          "감정을 자극하는 표현을 추가하세요.",
        ]
      : [
          "Redesign the thumbnail.",
          "Make the title shorter and stronger.",
          "Use more emotional wording.",
        ];

  const tests =
    language === "ko"
      ? [
          "A안 : 숫자를 포함한 제목",
          "B안 : 질문형 제목",
          "A안 : 인물 중심 썸네일",
          "B안 : 큰 텍스트 중심 썸네일",
        ]
      : [
          "Version A: Number-based title",
          "Version B: Question-based title",
          "Version A: Face-focused thumbnail",
          "Version B: Large-text thumbnail",
        ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          AI CTR
        </p>

        <h2 className="mt-2 text-2xl font-black text-white">
          {language === "ko"
            ? "CTR 최적화"
            : "CTR Optimization"}
        </h2>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-2xl border border-white/10 bg-black/20 p-5"
      >
        <h3 className="font-bold text-white">
          {language === "ko"
            ? "AI 개선 제안"
            : "AI Suggestions"}
        </h3>

        <ul className="mt-4 space-y-3">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="text-zinc-300"
            >
              • {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5"
      >
        <h3 className="font-bold text-white">
          {language === "ko"
            ? "A/B 테스트 아이디어"
            : "A/B Test Ideas"}
        </h3>

        <ul className="mt-4 space-y-3">
          {tests.map((item, index) => (
            <li
              key={index}
              className="text-zinc-300"
            >
              • {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <h3 className="font-bold text-cyan-300">
          {language === "ko"
            ? "AI 추천 액션"
            : "AI Recommended Action"}
        </h3>

        <p className="mt-3 text-zinc-200 leading-7">
          {data.recommendation === "excellent"
            ? language === "ko"
              ? "현재 CTR이 우수합니다. 작은 개선과 A/B 테스트를 통해 성과를 더욱 높일 수 있습니다."
              : "Your CTR is already strong. Small refinements and A/B tests can further improve performance."
            : data.recommendation === "good"
            ? language === "ko"
              ? "CTR을 높일 여지가 있습니다. 썸네일과 제목을 함께 개선해 보세요."
              : "There is room to improve CTR. Optimize both your thumbnail and title."
            : language === "ko"
            ? "CTR 개선이 필요합니다. 제목과 썸네일을 전면적으로 재검토하는 것을 추천합니다."
            : "CTR needs significant improvement. Consider redesigning both the title and thumbnail."}
        </p>

      </div>

    </div>
  );
}