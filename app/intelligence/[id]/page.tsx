"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getProject,
  SavedProject,
} from "@/app/lib/projectStorage";

export default function IntelligencePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [project, setProject] =
    useState<SavedProject | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getProject(id);

        setProject(data);
      } catch (error) {
        console.error(
          "Failed to load intelligence project:",
          error
        );

        setError(
          "프로젝트 데이터를 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProject();
    }
  }, [id]);

  const decision = useMemo(() => {
    if (!project) {
      return {
        label: "WAIT",
        description:
          "프로젝트 데이터를 분석하고 있습니다.",
      };
    }

    const opportunity =
      project.opportunityScoreV2?.total ??
      project.opportunityScore ??
      0;

    const benchmark =
      project.benchmarkScore ?? 0;

    if (
      opportunity >= 75 &&
      benchmark >= 70
    ) {
      return {
        label: "MAKE THIS VIDEO",
        description:
          "기회 점수와 Benchmark 성과가 모두 강합니다. 지금 제작을 시작할 가치가 높은 주제입니다.",
      };
    }

    if (
      opportunity >= 55 ||
      benchmark >= 55
    ) {
      return {
        label: "OPTIMIZE",
        description:
          "가능성은 있지만 제목, 썸네일 또는 콘텐츠 전략을 개선한 뒤 제작하는 것이 좋습니다.",
      };
    }

    return {
      label: "WAIT",
      description:
        "현재 데이터에서는 경쟁 대비 기회가 충분히 강하지 않습니다. 다른 각도나 주제를 검토하는 것이 좋습니다.",
    };
  }, [project]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Benchmark AI
            </div>

            <p className="mt-4 text-zinc-400">
              Intelligence 데이터를 불러오는 중...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
          <div className="w-full rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
              Intelligence Error
            </p>

            <h1 className="mt-4 text-3xl font-bold">
              Project Not Found
            </h1>

            <p className="mt-3 text-zinc-400">
              {error ||
                "프로젝트를 찾을 수 없습니다."}
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/projects")
              }
              className="mt-7 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
            >
              Projects로 돌아가기
            </button>
          </div>
        </div>
      </main>
    );
  }

  const opportunity =
    project.opportunityScoreV2?.total ??
    project.opportunityScore ??
    0;

  const confidence =
    project.opportunityScoreV2?.confidence ??
    project.keywordIntelligence?.confidence ??
    0;

  const difficulty =
    project.keywordIntelligence?.difficulty ??
    0;

  const benchmark =
    project.benchmarkScore ?? 0;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-10">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
                Benchmark AI
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Intelligence
              </h1>

              <p className="mt-3 max-w-2xl text-zinc-400">
                {project.keyword}
                {" "}시장의 데이터와 AI 분석을 하나의
                의사결정 화면으로 통합했습니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/projects/${project.id}`
                  )
                }
                className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold transition hover:bg-white/[0.08]"
              >
                Project
              </button>
<button
  type="button"
  onClick={() =>
    router.push(
      `/intelligence/${project.id}`
    )
  }
  className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
>
  Intelligence
</button>
              {project.latestReportId && (
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/report/${project.latestReportId}`
                    )
                  }
                  className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
                >
                  Report
                </button>
              )}

            </div>

          </div>
        </header>

        {/* =====================================================
            OVERVIEW
        ===================================================== */}

        <section className="mb-6">

          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              01 / Overview
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Market Intelligence Overview
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <ScoreCard
              label="Opportunity"
              value={opportunity}
              suffix="/100"
            />

            <ScoreCard
              label="Benchmark"
              value={benchmark}
              suffix="/100"
            />

            <ScoreCard
              label="Difficulty"
              value={difficulty}
              suffix="/100"
            />

            <ScoreCard
              label="Confidence"
              value={confidence}
              suffix="%"
            />

          </div>
        </section>

        {/* =====================================================
            DECISION
        ===================================================== */}

        <section className="mb-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-white/[0.03] to-cyan-500/10 p-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                02 / AI Decision
              </p>

              <h2 className="mt-3 text-3xl font-black md:text-4xl">
                {decision.label}
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-zinc-300">
                {decision.description}
              </p>
            </div>

            <div className="min-w-[220px] rounded-2xl border border-white/10 bg-black/30 p-6 text-center">

              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Opportunity
              </p>

              <p className="mt-2 text-5xl font-black">
                {opportunity}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                / 100
              </p>

            </div>

          </div>
        </section>

        {/* =====================================================
            KEYWORD INTELLIGENCE
        ===================================================== */}

        {project.keywordIntelligence && (
          <section className="mb-6">

            <SectionHeader
              number="03"
              title="Keyword Intelligence"
              description="검색 수요와 시장 기회를 분석합니다."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              <InfoCard
                label="Trend"
                value={
                  project.keywordIntelligence
                    .trend
                }
              />

              <InfoCard
                label="Demand"
                value={
                  project.keywordIntelligence
                    .demand
                }
              />

              <InfoCard
                label="Expected Views"
                value={
                  project.keywordIntelligence
                    .expectedViews
                }
              />

              <InfoCard
                label="Expected CTR"
                value={
                  project.keywordIntelligence
                    .expectedCTR
                }
              />

              <InfoCard
                label="Audience"
                value={
                  project.keywordIntelligence
                    .audience
                }
              />

              <InfoCard
                label="Upload Time"
                value={
                  project.keywordIntelligence
                    .uploadTime
                }
              />

              <InfoCard
                label="Estimated RPM"
                value={
                  project.keywordIntelligence
                    .estimatedRPM
                }
              />

              <InfoCard
                label="Estimated Revenue"
                value={
                  project.keywordIntelligence
                    .estimatedRevenue
                }
              />

            </div>

            <TextPanel
              title="AI Recommendation"
              text={
                project.keywordIntelligence
                  .recommendation
              }
            />

          </section>
        )}

        {/* =====================================================
            VIRAL PREDICTION
        ===================================================== */}

        {project.viralPrediction && (
          <section className="mb-6">

            <SectionHeader
              number="04"
              title="Viral Intelligence"
              description="콘텐츠가 높은 성과를 낼 가능성을 분석합니다."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              <ScoreCard
                label="Success Probability"
                value={
                  project.viralPrediction
                    .successProbability
                }
                suffix="%"
              />

              <InfoCard
                label="Expected Views"
                value={
                  String(
                    project.viralPrediction
                      .expectedViews
                  )
                }
              />

              <InfoCard
                label="Expected CTR"
                value={
                  String(
                    project.viralPrediction
                      .expectedCTR
                  )
                }
              />

              <InfoCard
                label="Competition"
                value={
                  project.viralPrediction
                    .competition
                }
              />

            </div>

            <TextPanel
              title="Viral Recommendation"
              text={
                project.viralPrediction
                  .recommendation
              }
            />

          </section>
        )}

        {/* =====================================================
            CONTENT GAP
        ===================================================== */}

        {project.contentGap &&
          project.contentGap.length > 0 && (
            <section className="mb-6">

              <SectionHeader
                number="05"
                title="Content Gap Intelligence"
                description="경쟁자가 충분히 공략하지 않은 콘텐츠 기회를 찾습니다."
              />

              <div className="grid gap-4 lg:grid-cols-2">

                {project.contentGap.map(
                  (gap, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.05] p-6"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <h3 className="text-xl font-bold">
                          {gap.keyword}
                        </h3>

                        <span className="rounded-full bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-300">
                          #{index + 1}
                        </span>

                      </div>

                      <p className="mt-3 leading-6 text-zinc-400">
                        {gap.reason}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">

                        <Badge
                          label="Competition"
                          value={String(
                            gap.competition
                          )}
                        />

                        <Badge
                          label="Views"
                          value={String(
                            gap.estimatedViews
                          )}
                        />

                        <Badge
                          label="Opportunity"
                          value={String(
                            gap.opportunityScore
                          )}
                        />

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>
          )}

        {/* =====================================================
            MISSED OPPORTUNITIES
        ===================================================== */}

        {project.missedOpportunities &&
          project.missedOpportunities.length > 0 && (
            <section className="mb-6">

              <SectionHeader
                number="06"
                title="Missed Opportunities"
                description="현재 경쟁 콘텐츠가 놓치고 있는 기회를 확인합니다."
              />

              <div className="space-y-4">

                {project.missedOpportunities.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                    >

                      <div className="flex gap-4">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-400/10 text-sm font-bold text-orange-300">
                          {index + 1}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold">
                            {item.title}
                          </h3>

                          <p className="mt-2 leading-6 text-zinc-400">
                            {item.reason}
                          </p>
                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>
          )}

        {/* =====================================================
            TITLE + THUMBNAIL
        ===================================================== */}

        {(project.titleAnalysis ||
          project.thumbnailAnalysis) && (
          <section className="mb-6">

            <SectionHeader
              number="07"
              title="CTR Intelligence"
              description="제목과 썸네일이 클릭을 만드는 구조인지 분석합니다."
            />

            <div className="grid gap-6 lg:grid-cols-2">

              {project.titleAnalysis && (
                <AnalysisPanel
                  title="Title Intelligence"
                  score={
                    project.titleAnalysis
                      .overallScore
                  }
                  items={[
                    [
                      "CTR",
                      project.titleAnalysis
                        .ctrScore,
                    ],
                    [
                      "SEO",
                      project.titleAnalysis
                        .seoScore,
                    ],
                    [
                      "Emotion",
                      project.titleAnalysis
                        .emotionScore,
                    ],
                    [
                      "Curiosity",
                      project.titleAnalysis
                        .curiosityScore,
                    ],
                    [
                      "Length",
                      project.titleAnalysis
                        .lengthScore,
                    ],
                  ]}
                />
              )}

              {project.thumbnailAnalysis && (
                <AnalysisPanel
                  title="Thumbnail Intelligence"
                  score={
                    project.thumbnailAnalysis
                      .overallScore
                  }
                  items={[
                    [
                      "CTR",
                      project.thumbnailAnalysis
                        .ctrScore,
                    ],
                    [
                      "Emotion",
                      project.thumbnailAnalysis
                        .emotionScore,
                    ],
                    [
                      "Color",
                      project.thumbnailAnalysis
                        .colorScore,
                    ],
                    [
                      "Text",
                      project.thumbnailAnalysis
                        .textScore,
                    ],
                  ]}
                />
              )}

            </div>

          </section>
        )}

        {/* =====================================================
            SEO
        ===================================================== */}

        {project.seoAnalysis && (
          <section className="mb-6">

            <SectionHeader
              number="08"
              title="SEO Intelligence"
              description="검색 노출과 검색 의도에 대한 최적화 상태입니다."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

              <ScoreCard
                label="Overall"
                value={
                  project.seoAnalysis
                    .overallScore
                }
                suffix="/100"
              />

              <ScoreCard
                label="Title"
                value={
                  project.seoAnalysis
                    .titleScore
                }
                suffix="/100"
              />

              <ScoreCard
                label="Description"
                value={
                  project.seoAnalysis
                    .descriptionScore
                }
                suffix="/100"
              />

              <ScoreCard
                label="Keyword Density"
                value={
                  project.seoAnalysis
                    .keywordDensity
                }
                suffix="%"
              />

              <ScoreCard
                label="Ranking Probability"
                value={
                  project.seoAnalysis
                    .rankingProbability
                }
                suffix="%"
              />

            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">

              <ListPanel
                title="Recommended Keywords"
                items={
                  project.seoAnalysis
                    .recommendedKeywords
                }
              />

              <ListPanel
                title="Missing Keywords"
                items={
                  project.seoAnalysis
                    .missingKeywords
                }
              />

              <ListPanel
                title="AI Suggestions"
                items={
                  project.seoAnalysis
                    .suggestions
                }
              />

            </div>

          </section>
        )}

        {/* =====================================================
            SEO OPTIMIZER
        ===================================================== */}

        {project.seoOptimizer && (
          <section className="mb-6">

            <SectionHeader
              number="09"
              title="SEO Optimizer"
              description="현재 콘텐츠를 더 높은 검색 성과를 목표로 재구성합니다."
            />

            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.04] p-7">

              <div className="grid gap-6 lg:grid-cols-2">

                <TextPanel
                  title="Better Title"
                  text={
                    project.seoOptimizer
                      .betterTitle
                  }
                />

                <TextPanel
                  title="Better Description"
                  text={
                    project.seoOptimizer
                      .betterDescription
                  }
                />

                <TextPanel
                  title="Search Intent"
                  text={
                    project.seoOptimizer
                      .searchIntent
                  }
                />

                <ListPanel
                  title="Keyword Cluster"
                  items={
                    project.seoOptimizer
                      .keywordCluster
                  }
                />

              </div>

              <div className="mt-6">
                <ListPanel
                  title="Ranking Tips"
                  items={
                    project.seoOptimizer
                      .rankingTips
                  }
                />
              </div>

            </div>

          </section>
        )}

        {/* =====================================================
            CHANNEL AUDIT
        ===================================================== */}

        {project.channelAudit && (
          <section className="mb-6">

            <SectionHeader
              number="10"
              title="Channel Intelligence"
              description="현재 시장의 채널 경쟁력과 성장 기회를 분석합니다."
            />

            <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/[0.04] p-7">

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>
                  <p className="text-sm text-zinc-500">
                    Niche
                  </p>

                  <h3 className="mt-2 text-3xl font-bold">
                    {project.channelAudit.niche}
                  </h3>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm text-zinc-500">
                    Channel Score
                  </p>

                  <p className="mt-2 text-5xl font-black text-cyan-300">
                    {
                      project.channelAudit
                        .overallScore
                    }
                  </p>
                </div>

              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">

                <ListPanel
                  title="Strengths"
                  items={
                    project.channelAudit
                      .strengths
                  }
                />

                <ListPanel
                  title="Weaknesses"
                  items={
                    project.channelAudit
                      .weaknesses
                  }
                />

                <ListPanel
                  title="Opportunities"
                  items={
                    project.channelAudit
                      .opportunities
                  }
                />

                <TextPanel
                  title="Recommendation"
                  text={
                    project.channelAudit
                      .recommendation
                  }
                />

              </div>

            </div>

          </section>
        )}

        {/* =====================================================
            REVENUE
        ===================================================== */}

        {project.keywordIntelligence && (
          <section className="mb-6">

            <SectionHeader
              number="11"
              title="Revenue Intelligence"
              description="조회수와 RPM을 기준으로 예상 수익성을 확인합니다."
            />

            <div className="grid gap-4 md:grid-cols-3">

              <InfoCard
                label="Estimated RPM"
                value={
                  project.keywordIntelligence
                    .estimatedRPM
                }
              />

              <InfoCard
                label="Expected Views"
                value={
                  project.keywordIntelligence
                    .expectedViews
                }
              />

              <InfoCard
                label="Estimated Revenue"
                value={
                  project.keywordIntelligence
                    .estimatedRevenue
                }
              />

            </div>

          </section>
        )}

        {/* =====================================================
            FINAL RECOMMENDATION
        ===================================================== */}

        <section className="mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            12 / Final Recommendation
          </p>

          <h2 className="mt-3 text-3xl font-black">
            What should you do next?
          </h2>

          <div className="mt-7 grid gap-4 md:grid-cols-3">

            <ActionCard
              number="01"
              title="Validate the opportunity"
              description={
                opportunity >= 70
                  ? "기회 점수가 높습니다. 경쟁이 덜한 각도를 중심으로 제작을 진행하세요."
                  : "기회 점수가 충분히 높지 않습니다. Content Gap을 먼저 검토하세요."
              }
            />

            <ActionCard
              number="02"
              title="Optimize the click"
              description={
                (project.titleAnalysis
                  ?.overallScore ?? 0) >= 70
                  ? "현재 제목 구조는 강합니다. 핵심 Hook을 유지하세요."
                  : "제목의 CTR과 Curiosity를 먼저 개선하세요."
              }
            />

            <ActionCard
              number="03"
              title="Build the content"
              description={
                project.contentPlanner &&
                project.contentPlanner.length > 0
                  ? "AI Content Planner를 기반으로 실제 제작 단계로 이동하세요."
                  : "검증된 기회를 바탕으로 콘텐츠 제작 전략을 구성하세요."
              }
            />

          </div>

          {project.keywordIntelligence?.recommendation && (
            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-6">
              <p className="text-sm font-semibold text-emerald-300">
                AI Recommendation
              </p>

              <p className="mt-3 leading-7 text-zinc-300">
                {
                  project.keywordIntelligence
                    .recommendation
                }
              </p>
            </div>
          )}

        </section>

        <footer className="pb-10 text-center text-sm text-zinc-600">
          Benchmark AI · Intelligence Engine
        </footer>

      </div>
    </main>
  );
}

/* ============================================================
   COMPONENTS
============================================================ */

function SectionHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">
        {number} / Intelligence
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-1 text-sm text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function ScoreCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <div className="mt-3 flex items-end gap-1">
        <p className="text-4xl font-black">
          {Number.isFinite(value)
            ? Math.round(value)
            : 0}
        </p>

        <p className="pb-1 text-sm text-zinc-600">
          {suffix}
        </p>
      </div>

    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      <p className="text-sm text-zinc-500">
        {label}
      </p>

      <p className="mt-3 break-words text-xl font-bold">
        {value || "-"}
      </p>

    </div>
  );
}

function TextPanel({
  title,
  text,
}: {
  title: string;
  text?: string | null;
}) {
  if (!text) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-zinc-400">
        {text}
      </p>

    </div>
  );
}

function ListPanel({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">

      <h3 className="font-semibold">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex gap-3 text-sm leading-6 text-zinc-400"
          >
            <span className="text-emerald-400">
              •
            </span>

            <span>{item}</span>
          </li>
        ))}
      </ul>

    </div>
  );
}

function Badge({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400">
      {label}:{" "}
      <span className="font-semibold text-white">
        {value}
      </span>
    </span>
  );
}

function AnalysisPanel({
  title,
  score,
  items,
}: {
  title: string;
  score: number;
  items: [string, number][];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

      <div className="flex items-center justify-between gap-4">

        <h3 className="text-xl font-bold">
          {title}
        </h3>

        <div className="text-right">
          <p className="text-xs text-zinc-500">
            Overall
          </p>

          <p className="text-3xl font-black">
            {score}
          </p>
        </div>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">

        {items.map(
          ([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-black/20 p-4"
            >

              <p className="text-xs text-zinc-500">
                {label}
              </p>

              <p className="mt-2 text-xl font-bold">
                {value}
              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}

function ActionCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-6">

      <p className="text-sm font-semibold text-emerald-400">
        {number}
      </p>

      <h3 className="mt-3 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>

    </div>
  );
}