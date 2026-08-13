import OpenAI from "openai";

const apiKey =
  process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "OPENAI_API_KEY is not configured."
  );
}

const openai =
  new OpenAI({
    apiKey,
  });

export async function askAIServer(
  prompt: string,
  language: string
): Promise<string> {
  if (
    !prompt ||
    !prompt.trim()
  ) {
    throw new Error(
      "AI prompt is required."
    );
  }

  const normalizedLanguage =
    language === "ko"
      ? "ko"
      : "en";

  const response =
    await openai.chat.completions.create(
      {
        model:
          "gpt-4.1-mini",

        temperature: 0.4,

        messages: [
          {
            role: "system",

            content:
              normalizedLanguage ===
              "ko"
                ? `
당신은 Benchmark AI의 핵심 YouTube Intelligence Engine입니다.

정확하고 실용적인 분석을 제공하세요.

사용자의 요청에서 요구하는 경우 반드시 유효한 JSON만 반환하세요.

JSON 외의 설명, Markdown code fence, 앞뒤 문장은 출력하지 마세요.

추측이 필요한 경우 과도한 확정 표현을 피하세요.
`
                : `
You are the core YouTube Intelligence Engine for Benchmark AI.

Provide accurate and practical analysis.

When structured output is requested, return valid JSON only.

Do not include Markdown code fences or surrounding commentary.

Avoid presenting uncertain estimates as guaranteed facts.
`,
          },

          {
            role: "user",
            content: prompt,
          },
        ],
      }
    );

  const result =
    response.choices[0]
      ?.message
      ?.content;

  if (
    typeof result !== "string" ||
    !result.trim()
  ) {
    throw new Error(
      "EMPTY_AI_RESULT"
    );
  }

  return result;
}