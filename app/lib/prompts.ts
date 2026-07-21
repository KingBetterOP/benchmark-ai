import type {
  Video,
  Channel,
} from "./types";
export function createBenchmarkPrompt(
  keyword: string,
  rankedVideos: Video[]
) {
  return `
검색 키워드: ${keyword}

상위 5개 영상:
${rankedVideos
  .map(
    (v: Video) =>
      `- ${v.snippet.title}
조회수: ${v.statistics.viewCount}
채널: ${v.snippet.channelTitle}`
  )
  .join("\n\n")}

이 영상들의 공통점을 분석하고
왜 조회수가 높은지,
썸네일, 제목, 주제, 업로드 전략을 분석해서
한국어로 상세하게 설명해줘.
`;
}

export function createIdeaPrompt(keyword: string) {
  return `
검색 키워드: ${keyword}

상위 영상들을 참고해서

조회수가 잘 나올 만한
유튜브 영상 아이디어를

10개 만들어줘.

각 아이디어는

- 제목
- 왜 잘 될지
- 추천 썸네일

까지 설명해줘.
`;
}

export function createStrategyPrompt(keyword: string) {
  return `
검색 키워드: ${keyword}

이 키워드에서 성공하기 위한 전략을 알려줘.

포함할 내용
- 업로드 주기
- 영상 길이
- 편집 스타일
- 썸네일 전략
- 제목 전략
- 시청자 유지 전략
`;
}

export function createCompetitionPrompt(keyword: string) {
  return `
검색 키워드: ${keyword}

이 키워드의 경쟁도를 분석해줘.

포함할 내용
- 경쟁 강도
- 진입 난이도
- 성공 가능성
- 추천 여부
`;
}

export function createTitlePrompt(keyword: string) {
  return `
검색 키워드: ${keyword}

클릭률이 높을 만한
유튜브 제목을

10개 만들어줘.
`;
}

export function createRecommendedChannelsPrompt(
  keyword: string,
  channels: Channel[]
) {
  return `
검색 키워드: ${keyword}

아래 채널들을 분석해서

가장 벤치마킹하기 좋은 채널 TOP3를 추천해줘.

${channels
  .map(
    (channel: Channel) =>
      `채널명: ${channel.name}
구독자: ${channel.subscribers}
영상 수: ${channel.videos}
총 조회수: ${channel.views}`
  )
  .join("\n\n")}

다음 형식으로 답변해.

🥇 채널명
이유:

🥈 채널명
이유:

🥉 채널명
이유:
`;
}