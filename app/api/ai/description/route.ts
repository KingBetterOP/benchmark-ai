import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { keyword, language } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-5.1-mini",
      input: `
You are a professional YouTube SEO expert.

Write the ENTIRE response in ${
  language === "ko" ? "Korean" : "English"
}.

Create an SEO-optimized YouTube description for this topic.

Topic:
${keyword}

Requirements:
- Around 150-200 words
- Natural and engaging
- Include important keywords naturally
- Include a clear call-to-action
- Optimize for YouTube search
- No markdown
- No explanations
- Output only the final description
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