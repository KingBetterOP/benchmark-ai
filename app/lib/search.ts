export type SearchOptions = {
  keyword: string;
  order: string;
  last30Days: boolean;
};

export async function searchYoutube({
  keyword,
  order,
  last30Days,
}: SearchOptions) {
  const response = await fetch(
    `/api/youtube?q=${encodeURIComponent(
      keyword
    )}&order=${order}&last30Days=${last30Days}`
  );

  const data = await response.json();

  return data;
}