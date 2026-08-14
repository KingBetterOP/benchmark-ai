import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://benchmark-ai-indol.vercel.app";

export const metadata: Metadata = {
  title: "Free YouTube Channel Benchmark",
  description:
    "Benchmark your YouTube channel against competitors and understand content performance, growth opportunities, and competitive positioning with Benchmark AI.",
  keywords: [
    "YouTube Channel Benchmark",
    "YouTube Channel Analyzer",
    "YouTube Channel Analytics",
    "YouTube Competitor Analysis",
    "YouTube Channel Audit",
    "YouTube Growth",
    "YouTube AI",
  ],
  alternates: {
    canonical: `${BASE_URL}/tools/youtube-channel-benchmark`,
  },
  openGraph: {
    title: "Free YouTube Channel Benchmark | Benchmark AI",
    description:
      "Benchmark your YouTube channel, understand competitive positioning, and discover opportunities for growth.",
    url: `${BASE_URL}/tools/youtube-channel-benchmark`,
    siteName: "Benchmark AI",
    type: "website",
  },
};

const benchmarkAreas = [
  {
    title: "Channel Performance",
    description:
      "Understand how your channel and content are performing across important signals.",
  },
  {
    title: "Competitive Position",
    description:
      "Compare your content strategy with channels competing for the same audience.",
  },
  {
    title: "Content Strategy",
    description:
      "Identify patterns in topics, formats, titles, and publishing approaches.",
  },
  {
    title: "Growth Opportunities",
    description:
      "Find areas where your channel may have room to improve or differentiate.",
  },
  {
    title: "Content Gaps",
    description:
      "Discover topics and angles that competitors may not be serving effectively.",
  },
  {
    title: "Benchmark Score",
    description:
      "Bring multiple signals together to create a clearer view of your current position.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Choose your channel",
    description:
      "Start with your YouTube channel or content niche.",
  },
  {
    number: "02",
    title: "Benchmark",
    description:
      "Compare performance and competitive signals.",
  },
  {
    number: "03",
    title: "Find opportunities",
    description:
      "Identify weaknesses, gaps, and growth opportunities.",
  },
  {
    number: "04",
    title: "Build your plan",
    description:
      "Turn the benchmark into an actionable content strategy.",
  },
];

const faqs = [
  {
    question: "What is a YouTube channel benchmark?",
    answer:
      "A YouTube channel benchmark compares a channel's performance and content strategy against relevant competitive signals to help identify strengths, weaknesses, and opportunities.",
  },
  {
    question: "Why should I benchmark my YouTube channel?",
    answer:
      "Benchmarking helps you understand where your channel stands relative to competitors instead of evaluating performance in isolation.",
  },
  {
    question: "What can Benchmark AI analyze?",
    answer:
      "Benchmark AI connects channel research with competitor intelligence, keyword research, content gaps, opportunity signals, SEO, titles, thumbnails, and content strategy.",
  },
  {
    question: "Does a benchmark score guarantee channel growth?",
    answer:
      "No. A benchmark is a decision-support tool rather than a guarantee. Actual growth depends on content quality, audience response, consistency, distribution, competition, and many other factors.",
  },
];

export default function YouTubeChannelBenchmarkPage() {
  return (
    <main className="min-h-screen bg-[#07090F] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-black tracking-tight"
          >
            Benchmark <span className="text-cyan-400">AI</span>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold transition hover:border-cyan-400/40 hover:bg-cyan-500/10"
          >
            Analyze for Free
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center">
          <div className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-300">
            YouTube Channel Intelligence
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Benchmark Your
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-white to-cyan-400 bg-clip-text text-transparent">
              YouTube Channel
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Understand your competitive position, identify content gaps,
            discover growth opportunities, and build a smarter YouTube
            strategy.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-bold shadow-xl shadow-blue-500/20 transition hover:scale-[1.02] hover:shadow-blue-500/40"
            >
              Benchmark Your Channel for Free →
            </Link>

            <Link
              href="/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-zinc-200 transition hover:border-blue-400/30"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            Channel Benchmark
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Know where your channel stands
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
            Benchmark AI helps turn scattered YouTube data into a clearer
            picture of your competitive position and next opportunities.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benchmarkAreas.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-blue-400/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-lg text-blue-300">
                ◈
              </div>

              <h2 className="mt-6 text-xl font-bold">
                {item.title}
              </h2>

              <p className="mt-3 leading-7 text-zinc-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
              Benchmark Workflow
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Measure. Understand. Grow.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {workflow.map((item) => (
              <article
                key={item.number}
                className="rounded-3xl border border-white/10 bg-[#0B0F18] p-6"
              >
                <span className="text-sm font-black text-blue-400">
                  {item.number}
                </span>

                <h3 className="mt-5 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-500">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-8 text-center md:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
            Beyond Benchmarking
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Turn your benchmark into a growth system
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-zinc-300">
            Benchmark AI connects channel intelligence with keyword research,
            competitor analysis, content gaps, opportunity discovery, SEO,
            titles, thumbnails, scripts, planning, and creator workflows.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-[1.02]"
          >
            Start Your Free Analysis →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="text-3xl font-black md:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <summary className="cursor-pointer font-bold">
                {faq.question}
              </summary>

              <p className="mt-4 leading-7 text-zinc-400">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Benchmark AI. All rights reserved.
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Benchmark AI",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: `${BASE_URL}/tools/youtube-channel-benchmark`,
            description:
              "AI-powered YouTube channel benchmarking and content intelligence platform.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </main>
  );
}