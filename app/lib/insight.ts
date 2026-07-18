import { Video } from "./types";
import { calculateViralScore } from "./viralScore";
import { predictCTR } from "./ctrPredictor";
import { getCompetition } from "./competition";

export function getAIInsight(video: Video) {
  const viral = calculateViralScore(video);
  const ctr = Number(predictCTR(video));
  const competition = getCompetition(video);

  const insights: string[] = [];

  // Viral
  if (viral >= 90) {
    insights.push("🔥 매우 높은 바이럴 가능성을 가진 영상입니다.");
  } else if (viral >= 70) {
    insights.push("📈 안정적인 확산력을 기대할 수 있습니다.");
  } else {
    insights.push("⚠️ 바이럴 잠재력이 다소 낮습니다.");
  }

  // CTR
  if (ctr >= 8) {
    insights.push("🎯 썸네일과 제목의 클릭 유도가 매우 강합니다.");
  } else if (ctr >= 6) {
    insights.push("👍 평균 이상의 클릭률이 예상됩니다.");
  } else {
    insights.push("📝 제목이나 썸네일 개선 여지가 있습니다.");
  }

  // Competition
  if (competition.text.includes("Easy")) {
    insights.push("🟢 경쟁도가 낮아 진입하기 좋은 주제입니다.");
  } else if (competition.text.includes("Medium")) {
    insights.push("🟡 경쟁이 있지만 충분히 도전 가능합니다.");
  } else {
    insights.push("🔴 경쟁이 매우 치열한 분야입니다.");
  }

  return insights;
}