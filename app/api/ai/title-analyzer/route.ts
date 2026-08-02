import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Return ONLY valid JSON.

{
  "ctrScore": 90,
  "seoScore": 88,
  "emotionScore": 92,
  "curiosityScore": 95,
  "lengthScore": 87,
  "overallScore": 90,
  "improvements": [
    "...",
    "...",
    "..."
  ],
  "betterTitles": [
    "...",
    "...",
    "...",
    "...",
    "..."
  ]
}

Analyze this YouTube title:

${title}

Evaluate:
- Expected CTR
- SEO
- Emotional impact
- Curiosity
- Length
- Overall quality

Return ONLY valid JSON.
`,
    });

    return NextResponse.json(
      JSON.parse(response.output_text)
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ctrScore: 0,
        seoScore: 0,
        emotionScore: 0,
        curiosityScore: 0,
        lengthScore: 0,
        overallScore: 0,
        improvements: [],
        betterTitles: [],
      },
      { status: 500 }
    );
  }
}