"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Play,
  Target,
  Zap,
} from "lucide-react";

import type { ContentStrategy } from "../lib/types";

type ContentStrategyCardProps = {
  strategy: ContentStrategy | null;
  language: string;
  decision: "MAKE" | "WAIT" | "SKIP";
  onCreateContent: () => void;
};

export default function ContentStrategyCard({
  strategy,
  language,
  decision,
  onCreateContent,
}: ContentStrategyCardProps) {
  const isKo = language === "ko";

  /* ============================================================
     WAIT
  ============================================================ */

  if (decision === "WAIT") {
    return (
      <section className="mt-10">
        <div className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-yellow-500/[0.04] shadow-2xl">
          {/* Header */}
          <div className="border-b border-yellow-500/10 p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-yellow-400">
                  BENCHMARK AI
                </p>

                <h2 className="mt-2 text-2xl font-black md:text-3xl">
                  {isKo
                    ? "아직 제작하지 마세요"
                    : "Wait for Better Signals"}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                  {isKo
                    ? "현재 데이터에서는 가능성이 있지만, 지금 바로 제작하기보다 트렌드와 경쟁 상황을 조금 더 확인하는 것이 좋습니다."
                    : "The keyword shows potential, but the current signals suggest validating the trend and competition before creating."}
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2">
                <Clock3 className="h-4 w-4 text-yellow-400" />

                <span className="text-sm font-bold text-yellow-400">
                  WAIT
                </span>
              </div>
            </div>
          </div>

          {/* Signal */}
          <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10">
                <Target className="h-5 w-5 text-yellow-400" />
              </div>

              <p className="mt-4 text-sm font-bold text-white">
                {isKo
                  ? "추세 확인"
                  : "Watch the trend"}
              </p>

              <p className="mt-2 text-xs leading-6 text-white/40">
                {isKo
                  ? "검색 관심과 최근 콘텐츠 활동이 충분히 강해지는지 확인하세요."
                  : "Wait for stronger search interest and recent content activity."}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
              </div>

              <p className="mt-4 text-sm font-bold text-white">
                {isKo
                  ? "콘텐츠 차별화"
                  : "Find differentiation"}
              </p>

              <p className="mt-2 text-xs leading-6 text-white/40">
                {isKo
                  ? "경쟁 영상과 다른 접근법을 먼저 확보하는 것이 좋습니다."
                  : "Identify an angle that is meaningfully different from existing videos."}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10">
                <Zap className="h-5 w-5 text-yellow-400" />
              </div>

              <p className="mt-4 text-sm font-bold text-white">
                {isKo
                  ? "다음 신호 대기"
                  : "Wait for a stronger signal"}
              </p>

              <p className="mt-2 text-xs leading-6 text-white/40">
                {isKo
                  ? "기회 점수가 개선되면 다시 분석하여 제작 여부를 결정하세요."
                  : "Re-run the analysis when the opportunity signal improves."}
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-yellow-500/10 bg-black/20 px-6 py-5 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-yellow-300/80">
              <ArrowRight className="h-4 w-4" />

              {isKo
                ? "다음 단계: 키워드 변화를 관찰한 뒤 다시 분석"
                : "Next step: Monitor the keyword and analyze again"}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ============================================================
     SKIP
  ============================================================ */

  if (decision === "SKIP") {
    return (
      <section className="mt-10">
        <div className="overflow-hidden rounded-3xl border border-red-500/20 bg-red-500/[0.04] shadow-2xl">
          {/* Header */}
          <div className="border-b border-red-500/10 p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-red-400">
                  BENCHMARK AI
                </p>

                <h2 className="mt-2 text-2xl font-black md:text-3xl">
                  {isKo
                    ? "다른 기회를 찾는 것이 좋습니다"
                    : "Look for Another Opportunity"}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                  {isKo
                    ? "현재 데이터에서는 이 키워드를 우선적으로 제작할 충분한 기회를 확인하지 못했습니다."
                    : "Current signals do not indicate a strong enough opportunity to prioritize this keyword."}
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-red-400" />

                <span className="text-sm font-bold text-red-400">
                  SKIP
                </span>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="grid gap-4 p-6 md:grid-cols-2 md:p-8">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                {isKo
                  ? "현재 판단"
                  : "Current Signal"}
              </p>

              <p className="mt-3 text-sm leading-7 text-white/65">
                {isKo
                  ? "경쟁 강도와 예상 기회를 함께 고려하면 다른 키워드를 먼저 탐색하는 편이 효율적입니다."
                  : "Considering competition and opportunity together, another keyword is likely a better use of your production resources."}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                {isKo
                  ? "추천 행동"
                  : "Recommended Action"}
              </p>

              <p className="mt-3 text-sm leading-7 text-white/65">
                {isKo
                  ? "Opportunity Finder에서 다른 키워드와 콘텐츠 기회를 탐색해보세요."
                  : "Explore other keywords and content opportunities before committing production time."}
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-red-500/10 bg-black/20 px-6 py-5 md:px-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-red-300/80">
              <ArrowRight className="h-4 w-4" />

              {isKo
                ? "다음 단계: 다른 콘텐츠 기회 탐색"
                : "Next step: Find another content opportunity"}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ============================================================
     MAKE BUT STRATEGY NOT READY
  ============================================================ */

  if (!strategy) {
    return (
      <section className="mt-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Zap className="h-5 w-5 text-white/70" />
          </div>

          <h2 className="mt-5 text-2xl font-black">
            {isKo
              ? "콘텐츠 전략을 준비하고 있습니다"
              : "Preparing Your Content Strategy"}
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/45">
            {isKo
              ? "분석 결과를 기반으로 가장 적합한 콘텐츠 방향을 계산하고 있습니다."
              : "We are converting the research signals into an actionable content strategy."}
          </p>
        </div>
      </section>
    );
  }

  /* ============================================================
     MAKE
  ============================================================ */

  return (
    <section className="mt-10">
      <div className="overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/[0.04] shadow-2xl shadow-emerald-500/[0.03]">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="border-b border-white/10 p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-xs font-bold tracking-[0.2em] text-emerald-400">
                  BENCHMARK AI
                </p>

                <span className="h-1 w-1 rounded-full bg-white/20" />

                <span className="text-xs font-medium text-white/35">
                  {isKo
                    ? "EXECUTION PLAN"
                    : "EXECUTION PLAN"}
                </span>
              </div>

              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                {isKo
                  ? "이제 무엇을 만들지 결정됐습니다."
                  : "Now You Know What to Create."}
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/50 md:text-base">
                {isKo
                  ? "Benchmark AI의 분석 결과를 실제 제작에 바로 사용할 수 있는 콘텐츠 전략으로 변환했습니다."
                  : "Benchmark AI has converted the research into an actionable strategy you can use immediately."}
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />

              <span className="text-sm font-bold text-emerald-400">
                MAKE
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================
            STRATEGY GRID
        ====================================================== */}

        <div className="grid gap-px border-b border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {/* Angle */}
          <div className="bg-[#101116] p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                {isKo ? "추천 각도" : "Best Angle"}
              </p>

              <Target className="h-4 w-4 text-white/25" />
            </div>

            <p className="mt-4 text-lg font-black leading-7 text-white">
              {strategy.angle || "—"}
            </p>
          </div>

          {/* Format */}
          <div className="bg-[#101116] p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                {isKo ? "콘텐츠 포맷" : "Format"}
              </p>

              <Play className="h-4 w-4 text-white/25" />
            </div>

            <p className="mt-4 text-lg font-black leading-7 text-white">
              {strategy.format || "—"}
            </p>
          </div>

          {/* Length */}
          <div className="bg-[#101116] p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                {isKo ? "추천 길이" : "Recommended Length"}
              </p>

              <Clock3 className="h-4 w-4 text-white/25" />
            </div>

            <p className="mt-4 text-lg font-black leading-7 text-white">
              {strategy.length || "—"}
            </p>
          </div>

          {/* CTA */}
          <div className="bg-[#101116] p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-white/40">
                CTA
              </p>

              <ArrowRight className="h-4 w-4 text-white/25" />
            </div>

            <p className="mt-4 text-lg font-black leading-7 text-white">
              {strategy.cta || "—"}
            </p>
          </div>
        </div>

        {/* ======================================================
            OPENING HOOK
        ====================================================== */}

        <div className="border-b border-white/10 p-6 md:p-8">
          <div className="rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.03] p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">
                  {isKo
                    ? "첫 3초"
                    : "FIRST 3 SECONDS"}
                </p>

                <h3 className="mt-2 text-xl font-black">
                  {isKo
                    ? "Opening Hook"
                    : "Opening Hook"}
                </h3>
              </div>

              <span className="w-fit rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-white/40">
                0–3s
              </span>
            </div>

            <p className="mt-6 text-xl font-black leading-9 text-white md:text-3xl md:leading-[1.35]">
              “{strategy.hook || "—"}”
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-white/35">
              <Zap className="h-3.5 w-3.5" />

              {isKo
                ? "시청자가 첫 몇 초 안에 계속 볼 이유를 만들어야 합니다."
                : "The opening should give viewers an immediate reason to keep watching."}
            </div>
          </div>
        </div>

        {/* ======================================================
            VIDEO STRUCTURE
        ====================================================== */}

        <div className="border-b border-white/10 p-6 md:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
              {isKo
                ? "제작 구조"
                : "PRODUCTION STRUCTURE"}
            </p>

            <h3 className="mt-2 text-2xl font-black">
              {isKo
                ? "이 순서대로 제작하세요"
                : "Build the Video in This Order"}
            </h3>
          </div>

          <div className="mt-6 grid gap-3">
            {Array.isArray(strategy.structure) &&
            strategy.structure.length > 0 ? (
              strategy.structure.map(
                (step, index) => (
                  <div
                    key={`${step}-${index}`}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition-all hover:border-white/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs font-black text-white">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-6 text-white/80">
                        {step}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-white/20 transition-transform group-hover:translate-x-1" />
                  </div>
                )
              )
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/40">
                {isKo
                  ? "영상 구조 정보가 없습니다."
                  : "No video structure is available."}
              </div>
            )}
          </div>
        </div>

        {/* ======================================================
            WHY THIS WORKS
        ====================================================== */}

        <div className="border-b border-white/10 p-6 md:p-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Lightbulb className="h-5 w-5 text-white/70" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
                  {isKo
                    ? "전략적 근거"
                    : "STRATEGIC REASONING"}
                </p>

                <h3 className="mt-1 text-xl font-black">
                  {isKo
                    ? "왜 이 전략인가?"
                    : "Why This Strategy?"}
                </h3>
              </div>
            </div>

            <p className="mt-5 text-sm leading-8 text-white/60 md:text-base">
              {strategy.reasoning || "—"}
            </p>
          </div>
        </div>

        {/* ======================================================
            EXECUTION CTA
        ====================================================== */}

        <div className="bg-black/20 p-6 md:p-8">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                {isKo
                  ? "NEXT STEP"
                  : "NEXT STEP"}
              </p>

              <h3 className="mt-1 text-lg font-black">
                {isKo
                  ? "분석은 끝났습니다. 이제 제작하세요."
                  : "Research is done. Start creating."}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/35">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />

              {isKo
                ? "전략 준비 완료"
                : "Strategy ready"}
            </div>
          </div>

          <button
            type="button"
            onClick={onCreateContent}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-5 text-sm font-black text-black transition-all hover:scale-[1.01] hover:bg-white/90 hover:shadow-2xl hover:shadow-white/10 active:scale-[0.99]"
          >
            <span>
              {isKo
                ? "🚀 이 전략으로 콘텐츠 만들기"
                : "🚀 CREATE CONTENT WITH THIS STRATEGY"}
            </span>

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-3 text-center text-xs text-white/30">
            {isKo
              ? "Creator Workspace에서 제목 · Hook · Script · 썸네일 · SEO 콘텐츠를 생성합니다."
              : "Creator Workspace will generate titles, hooks, scripts, thumbnails, and SEO content."}
          </p>
        </div>
      </div>
    </section>
  );
}