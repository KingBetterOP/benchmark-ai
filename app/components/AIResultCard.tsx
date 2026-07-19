"use client";

import { useState } from "react";

type AIResultCardProps = {
  title: string;
  icon: string;
  content: string;
};

export default function AIResultCard({
  title,
  icon,
  content,
}: AIResultCardProps) {
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 shadow-xl transition-all duration-300 hover:border-cyan-500 hover:shadow-cyan-500/10">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-3xl">
            {icon}
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {title}
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              AI가 생성한 분석 결과입니다.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:border-cyan-500 hover:bg-zinc-800"
        >
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>

      <div className="space-y-3">
        {content.split("\n").map((line, index) => {
          if (!line.trim()) {
            return <div key={index} className="h-2" />;
          }

          const isHeading =
            line.startsWith("📊") ||
            line.startsWith("🚀") ||
            line.startsWith("💡") ||
            line.startsWith("⚠️") ||
            line.startsWith("🎯");

          if (isHeading) {
            return (
              <h3
                key={index}
                className="mt-6 border-l-4 border-cyan-500 pl-3 text-lg font-semibold text-cyan-400"
              >
                {line}
              </h3>
            );
          }

          return (
            <p
              key={index}
              className="leading-8 text-zinc-300"
            >
              {line}
            </p>
          );
        })}
      </div>
    </div>
  );
}