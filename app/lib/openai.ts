export async function askAI(prompt: string) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!response.ok) {
    throw new Error("AI 요청 실패");
  }

  const data = await response.json();

  return data.result;
}

