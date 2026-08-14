"use client";

import Link from "next/link";

import WorkspaceNav from "../components/workspace/WorkspaceNav";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";

const modules = [
  {
    href: "/research",
    number: "01",
    title: "Research",
    description:
      "Analyze YouTube videos, channels, keywords, trends, and competition.",
  },
  {
    href: "/intelligence",
    number: "02",
    title: "Intelligence",
    description:
      "Turn market signals into opportunity scores and AI-powered decisions.",
  },
  {
    href: "/strategy",
    number: "03",
    title: "Strategy",
    description:
      "Build a content strategy based on real YouTube market signals.",
  },
  {
    href: "/create",
    number: "04",
    title: "Create",
    description:
      "Turn research into titles, hooks, scripts, thumbnails, and publishing plans.",
  },
  {
    href: "/performance",
    number: "05",
    title: "Performance",
    description:
      "Analyze existing video performance and identify the next growth opportunity.",
  },
  {
    href: "/projects",
    number: "06",
    title: "Projects",
    description:
      "Save, revisit, compare, and manage your YouTube research projects.",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">

      <WorkspaceHeader />

      <div className="flex">

        <WorkspaceNav />

        <div className="min-w-0 flex-1">

          <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-12">

            {/* HEADER */}

            <div className="max-w-3xl">

              <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Benchmark AI Workspace
              </div>

              <h1 className="text-4xl font-black tracking-tight md:text-6xl">
                Your YouTube
                <br />
                Intelligence Hub.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
                Research the market, discover opportunities,
                make better decisions, and turn insights into
                content from one workspace.
              </p>

            </div>

            {/* PRIMARY CTA */}

            <div className="mt-8">

              <Link
                href="/"
                className="inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:bg-zinc-200"
              >
                Start New Research →
              </Link>

            </div>

            {/* MODULES */}

            <section className="mt-16">

              <div className="mb-6">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Workspace
                </p>

                <h2 className="mt-2 text-2xl font-black md:text-3xl">
                  Everything you need to grow on YouTube.
                </h2>

              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                {modules.map((module) => (
                  <Link
                    key={module.href}
                    href={module.href}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05]"
                  >

                    <div className="flex items-center justify-between">

                      <span className="text-xs font-bold tracking-wider text-cyan-300">
                        {module.number}
                      </span>

                      <span className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-cyan-300">
                        →
                      </span>

                    </div>

                    <h3 className="mt-5 text-xl font-bold">
                      {module.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-zinc-500">
                      {module.description}
                    </p>

                    <div className="mt-6 text-xs font-bold text-zinc-400">
                      OPEN MODULE →
                    </div>

                  </Link>
                ))}

              </div>

            </section>

            {/* SYSTEM */}

            <section className="mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">

              <div className="max-w-2xl">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Benchmark AI System
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  Research → Intelligence → Strategy → Create
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Benchmark AI is designed as one connected workflow.
                  Every stage builds on the data and decisions from
                  the previous stage.
                </p>

              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-4">

                {[
                  "Research",
                  "Intelligence",
                  "Strategy",
                  "Create",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="text-xs font-bold text-zinc-600">
                      0{index + 1}
                    </div>

                    <div className="mt-2 font-bold">
                      {step}
                    </div>
                  </div>
                ))}

              </div>

            </section>

          </div>

        </div>

      </div>

    </main>
  );
}