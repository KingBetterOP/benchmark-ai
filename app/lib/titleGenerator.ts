export function generateTitles(keyword: string) {
  if (!keyword.trim()) return [];

  return [
    `How ${keyword} Changed Everything`,
    `The Ultimate Guide to ${keyword}`,
    `10 ${keyword} Tips You Need to Know`,
    `Why Everyone Is Talking About ${keyword}`,
    `The Truth About ${keyword}`,
  ];
}