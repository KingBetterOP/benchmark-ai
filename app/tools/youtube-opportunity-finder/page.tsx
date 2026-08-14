import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://benchmark-ai-indol.vercel.app";

export const metadata: Metadata = {
  title: "Free YouTube Opportunity Finder",
  description:
    "Find YouTube content opportunities by analyzing demand, competition, trends, content gaps, and market signals with Benchmark AI.",
  keywords: [
    "YouTube Opportunity Finder",
    "YouTube Content Opportunities",
    "YouTube Content Ideas",
    "YouTube Opportunity Score",
    "YouTube Competitor Analysis",
    "YouTube AI",
  ],
  alternates: {
    canonical: `${BASE_URL}/tools/youtube-opportunity-finder`,
  },
  openGraph: {
    title: "Free YouTube Opportunity Finder | Benchmark AI",
    description:
      "Discover high-potential YouTube content opportunities using demand, competition, trend, and market intelligence.",
    url: `${BASE_URL}/tools/youtube-opportunity-finder`,
    siteName: "Benchmark AI",
    type: "website",
  },
};

const opportunitySignals = [
  {
    title: "Demand",
    description:
      "Understand whether audiences are actively interested in a topic.",
  },
  {
    title: "Competition",
    description:
      "Evaluate how difficult it may be to compete against existing content.",
  },
  {
    title: "Trend",
    description:
      "Identify topics with growing, stable, or changing interest.",
  },
  {
    title: "Content Gap",
    description:
      "Find areas where existing content may not fully satisfy audience needs.",
  },
  {
    title: "Market Fit",
    description:
      "Consider whether a topic fits the broader content market and creator strategy.",
  },
  {
    title: "Opportunity Score",
    description:
      "Combine multiple signals into a clearer decision about what may be worth creating.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Enter a topic",
    description:
      "Start with a keyword, idea, or YouTube niche.",
  },
  {
    number: "02",
    title: "Analyze the market",
    description:
      "Evaluate demand, competition, trends, and existing content.",
  },
  {
    number: "03",
    title: "Score opportunities",
    description:
      "Compare signals to identify stronger content opportunities.",
  },
  {
    number: "04",
    title: "Create strategically",
    description:
      "Turn the best opportunity into a differentiated video.",
  },
];

const faqs = [
  {
    question: "What is a YouTube opportunity finder?",
    answer:
      "A YouTube opportunity finder helps creators identify topics that may be worth creating content about by considering factors such as demand, competition, trends, and content gaps.",
  },
  {
    question: "What makes a YouTube topic a good opportunity?",
    answer:
      "A strong opportunity can combine meaningful audience demand with manageable competition and a clear way to create useful or differentiated content.",
  },
  {
    question: "Does a high opportunity score guarantee views?",
    answer:
      "No. An opportunity score is a decision-support signal, not a guarantee of views or revenue. Actual performance depends on content quality, audience response, distribution, competition, and many other factors.",
  },
  {
    question: "What can I do after finding an opportunity?",
    answer:
      "Benchmark AI can connect opportunity research with competitor analysis, content gaps, titles, thumbnails, SEO, scripts, content strategy, and creator workflows.",
  },
];

export default function YouTubeOpportunityFinderPage() {
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
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[180px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 text-center">
          <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/5 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
            YouTube Opportunity Intelligence
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Find Your Next
            <br />
            <span className="bg-gradient-to-r from-emerald-300 via-white to-cyan-400 bg-clip-text text-transparent">
              YouTube Opportunity
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
            Discover content opportunities by combining demand, competition,
            trends, content gaps, and market intelligence before you create.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-bold shadow-xl shadow-emerald-500/20 transition hover:scale-[1.02] hover:shadow-emerald-500/40"
            >
              Find Opportunities for Free →
            </Link>

            <Link
              href="/pricing"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-zinc-200 transition hover:border-emerald-400/30"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Opportunity Signals
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Look at the whole market before deciding
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-zinc-400">
            A promising topic is rarely defined by one metric. Benchmark AI
            combines multiple signals to make content decisions more informed.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {opportunitySignals.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-emerald-400/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-lg text-emerald-300">
                ✦
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
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
              Opportunity Workflow
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Discover. Score. Create.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {workflow.map((item) => (
              <article
                key={item.number}
                className="rounded-3xl border border-white/10 bg-[#0B0F18] p-6"
              >
                <span className="text-sm font-black text-emerald-400">
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
        <div className="rounded-[32px] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-8 text-center md:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
            From Opportunity to Execution
          </p>

          <h2 className="mt-4 text-3xl font-black md:text-5xl">
            Don't stop at finding the opportunity
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-zinc-300">
            Benchmark AI connects opportunity discovery with decision
            intelligence, competitor research, content gaps, titles,
            thumbnails, SEO, scripts, and creator workflows.
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
            url: `${BASE_URL}/tools/youtube-opportunity-finder`,
            description:
              "AI-powered YouTube opportunity discovery and content intelligence platform.",
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