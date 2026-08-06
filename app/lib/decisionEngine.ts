import { DecisionEngine } from "./types";

type Params = {
  demand: number;
  competition: number;
  trend: number;
  ctr: number;
  rpm: number;
  retention: number;
};

export function buildDecisionEngine(
  params: Params
): DecisionEngine {
  const score = Math.round(
  params.demand * 0.30 +
  (100 - params.competition) * 0.25 +
  params.trend * 0.20 +
  params.ctr * 0.10 +
  params.rpm * 0.10 +
  params.retention * 0.05
);
  const reasons: string[] = [];

const actions: string[] = [];

const riskReasons: string[] = [];

  const confidence = Math.min(
    98,
    Math.max(60, score)
  );

  const decision =
    score >= 80
      ? "make"
      : score >= 60
      ? "wait"
      : "skip";

      if (params.demand >= 80) {
  reasons.push("Strong search demand");
}

if (params.competition <= 40) {
  reasons.push("Low competition");
}

if (params.trend >= 75) {
  reasons.push("Trend is growing");
}

if (params.ctr >= 75) {
  reasons.push("High CTR potential");
}

if (params.rpm >= 70) {
  reasons.push("Strong monetization potential");
}

if (params.retention >= 75) {
  reasons.push("High audience retention expected");
}
if (params.trend >= 80) {
  actions.push("Upload within 7 days");
}

if (params.ctr < 70) {
  actions.push("Improve thumbnail design");
}

if (params.retention < 70) {
  actions.push("Make the introduction shorter");
}

if (params.competition > 70) {
  actions.push("Differentiate your title");
}

if (params.rpm >= 80) {
  actions.push("Target long-form content");
}
if (params.competition >= 80) {
  riskReasons.push("Competition is very high");
}

if (params.trend <= 40) {
  riskReasons.push("Search trend is declining");
}

if (params.ctr <= 50) {
  riskReasons.push("Expected CTR is low");
}

if (params.retention <= 50) {
  riskReasons.push("Retention may be weak");
}

  return {
    overallScore: score,

    confidence,

    decision,

    market: {
      demand: params.demand,
      competition: params.competition,
      trend: params.trend,
    },

    performance: {
      ctr: params.ctr,
      rpm: params.rpm,
      retention: params.retention,
    },

    risk: {
  level:
    params.competition > 80
      ? "High"
      : params.competition > 60
      ? "Medium"
      : "Low",

  reasons: riskReasons,
},

reasons,

actions,
  };
}