"use client";

import { calculateRevenueIntelligence } from "../../lib/revenueIntelligence";

import RevenueScoreCard from "./RevenueScoreCard";
import RevenueOptimizationCard from "./RevenueOptimizationCard";

type Props = {
  monthlyViews: number;
  rpm: number;
  language: string;
};

export default function RevenueIntelligenceSection({
  monthlyViews,
  rpm,
  language,
}: Props) {
  const data = calculateRevenueIntelligence(
    monthlyViews,
    rpm
  );

  return (
    <section className="mt-12">

      <div className="mb-8">

        <h2 className="text-4xl font-black text-white">
          Revenue Intelligence
        </h2>

        <p className="mt-3 max-w-3xl text-zinc-400">
          {language === "ko"
            ? "AI가 예상 수익과 수익성을 분석하고 최적의 성장 전략을 제안합니다."
            : "AI analyzes revenue potential and recommends the best monetization strategy."}
        </p>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <RevenueScoreCard
          data={data}
          language={language}
        />

        <RevenueOptimizationCard
          data={data}
          language={language}
        />

      </div>

    </section>
  );
}