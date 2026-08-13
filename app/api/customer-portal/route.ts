import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { polar } from "@/app/lib/polar";

export async function POST() {
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

    /*
    ============================================================
    CREATE CUSTOMER PORTAL SESSION
    ============================================================
    */

    const customerSession =
      await polar.customerSessions.create({
        externalCustomerId: userId,
      });

    return NextResponse.json({
      success: true,
      url: customerSession.customerPortalUrl,
    });
  } catch (error) {
    console.error(
      "Customer portal creation failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create customer portal",
      },
      {
        status: 500,
      }
    );
  }
}