export type SearchOptions = {
  keyword: string;
  order: string;
  language: string;
  last30Days: boolean;
};

export async function searchYoutube({
  keyword,
  order,
  language,
  last30Days,
}: SearchOptions) {
  const params = new URLSearchParams({
    q: keyword,
    order,
    language,
    last30Days: String(last30Days),
  });

  const response = await fetch(
    `/api/youtube?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error ||
        "YouTube API request failed"
    );
  }

  return data;
}