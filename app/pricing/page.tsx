export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">

        <h1 className="text-5xl font-bold text-center">
          💎 Pricing
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Choose the plan that's right for you.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-8">
            <h2 className="text-3xl font-bold">
              Free
            </h2>

            <p className="text-5xl font-extrabold mt-4">
              ₩0
            </p>

            <ul className="space-y-3 mt-8 text-gray-300">
              <li>✅ AI Benchmark</li>
              <li>✅ AI Ideas</li>
              <li>✅ PDF Export</li>
              <li>✅ CSV Export</li>
              <li>✅ Local Project Save</li>
            </ul>

            <button
              className="w-full mt-10 rounded-xl bg-zinc-700 py-3 font-bold cursor-not-allowed"
              disabled
            >
              Current Plan
            </button>
          </div>

          <div className="rounded-2xl border-2 border-blue-500 bg-zinc-900 p-8">

            <div className="inline-block rounded-full bg-blue-600 px-3 py-1 text-sm">
              Coming Soon
            </div>

            <h2 className="text-3xl font-bold mt-4">
              Pro
            </h2>

            <p className="text-5xl font-extrabold mt-4">
              ₩9,900
              <span className="text-lg text-gray-400">
                /month
              </span>
            </p>

            <ul className="space-y-3 mt-8 text-gray-300">
              <li>🚀 Unlimited AI Analysis</li>
              <li>☁️ Cloud Project Save</li>
              <li>⚡ Faster AI Queue</li>
              <li>⭐ Early Access Features</li>
              <li>💬 Priority Support</li>
            </ul>

            <button
              className="w-full mt-10 rounded-xl bg-blue-600 py-3 font-bold"
            >
              Join Waitlist
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}