export async function askAI(
  prompt: string,
  language: string
) {
  console.log("===== ASK AI =====");
  console.log(prompt);

  const response = await fetch("/api/analyze", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      prompt,
      language,
    }),
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      language === "ko"
        ? "AI 서버 응답을 읽을 수 없습니다."
        : "Unable to read AI server response."
    );
  }

  if (!response.ok) {
    console.error("API ERROR:", data);

    if (
      response.status === 403 &&
      data?.upgrade
    ) {
      throw new Error("UPGRADE_REQUIRED");
    }

    throw new Error(
      data?.detail ||
        data?.error ||
        (language === "ko"
          ? "AI 요청 실패"
          : "AI request failed")
    );
  }

  if (
    typeof data?.result !== "string"
  ) {
    console.error(
      "INVALID AI RESULT:",
      data
    );

    throw new Error(
      language === "ko"
        ? "AI 결과 형식이 올바르지 않습니다."
        : "Invalid AI result format."
    );
  }

  console.log("===== AI RESULT =====");
  console.log(data.result);

  return data.result;
}