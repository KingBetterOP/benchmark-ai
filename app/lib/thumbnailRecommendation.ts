type ThumbnailAnalysis = {
  face: number;
  contrast: number;
  text: number;
  click: number;
};

export function getThumbnailRecommendations(
  analysis: ThumbnailAnalysis
) {
  const recommendations: string[] = [];

  if (analysis.face < 80) {
    recommendations.push(
      "Increase face visibility for stronger engagement."
    );
  }

  if (analysis.contrast < 80) {
    recommendations.push(
      "Increase color contrast to improve visibility."
    );
  }

  if (analysis.text < 80) {
    recommendations.push(
      "Keep thumbnail text short and readable."
    );
  }

  if (analysis.click < 80) {
    recommendations.push(
      "Create a stronger emotional hook."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Thumbnail looks well optimized."
    );
  }

  return recommendations;
}