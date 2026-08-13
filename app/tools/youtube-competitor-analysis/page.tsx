import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://benchmark-ai-indol.vercel.app";

export const metadata: Metadata = {
  title: "Free YouTube Competitor Analysis Tool",
  description:
    "Analyze YouTube competitors, compare content performance, identify competitive strengths, and discover opportunities with Benchmark AI.",
  keywords: [
    "YouTube Competitor Analysis",
    "YouTube Competitor Analyzer",
    "YouTube Channel Competitor Analysis",
    "YouTube Competition Analysis",
    "YouTube Analytics",
    "YouTube AI",
  ],
  alternates: {
    canonical: `${BASE_URL}/tools/youtube-competitor-analysis`,
  },
  openGraph: {
    title: "Free YouTube Competitor Analysis Tool | Benchmark AI",
    description:
      "Analyze competitors, compare content performance, and discover opportunities before creating your next YouTube video.",
    url: `${BASE_URL}/tools/youtube-competitor-analysis`,
    siteName: "Benchmark AI",
    type: "website",
  },
};

const analysisAreas = [
  {
    title: "Competitive Strength",
    description:
      "Understand how strong the competitive landscape is around a YouTube topic.",
  },
  {
    title: "Content Performance",
    description:
      "Compare competing videos and identify patterns behind stronger-performing content.",
  },
  {
    title: "Winning Patterns",
    description:
      "Find recurring topics, formats, titles, and strategies used by successful competitors.",
  },
  {
    title: "Opportunity",
    description:
      "Look beyond the biggest competitors and identify areas where your content can compete.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Choose a topic",
    description:
      "Start with a YouTube keyword or content niche.",
  },
  {
    number: "02",
    title: "Analyze competitors",
    description:
      "Benchmark competing videos and channels.",
  },
  {
    number: "03",
    title: "Find patterns",
    description:
      "Identify what successful competitors are doing.",
  },
  {
    number: "04",
    title: "Create strategically",
    description:
      "Turn competitive intelligence into your next video.",
  },
];

const faqs = [
  {
    question: "What is YouTube competitor analysis?",
    answer:
      "YouTube competitor analysis is the process of studying competing channels and videos to understand their content, performance, strategies, and opportunities.",
  },
  {
    question: "Why should I analyze YouTube competitors?",
    answer:
      "Competitor analysis can help you understand what is already working in a niche, identify content patterns, and find opportunities before investing time in a new video.",
  },
  {
    question: "Can Benchmark AI analyze YouTube competition?",
    answer:
      "Benchmark AI combines YouTube research, competitor intelligence, opportunity signals, and AI analysis to help creators evaluate a content market.",
  },
  {
    question: "Is Benchmark AI free?",
    answer:
      "Benchmark AI provides a free way to begin researching YouTube opportunities. Additional features and usage may depend on your plan.",
  },
];

export default function YouTubeCompetitorAnalysisPage() {
  return (
    <main className="min-h-screen bg-[#07090F] text-white">
      {/* HEADER */}
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

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center">
          <div className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-blue-300">
            YouTube Competitor Intelligence
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Free YouTube
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-white to-cyan-400 bg-clip-text text-transparent">
              Competitor Analysis
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Analyze competing YouTube content, understand winning patterns,
            measure competitive pressure, and discover opportunities before
            you create your next video.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-bold shadow-xl shadow-blue-500/20 transition hover:scale-[1.02] hover:shadow-blue-500/40"
            >
              Analyze Competitors for Free →
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

      {/* ANALYSIS AREAS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
            What You Can Analyze
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Understand the competition before you compete
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
            Benchmark AI turns competitive research into actionable signals
            for your next content decision.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {analysisAreas.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-cyan-400/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-lg text-cyan-300">
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

      {/* WORKFLOW */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
              Competitive Research Workflow
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Research. Compare. Find your edge.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {workflow.map((item) => (
              <article
                key={item.number}
                className="rounded-3xl border border-white/10 bg-[#0B0F18] p-6"
              >
                <span className="text-sm font-black text-cyan-400">
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

      {/* PRODUCT CONNECTION */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-8 md:p-14">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
              Beyond Competitor Research
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Turn competitor intelligence into a content strategy
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-zinc-300">
              Benchmark AI connects competitor research with opportunity
              discovery, decision intelligence, titles, scripts, SEO,
              thumbnails, and creator workflows.
            </p>

            <Link
              href="/"
              className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 font-bold text-black transition hover:scale-[1.02]"
            >
              Start Your Free Analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Benchmark AI. All rights reserved.
      </footer>

      {/* SOFTWARE APPLICATION STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Benchmark AI",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: `${BASE_URL}/tools/youtube-competitor-analysis`,
            description:
              "AI-powered YouTube competitor analysis and content intelligence platform.",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />

      {/* FAQ STRUCTURED DATA */}
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