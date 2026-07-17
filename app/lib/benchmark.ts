export function calculateViralScore(
  averageViews: number,
  competition: number
) {
  let score = 50;

  // 평균 조회수 반영
  if (averageViews > 1000000) score += 25;
  else if (averageViews > 300000) score += 20;
  else if (averageViews > 100000) score += 15;
  else if (averageViews > 50000) score += 10;
  else if (averageViews > 10000) score += 5;

  // 경쟁도가 높을수록 점수 감소
  score -= Math.min(competition / 5, 20);

  return Math.max(0, Math.min(100, Math.round(score)));
}