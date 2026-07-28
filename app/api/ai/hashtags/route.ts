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
Generate the best YouTube hashtags.

Topic:
${keyword}

Requirements:
- 20 hashtags
- SEO optimized
- English
- Return only hashtags
`,
    });

    return NextResponse.json({
      hashtags: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        hashtags: "Failed to generate hashtags.",
      },
      {
        status: 500,
      }
    );
  }
}