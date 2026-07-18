export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-8 text-center">
        <h3 className="text-lg font-bold">🚀 Benchmark AI</h3>

        <p className="mt-2 text-sm text-gray-400">
          AI-powered YouTube research and benchmarking platform.
        </p>

        <p className="mt-6 text-xs text-gray-500">
          © 2026 Benchmark AI. Built with Next.js & OpenAI.
        </p>
      </div>
    </footer>
  );
}