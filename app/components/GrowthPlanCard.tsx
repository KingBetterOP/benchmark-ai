"use client";

import { useEffect, useState } from "react";

type GrowthAction = {
  id: string;
  category:
    | "title"
    | "thumbnail"
    | "hook"
    | "seo"
    | "content";
  priority: "HIGH" | "MEDIUM" | "LOW";
  impact: number;
  title: string;
  problem: string;
  recommendation: string;
  action: string;
};

type GrowthPlan = {
  overallScore: number;
  growthPotential: "HIGH" | "MEDIUM" | "LOW";
  summary: string;
  actions: GrowthAction[];
};

type GrowthPlanCardProps = {
  keyword: string;
  benchmarkScore: number;
  opportunityScore: number;
  thumbnailScore: number;
  titleScore: number;
  seoScore?: number;
  contentGap: number;
  expectedViews: string | number;
  language: string;
};

export default function GrowthPlanCard({
  keyword,
  benchmarkScore,
  opportunityScore,
  thumbnailScore,
  titleScore,
  seoScore = 50,
  contentGap,
  expectedViews,
  language,
}: GrowthPlanCardProps) {
  const [plan, setPlan] =
    useState<GrowthPlan | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [applyingAll, setApplyingAll] =
    useState(false);

  const [applied, setApplied] =
    useState(false);

  /*
   * Generate Growth Plan
   */
  useEffect(() => {
    let cancelled = false;

    const generateGrowthPlan = async () => {
      if (!keyword.trim()) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setPlan(null);
      setApplied(false);

      try {
        const response = await fetch(
          "/api/ai/growth-plan",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              keyword,
              benchmarkScore,
              opportunityScore,
              thumbnailScore,
              titleScore,
              seoScore,
              contentGap,
              expectedViews,
            }),
          }
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.error ||
              "Growth Plan을 생성하지 못했습니다."
          );
        }

        if (!cancelled) {
          setPlan(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Growth Plan 생성 중 오류가 발생했습니다."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    generateGrowthPlan();

    return () => {
      cancelled = true;
    };
  }, [
    keyword,
    benchmarkScore,
    opportunityScore,
    thumbnailScore,
    titleScore,
    seoScore,
    contentGap,
    expectedViews,
  ]);

  /*
   * Apply one action
   */
  const applyAction = async (
    action: GrowthAction
  ) => {
    const body = {
      keyword,
      language,
      instruction: action.action,
    };

    let endpoint = "";

    switch (action.category) {
      case "title":
        endpoint = "/api/ai/title";
        break;

      case "thumbnail":
        endpoint = "/api/ai/thumbnail";
        break;

      case "hook":
        endpoint = "/api/ai/script";
        break;

      case "seo":
        endpoint =
          "/api/ai/description";
        break;

      case "content":
        endpoint =
          "/api/ai/creator-kit";
        break;

      default:
        return;
    }

    const response = await fetch(
      endpoint,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(
        `${action.category} action failed`
      );
    }

    /*
     * SEO also generates hashtags.
     */
    if (
      action.category === "seo"
    ) {
      try {
        await fetch(
          "/api/ai/hashtags",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              keyword,
              instruction:
                action.action,
            }),
          }
        );
      } catch (error) {
        console.error(
          "Hashtag generation failed:",
          error
        );
      }
    }
  };

  /*
   * Apply all improvements
   */
  const applyAllActions = async () => {
    if (
      !plan?.actions?.length ||
      applyingAll ||
      applied
    ) {
      return;
    }

    setApplyingAll(true);
    setApplied(false);

    try {
      for (const action of plan.actions) {
        try {
          await applyAction(action);
        } catch (error) {
          /*
           * One failed action should not
           * stop the remaining actions.
           */
          console.error(
            `Failed to apply action: ${action.id}`,
            error
          );
        }
      }

      setApplied(true);
    } finally {
      setApplyingAll(false);
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-4">
          <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400" />

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
              AI GROWTH PLAN
            </p>

            <p className="mt-2 text-sm text-white/50">
              {language === "ko"
                ? "성장 전략을 계산하는 중..."
                : "Calculating your growth strategy..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  /*
   * Error
   */
  if (error) {
    return (
      <section className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-red-400">
          GROWTH PLAN ERROR
        </p>

        <p className="mt-2 text-sm text-white/60">
          {error}
        </p>
      </section>
    );
  }

  /*
   * No plan
   */
  if (!plan) {
    return null;
  }

  const getPotentialLabel =
    () => {
      if (language === "ko") {
        switch (
          plan.growthPotential
        ) {
          case "HIGH":
            return "높은 성장 가능성";

          case "MEDIUM":
            return "중간 성장 가능성";

          case "LOW":
            return "낮은 성장 가능성";
        }
      }

      return `${plan.growthPotential} GROWTH POTENTIAL`;
    };

  const getCategoryLabel = (
    category: GrowthAction["category"]
  ) => {
    switch (category) {
      case "title":
        return "TITLE";

      case "thumbnail":
        return "THUMBNAIL";

      case "hook":
        return "HOOK";

      case "seo":
        return "SEO";

      case "content":
        return "CONTENT";

      default:
        return "ACTION";
    }
  };

  const getPriorityLabel = (
    priority: GrowthAction["priority"]
  ) => {
    if (language === "ko") {
      switch (priority) {
        case "HIGH":
          return "높음";

        case "MEDIUM":
          return "중간";

        case "LOW":
          return "낮음";
      }
    }

    return priority;
  };

  return (
    <section className="mt-8 space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
              AI GROWTH PLAN
            </p>

            <h2 className="mt-2 text-2xl font-black">
              {language === "ko"
                ? "성장 실행 계획"
                : "Growth Execution Plan"}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              {plan.summary}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-5">
            <div className="text-center">
              <div className="text-4xl font-black text-emerald-400">
                {plan.overallScore}
              </div>

              <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/30">
                Growth Score
              </div>
            </div>

            <div className="h-12 w-px bg-white/10" />

            <div>
              <div className="text-sm font-black">
                {getPotentialLabel()}
              </div>

              <div className="mt-1 text-xs text-white/40">
                {keyword}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ready To Execute */}
      <div className="flex flex-col gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            READY TO EXECUTE
          </p>

          <p className="mt-1 font-bold">
            {language === "ko"
              ? "AI 추천을 실제 제작 단계로 넘기세요."
              : "Turn your AI recommendations into action."}
          </p>

          <p className="mt-1 text-sm text-white/40">
            {plan.actions.length}{" "}
            {language === "ko"
              ? "개의 개선 작업이 준비되었습니다."
              : "improvements are ready."}
          </p>
        </div>

        <button
          type="button"
          onClick={
            applyAllActions
          }
          disabled={
            applyingAll ||
            applied
          }
          className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-black text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {applyingAll
            ? language === "ko"
              ? "적용 중..."
              : "Applying..."
            : applied
              ? language === "ko"
                ? "✓ 적용 완료"
                : "✓ Applied"
              : "🚀 Apply All Improvements"}
        </button>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        {plan.actions.map(
          (action, index) => (
            <div
              key={action.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20"
            >
              <div className="flex flex-col gap-5">
                {/* Action Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sm font-black text-white/60">
                      {index + 1}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-white/50">
                          {getCategoryLabel(
                            action.category
                          )}
                        </span>

                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-wider ${
                            action.priority ===
                            "HIGH"
                              ? "bg-red-500/10 text-red-400"
                              : action.priority ===
                                  "MEDIUM"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-white/5 text-white/40"
                          }`}
                        >
                          {getPriorityLabel(
                            action.priority
                          )}
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-black">
                        {action.title}
                      </h3>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-lg font-black text-emerald-400">
                      +{action.impact}
                    </div>

                    <div className="text-[10px] uppercase tracking-wider text-white/30">
                      Impact
                    </div>
                  </div>
                </div>

                {/* Problem */}
                <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-red-400/80">
                    {language === "ko"
                      ? "문제"
                      : "Problem"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {action.problem}
                  </p>
                </div>

                {/* Recommendation */}
                <div className="rounded-xl border border-white/5 bg-black/20 p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-400/80">
                    {language === "ko"
                      ? "추천"
                      : "Recommendation"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {action.recommendation}
                  </p>
                </div>

                {/* Action */}
                <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                    {language === "ko"
                      ? "실행"
                      : "Action"}
                  </p>

                  <p className="mt-2 text-sm font-medium leading-6 text-white/80">
                    {action.action}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Bottom Status */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
        <p className="text-sm font-bold">
          {applied
            ? language === "ko"
              ? "🚀 모든 개선 작업이 제작 단계로 전달되었습니다."
              : "🚀 All improvements have been sent to the creation pipeline."
            : language === "ko"
              ? "가장 영향력이 높은 작업부터 실행하는 것이 좋습니다."
              : "Start with the highest-impact improvements first."}
        </p>

        {!applied && (
          <p className="mt-1 text-xs text-white/30">
            {language === "ko"
              ? "Apply All Improvements를 누르면 AI 제작 도구가 순차적으로 실행됩니다."
              : "Apply All Improvements will run the AI creation tools sequentially."}
          </p>
        )}
      </div>
    </section>
  );
}