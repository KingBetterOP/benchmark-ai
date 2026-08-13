import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { adminDb } from "@/app/lib/firebase-admin";

export const dynamic = "force-dynamic";

/* ============================================================
   TYPES
============================================================ */

type AnalyticsEvent = {
  event?: unknown;
  userId?: unknown;
  keyword?: unknown;
  metadata?: unknown;
  createdAt?: unknown;
};

type EventCount = {
  event: string;
  count: number;
};

/* ============================================================
   HELPERS
============================================================ */

function getTimestamp(
  value: unknown
): number {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  if (
    value &&
    typeof value === "object"
  ) {
    const timestamp =
      value as {
        toMillis?: () => number;
      };

    if (
      typeof timestamp.toMillis ===
      "function"
    ) {
      return timestamp.toMillis();
    }
  }

  return 0;
}

function isWithin(
  timestamp: number,
  start: number
): boolean {
  return timestamp >= start;
}
function getMetadata(
  value: unknown
): Record<string, unknown> {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as Record<
      string,
      unknown
    >;
  }

  return {};
}

function getNumber(
  value: unknown
): number {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  return 0;
}

function getString(
  value: unknown
): string | null {
  return typeof value === "string"
    ? value
    : null;
}

/* ============================================================
   GET ADMIN ANALYTICS
============================================================ */

export async function GET() {
  try {
    /* ========================================================
       1. AUTH
    ======================================================== */

    const { userId } =
      await auth();

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

    /* ========================================================
       2. ADMIN CHECK
    ======================================================== */

    const adminUserId =
      process.env.ADMIN_USER_ID;

    if (
      !adminUserId ||
      userId !== adminUserId
    ) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    /* ========================================================
       3. LOAD ANALYTICS EVENTS
    ======================================================== */

    const snapshot =
      await adminDb
        .collection(
          "analyticsEvents"
        )
        .get();

    const events: AnalyticsEvent[] =
      snapshot.docs.map(
        (doc) =>
          doc.data() as AnalyticsEvent
      );

    /* ========================================================
       4. TIME WINDOWS
    ======================================================== */

    const now = Date.now();

    const dayStart =
      now -
      24 *
        60 *
        60 *
        1000;

    const sevenDaysStart =
      now -
      7 *
        24 *
        60 *
        60 *
        1000;

    const thirtyDaysStart =
      now -
      30 *
        24 *
        60 *
        60 *
        1000;

    /* ========================================================
       5. EVENT COUNTS
    ======================================================== */

    const eventMap =
      new Map<string, number>();

    const uniqueUsers =
      new Set<string>();

    const todayUsers =
      new Set<string>();

    const sevenDayUsers =
      new Set<string>();

    const thirtyDayUsers =
      new Set<string>();

    for (const item of events) {
      const event =
        typeof item.event ===
        "string"
          ? item.event
          : "";

      if (!event) {
        continue;
      }

      eventMap.set(
        event,
        (eventMap.get(event) ?? 0) +
          1
      );

      const timestamp =
        getTimestamp(
          item.createdAt
        );

      const eventUserId =
        typeof item.userId ===
        "string"
          ? item.userId
          : "";

      if (eventUserId) {
        uniqueUsers.add(
          eventUserId
        );

        if (
          isWithin(
            timestamp,
            dayStart
          )
        ) {
          todayUsers.add(
            eventUserId
          );
        }

        if (
          isWithin(
            timestamp,
            sevenDaysStart
          )
        ) {
          sevenDayUsers.add(
            eventUserId
          );
        }

        if (
          isWithin(
            timestamp,
            thirtyDaysStart
          )
        ) {
          thirtyDayUsers.add(
            eventUserId
          );
        }
      }
    }

    /* ========================================================
       6. HELPER
    ======================================================== */

    const countEvent =
      (eventName: string) =>
        eventMap.get(
          eventName
        ) ?? 0;

    /* ========================================================
       7. KPI
    ======================================================== */

    const totalEvents =
      events.length;

    const searchStarts =
      countEvent(
        "search_start"
      );

    const analysisCompleted =
      countEvent(
        "analysis_complete"
      );

    const creatorGenerated =
      countEvent(
        "creator_generate"
      );

    const creatorRegenerated =
      countEvent(
        "creator_regenerate"
      );

    const pricingViews =
      countEvent(
        "pricing_view"
      );

    const checkoutStarts =
      countEvent(
        "checkout_start"
      );

    const purchaseSuccess =
      countEvent(
        "purchase_success"
      );

    const purchaseRefunded =
  countEvent(
    "purchase_refunded"
  );

  /* ========================================================
   REVENUE / REFUND CALCULATION
======================================================== */

type PaidOrder = {
  orderId: string;
  totalAmount: number;
  netAmount: number;
  refundedAmount: number;
  currency: string;
};

const paidOrders =
  new Map<string, PaidOrder>();

for (const item of events) {
  const event =
    typeof item.event ===
    "string"
      ? item.event
      : "";

  if (
    event !==
    "purchase_success"
  ) {
    continue;
  }

  const metadata =
    getMetadata(
      item.metadata
    );

  const orderId =
    getString(
      metadata.orderId
    );

  if (!orderId) {
    continue;
  }

  const totalAmount =
    getNumber(
      metadata.totalAmount
    );

  const netAmount =
    getNumber(
      metadata.netAmount
    );

  const currency =
    getString(
      metadata.currency
    ) ?? "usd";

  paidOrders.set(
    orderId,
    {
      orderId,

      totalAmount,

      netAmount,

      refundedAmount: 0,

      currency,
    }
  );
}
for (const item of events) {
  const event =
    typeof item.event ===
    "string"
      ? item.event
      : "";

  if (
    event !==
    "purchase_refunded"
  ) {
    continue;
  }

  const metadata =
    getMetadata(
      item.metadata
    );

  const orderId =
    getString(
      metadata.orderId
    );

  if (!orderId) {
    continue;
  }

  const refundedAmount =
    getNumber(
      metadata.refundedAmount
    );

  const order =
    paidOrders.get(
      orderId
    );

  if (!order) {
    continue;
  }

  /*
   * Polar's refunded amount represents
   * the refund amount associated with
   * the order.
   */

  order.refundedAmount =
    Math.max(
      order.refundedAmount,
      refundedAmount
    );
}
let grossRevenue = 0;
let refundedRevenue = 0;
let netRevenue = 0;

for (const order of paidOrders.values()) {
  grossRevenue +=
    order.totalAmount;

  refundedRevenue +=
    order.refundedAmount;

  netRevenue +=
    Math.max(
      order.totalAmount -
        order.refundedAmount,
      0
    );
}

const refundRate =
  grossRevenue > 0
    ? Number(
        (
          (refundedRevenue /
            grossRevenue) *
          100
        ).toFixed(2)
      )
    : 0;

    /* ========================================================
       8. CONVERSION RATES
    ======================================================== */

    const analysisRate =
      searchStarts > 0
        ? Number(
            (
              (analysisCompleted /
                searchStarts) *
              100
            ).toFixed(2)
          )
        : 0;

    const creatorRate =
      analysisCompleted > 0
        ? Number(
            (
              (creatorGenerated /
                analysisCompleted) *
              100
            ).toFixed(2)
          )
        : 0;

    const checkoutRate =
      pricingViews > 0
        ? Number(
            (
              (checkoutStarts /
                pricingViews) *
              100
            ).toFixed(2)
          )
        : 0;

    const purchaseRate =
      checkoutStarts > 0
        ? Number(
            (
              (purchaseSuccess /
                checkoutStarts) *
              100
            ).toFixed(2)
          )
        : 0;

    const overallConversionRate =
      pricingViews > 0
        ? Number(
            (
              (purchaseSuccess /
                pricingViews) *
              100
            ).toFixed(2)
          )
        : 0;

    /* ========================================================
       9. EVENT BREAKDOWN
    ======================================================== */

    const eventBreakdown: EventCount[] =
      Array.from(
        eventMap.entries()
      )
        .map(
          ([event, count]) => ({
            event,
            count,
          })
        )
        .sort(
          (a, b) =>
            b.count - a.count
        );

    /* ========================================================
       10. RECENT EVENTS
    ======================================================== */

    const recentEvents =
      events
        .map((item) => ({
          event:
            typeof item.event ===
            "string"
              ? item.event
              : "unknown",

          userId:
            typeof item.userId ===
            "string"
              ? item.userId
              : null,

          keyword:
            typeof item.keyword ===
            "string"
              ? item.keyword
              : null,

          metadata:
            item.metadata ?? null,

          createdAt:
            getTimestamp(
              item.createdAt
            ),
        }))
        .sort(
          (a, b) =>
            b.createdAt -
            a.createdAt
        )
        .slice(0, 100);

    /* ========================================================
       11. RETURN
    ======================================================== */

    return NextResponse.json({
      success: true,

      generatedAt: now,
revenue: {
  grossRevenue,
  refundedRevenue,
  netRevenue,
  refundRate,

  currency:
    paidOrders.size > 0
      ? Array.from(
          paidOrders.values()
        )[0].currency
      : "usd",

  paidOrders:
    paidOrders.size,
},
      users: {
        total: uniqueUsers.size,

        today:
          todayUsers.size,

        last7Days:
          sevenDayUsers.size,

        last30Days:
          thirtyDayUsers.size,
      },

      events: {
        total: totalEvents,

        searchStarts,

        analysisCompleted,

        creatorGenerated,

        creatorRegenerated,

        pricingViews,

        checkoutStarts,

        purchaseSuccess,

        purchaseRefunded,
      },

      conversion: {
        analysisRate,

        creatorRate,

        checkoutRate,

        purchaseRate,

        overallConversionRate,
      },

      funnel: {
        search: searchStarts,

        analysis:
          analysisCompleted,

        creator:
          creatorGenerated,

        pricing:
          pricingViews,

        checkout:
          checkoutStarts,

        purchase:
          purchaseSuccess,
      },

      eventBreakdown,

      recentEvents,
    });
  } catch (error) {
    console.error(
      "Admin analytics failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load analytics.",
      },
      {
        status: 500,
      }
    );
  }
}