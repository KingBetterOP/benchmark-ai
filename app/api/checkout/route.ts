import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { polar } from "@/app/lib/polar";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const productId =
      process.env.POLAR_PRODUCT_ID;

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL;

    if (!productId) {
      console.error(
        "POLAR_PRODUCT_ID is not configured"
      );

      return NextResponse.json(
        {
          error:
            "Payment configuration is incomplete.",
        },
        { status: 500 }
      );
    }

    if (!appUrl) {
      console.error(
        "NEXT_PUBLIC_APP_URL is not configured"
      );

      return NextResponse.json(
        {
          error:
            "Application URL is not configured.",
        },
        { status: 500 }
      );
    }

    const checkout =
      await polar.checkouts.create({
        products: [productId],

        externalCustomerId: userId,

        metadata: {
          clerkUserId: userId,
          source: "benchmark-ai-pricing",
        },

        successUrl:
          `${appUrl}/success?checkout_id={CHECKOUT_ID}`,
      });

    return NextResponse.json({
      success: true,
      url: checkout.url,
    });
  } catch (error) {
    console.error(
      "Polar checkout creation failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create checkout session",
      },
      {
        status: 500,
      }
    );
  }
}