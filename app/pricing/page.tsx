"use client";
import { translations } from "../lib/translations";
import { useLanguage } from "../hooks/useLanguage";
export default function PricingPage() {
  const { language } = useLanguage();

const t =
  translations[language as keyof typeof translations];
  const handleUpgrade = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });

      const body = await res.json();

      

      if (!res.ok) {
        alert(JSON.stringify(body));
        return;
      }

      window.location.href = body.url;
    } catch (error) {
      console.error(error);
      alert(t.pricingError);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-xl rounded-xl border border-zinc-700 bg-white/5 backdrop-blur-xl p-8 text-center">
        <h1 className="text-4xl font-bold">
  {t.pricingTitle}
</h1>

        <p className="mt-4 text-gray-400">
  {t.pricingSubtitle}
</p>

        <div className="mt-8 rounded-lg bg-zinc-800 p-6">
          <p className="text-2xl font-bold">
  {t.pricingPrice}
</p>

          <ul className="mt-4 space-y-2 text-left">
            <li>{t.pricingFeature1}</li>
            <li>{t.pricingFeature2}</li>
            <li>{t.pricingFeature3}</li>
            <li>{t.pricingFeature4}</li>
          </ul>
        </div>

        <button
          onClick={handleUpgrade}
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-bold hover:bg-blue-700"
        >
          {t.pricingButton}
        </button>
      </div>
    </main>
  );
}