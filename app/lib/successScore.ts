import { Video } from "./types";
import { calculateViralScore } from "./viralScore";
import { predictCTR } from "./ctrPredictor";
import { getCompetition } from "./competition";

export function getSuccessScore(video: Video, benchmarkScore: number) {
  const viral = calculateViralScore(video);
  const ctr = Number(predictCTR(video));

  const competition = getCompetition(video);

  let competitionBonus = 0;

  if (competition.text.includes("Easy")) {
    competitionBonus = 10;
  } else if (competition.text.includes("Medium")) {
    competitionBonus = 5;
  }

  const score =
    benchmarkScore * 0.4 +
    viral * 0.3 +
    ctr * 3 +
    competitionBonus;

  return Math.min(Math.round(score), 100);
}