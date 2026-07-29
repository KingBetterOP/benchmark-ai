"use client";

import { translations } from "../lib/translations";
import { useLanguage } from "../hooks/useLanguage";
export default function About() {
  const { language } = useLanguage();
  const t =
  translations[language as keyof typeof translations];
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold text-center">
  {t.aboutTitle}
</h1>

        <p className="mt-8 text-lg text-gray-300 leading-8">
  {t.aboutDescription1}
</p>

        <p className="mt-6 text-gray-400 leading-8">
  {t.aboutDescription2}
</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-bold">
  {t.researchTitle}
</h2>
            <p className="mt-3 text-gray-400">
  {t.researchDescription}
</p>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-bold">
  {t.insightsTitle}
</h2>
            <p className="mt-3 text-gray-400">
  {t.insightsDescription}
</p>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-bold">
  {t.exportTitle}
</h2>
            <p className="mt-3 text-gray-400">
  {t.exportDescription}
</p>
          </div>
        </div>
      </div>
    </main>
  );
}