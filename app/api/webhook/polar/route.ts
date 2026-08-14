import { Webhooks } from "@polar-sh/nextjs";
import { adminDb } from "@/app/lib/firebase-admin";
import { trackServerEventOnce } from "@/app/lib/analytics-server";

type Plan = "free" | "pro" | "business";

type SubscriptionState = {
  plan: Plan;
  subscriptionStatus?: string;
  currentPeriodEnd?: number | null;
  cancelAtPeriodEnd?: boolean;
};

function getPlanFromProductId(
  productId: unknown
): "pro" | "business" | null {
  if (
    productId ===
    process.env.POLAR_BUSINESS_PRODUCT_ID
  ) {
    return "business";
  }

  if (
    productId ===
    process.env.POLAR_PRO_PRODUCT_ID
  ) {
    return "pro";
  }

  /*
  Legacy compatibility:
  */

  if (
    productId ===
    process.env.POLAR_PRODUCT_ID
  ) {
    return "pro";
  }

  return null;
}

function getPeriodEnd(
  value: unknown
): number | null {
  if (!value) {
    return null;
  }

  try {
    return new Date(
      String(value)
    ).getTime();
  } catch {
    return null;
  }
}

async function setUserSubscription(
  externalId: string | null | undefined,
  state: SubscriptionState
) {
  if (!externalId) {
    console.error(
      "Polar customer externalId not found"
    );

    return;
  }

  await adminDb
    .collection("users")
    .doc(externalId)
    .set(
      {
        ...state,
        updatedAt: Date.now(),
      },
      {
        merge: true,
      }
    );

  console.log(
    `User ${externalId} subscription updated:`,
    state
  );
}

/*
============================================================
POLAR WEBHOOK
============================================================
*/

export const POST = Webhooks({
  webhookSecret:
    process.env.POLAR_WEBHOOK_SECRET!,

  /*
  ============================================================
  PAYLOAD
  ============================================================
  */

  onPayload: async (payload) => {
    console.log(
      "Polar webhook received:",
      payload.type
    );
  },

  /*
  ============================================================
  SUBSCRIPTION ACTIVE
  ============================================================
  */

  onSubscriptionActive: async (
    payload
  ) => {
    const externalId =
      payload.data.customer.externalId;

    const productId =
      payload.data.productId;

    const plan =
      getPlanFromProductId(
        productId
      );

    if (!plan) {
      console.error(
        "Unknown Polar product:",
        productId
      );

      return;
    }

    await setUserSubscription(
      externalId,
      {
        plan,

        subscriptionStatus:
          payload.data.status ??
          "active",

        currentPeriodEnd:
          getPeriodEnd(
            payload.data.currentPeriodEnd
          ),

        cancelAtPeriodEnd:
          payload.data
            .cancelAtPeriodEnd ??
          false,
      }
    );

    console.log(
      `Subscription active: ${externalId} → ${plan}`
    );
  },

  /*
  ============================================================
  SUBSCRIPTION CANCELED
  ============================================================
  
  IMPORTANT:
  Cancellation at period end keeps access.
  ============================================================
  */

  onSubscriptionCanceled: async (
    payload
  ) => {
    const externalId =
      payload.data.customer.externalId;

    const productId =
      payload.data.productId;

    const plan =
      getPlanFromProductId(
        productId
      );

    if (!plan) {
      console.error(
        "Unknown Polar product:",
        productId
      );

      return;
    }

    await setUserSubscription(
      externalId,
      {
        plan,

        subscriptionStatus:
          payload.data.status ??
          "canceled",

        currentPeriodEnd:
          getPeriodEnd(
            payload.data.currentPeriodEnd
          ),

        cancelAtPeriodEnd: true,
      }
    );

    console.log(
      `Subscription canceled at period end: ${externalId} → ${plan}`
    );
  },

  /*
  ============================================================
  SUBSCRIPTION REVOKED
  ============================================================
  
  Immediate access removal.
  ============================================================
  */

  onSubscriptionRevoked: async (
    payload
  ) => {
    const externalId =
      payload.data.customer.externalId;

    await setUserSubscription(
      externalId,
      {
        plan: "free",

        subscriptionStatus:
          "revoked",

        currentPeriodEnd: null,

        cancelAtPeriodEnd: false,
      }
    );

    console.log(
      `Subscription revoked: ${externalId} → free`
    );
  },

  /*
  ============================================================
  SUBSCRIPTION UNCANCELED
  ============================================================
  */

  onSubscriptionUncanceled: async (
    payload
  ) => {
    const externalId =
      payload.data.customer.externalId;

    const productId =
      payload.data.productId;

    const plan =
      getPlanFromProductId(
        productId
      );

    if (!plan) {
      console.error(
        "Unknown Polar product:",
        productId
      );

      return;
    }

    await setUserSubscription(
      externalId,
      {
        plan,

        subscriptionStatus:
          payload.data.status ??
          "active",

        currentPeriodEnd:
          getPeriodEnd(
            payload.data.currentPeriodEnd
          ),

        cancelAtPeriodEnd: false,
      }
    );

    console.log(
      `Subscription uncanceled: ${externalId} → ${plan}`
    );
  },

  /*
  ============================================================
  ORDER PAID
  ============================================================
  */

  onOrderPaid: async (
    payload
  ) => {
    const externalId =
      payload.data.customer.externalId;

    if (!externalId) {
      console.error(
        "Polar order.paid: externalId not found"
      );

      return;
    }

    const orderId =
      payload.data.id;

    if (!orderId) {
      console.error(
        "Polar order.paid: order ID not found"
      );

      return;
    }

    const productId =
      payload.data.productId;

    const plan =
      getPlanFromProductId(
        productId
      );

    if (!plan) {
      console.warn(
        "Ignoring order.paid for unknown product:",
        productId
      );

      return;
    }

    /*
    ==========================================================
    ENSURE PLAN IS CORRECT
    ==========================================================
    */

    await setUserSubscription(
      externalId,
      {
        plan,
        subscriptionStatus:
          "active",
        cancelAtPeriodEnd:
          false,
      }
    );

    console.log(
      `Polar order paid: ${externalId} → ${plan}`
    );

    /*
    ==========================================================
    ANALYTICS
    ==========================================================
    */

    await trackServerEventOnce(
      externalId,
      "purchase_success",
      orderId,
      {
        metadata: {
          source: "polar",
          polarEvent:
            "order.paid",

          orderId,

          plan,

          totalAmount:
            payload.data.totalAmount,

          netAmount:
            payload.data.netAmount,

          currency:
            payload.data.currency,

          billingReason:
            payload.data.billingReason,

          subscriptionId:
            payload.data.subscriptionId ??
            null,

          productId:
            payload.data.productId ??
            null,
        },
      }
    );
  },

  /*
  ============================================================
  ORDER REFUNDED
  ============================================================
  */

  onOrderRefunded: async (
    payload
  ) => {
    const externalId =
      payload.data.customer.externalId;

    if (!externalId) {
      console.error(
        "Polar order.refunded: externalId not found"
      );

      return;
    }

    const orderId =
      payload.data.id;

    if (!orderId) {
      console.error(
        "Polar order.refunded: order ID not found"
      );

      return;
    }

    const productId =
      payload.data.productId;

    const plan =
      getPlanFromProductId(
        productId
      );

    if (!plan) {
      console.warn(
        "Ignoring order.refunded for unknown product:",
        productId
      );

      return;
    }

    const refundedAmount =
      payload.data.refundedAmount ??
      0;

    console.log(
      `Polar order refunded: ${externalId} → ${plan}`
    );

    await trackServerEventOnce(
      externalId,
      "purchase_refunded",
      `${orderId}:refund:${refundedAmount}`,
      {
        metadata: {
          source: "polar",

          polarEvent:
            "order.refunded",

          orderId,

          plan,

          refundedAmount,

          currency:
            payload.data.currency,

          subscriptionId:
            payload.data.subscriptionId ??
            null,

          productId:
            payload.data.productId ??
            null,
        },
      }
    );
  },
});