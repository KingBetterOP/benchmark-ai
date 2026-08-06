"use client";

import { useState } from "react";
import { translations } from "../lib/translations";

type Props = {
  context: string;
  language: string;

  messages: {
    role: "user" | "assistant";
    content: string;
  }[];

  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
      }[]
    >
  >;
};

export default function AIChat({
  context,
  language,
  messages,
  setMessages,
}: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const t =
  translations[language as keyof typeof translations];

  async function askAI() {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  message,
  context,
  messages,
}),
      });

      const data = await res.json();

setMessages((prev) => [
  ...prev,
  {
    role: "user",
    content: message,
  },
  {
    role: "assistant",
    content: data.answer,
  },
]);

setMessage("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-3xl border border-zinc-700 bg-white/5 backdrop-blur-xl p-6">
      <h2 className="text-2xl font-bold">
        {t.askAI}
      </h2>

      <p className="mt-2 text-zinc-400">
        {t.askAIDescription}
      </p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    askAI();
  }
}}
        placeholder={t.askAIPlaceholder}
        className="mt-4 h-32 w-full rounded-3xl border border-zinc-700 bg-white/5 backdrop-blur-xl p-4 text-white outline-none backdrop-blur-xl transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="mt-4 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all px-6 py-3 font-semibold disabled:opacity-50"
      >
        {loading ? t.thinking : t.askAI}
      </button>

      <div className="mt-6 space-y-4">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`rounded-3xl p-4 whitespace-pre-wrap ${
  msg.role === "user"
    ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-white"
    : "bg-white/5 backdrop-blur-xl backdrop-blur-xl border border-zinc-700"
}`}
    >
      <div className="mb-2 font-bold">
  {msg.role === "user"
    ? t.you
    : t.ai}
</div>
      {msg.content}
    </div>
  ))}
</div>
    </div>
  );
}