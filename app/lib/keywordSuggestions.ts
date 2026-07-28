export function getKeywordSuggestions(keyword: string) {
  const base = keyword.trim();

  if (!base) return [];

  return [
    `${base} tutorial`,
    `${base} tips`,
    `${base} for beginners`,
    `${base} 2026`,
    `${base} AI`,
    `best ${base}`,
    `${base} strategy`,
    `${base} tools`,
  ];
}