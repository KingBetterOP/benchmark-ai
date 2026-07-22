import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message, context, messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
  {
    role: "system",
    content:
      "You are a professional YouTube growth strategist. Answer using the benchmark context provided and continue the conversation naturally.",
  },

  {
    role: "user",
    content: `Benchmark Context:

${context}`,
  },

  ...messages,

  {
    role: "user",
    content: message,
  },
],
    });

    return NextResponse.json({
      answer:
        completion.choices[0].message.content ??
        "No response.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Chat failed" },
      { status: 500 }
    );
  }
}