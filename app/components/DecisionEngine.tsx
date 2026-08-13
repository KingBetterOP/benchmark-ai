"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Lightbulb,
  ShieldAlert,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";

type FinalDecision = {
  decision?: string;
  verdict?: string;
  score?: number;
  confidence?: number;
  reason?: string;
  recommendation?: string;
};

type DecisionEngineProps = {
  keyword: string;
  decision: FinalDecision;
  opportunityScore: number;
  benchmarkScore: number;
  difficulty: number;
  confidence: number;
  expectedViews: string;
  competition: string;
  language: string;
};

/* ============================================================
   HELPERS
   ============================================================ */

function clampScore(
  value: unknown,
  fallback = 0
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return fallback;
  }

  return Math.max(
    0,
    Math.min(
      100,
      Math.round(value)
    )
  );
}

function normalizeDecision(
  value: unknown
): "MAKE" | "WAIT" | "AVOID" {
  if (typeof value !== "string") {
    return "WAIT";
  }

  const normalized =
    value.trim().toUpperCase();

  if (normalized === "MAKE") {
    return "MAKE";
  }

  if (normalized === "AVOID") {
    return "AVOID";
  }

  return "WAIT";
}

/* ============================================================
   DECISION CONFIG
   ============================================================ */

function getDecisionConfig(
  decision: "MAKE" | "WAIT" | "AVOID",
  isKo: boolean
) {
  if (decision === "MAKE") {
    return {
      label: isKo
        ? "지금 만들어라"
        : "MAKE IT",

      shortLabel: isKo
        ? "제작 추천"
        : "CREATE NOW",

      description: isKo
        ? "현재 데이터상 이 키워드는 콘텐츠 제작 가치가 높습니다."
        : "Current data suggests this keyword has strong content potential.",

      nextStep: isKo
        ? "다음 단계: 콘텐츠 제작 시작"
        : "Next step: Start creating",

      actionLabel: isKo
        ? "콘텐츠 제작으로 이동"
        : "Move to Content Creation",

      status: "ACTIONABLE",

      icon: CheckCircle2,

      container:
        "border-emerald-400/30 bg-emerald-500/[0.08]",

      badge:
        "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",

      text:
        "text-emerald-400",

      glow:
        "shadow-[0_0_60px_rgba(16,185,129,0.08)]",
    };
  }

  if (decision === "AVOID") {
    return {
      label: isKo
        ? "지금은 피하라"
        : "AVOID",

      shortLabel: isKo
        ? "제작 비추천"
        : "LOW PRIORITY",

      description: isKo
        ? "현재 경쟁과 기회 구조를 고려하면 다른 키워드가 더 유리합니다."
        : "Current competition and opportunity suggest another keyword may be a better choice.",

      nextStep: isKo
        ? "다음 단계: 다른 기회 탐색"
        : "Next step: Find another opportunity",

      actionLabel: isKo
        ? "다른 기회 찾기"
        : "Find Another Opportunity",

      status: "LOW PRIORITY",

      icon: XCircle,

      container:
        "border-red-400/30 bg-red-500/[0.08]",

      badge:
        "border-red-400/30 bg-red-500/10 text-red-300",

      text:
        "text-red-400",

      glow:
        "shadow-[0_0_60px_rgba(239,68,68,0.08)]",
    };
  }

  return {
    label: isKo
      ? "조금 더 기다려라"
      : "WAIT",

    shortLabel: isKo
      ? "추가 검토"
      : "WATCH",

    description: isKo
      ? "가능성은 있지만 지금 바로 제작하기보다 추가 데이터 확인이 필요합니다."
      : "There is potential, but more validation is recommended before creating.",

    nextStep: isKo
      ? "다음 단계: 추가 데이터 검토"
      : "Next step: Validate further",

    actionLabel: isKo
      ? "추가 분석하기"
      : "Validate Further",

    status: "MONITOR",

    icon: Clock3,

    container:
      "border-yellow-400/30 bg-yellow-500/[0.08]",

    badge:
      "border-yellow-400/30 bg-yellow-500/10 text-yellow-300",

    text:
      "text-yellow-400",

    glow:
      "shadow-[0_0_60px_rgba(234,179,8,0.08)]",
  };
}

/* ============================================================
   SCORE BAR
   ============================================================ */

function ScoreBar({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  const safeValue =
    clampScore(value);

  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white/70">
            {label}
          </p>

          <p className="mt-0.5 text-[11px] text-white/30">
            {description}
          </p>
        </div>

        <span className="text-sm font-bold text-white">
          {safeValue}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white transition-all duration-700"
          style={{
            width: `${safeValue}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function DecisionEngine({
  keyword,
  decision,
  opportunityScore,
  benchmarkScore,
  difficulty,
  confidence,
  expectedViews,
  competition,
  language,
}: DecisionEngineProps) {
  const isKo =
    language === "ko";

  /* ==========================================================
     SAFE VALUES
     ========================================================== */

  const safeOpportunity =
    clampScore(
      opportunityScore
    );

  const safeBenchmark =
    clampScore(
      benchmarkScore
    );

  const safeDifficulty =
    clampScore(
      difficulty
    );

  const safeConfidence =
    clampScore(
      confidence
    );

  /* ==========================================================
     DECISION
     ========================================================== */

  const normalizedDecision =
    normalizeDecision(
      decision.decision ??
        decision.verdict
    );

  const config =
    getDecisionConfig(
      normalizedDecision,
      isKo
    );

  const Icon =
    config.icon;

  /* ==========================================================
     DECISION SCORE
     ========================================================== */

  const calculatedScore =
    Math.round(
      safeOpportunity * 0.5 +
        safeBenchmark * 0.3 +
        safeConfidence * 0.2
    );

  const score =
    clampScore(
      decision.score,
      calculatedScore
    );

  /* ==========================================================
     REASONING
     ========================================================== */

  const reason =
    typeof decision.reason ===
      "string" &&
    decision.reason.trim()
      ? decision.reason.trim()
      : isKo
      ? "현재 기회 점수, 콘텐츠 성과, 경쟁 난이도와 데이터 신뢰도를 종합해 판단했습니다."
      : "This decision combines opportunity, content performance, competition difficulty, and data confidence.";

  const recommendation =
    typeof decision.recommendation ===
      "string" &&
    decision.recommendation.trim()
      ? decision.recommendation.trim()
      : config.description;

  /* ==========================================================
     METRICS
     ========================================================== */

  const metrics = [
    {
      label: isKo
        ? "기회 점수"
        : "Opportunity",

      value: `${safeOpportunity}/100`,

      description: isKo
        ? "콘텐츠 기회"
        : "Content opportunity",

      icon: TrendingUp,
    },

    {
      label: isKo
        ? "벤치마크"
        : "Benchmark",

      value: `${safeBenchmark}/100`,

      description: isKo
        ? "경쟁 콘텐츠 성과"
        : "Content performance",

      icon: Target,
    },

    {
      label: isKo
        ? "경쟁 난이도"
        : "Difficulty",

      value: `${safeDifficulty}/100`,

      description: isKo
        ? "낮을수록 유리"
        : "Lower is easier",

      icon: ShieldAlert,
    },

    {
      label: isKo
        ? "신뢰도"
        : "Confidence",

      value: `${safeConfidence}%`,

      description: isKo
        ? "분석 신뢰 수준"
        : "Analysis confidence",

      icon: Lightbulb,
    },
  ];

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section className="mt-10">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="border-b border-white/10 px-6 py-6 md:px-8 md:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                  <Target className="h-5 w-5 text-cyan-300" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-white/35">
                    BENCHMARK AI
                  </p>

                  <p className="text-xs font-semibold tracking-[0.16em] text-cyan-400/80">
                    DECISION ENGINE
                  </p>
                </div>
              </div>

              <h2 className="mt-5 text-2xl font-black tracking-tight md:text-3xl">
                {isKo
                  ? "그래서 이 키워드, 만들어?"
                  : "So, should you make this?"}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
                {isKo
                  ? "분석된 데이터를 하나의 실행 가능한 콘텐츠 결정으로 압축합니다."
                  : "Turn the research into one clear, actionable content decision."}
              </p>

              <div className="mt-4 inline-flex max-w-full rounded-full border border-white/10 bg-black/20 px-4 py-2">
                <span className="truncate text-sm font-medium text-white/60">
                  {keyword ||
                    (isKo
                      ? "검색 키워드"
                      : "Search keyword")}
                </span>
              </div>
            </div>

            <div
              className={`w-fit rounded-full border px-4 py-2 text-xs font-bold tracking-wide ${config.badge}`}
            >
              {config.shortLabel}
            </div>
          </div>
        </div>

        {/* ====================================================
            MAIN DECISION
        ==================================================== */}

        <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div
            className={`rounded-3xl border p-6 md:p-8 ${config.container} ${config.glow}`}
          >
            <div className="flex flex-col gap-8">
              {/* Decision headline */}

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20 ${config.text}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                      FINAL DECISION
                    </p>

                    <h3
                      className={`mt-2 text-3xl font-black tracking-tight md:text-4xl ${config.text}`}
                    >
                      {config.label}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/60">
                      {config.description}
                    </p>
                  </div>
                </div>

                {/* Decision score */}

                <div className="shrink-0 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 sm:text-right">
                  <p className="text-[10px] font-semibold tracking-[0.15em] text-white/35">
                    DECISION SCORE
                  </p>

                  <p className="mt-1 text-3xl font-black">
                    {score}
                    <span className="ml-1 text-sm font-medium text-white/30">
                      /100
                    </span>
                  </p>
                </div>
              </div>

              {/* Score visualization */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-white/40">
                    {isKo
                      ? "종합 판단 강도"
                      : "Decision Strength"}
                  </span>

                  <span className="text-xs font-semibold text-white/60">
                    {score}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-black/20">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${config.text.replace(
                      "text-",
                      "bg-"
                    )}`}
                    style={{
                      width: `${score}%`,
                    }}
                  />
                </div>
              </div>

              {/* AI reasoning */}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-white/40" />

                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                      {isKo
                        ? "AI 판단"
                        : "AI Reasoning"}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-white/70">
                    {reason}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-white/40" />

                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                      {isKo
                        ? "추천 행동"
                        : "Recommendation"}
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-white/70">
                    {recommendation}
                  </p>
                </div>
              </div>

              {/* Next action */}

              <div
                className={`flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/20 p-5 sm:flex-row sm:items-center sm:justify-between`}
              >
                <div className="flex items-center gap-3">
                  <ArrowRight
                    className={`h-5 w-5 ${config.text}`}
                  />

                  <span className="text-sm font-semibold text-white/75">
                    {config.nextStep}
                  </span>
                </div>

                <span
                  className={`text-xs font-bold tracking-wider ${config.text}`}
                >
                  {config.actionLabel}
                </span>
              </div>
            </div>
          </div>

          {/* ==================================================
              METRICS
          ================================================== */}

          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric) => {
              const MetricIcon =
                metric.icon;

              return (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-white/20"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-white/40">
                      {metric.label}
                    </span>

                    <MetricIcon className="h-4 w-4 shrink-0 text-white/25" />
                  </div>

                  <p className="mt-4 text-2xl font-black tracking-tight">
                    {metric.value}
                  </p>

                  <p className="mt-1 text-[11px] text-white/30">
                    {metric.description}
                  </p>
                </div>
              );
            })}

            {/* Expected views */}

            <div className="col-span-2 rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white/40">
                    {isKo
                      ? "예상 조회수"
                      : "Expected Views"}
                  </p>

                  <p className="mt-3 break-words text-2xl font-black">
                    {expectedViews ||
                      "-"}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <TrendingUp className="h-5 w-5 text-white/30" />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/45">
                  {isKo
                    ? `경쟁: ${competition || "-"}`
                    : `Competition: ${competition || "-"}`}
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-white/45">
                  {isKo
                    ? `신뢰도: ${safeConfidence}%`
                    : `Confidence: ${safeConfidence}%`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            SCORE BREAKDOWN
        ==================================================== */}

        <div className="border-t border-white/10 px-6 py-7 md:px-8">
          <div className="mb-6">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/30">
              DECISION SIGNALS
            </p>

            <h3 className="mt-2 text-xl font-bold">
              {isKo
                ? "판단을 구성하는 핵심 신호"
                : "Signals behind the decision"}
            </h3>

            <p className="mt-1 text-sm text-white/40">
              {isKo
                ? "각 지표가 현재 콘텐츠 제작 판단에 어떻게 작용하는지 확인할 수 있습니다."
                : "See the key signals influencing the current content decision."}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ScoreBar
              label={
                isKo
                  ? "콘텐츠 기회"
                  : "Content Opportunity"
              }
              value={
                safeOpportunity
              }
              description={
                isKo
                  ? "수요와 기회 가능성"
                  : "Demand and opportunity potential"
              }
            />

            <ScoreBar
              label={
                isKo
                  ? "벤치마크 성과"
                  : "Benchmark Performance"
              }
              value={
                safeBenchmark
              }
              description={
                isKo
                  ? "현재 경쟁 콘텐츠 성과"
                  : "Current competing content performance"
              }
            />

            <ScoreBar
              label={
                isKo
                  ? "경쟁 난이도"
                  : "Competition Difficulty"
              }
              value={
                safeDifficulty
              }
              description={
                isKo
                  ? "높을수록 경쟁이 강함"
                  : "Higher means stronger competition"
              }
            />

            <ScoreBar
              label={
                isKo
                  ? "분석 신뢰도"
                  : "Analysis Confidence"
              }
              value={
                safeConfidence
              }
              description={
                isKo
                  ? "현재 데이터의 신뢰 수준"
                  : "Confidence in the available data"
              }
            />
          </div>
        </div>

        {/* ====================================================
            FOOTER SIGNAL
        ==================================================== */}

        <div className="border-t border-white/10 bg-black/10 px-6 py-5 md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs leading-5 text-white/35">
                {isKo
                  ? "Decision Engine은 기회, 벤치마크, 경쟁 난이도, 데이터 신뢰도를 종합하여 콘텐츠 제작 우선순위를 판단합니다."
                  : "Decision Engine combines opportunity, benchmark performance, competition difficulty, and confidence to determine content priority."}
              </p>
            </div>

            <div
              className={`w-fit rounded-full border px-4 py-2 text-[11px] font-bold tracking-[0.14em] ${config.badge}`}
            >
              {config.status}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}