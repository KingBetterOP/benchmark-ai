import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      keyword,
      language,
      instruction,
    } = await req.json();

    if (!keyword?.trim()) {
      return NextResponse.json(
        {
          error: "Keyword is required.",
        },
        {
          status: 400,
        }
      );
    }

    const growthInstruction =
      instruction?.trim() ||
      "Create a highly engaging opening hook and script designed to maximize viewer retention.";

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are a professional YouTube script writer and audience-retention strategist.

Write the ENTIRE response in ${
        language === "ko" ? "Korean" : "English"
      }.

Topic:
${keyword}

GROWTH PLAN INSTRUCTION:
${growthInstruction}

Apply the Growth Plan instruction directly to the script.

Requirements:
- Create an extremely strong hook within the first 5 seconds.
- Immediately establish curiosity, tension, value, or an unexpected payoff.
- Maintain strong viewer retention throughout the script.
- Length: 60-90 seconds.
- Natural spoken style.
- Clear narrative progression.
- Avoid unnecessary filler.
- Deliver a satisfying and memorable ending.
- Make the script feel natural for a real YouTube creator.
- No markdown.
- No explanations.
- Only output the final script.
`,
    });

    return NextResponse.json({
      success: true,
      script: response.output_text.trim(),
    });
  } catch (error) {
    console.error(
      "Script generation error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to generate script.",
      },
      {
        status: 500,
      }
    );
  }
}