import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { keyword, language } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are a professional YouTube script writer.

Write the ENTIRE response in ${
  language === "ko" ? "Korean" : "English"
}.

Topic:
${keyword}

Requirements:
- Hook in the first 5 seconds
- Length: 60-90 seconds
- Natural spoken style
- Strong ending
- No markdown
- No explanations
- Only output the final script
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