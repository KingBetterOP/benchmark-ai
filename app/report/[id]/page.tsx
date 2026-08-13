"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ReportData = {
  id: string;
  benchmarkScore: number;
  opportunity: number;
  opportunityScoreV2: number;
  competition: string;
  expectedViews: string;
  uploadTime: string;
  titles: {
    title: string;
  }[];
};

export default function PublicReportPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      try {
        const response = await fetch(`/api/reports/${id}`);

        if (!response.ok) {
          throw new Error("Report not found");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadReport();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-zinc-400">
          Loading report...
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Report Not Found
          </h1>

          <p className="mt-3 text-zinc-400">
            This report may have been removed or does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            Benchmark AI
          </p>

          <h1 className="mt-4 text-5xl font-extrabold">
            YouTube Research Report
          </h1>

          <p className="mt-4 text-zinc-400">
            AI-powered content opportunity analysis
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <Card
            title="Benchmark Score"
            value={`${data.benchmarkScore}/100`}
          />

          <Card
            title="Opportunity Score"
            value={`${data.opportunityScoreV2}/100`}
          />

          <Card
            title="Competition"
            value={data.competition}
          />

          <Card
            title="AI Opportunity"
            value={`${data.opportunity}%`}
          />

          <Card
            title="Expected Views"
            value={data.expectedViews}
          />

          <Card
            title="Best Upload"
            value={data.uploadTime}
          />

        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8">

          <p className="text-sm text-zinc-400">
            Best Title
          </p>

          <h2 className="mt-4 text-2xl font-bold">
            {data.titles?.[0]?.title ??
              "No title available"}
          </h2>

        </section>

        <section className="mt-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 text-center">

          <h2 className="text-3xl font-extrabold">
            Want to analyze your own content?
          </h2>

          <p className="mt-3 text-zinc-400">
            Discover your next high-opportunity YouTube topic.
          </p>

          <a
            href="/"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-black transition hover:bg-zinc-200"
          >
            Analyze Your Keyword →
          </a>

        </section>

        <p className="mt-12 text-center text-sm text-zinc-600">
          Powered by Benchmark AI
        </p>

      </div>
    </main>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}