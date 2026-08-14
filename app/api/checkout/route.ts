import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { polar } from "@/app/lib/polar";

type Plan = "pro" | "business";

export async function POST(req: Request) {
  try {
    /*
    ============================================================
    1. AUTH
    ============================================================
    */

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
    2. REQUEST
    ============================================================
    */

    let body: {
      plan?: unknown;
    };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid request body.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ============================================================
    3. PLAN VALIDATION
    ============================================================
    */

    const plan =
      body.plan === "business"
        ? "business"
        : body.plan === "pro"
        ? "pro"
        : null;

    if (!plan) {
      return NextResponse.json(
        {
          error:
            "A valid plan is required: pro or business.",
        },
        {
          status: 400,
        }
      );
    }

    /*
    ============================================================
    4. PRODUCT ID
    ============================================================
    */

    const productId =
      plan === "business"
        ? process.env.POLAR_BUSINESS_PRODUCT_ID
        : process.env.POLAR_PRO_PRODUCT_ID;

    if (!productId) {
      console.error(
        `Polar product ID is not configured for plan: ${plan}`
      );

      return NextResponse.json(
        {
          error:
            "Payment configuration is incomplete.",
        },
        {
          status: 500,
        }
      );
    }

    /*
    ============================================================
    5. APPLICATION URL
    ============================================================
    */

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL;

    if (!appUrl) {
      console.error(
        "NEXT_PUBLIC_APP_URL is not configured"
      );

      return NextResponse.json(
        {
          error:
            "Application URL is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
    ============================================================
    6. CREATE POLAR CHECKOUT
    ============================================================
    */

    const checkout =
      await polar.checkouts.create({
        products: [productId],

        externalCustomerId: userId,

        metadata: {
          clerkUserId: userId,
          plan,
          source:
            "benchmark-ai-pricing",
        },

        successUrl:
          `${appUrl}/success?checkout_id={CHECKOUT_ID}`,
      });

    /*
    ============================================================
    7. RESPONSE
    ============================================================
    */

    return NextResponse.json({
      success: true,
      plan,
      productId,
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