import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/app/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const doc = await adminDb
    .collection("users")
    .doc(userId)
    .get();

  const data = doc.data();

  return NextResponse.json({
    plan: data?.plan ?? "free",
    dailyUsage: data?.dailyUsage ?? 0,
  });
}