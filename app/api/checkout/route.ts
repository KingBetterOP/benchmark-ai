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
console.log("USER:", userId);
console.log("PRODUCT:", process.env.POLAR_PRODUCT_ID);
console.log("ENV:", process.env.POLAR_ENVIRONMENT);
    const checkout = await polar.checkouts.create({
      products: [process.env.POLAR_PRODUCT_ID!],
      externalCustomerId: userId,
      metadata: {
        clerkUserId: userId,
      },
      successUrl: "http://localhost:3000/success",
    });
    console.log("CHECKOUT:", checkout);

    return NextResponse.json({
      url: checkout.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : JSON.stringify(error),
      },
      {
        status: 500,
      }
    );
  }
}