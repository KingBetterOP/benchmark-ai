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
  if (!content) return null;
const [copied, setCopied] = useState(false);

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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition hover:border-blue-500">
      <div className="mb-4 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="text-3xl">{icon}</span>

    <h2 className="text-2xl font-bold">
      {title}
    </h2>
  </div>

  <button
    onClick={handleCopy}
    className="rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-800 hover:border-blue-500 transition"
  >
    {copied ? "✅ Copied" : "📋 Copy"}
  </button>
</div>

      <div className="prose prose-invert prose-zinc max-w-none">
  {content.split("\n").map((line, index) => {
    if (!line.trim()) {
      return <br key={index} />;
    }

    return (
      <p key={index} className="mb-3 leading-7 text-gray-300">
        {line}
      </p>
    );
  })}
</div>
    </div>
  );
}