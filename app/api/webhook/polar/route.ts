import { Webhooks } from "@polar-sh/nextjs";
import { adminDb } from "@/app/lib/firebase-admin";
import { trackServerEventOnce } from "@/app/lib/analytics-server";


type Plan = "free" | "pro";

type SubscriptionState = {
  plan: Plan;
  subscriptionStatus?: string;
  currentPeriodEnd?: number | null;
  cancelAtPeriodEnd?: boolean;
};

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

export const POST = Webhooks({
  webhookSecret:
    process.env.POLAR_WEBHOOK_SECRET!,

  /*
  ============================================================
  PAYLOAD LOG
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

    await setUserSubscription(
      externalId,
      {
        plan: "pro",
        subscriptionStatus:
          "active",

        currentPeriodEnd:
          payload.data.currentPeriodEnd
            ? new Date(
                payload.data.currentPeriodEnd
              ).getTime()
            : null,

        cancelAtPeriodEnd:
          payload.data
            .cancelAtPeriodEnd ??
          false,
      }
    );
  },

  /*
  ============================================================
  SUBSCRIPTION CANCELED
  ============================================================
  
  IMPORTANT:
  Cancellation at the end of the
  billing period does NOT immediately
  remove Pro access.
  */

  onSubscriptionCanceled: async (
    payload
  ) => {
    const externalId =
      payload.data.customer.externalId;

    await setUserSubscription(
      externalId,
      {
        plan: "pro",

        subscriptionStatus:
  payload.data.status ?? "active",

        currentPeriodEnd:
          payload.data.currentPeriodEnd
            ? new Date(
                payload.data.currentPeriodEnd
              ).getTime()
            : null,

        cancelAtPeriodEnd: true,
      }
    );

    console.log(
      `Subscription canceled for ${externalId}`
    );
  },

  /*
  ============================================================
  SUBSCRIPTION REVOKED
  ============================================================
  
  Immediate access removal.
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

    await setUserSubscription(
      externalId,
      {
        plan: "pro",

        subscriptionStatus:
          "active",

        currentPeriodEnd:
          payload.data.currentPeriodEnd
            ? new Date(
                payload.data.currentPeriodEnd
              ).getTime()
            : null,

        cancelAtPeriodEnd: false,
      }
    );
  },
      /*
  ============================================================
  ORDER PAID
  ============================================================
  
  The Polar order ID is used as the idempotency key.

  If Polar delivers the same webhook more than once,
  purchase_success is recorded only once.
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

if (
  productId !==
  process.env.POLAR_PRODUCT_ID
) {
  console.warn(
    "Ignoring order.paid for unknown product:",
    productId
  );

  return;
}

    console.log(
      `💰 Polar order paid for ${externalId}: ${orderId}`
    );

    await trackServerEventOnce(
  externalId,
  "purchase_success",
  orderId,
  {
    metadata: {
      source: "polar",
      polarEvent: "order.paid",

      orderId,

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

  Polar sends this event for both full and partial refunds.

  The order ID + refunded amount are included in the
  idempotency key so repeated webhook deliveries do not
  create duplicate analytics events.
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
    "Polar order.paid: order ID not found"
  );

  return;
}

const productId =
  payload.data.productId;

if (
  productId !==
  process.env.POLAR_PRODUCT_ID
) {
  console.warn(
    "Ignoring order.paid for unknown product:",
    productId
  );

  return;
}

    const refundedAmount =
      payload.data.refundedAmount ?? 0;

    console.log(
      `💸 Polar order refunded for ${externalId}: ${orderId}`
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

      refundedAmount,

      currency:
        payload.data.currency,

      subscriptionId:
        payload.data.subscriptionId ??
        null,
    },
  }
);
  },
});