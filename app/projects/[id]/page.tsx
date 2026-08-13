"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getProject,
  SavedProject,
} from "../../lib/projectStorage";

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();

  const projectId = String(params.id);

  const [project, setProject] =
    useState<SavedProject | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
  const loadProject = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getProject(projectId);

      setProject(data);
    } catch (error) {
      console.error(
        "Failed to load project:",
        error
      );

      setError(
        "프로젝트를 불러오지 못했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  loadProject();
}, [projectId]);

  const formatDate = (
    timestamp: number
  ) => {
    return new Date(
      timestamp
    ).toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const score =
    project?.report?.score ?? 0;

  const ideaCount =
    project?.idea?.length ?? 0;

  const titleCount =
    project?.titles?.length ?? 0;

  const getScoreMessage = (
    value: number
  ) => {
    if (value >= 80) {
      return "Strong research opportunity";
    }

    if (value >= 60) {
      return "Promising opportunity";
    }

    if (value >= 40) {
      return "Moderate opportunity";
    }

    return "Needs further research";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#09090B] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">

          <div className="animate-pulse">

            <div className="h-4 w-32 rounded bg-white/10" />

            <div className="mt-8 h-12 w-80 rounded-xl bg-white/10" />

            <div className="mt-3 h-5 w-64 rounded bg-white/5" />

            <div className="mt-10 grid gap-4 md:grid-cols-4">

              {Array.from({
                length: 4,
              }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 rounded-3xl border border-white/10 bg-white/[0.03]"
                />
              ))}

            </div>

          </div>

        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-[#09090B] px-6 py-16 text-white">

        <div className="mx-auto max-w-6xl">

          <button
            type="button"
            onClick={() =>
              router.push("/projects")
            }
            className="mb-8 rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            ← 프로젝트 목록
          </button>

          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center">

            <p className="text-red-300">
              {error ||
                "프로젝트를 찾을 수 없습니다."}
            </p>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#09090B] via-[#111827] to-[#09090B] px-4 py-10 text-white md:px-10">

      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="mb-10">

          <button
            type="button"
            onClick={() =>
              router.push("/projects")
            }
            className="mb-7 text-sm text-white/40 transition hover:text-white"
          >
            ← Saved Projects
          </button>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="flex items-center gap-3">

                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Benchmark AI
                </span>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300">
                  Saved Project
                </span>

              </div>

              <h1 className="mt-5 break-words text-4xl font-black tracking-tight md:text-5xl">
                {project.keyword}
              </h1>

              <p className="mt-3 text-sm text-white/40">
                Created ·{" "}
                {formatDate(
                  project.createdAt
                )}
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

  <button
    type="button"
    onClick={() =>
      router.push(
        `/?projectId=${project.id}`
      )
    }
    className="rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-black shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white/90"
  >
    Open in Workspace →
  </button>

  {project.latestReportId && (
    <button
      type="button"
      onClick={() =>
        router.push(
          `/report/${project.latestReportId}`
        )
      }
      className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-3.5 text-sm font-bold text-emerald-300 transition hover:bg-emerald-400/20"
    >
      View Report →
    </button>
  )}

</div>

          </div>

        </header>

        {/* =====================================================
            SCORE HERO
        ====================================================== */}

        <section className="mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">

          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">

            <div className="p-7 md:p-10">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                Research Score
              </p>

              <div className="mt-4 flex items-end gap-3">

                <span className="text-7xl font-black tracking-tight">
                  {score}
                </span>

                <span className="mb-3 text-lg text-white/25">
                  /100
                </span>

              </div>

              <p className="mt-3 text-sm font-medium text-white/60">
                {getScoreMessage(score)}
              </p>

              <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">

                <div
                  className="h-full rounded-full bg-white transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      Math.max(score, 0),
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

            <div className="border-t border-white/10 bg-black/20 p-7 lg:border-l lg:border-t-0 md:p-10">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                Project Status
              </p>

              <div className="mt-5 flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.5)]" />

                <span className="text-lg font-bold">
                  Ready to create
                </span>

              </div>

              <p className="mt-3 max-w-sm text-sm leading-6 text-white/40">
                Research is saved and ready to be
                turned into content inside the
                Workspace.
              </p>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/?projectId=${project.id}`
                  )
                }
                className="mt-7 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Continue Research →
              </button>

            </div>

          </div>

        </section>

        {/* =====================================================
            OVERVIEW
        ====================================================== */}

        <section className="mb-6">

          <div className="mb-4">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
              Research Overview
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Project snapshot
            </h2>

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* SCORE */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20">

              <p className="text-sm text-white/40">
                Research Score
              </p>

              <p className="mt-4 text-3xl font-black">
                {score}
              </p>

              <p className="mt-1 text-xs text-white/25">
                out of 100
              </p>

            </div>

            {/* IDEAS */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20">

              <p className="text-sm text-white/40">
                Content Ideas
              </p>

              <p className="mt-4 text-3xl font-black">
                {ideaCount}
              </p>

              <p className="mt-1 text-xs text-white/25">
                saved ideas
              </p>

            </div>

            {/* TITLES */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20">

              <p className="text-sm text-white/40">
                Recommended Titles
              </p>

              <p className="mt-4 text-3xl font-black">
                {titleCount}
              </p>

              <p className="mt-1 text-xs text-white/25">
                title candidates
              </p>

            </div>

            {/* STATUS */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20">

              <p className="text-sm text-white/40">
                Project Status
              </p>

              <p className="mt-4 text-xl font-black">
                Ready
              </p>

              <p className="mt-1 text-xs text-emerald-300/60">
                Ready for creation
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            CONTENT IDEAS
        ====================================================== */}

        <section className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                Content Ideas
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                콘텐츠 아이디어
              </h2>

            </div>

            <span className="text-sm text-white/30">
              {ideaCount} ideas
            </span>

          </div>

          <div className="mt-7 space-y-3">

            {project.idea?.length ? (
              project.idea.map(
                (item, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-bold text-white/35">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1 pt-1 text-sm leading-6 text-white/75">

                      {typeof item ===
                      "string"
                        ? item
                        : JSON.stringify(
                            item
                          )}

                    </div>

                    <span className="hidden shrink-0 pt-1 text-xs text-white/20 transition group-hover:text-white/50 sm:block">
                      →
                    </span>

                  </div>
                )
              )
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">

                <p className="text-sm text-white/35">
                  저장된 아이디어가 없습니다.
                </p>

              </div>
            )}

          </div>

        </section>

        {/* =====================================================
            TITLES
        ====================================================== */}

        <section className="mb-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                Recommended Titles
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                추천 제목
              </h2>

            </div>

            <span className="text-sm text-white/30">
              {titleCount} titles
            </span>

          </div>

          <div className="mt-7 space-y-3">

            {project.titles?.length ? (
              project.titles.map(
                (title, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-bold text-white/35">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1 pt-1 text-sm leading-6 text-white/75">

                      {typeof title ===
                      "string"
                        ? title
                        : JSON.stringify(
                            title
                          )}

                    </div>

                    <span className="hidden shrink-0 pt-1 text-xs text-white/20 transition group-hover:text-white/50 sm:block">
                      →
                    </span>

                  </div>
                )
              )
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">

                <p className="text-sm text-white/35">
                  저장된 제목이 없습니다.
                </p>

              </div>
            )}

          </div>

        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-7 md:p-10">

          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                Next Step
              </p>

              <h2 className="mt-3 text-2xl font-black md:text-3xl">
                Turn this research into content.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                Take your saved research, ideas and
                titles back into the Benchmark AI
                Workspace and continue creating.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                router.push(
                  `/?projectId=${project.id}`
                )
              }
              className="shrink-0 rounded-2xl bg-white px-7 py-4 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Continue in Workspace →
            </button>

          </div>

        </section>

        <div className="h-10" />

      </div>

    </main>
  );
}