import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://benchmark-ai-indol.vercel.app";

export const metadata: Metadata = {
  title: "Free YouTube Content Gap Finder",
  description:
    "Find YouTube content gaps, underserved topics, competitor weaknesses, and new video opportunities with Benchmark AI.",
  keywords: [
    "YouTube Content Gap",
    "YouTube Content Gap Finder",
    "YouTube Content Ideas",
    "YouTube Competitor Analysis",
    "YouTube Opportunity Finder",
    "YouTube AI",
  ],
  alternates: {
    canonical: `${BASE_URL}/tools/youtube-content-gap`,
  },
  openGraph: {
    title: "Free YouTube Content Gap Finder | Benchmark AI",
    description:
      "Discover underserved YouTube topics and content opportunities by analyzing competitors and the market.",
    url: `${BASE_URL}/tools/youtube-content-gap`,
    siteName: "Benchmark AI",
    type: "website",
  },
};

const gapAreas = [
  {
    title: "Missing Topics",
    description:
      "Identify topics that audiences may want but competing content does not cover well.",
  },
  {
    title: "Weak Competitor Content",
    description:
      "Find areas where existing videos may leave room for a stronger or more useful alternative.",
  },
  {
    title: "Audience Needs",
    description:
      "Look beyond existing videos to understand questions and needs that may not be fully satisfied.",
  },
  {
    title: "Format Gaps",
    description:
      "Discover opportunities to approach an existing topic through a different format, angle, or presentation.",
  },
  {
    title: "Fresh Angles",
    description:
      "Find ways to approach familiar topics from a new perspective instead of simply copying competitors.",
  },
  {
    title: "Opportunity Score",
    description:
      "Turn multiple market signals into a clearer picture of where content opportunities may exist.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Choose a market",
    description:
      "Start with a keyword, topic, or YouTube niche.",
  },
  {
    number: "02",
    title: "Study the market",
    description:
      "Analyze existing videos and competitive content.",
  },
  {
    number: "03",
    title: "Find the gaps",
    description:
      "Identify missing topics, angles, and weaknesses.",
  },
  {
    number: "04",
    title: "Create the opportunity",
    description:
      "Turn the gap into a differentiated content idea.",
  },
];

const faqs = [
  {
    question: "What is a YouTube content gap?",
    answer:
      "A YouTube content gap is an area where audience demand may not be fully satisfied by existing videos, topics, formats, or perspectives.",
  },
  {
    question: "Why should creators look for content gaps?",
    answer:
      "Content gaps can help creators avoid competing only by copying existing videos and instead identify opportunities to provide something meaningfully different or better.",
  },
  {
    question: "How does Benchmark AI find content gaps?",
    answer:
      "Benchmark AI combines keyword intelligence, competitor research, content analysis, opportunity signals, and AI analysis to help identify potential gaps.",
  },
  {
    question: "Can a content gap become a video idea?",
    answer:
      "Yes. A useful content gap can be transformed into a specific topic, angle, title, format, and production strategy.",
  },
];

export default function YouTubeContentGapPage() {
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
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[180px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center">
          <div className="inline-flex rounded-full border border-violet-400/20 bg-violet-400/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-300">
            YouTube Content Gap Intelligence
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Find Your Next
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-white to-cyan-400 bg-clip-text text-transparent">
              YouTube Content Gap
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Discover underserved topics, missing angles, weak competitor
            content, and opportunities to create something better.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-4 font-bold shadow-xl shadow-violet-500/20 transition hover:scale-[1.02] hover:shadow-violet-500/40"
            >
              Find Content Gaps for Free →
            </Link>

            <Link
              href="/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-zinc-200 transition hover:border-violet-400/30"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
            Content Gap Analysis
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Stop looking only at what already exists
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
            The biggest opportunity may be hidden between audience demand and
            what competing creators currently provide.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {gapAreas.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-violet-400/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-lg text-violet-300">
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
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
              Content Opportunity Workflow
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Research the gap. Own the opportunity.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {workflow.map((item) => (
              <article
                key={item.number}
                className="rounded-3xl border border-white/10 bg-[#0B0F18] p-6"
              >
                <span className="text-sm font-black text-violet-400">
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
        <div className="rounded-[32px] border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-8 text-center md:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
            From Gap to Video
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Turn an empty space in the market into your next video
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-zinc-300">
            Benchmark AI connects content-gap discovery with opportunity
            scoring, competitor research, titles, thumbnails, SEO, scripts,
            and the creator workflow.
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
            url: `${BASE_URL}/tools/youtube-content-gap`,
            description:
              "AI-powered YouTube content gap discovery and content intelligence platform.",
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