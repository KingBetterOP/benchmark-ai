"use client";

import { useState } from "react";

type Props = {
  context: string;
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
  messages,
  setMessages,
}: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="mt-10 rounded-2xl border border-zinc-700 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold">
        💬 Ask AI
      </h2>

      <p className="mt-2 text-zinc-400">
        Ask follow-up questions about this benchmark.
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
        placeholder="Example: Why did the top video perform so well?"
        className="mt-4 h-32 w-full rounded-xl border border-zinc-700 bg-black p-4 outline-none"
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="mt-4 rounded-xl bg-red-600 px-6 py-3 font-semibold disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      <div className="mt-6 space-y-4">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`rounded-xl p-4 whitespace-pre-wrap ${
        msg.role === "user"
          ? "bg-red-600 text-white"
          : "bg-black border border-zinc-700"
      }`}
    >
      <div className="mb-2 font-bold">
        {msg.role === "user"
          ? "👤 You"
          : "🤖 AI"}
      </div>

      {msg.content}
    </div>
  ))}
</div>
    </div>
  );
}