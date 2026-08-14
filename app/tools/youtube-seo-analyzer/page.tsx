import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://benchmark-ai-indol.vercel.app";

export const metadata: Metadata = {
  title: "Free YouTube SEO Analyzer",
  description:
    "Analyze YouTube SEO, keywords, titles, descriptions, content opportunities, and search optimization with Benchmark AI.",
  keywords: [
    "YouTube SEO Analyzer",
    "YouTube SEO Checker",
    "YouTube SEO Tool",
    "YouTube Keyword SEO",
    "YouTube SEO AI",
    "YouTube Growth",
  ],
  alternates: {
    canonical: `${BASE_URL}/tools/youtube-seo-analyzer`,
  },
  openGraph: {
    title: "Free YouTube SEO Analyzer | Benchmark AI",
    description:
      "Analyze YouTube SEO and discover opportunities to improve your content's search potential.",
    url: `${BASE_URL}/tools/youtube-seo-analyzer`,
    siteName: "Benchmark AI",
    type: "website",
  },
};

const analysisAreas = [
  {
    title: "Keyword Relevance",
    description:
      "Understand how closely your content and target keyword match the search intent you want to reach.",
  },
  {
    title: "Title Optimization",
    description:
      "Evaluate whether your title communicates the topic clearly while remaining compelling to viewers.",
  },
  {
    title: "Description",
    description:
      "Identify opportunities to make your video description clearer, more useful, and better aligned with your topic.",
  },
  {
    title: "Search Opportunity",
    description:
      "Combine keyword and market signals to identify topics where stronger content may have room to compete.",
  },
  {
    title: "Competitive SEO",
    description:
      "Understand how competing content approaches the same search topic.",
  },
  {
    title: "SEO Score",
    description:
      "Turn multiple optimization signals into a practical SEO assessment.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Choose a topic",
    description:
      "Start with the keyword or topic you want to target.",
  },
  {
    number: "02",
    title: "Analyze SEO",
    description:
      "Evaluate search and content optimization signals.",
  },
  {
    number: "03",
    title: "Optimize",
    description:
      "Find areas where your content can become stronger.",
  },
  {
    number: "04",
    title: "Create",
    description:
      "Apply the recommendations to your next video.",
  },
];

const faqs = [
  {
    question: "What is a YouTube SEO analyzer?",
    answer:
      "A YouTube SEO analyzer evaluates factors that can help creators understand how well their video content is aligned with a target topic and search intent.",
  },
  {
    question: "Does YouTube SEO still matter?",
    answer:
      "Search is one part of YouTube discovery. SEO can help communicate what a video is about, while content quality, viewer satisfaction, competition, and other signals also influence performance.",
  },
  {
    question: "What does Benchmark AI analyze?",
    answer:
      "Benchmark AI connects keyword intelligence, SEO analysis, competitor research, content gaps, opportunity signals, titles, thumbnails, and content strategy.",
  },
  {
    question: "Is Benchmark AI free?",
    answer:
      "Benchmark AI provides a free way to begin researching and analyzing YouTube content. Additional features and usage may depend on your plan.",
  },
];

export default function YouTubeSEOAnalyzerPage() {
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
            YouTube SEO Intelligence
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Free YouTube
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-white to-blue-500 bg-clip-text text-transparent">
              SEO Analyzer
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Analyze keywords, titles, descriptions, competition, and search
            opportunities to build a stronger YouTube content strategy.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-bold shadow-xl shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-500/40"
            >
              Analyze Your SEO for Free →
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
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
            SEO Analysis
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Optimize more than just keywords
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
            YouTube SEO is not one number. Benchmark AI connects multiple
            signals to give creators a broader view of search opportunity.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {analysisAreas.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-cyan-400/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-lg text-cyan-300">
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
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
              SEO Workflow
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              From search intent to better content
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

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-8 text-center md:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            Beyond SEO
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Connect SEO with the entire YouTube growth workflow
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-zinc-300">
            Benchmark AI connects SEO with keyword research, competitor
            intelligence, opportunity discovery, titles, thumbnails,
            scripts, content strategy, and creator workflows.
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
            url: `${BASE_URL}/tools/youtube-seo-analyzer`,
            description:
              "AI-powered YouTube SEO analysis and content intelligence platform.",
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