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
"uploadStrategy":"",
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

Write the ENTIRE response in ${
  language === "ko" ? "Korean" : "English"
}.

Requirements:
- Return ONLY valid JSON
- Do NOT use markdown
- Do NOT wrap JSON in code blocks
- Generate 10 highly clickable YouTube titles
- Generate a strong 5-second hook
- Generate a complete 60-90 second script
- Generate an SEO-optimized description
- Generate exactly 20 hashtags
- Generate a high-CTR thumbnail prompt
- Generate the best upload strategy
- Recommend the best upload time
- Identify the ideal target audience
- Generate SEO keywords
- Generate a pinned comment
- Generate a community post
- Estimate a viral score from 0 to 100
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