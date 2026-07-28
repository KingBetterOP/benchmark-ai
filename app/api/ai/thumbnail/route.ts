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
Generate a professional AI image prompt for a YouTube thumbnail.

Topic:
${keyword}

Requirements:
- Cinematic
- Ultra realistic
- High CTR
- Bright colors
- Detailed
- English only

Return only the prompt.
`,
    });

    return NextResponse.json({
      prompt: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        prompt: "Failed to generate thumbnail prompt.",
      },
      {
        status: 500,
      }
    );
  }
}