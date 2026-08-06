"use client";

import { calculateCTRIntelligence } from "../../lib/ctrIntelligence";

import CTRScoreCard from "./CTRScoreCard";
import CTROptimizationCard from "./CTROptimizationCard";

type Props = {
  thumbnailScore: number;
  titleScore: number;
  language: string;
};

export default function CTRIntelligenceSection({
  thumbnailScore,
  titleScore,
  language,
}: Props) {
  const data = calculateCTRIntelligence(
    thumbnailScore,
    titleScore
  );

  return (
    <section className="mt-12">

      <div className="mb-8">

        <h2 className="text-4xl font-black text-white">
          CTR Intelligence
        </h2>

        <p className="mt-3 max-w-3xl text-zinc-400">
          {language === "ko"
            ? "AI가 클릭률을 분석하고 제목과 썸네일 개선 전략을 제안합니다."
            : "AI analyzes click-through rate and recommends title and thumbnail improvements."}
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <CTRScoreCard
          data={data}
          language={language}
        />

        <CTROptimizationCard
          data={data}
          language={language}
        />

      </div>

    </section>
  );
}