export type AnalyticsEvent =
  | "signup"
  | "login"
  | "search_start"
  | "analysis_complete"
  | "opportunity_view"
  | "decision_view"
  | "creator_generate"
  | "creator_regenerate"
  | "project_save"
  | "pricing_view"
  | "checkout_start"
  | "checkout_success"
  | "purchase_success"
  | "purchase_refunded"
  | "subscription_cancel";
  

type TrackEventOptions = {
  keyword?: string;
  metadata?: Record<string, unknown>;
};

export async function trackEvent(
  event: AnalyticsEvent,
  options: TrackEventOptions = {}
) {
  try {
    await fetch(
      "/api/analytics/event",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          event,

          keyword:
            options.keyword ?? null,

          metadata:
            options.metadata ?? {},
        }),
      }
    );
  } catch (error) {
    /*
     * Analytics failure must NEVER
     * break the main product flow.
     */

    console.error(
      "Analytics tracking failed:",
      error
    );
  }
}