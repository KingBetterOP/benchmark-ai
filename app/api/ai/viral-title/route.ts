import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Generate 10 viral YouTube titles.

Topic:
${keyword}

Requirements:
- English only
- High CTR
- Curiosity driven
- Natural
- Under 60 characters
- Number each title from 1 to 10
`,
    });

    return NextResponse.json({
      titles: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        titles: "Failed to generate titles.",
      },
      {
        status: 500,
      }
    );
  }
}