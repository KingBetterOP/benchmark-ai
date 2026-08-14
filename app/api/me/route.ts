import { auth } from "@clerk/nextjs/server";
import { adminDb } from "@/app/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const userRef = adminDb
      .collection("users")
      .doc(userId);

    const userDoc =
      await userRef.get();

    const data =
      userDoc.exists
        ? userDoc.data()
        : undefined;

    const plan =
  data?.plan === "business"
    ? "business"
    : data?.plan === "pro"
    ? "pro"
    : "free";

    const dailyUsage =
      typeof data?.dailyUsage === "number"
        ? data.dailyUsage
        : 0;

    const subscriptionStatus =
      typeof data?.subscriptionStatus === "string"
        ? data.subscriptionStatus
        : null;

    const currentPeriodEnd =
      typeof data?.currentPeriodEnd === "number"
        ? data.currentPeriodEnd
        : null;

    const cancelAtPeriodEnd =
      typeof data?.cancelAtPeriodEnd === "boolean"
        ? data.cancelAtPeriodEnd
        : false;

    return NextResponse.json({
      plan,
      dailyUsage,
      subscriptionStatus,
      currentPeriodEnd,
      cancelAtPeriodEnd,
    });
  } catch (error) {
    console.error(
      "Failed to load user:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load user",
      },
      {
        status: 500,
      }
    );
  }
}