import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://benchmark-ai-indol.vercel.app";

export const metadata: Metadata = {
  title: "Free YouTube Keyword Analyzer",
  description:
    "Analyze YouTube keyword demand, competition, trends, opportunity, and content potential with Benchmark AI.",
  keywords: [
    "YouTube Keyword Analyzer",
    "YouTube Keyword Research",
    "YouTube SEO",
    "YouTube Content Ideas",
    "YouTube AI",
  ],
  alternates: {
    canonical: `${BASE_URL}/tools/youtube-keyword-analyzer`,
  },
  openGraph: {
    title: "Free YouTube Keyword Analyzer | Benchmark AI",
    description:
      "Discover YouTube demand, competition, trends, and content opportunities before creating your next video.",
    url: `${BASE_URL}/tools/youtube-keyword-analyzer`,
    siteName: "Benchmark AI",
    type: "website",
  },
};

const faqs = [
  {
    question: "What is a YouTube keyword analyzer?",
    answer:
      "A YouTube keyword analyzer helps creators evaluate a topic before creating a video by looking at demand, competition, trends, and content opportunities.",
  },
  {
    question: "Is Benchmark AI free?",
    answer:
      "Benchmark AI provides a free way to begin researching YouTube opportunities. Additional features and usage may depend on your plan.",
  },
  {
    question: "What can I learn from a YouTube keyword?",
    answer:
      "You can use a keyword to investigate market demand, competing content, trends, potential opportunities, and the type of content worth creating.",
  },
  {
    question: "Can Benchmark AI help me create the video?",
    answer:
      "Yes. Benchmark AI connects research with content strategy, titles, scripts, SEO, thumbnails, creator workflows, and other production tools.",
  },
];

export default function YouTubeKeywordAnalyzerPage() {
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
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
            YouTube Keyword Intelligence
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Free YouTube
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-white to-blue-500 bg-clip-text text-transparent">
              Keyword Analyzer
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Discover demand, competition, trends, and content opportunities
            before you spend time creating your next YouTube video.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold shadow-xl shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-500/40"
            >
              Analyze a Keyword for Free →
            </Link>

            <Link
              href="/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-zinc-200 transition hover:border-cyan-400/30"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Demand",
              description:
                "Understand how much attention exists around a topic.",
            },
            {
              title: "Competition",
              description:
                "Evaluate the strength of competing YouTube content.",
            },
            {
              title: "Trends",
              description:
                "Identify whether interest is growing, stable, or changing.",
            },
            {
              title: "Opportunity",
              description:
                "Find topics where the potential reward may justify the competition.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
            >
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                {item.title}
              </div>

              <p className="mt-4 leading-7 text-zinc-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              From keyword to content opportunity
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              ["01", "Enter a topic", "Start with a keyword or idea."],
              ["02", "Research", "Benchmark the YouTube market."],
              ["03", "Find opportunity", "Compare demand and competition."],
              ["04", "Create", "Turn the insight into content."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-3xl border border-white/10 bg-[#0B0F18] p-6"
              >
                <span className="text-sm font-black text-cyan-400">
                  {number}
                </span>

                <h3 className="mt-5 text-xl font-bold">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-8 text-center md:p-14">
          <h2 className="text-3xl font-black md:text-5xl">
            Research before you create.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-300">
            Benchmark AI connects YouTube research, opportunity discovery,
            decision making, and content creation in one workflow.
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
            url: `${BASE_URL}/tools/youtube-keyword-analyzer`,
            description:
              "AI-powered YouTube keyword intelligence and content research platform.",
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