"use client";

export default function PricingPage() {
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
      alert("결제 페이지를 불러오지 못했습니다.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-xl rounded-xl border border-zinc-700 bg-zinc-900 p-8 text-center">
        <h1 className="text-4xl font-bold">💎 Upgrade to Pro</h1>

        <p className="mt-4 text-gray-400">
          무료 플랜은 하루 3회까지 AI 분석이 가능합니다.
        </p>

        <div className="mt-8 rounded-lg bg-zinc-800 p-6">
          <p className="text-2xl font-bold">$19 / month</p>

          <ul className="mt-4 space-y-2 text-left">
            <li>✅ Unlimited AI Analysis</li>
            <li>✅ Unlimited Reports</li>
            <li>✅ Priority Speed</li>
            <li>✅ Future Features Included</li>
          </ul>
        </div>

        <button
          onClick={handleUpgrade}
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-bold hover:bg-blue-700"
        >
          Upgrade
        </button>
      </div>
    </main>
  );
}