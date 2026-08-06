"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
type Analysis = {
  score: number;
  expression: string;
  colors: string;
  text: string;
  ctr: number;
  improvement: string;
};

type Props = {
  thumbnail: string;
};

export default function ThumbnailAnalysis({
  thumbnail,
}: Props) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const analyze = async () => {
      setLoading(true);

      try {
        const response = await fetch("/api/vision", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    imageUrl: thumbnail,
  }),
});

console.log(response.status);
console.log(response.url);

if (!response.ok) {
  throw new Error(`Vision API failed (${response.status})`);
}

const text = await response.text();

console.log("VISION RESPONSE");
console.log(text);

const data = JSON.parse(text);

setAnalysis(data);
setScore(data.score);


      } catch (e) {
  console.error("Vision Error:", e);
  setAnalysis(null);
}

      setLoading(false);
    };

    analyze();
  }, [thumbnail]);

  return (
    <div className="mt-4 rounded-xl border border-purple-500 bg-white/5 backdrop-blur-xl p-4">
      <h3 className="text-lg font-bold">
        🎨 AI 썸네일 분석
      </h3>
      {score !== null && (
  <div
    className={`mt-4 rounded-2xl border p-6 text-center ${
      score >= 80
        ? "border-green-500 bg-green-500/10"
        : score >= 60
        ? "border-yellow-500 bg-yellow-500/10"
        : "border-red-500 bg-red-500/10"
    }`}
  >
    <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
      AI Thumbnail Score
    </p>

    <h2 className="mt-2 text-5xl font-extrabold">
      {score}
      <span className="text-2xl text-zinc-500"> /100</span>
    </h2>
  </div>
)}

      <Image
        src={thumbnail}
        alt="thumbnail"
        width={1280}
        height={720}
        className="mt-3 rounded-lg"
      />

      {loading ? (
        <p className="mt-4 text-gray-400">
          🤖 AI가 썸네일을 분석하는 중...
        </p>
      ) : (
        <div className="mt-4 rounded-lg bg-black/30 p-4 whitespace-pre-line text-sm leading-7">
  {analysis && (
  <>
  <div className="mb-5 grid grid-cols-3 gap-3">

  <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-center">
    <p className="text-xs uppercase text-cyan-300">
      CTR
    </p>

    <h3 className="mt-2 text-2xl font-bold">
      {analysis.ctr}%
    </h3>
  </div>

  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center">
    <p className="text-xs uppercase text-emerald-300">
      Confidence
    </p>

    <h3 className="mt-2 text-2xl font-bold">
      {Math.min(100, analysis.score + 8)}%
    </h3>
  </div>

  <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-center">
    <p className="text-xs uppercase text-yellow-300">
      Grade
    </p>

    <h3 className="mt-2 text-lg font-bold">
      {analysis.score >= 90
        ? "A+"
        : analysis.score >= 80
        ? "A"
        : analysis.score >= 70
        ? "B"
        : analysis.score >= 60
        ? "C"
        : "D"}
    </h3>
  </div>

</div>
    <div className="space-y-4">

  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
    <h4 className="mb-2 font-bold text-emerald-300">
      ✅ Strengths
    </h4>

    <p>😀 {analysis.expression}</p>
    <p>🎨 {analysis.colors}</p>
    <p>🔤 {analysis.text}</p>
  </div>

  <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
    <h4 className="mb-2 font-bold text-orange-300">
      💡 Improvements
    </h4>

    <p>{analysis.improvement}</p>
  </div>

</div>
  </>
)}
</div>
      )}
    </div>
  );
}