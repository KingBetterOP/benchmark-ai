export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold text-center">
          About Benchmark AI
        </h1>

        <p className="mt-8 text-lg text-gray-300 leading-8">
          Benchmark AI는 YouTube 크리에이터를 위한 AI 기반 리서치 플랫폼입니다.
        </p>

        <p className="mt-6 text-gray-400 leading-8">
          키워드를 검색하면 경쟁 채널을 분석하고,
          콘텐츠 아이디어, 제목 추천, 경쟁 분석,
          PDF 및 CSV 리포트를 빠르게 생성할 수 있습니다.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-bold">🔍 Research</h2>
            <p className="mt-3 text-gray-400">
              경쟁 채널과 영상을 빠르게 분석합니다.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-bold">🤖 AI Insights</h2>
            <p className="mt-3 text-gray-400">
              AI가 콘텐츠 아이디어와 전략을 제안합니다.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-bold">📄 Export</h2>
            <p className="mt-3 text-gray-400">
              결과를 PDF와 CSV로 저장할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}