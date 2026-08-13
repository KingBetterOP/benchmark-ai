"use client";

type OpportunityScore = {
  total: number;
  confidence: number;
  verdict: "MAKE" | "WAIT" | "AVOID" | string;

  demand: number;
  competition: number;
  trend: number;
  ctr: number;
  thumbnail: number;
  title: number;
  freshness: number;
  gap: number;

  trendEngine?: {
    recentUploads?: number;
    averageAge?: number;
  };

  gapEngine?: {
    opportunity?: string | number;
  };
};

type KeywordIntelligence = {
  opportunity: number;
  difficulty: number;
  confidence: number;
};

type ResearchSnapshotProps = {
  keyword: string;
  averageViews: number;
  benchmarkScore: number;
  keywordIntelligence: KeywordIntelligence;
  opportunityScore: OpportunityScore;
  seoOptimizer?: unknown | null;
  language: string;
};

/* ============================================================
   HELPERS
   ============================================================ */

function clampScore(
  value: unknown,
  max = 100
): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return 0;
  }

  return Math.min(
    max,
    Math.max(0, Math.round(value))
  );
}

function formatNumber(value: number) {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return "0";
  }

  return value.toLocaleString();
}

function getVerdictConfig(
  verdict: string,
  isKo: boolean
) {
  switch (verdict) {
    case "MAKE":
      return {
        title: isKo
          ? "지금 만들 가치가 높은 키워드"
          : "Strong opportunity to create now",

        label: isKo
          ? "MAKE THIS VIDEO"
          : "MAKE THIS VIDEO",

        description: isKo
          ? "현재 분석 신호를 종합하면 이 키워드는 콘텐츠 제작을 적극적으로 고려할 가치가 있습니다."
          : "The current signals suggest this keyword is worth actively considering for your next video.",

        className:
          "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",

        glow:
          "shadow-[0_0_60px_rgba(52,211,153,0.10)]",
      };

    case "WAIT":
      return {
        title: isKo
          ? "조금 더 지켜볼 키워드"
          : "A keyword worth watching",

        label: isKo
          ? "WATCH THIS KEYWORD"
          : "WATCH THIS KEYWORD",

        description: isKo
          ? "기회가 완전히 없는 것은 아니지만 현재 시점에서는 추가 신호를 확인하는 것이 좋습니다."
          : "There is potential, but the current signals suggest watching for stronger confirmation before committing.",

        className:
          "border-amber-400/30 bg-amber-400/10 text-amber-300",

        glow:
          "shadow-[0_0_60px_rgba(251,191,36,0.08)]",
      };

    case "AVOID":
      return {
        title: isKo
          ? "현재는 피하는 것이 좋은 키워드"
          : "Weak opportunity right now",

        label: isKo
          ? "AVOID FOR NOW"
          : "AVOID FOR NOW",

        description: isKo
          ? "현재 분석 신호에서는 다른 콘텐츠 기회를 우선하는 것이 더 합리적입니다."
          : "The current signals suggest prioritizing other content opportunities instead.",

        className:
          "border-red-400/30 bg-red-400/10 text-red-300",

        glow:
          "shadow-[0_0_60px_rgba(248,113,113,0.08)]",
      };

    default:
      return {
        title: isKo
          ? "분석이 완료되었습니다"
          : "Analysis complete",

        label: isKo
          ? "ANALYSIS COMPLETE"
          : "ANALYSIS COMPLETE",

        description: isKo
          ? "현재 키워드의 콘텐츠 기회를 확인하세요."
          : "Review the current content opportunity for this keyword.",

        className:
          "border-white/10 bg-white/[0.05] text-white",

        glow: "",
      };
  }
}

function getScoreLabel(
  score: number,
  isKo: boolean
) {
  if (score >= 80) {
    return isKo
      ? "매우 강함"
      : "Very Strong";
  }

  if (score >= 65) {
    return isKo
      ? "강함"
      : "Strong";
  }

  if (score >= 50) {
    return isKo
      ? "보통"
      : "Moderate";
  }

  if (score >= 30) {
    return isKo
      ? "약함"
      : "Weak";
  }

  return isKo
    ? "매우 약함"
    : "Very Weak";
}

function ScoreBar({
  label,
  value,
  max,
  description,
  isKo,
}: {
  label: string;
  value: number;
  max: number;
  description?: string;
  isKo: boolean;
}) {
  const safeValue = clampScore(
    value,
    max
  );

  const percentage =
    max > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (safeValue / max) * 100
          )
        )
      : 0;

  const normalizedScore =
    max > 0
      ? Math.round(
          (safeValue / max) * 100
        )
      : 0;

  return (
    <div className="group">
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white">
            {label}
          </p>

          {description && (
            <p className="mt-0.5 text-xs text-white/35">
              {description}
            </p>
          )}
        </div>

        <div className="text-right">
          <p className="text-sm font-bold text-white">
            {safeValue}/{max}
          </p>

          <p className="text-[10px] text-white/30">
            {getScoreLabel(
              normalizedScore,
              isKo
            )}
          </p>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function ResearchSnapshot({
  keyword,
  averageViews,
  benchmarkScore,
  keywordIntelligence,
  opportunityScore,
  language,
}: ResearchSnapshotProps) {
  const isKo = language === "ko";

  const verdict =
    getVerdictConfig(
      opportunityScore.verdict,
      isKo
    );

  const opportunity = clampScore(
    opportunityScore.total
  );

  const difficulty = clampScore(
    keywordIntelligence.difficulty
  );

  const benchmark = clampScore(
    benchmarkScore
  );

  const confidence = clampScore(
    opportunityScore.confidence ??
      keywordIntelligence.confidence
  );

  const recentUploads =
    opportunityScore.trendEngine
      ?.recentUploads;

  const averageAge =
    opportunityScore.trendEngine
      ?.averageAge;

  const gapOpportunity =
    opportunityScore.gapEngine
      ?.opportunity;

  return (
    <section className="mt-10">
      <div
        className={`overflow-hidden rounded-[32px] border border-white/10 bg-[#0D0F14] shadow-2xl ${verdict.glow}`}
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="border-b border-white/10 p-6 md:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold tracking-[0.25em] text-cyan-400">
                  BENCHMARK AI
                </span>

                <span className="h-1 w-1 rounded-full bg-white/20" />

                <span className="text-[11px] tracking-[0.2em] text-white/30">
                  {isKo
                    ? "RESEARCH SNAPSHOT"
                    : "RESEARCH SNAPSHOT"}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-black tracking-tight text-white md:text-3xl">
                {isKo
                  ? "이 키워드, 지금 만들어도 될까요?"
                  : "Is this keyword worth creating now?"}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45 md:text-base">
                {isKo
                  ? "YouTube 경쟁 상황과 수요, 트렌드 및 콘텐츠 신호를 종합해 제작 기회를 빠르게 판단합니다."
                  : "Benchmark AI combines competition, demand, trend, and content signals to help you make a faster publishing decision."}
              </p>
            </div>

            {/* VERDICT */}

            <div
              className={`w-full rounded-2xl border p-5 xl:w-[360px] ${verdict.className}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] opacity-60">
                    {isKo
                      ? "RECOMMENDATION"
                      : "RECOMMENDATION"}
                  </p>

                  <p className="mt-2 text-lg font-black">
                    {verdict.title}
                  </p>
                </div>

                <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black tracking-wider">
                  {verdict.label}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 opacity-70">
                {verdict.description}
              </p>
            </div>
          </div>

          {/* KEYWORD */}

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              Keyword
            </p>

            <p className="mt-2 break-words text-xl font-bold text-white md:text-2xl">
              {keyword || "—"}
            </p>
          </div>
        </div>

        {/* ==================================================
            PRIMARY METRICS
        ================================================== */}

        <div className="grid gap-px border-b border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Opportunity */}

          <div className="bg-[#101116] p-6 md:p-7">
            <p className="text-xs font-medium text-white/40">
              {isKo
                ? "콘텐츠 기회"
                : "Content Opportunity"}
            </p>

            <div className="mt-2 flex items-end gap-1">
              <span className="text-5xl font-black tracking-tight text-white">
                {opportunity}
              </span>

              <span className="mb-1 text-sm text-white/30">
                /100
              </span>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{
                  width: `${opportunity}%`,
                }}
              />
            </div>

            <p className="mt-3 text-xs text-white/35">
              {isKo
                ? "종합 콘텐츠 기회 점수"
                : "Overall content opportunity"}
            </p>
          </div>

          {/* Benchmark */}

          <div className="bg-[#101116] p-6 md:p-7">
            <p className="text-xs font-medium text-white/40">
              {isKo
                ? "벤치마크 점수"
                : "Benchmark Score"}
            </p>

            <div className="mt-2 flex items-end gap-1">
              <span className="text-5xl font-black tracking-tight text-white">
                {benchmark}
              </span>

              <span className="mb-1 text-sm text-white/30">
                /100
              </span>
            </div>

            <p className="mt-4 text-xs text-white/35">
              {isKo
                ? "분석된 콘텐츠의 성과 신호"
                : "Performance signal from analyzed content"}
            </p>
          </div>

          {/* Difficulty */}

          <div className="bg-[#101116] p-6 md:p-7">
            <p className="text-xs font-medium text-white/40">
              {isKo
                ? "키워드 난이도"
                : "Keyword Difficulty"}
            </p>

            <div className="mt-2 flex items-end gap-1">
              <span className="text-5xl font-black tracking-tight text-white">
                {difficulty}
              </span>

              <span className="mb-1 text-sm text-white/30">
                /100
              </span>
            </div>

            <p className="mt-4 text-xs text-white/35">
              {isKo
                ? "낮을수록 경쟁 진입이 쉬움"
                : "Lower generally means easier entry"}
            </p>
          </div>

          {/* Average Views */}

          <div className="bg-[#101116] p-6 md:p-7">
            <p className="text-xs font-medium text-white/40">
              {isKo
                ? "평균 조회수"
                : "Average Views"}
            </p>

            <div className="mt-2 text-4xl font-black tracking-tight text-white md:text-5xl">
              {formatNumber(
                averageViews
              )}
            </div>

            <p className="mt-4 text-xs text-white/35">
              {isKo
                ? "분석된 영상 기준"
                : "Across analyzed videos"}
            </p>
          </div>
        </div>

        {/* ==================================================
            OPPORTUNITY BREAKDOWN
        ================================================== */}

        <div className="grid gap-10 border-b border-white/10 p-6 md:p-8 lg:grid-cols-2">
          {/* LEFT */}

          <div>
            <div className="mb-7">
              <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400/70">
                OPPORTUNITY ENGINE
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                {isKo
                  ? "왜 이 점수가 나왔을까요?"
                  : "Why this opportunity score?"}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/35">
                {isKo
                  ? "콘텐츠 제작 가능성을 구성하는 핵심 신호입니다."
                  : "These are the core signals contributing to the content opportunity."}
              </p>
            </div>

            <div className="space-y-6">
              <ScoreBar
                label={
                  isKo
                    ? "수요"
                    : "Demand"
                }
                value={
                  opportunityScore.demand
                }
                max={20}
                description={
                  isKo
                    ? "시청자가 관심을 보일 가능성"
                    : "Potential audience demand"
                }
                isKo={isKo}
              />

              <ScoreBar
                label={
                  isKo
                    ? "경쟁"
                    : "Competition"
                }
                value={
                  opportunityScore.competition
                }
                max={20}
                description={
                  isKo
                    ? "현재 경쟁 콘텐츠의 강도"
                    : "Strength of competing content"
                }
                isKo={isKo}
              />

              <ScoreBar
                label={
                  isKo
                    ? "트렌드"
                    : "Trend"
                }
                value={
                  opportunityScore.trend
                }
                max={15}
                description={
                  isKo
                    ? "최근 관심과 상승 신호"
                    : "Recent momentum and interest"
                }
                isKo={isKo}
              />

              <ScoreBar
                label="CTR"
                value={
                  opportunityScore.ctr
                }
                max={10}
                description={
                  isKo
                    ? "클릭을 유도할 수 있는 가능성"
                    : "Potential to attract clicks"
                }
                isKo={isKo}
              />
            </div>
          </div>

          {/* RIGHT */}

          <div>
            <div className="mb-7">
              <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400/70">
                CONTENT SIGNALS
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                {isKo
                  ? "콘텐츠 경쟁력 신호"
                  : "Content competitiveness"}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/35">
                {isKo
                  ? "실제 영상 제작 관점에서 추가로 확인하는 신호입니다."
                  : "Additional signals that matter when turning the opportunity into an actual video."}
              </p>
            </div>

            <div className="space-y-6">
              <ScoreBar
                label={
                  isKo
                    ? "썸네일"
                    : "Thumbnail"
                }
                value={
                  opportunityScore.thumbnail
                }
                max={10}
                description={
                  isKo
                    ? "시각적 클릭 경쟁력"
                    : "Visual click potential"
                }
                isKo={isKo}
              />

              <ScoreBar
                label={
                  isKo
                    ? "제목"
                    : "Title"
                }
                value={
                  opportunityScore.title
                }
                max={10}
                description={
                  isKo
                    ? "제목의 클릭 유도력"
                    : "Title click potential"
                }
                isKo={isKo}
              />

              <ScoreBar
                label={
                  isKo
                    ? "신선도"
                    : "Freshness"
                }
                value={
                  opportunityScore.freshness
                }
                max={10}
                description={
                  isKo
                    ? "최근 콘텐츠 환경의 신선도"
                    : "Freshness of the content landscape"
                }
                isKo={isKo}
              />

              <ScoreBar
                label={
                  isKo
                    ? "콘텐츠 공백"
                    : "Content Gap"
                }
                value={
                  opportunityScore.gap
                }
                max={5}
                description={
                  isKo
                    ? "충분히 제공되지 않은 콘텐츠 기회"
                    : "Potential underserved content space"
                }
                isKo={isKo}
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            MARKET INTELLIGENCE
        ================================================== */}

        <div className="p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400/70">
                MARKET INTELLIGENCE
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                {isKo
                  ? "시장 상태"
                  : "Market signals"}
              </h3>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/40">
              {isKo
                ? `${confidence}% 분석 신뢰도`
                : `${confidence}% analysis confidence`}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Recent Uploads */}

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-cyan-400/20">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-white/40">
                  {isKo
                    ? "최근 업로드"
                    : "Recent Uploads"}
                </p>

                <span className="text-xs text-cyan-400">
                  ↗
                </span>
              </div>

              <p className="mt-3 text-3xl font-black text-white">
                {recentUploads ??
                  "—"}
              </p>

              <p className="mt-2 text-xs leading-5 text-white/30">
                {isKo
                  ? "최근 콘텐츠 활동량"
                  : "Recent content activity"}
              </p>
            </div>

            {/* Average Age */}

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-cyan-400/20">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-white/40">
                  {isKo
                    ? "평균 영상 연령"
                    : "Average Video Age"}
                </p>

                <span className="text-xs text-cyan-400">
                  ◷
                </span>
              </div>

              <div className="mt-3 flex items-end gap-1">
                <p className="text-3xl font-black text-white">
                  {averageAge ??
                    "—"}
                </p>

                {averageAge !==
                  undefined && (
                  <span className="mb-1 text-xs text-white/30">
                    {isKo
                      ? "일"
                      : "days"}
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs leading-5 text-white/30">
                {isKo
                  ? "경쟁 콘텐츠의 평균 신선도"
                  : "Average freshness of competing content"}
              </p>
            </div>

            {/* Gap */}

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 transition-colors hover:border-cyan-400/20">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-white/40">
                  {isKo
                    ? "콘텐츠 공백"
                    : "Gap Opportunity"}
                </p>

                <span className="text-xs text-cyan-400">
                  ◈
                </span>
              </div>

              <p className="mt-3 break-words text-2xl font-black text-white">
                {gapOpportunity ??
                  "—"}
              </p>

              <p className="mt-2 text-xs leading-5 text-white/30">
                {isKo
                  ? "충족되지 않은 콘텐츠 수요"
                  : "Potential underserved demand"}
              </p>
            </div>
          </div>

          {/* ==================================================
              DECISION SUMMARY
          ================================================== */}

          <div
            className={`mt-6 rounded-2xl border p-5 ${verdict.className}`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] opacity-60">
                  {isKo
                    ? "QUICK DECISION"
                    : "QUICK DECISION"}
                </p>

                <p className="mt-2 text-lg font-bold">
                  {verdict.title}
                </p>

                <p className="mt-1 text-sm opacity-60">
                  {isKo
                    ? `기회 점수 ${opportunity}/100 · 신뢰도 ${confidence}%`
                    : `Opportunity ${opportunity}/100 · Confidence ${confidence}%`}
                </p>
              </div>

              <div className="shrink-0 rounded-xl border border-current/20 px-5 py-3 text-center">
                <p className="text-[10px] font-bold tracking-[0.15em] opacity-50">
                  {isKo
                    ? "DECISION"
                    : "DECISION"}
                </p>

                <p className="mt-1 text-xl font-black">
                  {opportunityScore.verdict ||
                    "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}