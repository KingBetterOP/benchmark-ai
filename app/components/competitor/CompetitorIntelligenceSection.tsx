"use client";

import {
  calculateCompetitorIntelligence,
} from "../../lib/competitorIntelligence";

import CompetitorScoreCard from "./CompetitorScoreCard";
import WinProbabilityCard from "./WinProbabilityCard";

type Props = {
  competition: number;
  opportunity: number;
  language: string;
};

export default function CompetitorIntelligenceSection({
  competition,
  opportunity,
  language,
}: Props) {
  const data =
    calculateCompetitorIntelligence(
      competition,
      opportunity
    );

  return (
    <section className="mt-12">

      <div className="mb-8">

        <h2 className="text-4xl font-black text-white">
          {language === "ko"
            ? "Competitor Intelligence"
            : "Competitor Intelligence"}
        </h2>

        <p className="mt-3 max-w-3xl text-zinc-400">
          {language === "ko"
            ? "AI가 경쟁 강도와 시장 기회를 분석하여 공략 전략을 제안합니다."
            : "AI analyzes competitor strength, market opportunity and recommends the best strategy."}
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <CompetitorScoreCard
          data={data}
          language={language}
        />

        <WinProbabilityCard
          data={data}
          language={language}
        />

      </div>

    </section>
  );
}