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
  "thumbnailPrompt":"",
"uploadStrategy":""
"uploadTime":"",
"targetAudience":"",
"seoKeywords":[
  "...",
  "...",
  "..."
],
"pinnedComment":"",
"communityPost":"",
"viralScore":90
}

Topic:
${keyword}
Also generate:

- The best upload strategy
- The best upload time
- The ideal audience
- The expected performance
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
        uploadStrategy: "",
      },
      {
        status: 500,
      }
    );
  }
}