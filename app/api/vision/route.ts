import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { imageUrl } = await req.json();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
JSON만 출력해.

{
  "score": 0,
  "expression": "",
  "colors": "",
  "text": "",
  "ctr": 0,
  "improvement": ""
}

설명은 절대 하지 말고
JSON만 출력해.
`,
            },
            {
  type: "input_image",
  image_url: imageUrl,
  detail: "auto",
},
          ],
        },
      ],
    });

    let text = response.output_text.trim();

text = text
  .replace(/^```json/, "")
  .replace(/^```/, "")
  .replace(/```$/, "")
  .trim();

const result = JSON.parse(text);

return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Vision API Error",
      },
      {
        status: 500,
      }
    );
  }
}