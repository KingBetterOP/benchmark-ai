import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: `
You are a YouTube growth expert.

Generate exactly 5 highly clickable English YouTube titles for:

${keyword}

Return ONLY a JSON array.

Example:
[
"Title 1",
"Title 2",
"Title 3",
"Title 4",
"Title 5"
]
`,
    });

    const text = response.output_text;

    return NextResponse.json({
      titles: JSON.parse(text),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate titles.",
      },
      {
        status: 500,
      }
    );
  }
}