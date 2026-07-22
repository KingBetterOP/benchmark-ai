import { adminDb } from "@/app/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userRef = adminDb.collection("users").doc(userId);

  await userRef.set(
    {
      dailyUsage: FieldValue.increment(1),
      plan: "free",
    },
    { merge: true }
  );

  return NextResponse.json({ success: true });
}