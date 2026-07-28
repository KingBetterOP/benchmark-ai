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
Write a highly engaging YouTube script.

Topic:
${keyword}

Requirements:
- Hook in first 5 seconds
- 60~90 seconds
- Natural spoken English
- Strong ending
`,
    });

    return NextResponse.json({
      script: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        script: "Failed to generate script.",
      },
      {
        status: 500,
      }
    );
  }
}