export function generateKeywordCluster(
  keyword: string
) {
  const base = keyword.trim();

  if (!base) return [];

  return [
    `${base} Tutorial`,
    `${base} Beginner Guide`,
    `${base} Tips`,
    `${base} Mistakes`,
    `${base} Secrets`,
    `${base} 2026`,
    `${base} AI`,
    `${base} Strategy`,
    `${base} vs Competitors`,
    `${base} Case Study`,
  ];
}