"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getProjects,
  deleteProject,
  SavedProject,
} from "../lib/projectStorage";

export default function ProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();

      setProjects(data);
    } catch (error) {
      console.error(
        "Failed to load projects:",
        error
      );

      setError(
        "프로젝트를 불러오지 못했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "이 프로젝트를 삭제하시겠습니까?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(id);

      setProjects((previous) =>
        previous.filter(
          (project) =>
            project.id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete project:",
        error
      );

      alert(
        "프로젝트 삭제에 실패했습니다."
      );
    }
  };

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#09090B] via-[#111827] to-[#09090B] px-4 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-medium text-white/40">
              BENCHMARK AI
            </p>

            <h1 className="mt-2 text-4xl font-black">
              Saved Projects
            </h1>

            <p className="mt-2 text-white/50">
              저장된 YouTube 분석 프로젝트를
              확인하고 관리하세요.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push("/")
            }
            className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold transition hover:bg-white/[0.1]"
          >
            ← 새 분석으로 돌아가기
          </button>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
            <p className="text-white/60">
              프로젝트를 불러오는 중...
            </p>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">

            <p className="text-red-300">
              {error}
            </p>

            <button
              type="button"
              onClick={loadProjects}
              className="mt-5 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black"
            >
              다시 시도
            </button>

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          projects.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-12 text-center">

              <div className="text-5xl">
                📂
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                저장된 프로젝트가 없습니다.
              </h2>

              <p className="mt-2 text-white/50">
                YouTube 키워드를 분석하면
                프로젝트가 여기에 저장됩니다.
              </p>

              <button
                type="button"
                onClick={() =>
                  router.push("/")
                }
                className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black"
              >
                첫 분석 시작하기
              </button>

            </div>
          )}

        {/* PROJECT GRID */}

        {!loading &&
          !error &&
          projects.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {projects.map(
                (project) => (
                  <article
                    key={project.id}
                    className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]"
                  >

                    {/* TOP */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <p className="text-xs font-medium uppercase tracking-wider text-white/30">
                          PROJECT
                        </p>

                        <h2 className="mt-2 truncate text-xl font-bold">
                          {project.keyword}
                        </h2>

                      </div>

                      <div className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
                        {project.report?.score ?? 0}
                        /100
                      </div>

                    </div>

                    {/* DATE */}

                    <p className="mt-3 text-xs text-white/35">
                      {formatDate(
                        project.createdAt
                      )}
                    </p>

                    {/* STATS */}

                    <div className="mt-6 grid grid-cols-2 gap-3">

                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

                        <p className="text-xs text-white/35">
                          Ideas
                        </p>

                        <p className="mt-1 text-lg font-bold">
                          {
                            project.idea
                              ?.length ?? 0
                          }
                        </p>

                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">

                        <p className="text-xs text-white/35">
                          Titles
                        </p>

                        <p className="mt-1 text-lg font-bold">
                          {
                            project.titles
                              ?.length ?? 0
                          }
                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="mt-6 flex flex-wrap gap-3">

  <button
    type="button"
    onClick={() =>
      router.push(
        `/projects/${project.id}`
      )
    }
    className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-white/90"
  >
    프로젝트 열기
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
      className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
    >
      Report
    </button>
  )}

  <button
    type="button"
    onClick={() =>
      handleDelete(
        project.id
      )
    }
    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
  >
    삭제
  </button>

</div>
                  </article>
                )
              )}

            </div>
          )}

      </div>
    </main>
  );
}