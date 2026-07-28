type Result = {
  seo: number;
  emotion: number;
  ctr: number;
  keyword: number;
  length: number;
};

export function analyzeTitle(title: string): Result {
  const lower = title.toLowerCase();

  let seo = 60;
  let emotion = 60;
  let ctr = 60;
  let keyword = 60;
  let length = 60;

  if (title.length >= 30 && title.length <= 65) {
    length = 95;
    seo += 10;
  }

  if (
    lower.includes("how") ||
    lower.includes("best") ||
    lower.includes("top")
  ) {
    ctr += 15;
    seo += 10;
  }

  if (
    lower.includes("secret") ||
    lower.includes("insane") ||
    lower.includes("ultimate")
  ) {
    emotion += 20;
    ctr += 10;
  }

  if (
    lower.includes("ai") ||
    lower.includes("youtube") ||
    lower.includes("money")
  ) {
    keyword += 20;
    seo += 10;
  }

  return {
    seo: Math.min(seo, 100),
    emotion: Math.min(emotion, 100),
    ctr: Math.min(ctr, 100),
    keyword: Math.min(keyword, 100),
    length,
  };
}