"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  getProject,
  SavedProject,
} from "../../lib/projectStorage";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [project, setProject] =
    useState<SavedProject | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const found = await getProject(id);

if (!found) {
  throw new Error("Project not found");
}

setProject(found);
      } catch (loadError) {
        console.error(
          "Failed to load project:",
          loadError
        );

        setError(
          "Project could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      void loadProject();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#09090B] text-white">
        <p className="text-zinc-400">
          Loading project...
        </p>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#09090B] px-6 text-white">
        <div className="text-center">

          <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Benchmark AI
          </p>

          <h1 className="mt-4 text-3xl font-black">
            Project Not Found
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            {error ||
              "This project does not exist."}
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/projects")
            }
            className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
          >
            Back to Projects
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-white">

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-10">

        {/* HEADER */}

        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Benchmark AI Project
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              {project.keyword}
            </h1>

            <p className="mt-3 text-sm text-zinc-500">
              Saved YouTube research project
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

  <button
    type="button"
    onClick={() =>
      router.push("/projects")
    }
    className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
  >
    Projects
  </button>

  <button
    type="button"
    onClick={() =>
      router.push(`/intelligence/${project.id}`)
    }
    className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400/20"
  >
    Intelligence
  </button>

  <button
    type="button"
    onClick={() =>
      router.push("/")
    }
    className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
  >
    New Research
  </button>

</div>

        </div>

        {/* SCORE GRID */}

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <ScoreCard
            label="Benchmark Score"
            value={`${project.report?.score ?? project.benchmarkScore ?? 0}/100`}
          />

          <ScoreCard
            label="Opportunity Score"
            value={`${project.opportunityScoreV2?.total ?? project.opportunityScore ?? 0}/100`}
          />

          <ScoreCard
            label="Videos"
            value={`${project.results?.length ?? 0}`}
          />

          <ScoreCard
            label="Ideas"
            value={`${project.idea?.length ?? 0}`}
          />

        </section>

        {/* RESEARCH */}

        <section className="mt-8">

          <SectionTitle
            eyebrow="Research"
            title="Market Snapshot"
          />

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            <InfoCard
              title="Average Views"
              value={
                project.averageViews
                  ? project.averageViews.toLocaleString()
                  : "-"
              }
            />

            <InfoCard
              title="Top Videos"
              value={`${project.topVideos?.length ?? 0}`}
            />

            <InfoCard
              title="Channels"
              value={`${project.channels?.length ?? 0}`}
            />

          </div>

        </section>

        {/* AI */}

        <section className="mt-12">

  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

    <SectionTitle
      eyebrow="AI Intelligence"
      title="Research Results"
    />

    <button
      type="button"
      onClick={() =>
        router.push(`/intelligence/${project.id}`)
      }
      className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400/20"
    >
      Open Full Intelligence →
    </button>

  </div>

  <div className="mt-5 grid gap-4 md:grid-cols-2">

            <InfoCard
              title="Keyword Intelligence"
              value={
                project.keywordIntelligence
                  ? "Available"
                  : "Not generated"
              }
            />

            <InfoCard
              title="Viral Prediction"
              value={
                project.viralPrediction
                  ? "Available"
                  : "Not generated"
              }
            />

            <InfoCard
              title="SEO Analysis"
              value={
                project.seoAnalysis
                  ? "Available"
                  : "Not generated"
              }
            />

            <InfoCard
              title="Content Gap"
              value={`${project.contentGap?.length ?? 0} opportunities`}
            />

          </div>

        </section>

        {/* TITLES */}

        <section className="mt-12">

          <SectionTitle
            eyebrow="Content"
            title="Recommended Titles"
          />

          <div className="mt-5 space-y-3">

            {project.titles?.length ? (
              project.titles
                .slice(0, 10)
                .map((title, index) => (
                  <div
                    key={`${title.title}-${index}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex gap-4">

                      <span className="text-sm font-bold text-cyan-300">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <p className="font-semibold text-zinc-200">
                        {title.title}
                      </p>

                    </div>
                  </div>
                ))
            ) : (
              <EmptyState text="No title suggestions available." />
            )}

          </div>

        </section>

        {/* PROJECT DATA */}

        <section className="mt-12">

          <SectionTitle
            eyebrow="Project"
            title="Saved Data"
          />

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            <InfoCard
              title="Strategies"
              value={`${project.strategy?.length ?? 0}`}
            />

            <InfoCard
              title="Opportunities"
              value={`${project.opportunities?.length ?? 0}`}
            />

            <InfoCard
              title="Missed Opportunities"
              value={`${project.missedOpportunities?.length ?? 0}`}
            />

            <InfoCard
              title="Recommended Channels"
              value={
                project.recommendedChannels
                  ? "Available"
                  : "Not available"
              }
            />

            <InfoCard
              title="Creator Workspace"
              value={
                project.creatorWorkspace
                  ? "Available"
                  : "Not generated"
              }
            />

            <InfoCard
              title="Planner"
              value={
                project.planner
                  ? "Available"
                  : "Not generated"
              }
            />

          </div>

        </section>

        {/* FOOTER CTA */}

        <section className="mt-16 rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-purple-500/10 p-8 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Continue Research
          </p>

          <h2 className="mt-3 text-2xl font-black md:text-3xl">
            Turn this research into your next video.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Continue analyzing the market or start a new
            Benchmark AI research project.
          </p>

<div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

  <button
    type="button"
    onClick={() =>
      router.push(`/intelligence/${project.id}`)
    }
    className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-6 py-3 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400/20"
  >
    View Full Intelligence →
  </button>

  <button
    type="button"
    onClick={() =>
      router.push(
        `/?keyword=${encodeURIComponent(
          project.keyword
        )}`
      )
    }
    className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
  >
    Continue Research
  </button>

</div>

          <button
            type="button"
            onClick={() =>
              router.push(
                `/?keyword=${encodeURIComponent(
                  project.keyword
                )}`
              )
            }
            className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
          >
            Continue Research →
          </button>

        </section>

      </div>

    </main>
  );
}

function ScoreCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black">
        {value}
      </p>

    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <p className="text-xs uppercase tracking-wider text-zinc-600">
        {title}
      </p>

      <p className="mt-2 text-lg font-bold text-zinc-200">
        {value}
      </p>

    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-black">
        {title}
      </h2>
    </div>
  );
}

function EmptyState({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-zinc-600">
      {text}
    </div>
  );
}