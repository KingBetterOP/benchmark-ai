"use client";

import {
  calculateKeywordIntelligence,
} from "../../lib/keywordIntelligence";

import KeywordScoreGauge from "./KeywordScoreGauge";
import MarketAnalysisCard from "./MarketAnalysisCard";
import TrendForecastCard from "./TrendForecastCard";

type Props = {
  averageViews: number;
  competition: number;
  language: string;
};

export default function KeywordIntelligenceSection({
  averageViews,
  competition,
  language,
}: Props) {
  const data =
    calculateKeywordIntelligence(
      averageViews,
      competition
    );

  return (
    <section className="mt-12">

      <div className="mb-8">

        <h2 className="text-4xl font-black text-white">
          {language === "ko"
            ? "Keyword Intelligence"
            : "Keyword Intelligence"}
        </h2>

        <p className="mt-3 max-w-3xl text-zinc-400">
          {language === "ko"
            ? "AI가 키워드의 성장성, 경쟁도, 예상 CTR, 예상 RPM, 수익 가능성을 종합적으로 분석합니다."
            : "AI analyzes keyword opportunity, competition, CTR, RPM and revenue potential."}
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <KeywordScoreGauge
          score={data.score}
          language={language}
        />

        <MarketAnalysisCard
          data={data}
          language={language}
        />

      </div>

      <div className="mt-6">

        <TrendForecastCard
          data={data}
          language={language}
        />

      </div>

    </section>
  );
}