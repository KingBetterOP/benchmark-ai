import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://benchmark-ai-indol.vercel.app";

export const metadata: Metadata = {
  title: "Free YouTube Thumbnail Analyzer",
  description:
    "Analyze YouTube thumbnails for visual impact, clarity, composition, CTR potential, and overall performance with Benchmark AI.",
  keywords: [
    "YouTube Thumbnail Analyzer",
    "YouTube Thumbnail Checker",
    "YouTube CTR",
    "YouTube Thumbnail AI",
    "YouTube SEO",
    "YouTube Creator Tools",
  ],
  alternates: {
    canonical: `${BASE_URL}/tools/youtube-thumbnail-analyzer`,
  },
  openGraph: {
    title: "Free YouTube Thumbnail Analyzer | Benchmark AI",
    description:
      "Analyze your YouTube thumbnail for visual impact, clarity, composition, and click potential.",
    url: `${BASE_URL}/tools/youtube-thumbnail-analyzer`,
    siteName: "Benchmark AI",
    type: "website",
  },
};

const analysisAreas = [
  {
    title: "Visual Impact",
    description:
      "Evaluate whether the thumbnail communicates a strong visual idea quickly.",
  },
  {
    title: "Clarity",
    description:
      "Identify whether the main subject and message are easy to understand at a glance.",
  },
  {
    title: "Composition",
    description:
      "Evaluate the balance, hierarchy, and placement of important visual elements.",
  },
  {
    title: "CTR Potential",
    description:
      "Identify visual opportunities that may help create a stronger reason to click.",
  },
  {
    title: "Competitive Fit",
    description:
      "Understand how your thumbnail concept fits within the visual language of competing content.",
  },
  {
    title: "Overall Score",
    description:
      "Combine multiple signals into a practical thumbnail evaluation.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Choose a thumbnail",
    description:
      "Start with the thumbnail you plan to use.",
  },
  {
    number: "02",
    title: "Analyze",
    description:
      "Evaluate visual and performance signals.",
  },
  {
    number: "03",
    title: "Improve",
    description:
      "Identify weaknesses and optimization opportunities.",
  },
  {
    number: "04",
    title: "Publish",
    description:
      "Use the improved concept in your content workflow.",
  },
];

const faqs = [
  {
    question: "What is a YouTube thumbnail analyzer?",
    answer:
      "A YouTube thumbnail analyzer evaluates visual characteristics such as clarity, composition, visual impact, and potential click appeal.",
  },
  {
    question: "Why are YouTube thumbnails important?",
    answer:
      "A thumbnail is one of the first visual signals viewers encounter when deciding whether to investigate a video, so clarity and visual appeal matter.",
  },
  {
    question: "Can Benchmark AI help improve my thumbnail?",
    answer:
      "Benchmark AI can analyze thumbnail concepts and connect the analysis with title optimization, competitor research, content strategy, and the creator workflow.",
  },
  {
    question: "Is Benchmark AI free?",
    answer:
      "Benchmark AI provides a free way to begin researching and analyzing YouTube content. Additional features and usage may depend on your plan.",
  },
];

export default function YouTubeThumbnailAnalyzerPage() {
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
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[180px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center">
          <div className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-400/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-300">
            YouTube Thumbnail Intelligence
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Free YouTube
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-400 bg-clip-text text-transparent">
              Thumbnail Analyzer
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Analyze your YouTube thumbnail for visual impact, clarity,
            composition, competitive fit, and click potential before you
            publish.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-4 font-bold shadow-xl shadow-indigo-500/20 transition hover:scale-[1.02] hover:shadow-indigo-500/40"
            >
              Analyze Your Thumbnail for Free →
            </Link>

            <Link
              href="/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-zinc-200 transition hover:border-indigo-400/30"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-400">
            Thumbnail Analysis
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Make every visual decision count
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
            Evaluate the important visual signals behind an effective YouTube
            thumbnail instead of relying only on intuition.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {analysisAreas.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-indigo-400/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-lg text-indigo-300">
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
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-400">
              Thumbnail Workflow
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Analyze. Improve. Publish.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {workflow.map((item) => (
              <article
                key={item.number}
                className="rounded-3xl border border-white/10 bg-[#0B0F18] p-6"
              >
                <span className="text-sm font-black text-indigo-400">
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
        <div className="rounded-[32px] border border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 p-8 text-center md:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-300">
            Beyond Thumbnails
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Connect thumbnail optimization with your complete content strategy
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-zinc-300">
            Benchmark AI connects thumbnail analysis with YouTube research,
            competitor intelligence, title optimization, SEO, content
            strategy, scripts, and creator workflows.
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
            url: `${BASE_URL}/tools/youtube-thumbnail-analyzer`,
            description:
              "AI-powered YouTube thumbnail analysis and content intelligence platform.",
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