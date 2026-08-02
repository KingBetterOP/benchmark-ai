import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { script } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Return ONLY valid JSON.

{
  "hookScore": 90,
  "retentionScore": 87,
  "clarityScore": 92,
  "engagementScore": 88,
  "ctaScore": 75,
  "overallScore": 89,
  "strengths": [
    "...",
    "...",
    "..."
  ],
  "weaknesses": [
    "...",
    "...",
    "..."
  ],
  "improvedHook": "",
  "estimatedWatchTime": "62%"
}

Analyze this YouTube script:

${script}

Evaluate:
- Hook quality
- Viewer retention
- Clarity
- Engagement
- CTA effectiveness
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
        hookScore: 0,
        retentionScore: 0,
        clarityScore: 0,
        engagementScore: 0,
        ctaScore: 0,
        overallScore: 0,
        strengths: [],
        weaknesses: [],
        improvedHook: "",
        estimatedWatchTime: "0%",
      },
      { status: 500 }
    );
  }
}