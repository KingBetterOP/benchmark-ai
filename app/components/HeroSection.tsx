import { translations } from "../lib/translations";
type Props = {
  onStart: () => void;
  language: string;
};

export default function HeroSection({
  onStart,
  language,
}: Props) {
  const t =
  translations[language as keyof typeof translations];
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
        {t.heroBadge}
      </div>

      <h1 className="mx-auto max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
        {t.heroTitle1}
        <br />
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {t.heroTitle2}
        </span>
      </h1>

      <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-zinc-400">
  {t.heroDescription}
</p>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <button
          onClick={onStart}
          className="rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
        >
          {t.startBenchmark}
        </button>

        <button className="rounded-2xl border border-zinc-700 bg-zinc-900 px-8 py-4 text-lg transition-all duration-300 hover:border-cyan-500 hover:bg-zinc-800">
          {t.watchDemo}
        </button>
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-8 text-zinc-400">
        <div>{t.featureAI}</div>
<div>{t.featureCompetitor}</div>
<div>{t.featureIdeas}</div>
<div>{t.featureSEO}</div>
<div>{t.featurePDF}</div>
      </div>
    </section>
  );
}