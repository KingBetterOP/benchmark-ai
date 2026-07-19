import { adminDb } from "@/app/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { userId } = await auth();

if (!userId) {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  );
}
const userRef = adminDb.collection("users").doc(userId);
const userSnap = await userRef.get();

if (!userSnap.exists) {
  await userRef.set({
  plan: "free",
  dailyUsage: 0,
  lastReset: new Date().toISOString().split("T")[0],
  createdAt: FieldValue.serverTimestamp(),
});
}

const userData = (await userRef.get()).data()!;
const today = new Date().toISOString().split("T")[0];

if (userData.lastReset !== today) {
  await userRef.update({
    dailyUsage: 0,
    lastReset: today,
  });

  userData.dailyUsage = 0;
}
if (userData.plan === "free" && userData.dailyUsage >= 3) {
  return NextResponse.json(
    {
      error: "Daily limit reached",
      upgrade: true,
    },
    { status: 403 }
  );
}
  try {
    const { prompt } = await request.json();

    const response = await openai.chat.completions.create({
  model: "gpt-4.1-mini",
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],
});

await userRef.update({
  dailyUsage: FieldValue.increment(1),
});

return NextResponse.json({
  result: response.choices[0].message.content,
});
  } catch (error) {
    console.error("OPENAI ERROR");
console.error(error);

    return NextResponse.json(
  {
    error: "AI 분석 실패",
    detail: String(error),
  },
  { status: 500 }
);
  }
}