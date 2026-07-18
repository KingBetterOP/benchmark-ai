export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-5xl font-bold">
          Contact
        </h1>

        <p className="mt-6 text-center text-gray-400">
          의견이나 문의사항이 있다면 언제든지 연락해주세요.
        </p>

        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">📧 Email</h2>
            <p className="mt-2 text-gray-400">
              your-email@example.com
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold">💻 GitHub</h2>
            <p className="mt-2 text-gray-400">
              https://github.com/your-github
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">🚀 Benchmark AI</h2>
            <p className="mt-2 text-gray-400">
              AI-powered YouTube research platform built with Next.js and OpenAI.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}