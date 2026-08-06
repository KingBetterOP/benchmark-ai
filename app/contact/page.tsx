"use client";

import { translations } from "../lib/translations";
import { useLanguage } from "../hooks/useLanguage";
export default function ContactPage() {
  const { language } = useLanguage();

const t =
  translations[language as keyof typeof translations];
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-5xl font-bold">
  {t.contactTitle}
</h1>

        <p className="mt-6 text-center text-gray-400">
  {t.contactSubtitle}
</p>

        <div className="mt-12 rounded-2xl border border-zinc-800 bg-white/5 backdrop-blur-xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
  {t.contactEmail}
</h2>
            <p className="mt-2 text-gray-400">
              benchmarkayi@gmail.com
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
  {t.contactGithub}
</h2>
            <p className="mt-2 text-gray-400">
              https://github.com/KingBetterOP
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
  {t.contactBenchmark}
</h2>
            <p className="mt-2 text-gray-400">
  {t.contactDescription}
</p>
          </div>
        </div>
      </div>
    </main>
  );
}