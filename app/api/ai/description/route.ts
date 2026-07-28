import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5.1-mini",
      input: `
Write a professional YouTube description.

Topic:
${keyword}

Requirements:
- SEO optimized
- Natural English
- Include call-to-action
- Around 150 words
`,
    });

    return NextResponse.json({
      description: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        description: "Failed to generate description.",
      },
      {
        status: 500,
      }
    );
  }
}