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
Return ONLY valid JSON.

{
  "titles":[
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "..."
  ],
  "hook":"",
  "script":"",
  "description":"",
  "hashtags":[
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "...",
    "..."
  ],
  "thumbnailPrompt":""
}

Topic:
${keyword}

English only.
`,
    });

    const text = response.output_text;

    return NextResponse.json(
      JSON.parse(text)
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        titles: [],
        hook: "",
        script: "",
        description: "",
        hashtags: [],
        thumbnailPrompt: "",
      },
      {
        status: 500,
      }
    );
  }
}