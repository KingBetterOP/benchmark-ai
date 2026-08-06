"use client";

import { calculateSEOIntelligence } from "../../lib/seoIntelligence";
import { SEOOptimizer } from "../../lib/types";

import SEOScoreCard from "./SEOScoreCard";
import SEOOptimizationCard from "./SEOOptimizationCard";

type Props = {
  benchmarkScore: number;
  opportunity: number;
  optimizer: SEOOptimizer | null;
  language: string;
};

export default function SEOIntelligenceSection({
  benchmarkScore,
  opportunity,
  optimizer,
  language,
}: Props) {
  const data = calculateSEOIntelligence(
    benchmarkScore,
    opportunity
  );

  return (
    <section className="mt-12">

      <div className="mb-8">

        <h2 className="text-4xl font-black text-white">
          SEO Intelligence
        </h2>

        <p className="mt-3 max-w-3xl text-zinc-400">
          {language === "ko"
            ? "AI가 검색 노출 가능성을 분석하고 제목, 설명, 태그를 최적화합니다."
            : "AI analyzes search visibility and optimizes titles, descriptions and tags."}
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <SEOScoreCard
          data={data}
          language={language}
        />

        <SEOOptimizationCard
          optimizer={optimizer}
          language={language}
        />

      </div>

    </section>
  );
}