"use client";

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

        const data = await response.json();

        setAnalysis(data.result);
        const match = data.result.match(/\d+/);

if (match) {
  setScore(Number(match[0]));
}
      } catch (e) {
        setAnalysis(null);
      }

      setLoading(false);
    };

    analyze();
  }, [thumbnail]);

  return (
    <div className="mt-4 rounded-xl border border-purple-500 bg-zinc-900 p-4">
      <h3 className="text-lg font-bold">
        🎨 AI 썸네일 분석
      </h3>
      {score !== null && (
  <div
    className={`mt-3 rounded-lg p-3 text-center text-2xl font-bold ${
      score >= 80
        ? "bg-green-600"
        : score >= 60
        ? "bg-yellow-500"
        : "bg-red-600"
    }`}
  >
    🏆 {score} / 100
  </div>
)}

      <img
        src={thumbnail}
        alt="thumbnail"
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
    <p>😀 표정 : {analysis.expression}</p>
    <p>🎨 색상 : {analysis.colors}</p>
    <p>🔤 텍스트 : {analysis.text}</p>
    <p>📈 CTR 예상 : {analysis.ctr}%</p>
    <p>💡 개선점 : {analysis.improvement}</p>
  </>
)}
</div>
      )}
    </div>
  );
}