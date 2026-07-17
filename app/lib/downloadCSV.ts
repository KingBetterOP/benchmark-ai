export function downloadCSV(
  results: any[],
  keyword: string,
  calculateBenchmarkScore: (video: any) => number
) {
  if (results.length === 0) {
    alert("다운로드할 데이터가 없습니다.");
    return;
  }

  const headers = [
    "제목",
    "채널",
    "조회수",
    "좋아요",
    "Benchmark Score",
  ];

  const rows = results.map((video: any) => [
    `"${video.snippet.title.replace(/"/g, '""')}"`,
    `"${video.snippet.channelTitle}"`,
    video.statistics?.viewCount ?? 0,
    video.statistics?.likeCount ?? 0,
    calculateBenchmarkScore(video),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${keyword}_benchmark.csv`;
  link.click();

  URL.revokeObjectURL(url);
}