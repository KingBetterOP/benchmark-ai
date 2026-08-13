import { NextRequest, NextResponse } from "next/server";
import type { Channel, Video } from "@/app/lib/types";
import { calculateBenchmarkScore } from "@/app/lib/videoUtils";
type SearchItem = {
  id?: {
    videoId?: string;
  };
};

type VideoApiItem = {
  id: string;

  snippet: {
    channelId: string;
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails?: {
      high?: {
        url: string;
      };
    };
  };

  statistics?: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };

  contentDetails?: {
    duration?: string;
  };
};

type ChannelApiItem = {
  id: string;

  snippet: {
    title: string;

    thumbnails?: {
      high?: {
        url: string;
      };
    };
  };

  statistics?: {
    subscriberCount?: string;
    videoCount?: string;
    viewCount?: string;
  };
};

function jsonError(
  message: string,
  status: number
) {
  return NextResponse.json(
    {
      error: message,
    },
    {
      status,
    }
  );
}

export async function GET(
  request: NextRequest
) {
  try {
    const params =
      request.nextUrl.searchParams;

    const keyword =
      params.get("q")?.trim() || "";

    const rawOrder =
      params.get("order") || "relevance";

    const allowedOrders = [
      "relevance",
      "viewCount",
      "date",
    ];

    const order =
      allowedOrders.includes(rawOrder)
        ? rawOrder
        : "relevance";

    const last30Days =
      params.get("last30Days") === "true";

    const language =
      params.get("language")?.trim() || "";

    // --------------------------------------------------
    // 1. 기본 검증
    // --------------------------------------------------

    if (!keyword) {
      return jsonError(
        "Keyword is required",
        400
      );
    }

    if (keyword.length > 200) {
      return jsonError(
        "Keyword is too long",
        400
      );
    }

    // --------------------------------------------------
    // 2. API KEY
    // --------------------------------------------------

    const apiKey =
      process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      console.error(
        "❌ YOUTUBE_API_KEY is missing"
      );

      return jsonError(
        "YouTube API key is not configured",
        500
      );
    }

    // --------------------------------------------------
    // 3. 최근 30일 필터
    // --------------------------------------------------

    let publishedAfter = "";

    if (last30Days) {
      const date = new Date();

      date.setDate(
        date.getDate() - 30
      );

      publishedAfter =
        `&publishedAfter=${encodeURIComponent(
          date.toISOString()
        )}`;
    }

    // --------------------------------------------------
    // 4. 언어 필터
    // --------------------------------------------------

    let languageParam = "";

    if (language) {
      languageParam =
        `&relevanceLanguage=${encodeURIComponent(
          language
        )}`;
    }

    // --------------------------------------------------
    // 5. YouTube Search API
    // --------------------------------------------------

    const searchUrl =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet` +
      `&maxResults=50` +
      `&order=${encodeURIComponent(order)}` +
      `&q=${encodeURIComponent(keyword)}` +
      `&type=video` +
      `${publishedAfter}` +
      `${languageParam}` +
      `&key=${encodeURIComponent(apiKey)}`;

    console.log(
      "🔍 YouTube search:",
      keyword
    );

    const searchResponse =
      await fetch(searchUrl, {
        cache: "no-store",
      });

    const searchData =
      await searchResponse.json();

    if (!searchResponse.ok) {
      console.error(
        "❌ YouTube search error:",
        searchData
      );

      return jsonError(
        searchData?.error?.message ||
          "YouTube search failed",
        searchResponse.status
      );
    }

    const allItems: SearchItem[] =
      Array.isArray(searchData?.items)
        ? searchData.items
        : [];

    // --------------------------------------------------
    // 6. 두 번째 검색 페이지
    // --------------------------------------------------

    if (searchData?.nextPageToken) {
      const secondSearchUrl =
        `https://www.googleapis.com/youtube/v3/search` +
        `?part=snippet` +
        `&maxResults=50` +
        `&order=${encodeURIComponent(order)}` +
        `&q=${encodeURIComponent(keyword)}` +
        `&type=video` +
        `${publishedAfter}` +
        `${languageParam}` +
        `&pageToken=${encodeURIComponent(
          searchData.nextPageToken
        )}` +
        `&key=${encodeURIComponent(apiKey)}`;

      const secondResponse =
        await fetch(
          secondSearchUrl,
          {
            cache: "no-store",
          }
        );

      const secondData =
        await secondResponse.json();

      if (
        secondResponse.ok &&
        Array.isArray(secondData?.items)
      ) {
        allItems.push(
          ...secondData.items
        );
      }
    }

    // --------------------------------------------------
    // 7. Video ID 추출 + 중복 제거
    // --------------------------------------------------

    const videoIds = [
      ...new Set(
        allItems
          .map(
            (item) =>
              item.id?.videoId
          )
          .filter(
            (
              id
            ): id is string =>
              Boolean(id)
          )
      ),
    ];

    if (videoIds.length === 0) {
      return NextResponse.json({
        items: [],
      });
    }

    console.log(
      `📦 Found ${videoIds.length} unique videos`
    );

    // --------------------------------------------------
    // 8. Video API
    // --------------------------------------------------

    const videoItems: VideoApiItem[] =
      [];

    for (
      let i = 0;
      i < videoIds.length;
      i += 50
    ) {
      const ids =
        videoIds
          .slice(i, i + 50)
          .join(",");

      const videoUrl =
        `https://www.googleapis.com/youtube/v3/videos` +
        `?part=snippet,statistics,contentDetails` +
        `&id=${encodeURIComponent(ids)}` +
        `&key=${encodeURIComponent(apiKey)}`;

      const response =
        await fetch(videoUrl, {
          cache: "no-store",
        });

      const data =
        await response.json();

      if (!response.ok) {
        console.error(
          "❌ YouTube video API error:",
          data
        );

        continue;
      }

      if (
        Array.isArray(data?.items)
      ) {
        videoItems.push(
          ...data.items
        );
      }
    }

    if (videoItems.length === 0) {
      return NextResponse.json({
        items: [],
      });
    }

    // --------------------------------------------------
    // 9. Channel ID 추출
    // --------------------------------------------------

    const channelIds = [
      ...new Set(
        videoItems
          .map(
            (video) =>
              video.snippet
                ?.channelId
          )
          .filter(Boolean)
      ),
    ];

    // --------------------------------------------------
    // 10. Channel API
    // --------------------------------------------------

    const channelMap =
      new Map<string, Channel>();

    for (
      let i = 0;
      i < channelIds.length;
      i += 50
    ) {
      const ids =
        channelIds
          .slice(i, i + 50)
          .join(",");

      const channelUrl =
        `https://www.googleapis.com/youtube/v3/channels` +
        `?part=snippet,statistics` +
        `&id=${encodeURIComponent(ids)}` +
        `&key=${encodeURIComponent(apiKey)}`;

      const channelResponse =
        await fetch(
          channelUrl,
          {
            cache: "no-store",
          }
        );

      const channelData =
        await channelResponse.json();

      if (!channelResponse.ok) {
        console.error(
          "❌ YouTube channel API error:",
          channelData
        );

        continue;
      }

      if (
        Array.isArray(
          channelData?.items
        )
      ) {
        channelData.items.forEach(
          (
            channel: ChannelApiItem
          ) => {
            channelMap.set(
              channel.id,
              {
                name:
                  channel.snippet
                    ?.title || "",

                subscribers:
                  Number(
                    channel.statistics
                      ?.subscriberCount ||
                      0
                  ),

                videos:
                  Number(
                    channel.statistics
                      ?.videoCount ||
                      0
                  ),

                views:
                  Number(
                    channel.statistics
                      ?.viewCount ||
                      0
                  ),

                thumbnail:
                  channel.snippet
                    ?.thumbnails
                    ?.high
                    ?.url || "",
              }
            );
          }
        );
      }
    }

    // --------------------------------------------------
    // 11. Video + Channel 결합
    // --------------------------------------------------

    const finalItems =
      videoItems.map(
        (video) => ({
          id: video.id,

          snippet: {
            title:
              video.snippet
                ?.title || "",

            description:
              video.snippet
                ?.description || "",

            channelTitle:
              video.snippet
                ?.channelTitle || "",

            publishedAt:
              video.snippet
                ?.publishedAt || "",

            channelId:
              video.snippet
                ?.channelId || "",

            thumbnails: {
              high: {
                url:
                  video.snippet
                    ?.thumbnails
                    ?.high
                    ?.url || "",
              },
            },
          },

          statistics: {
            viewCount:
              video.statistics
                ?.viewCount || "0",

            likeCount:
              video.statistics
                ?.likeCount || "0",

            commentCount:
              video.statistics
                ?.commentCount || "0",
          },

          contentDetails: {
            duration:
              video.contentDetails
                ?.duration || "",
          },

          channel:
            channelMap.get(
              video.snippet
                ?.channelId
            ),
        })
      );

    // --------------------------------------------------
    // 12. 최종 중복 제거
    // --------------------------------------------------

    const uniqueItems =
      Array.from(
        new Map(
          finalItems.map(
            (video) => [
              video.id,
              video,
            ]
          )
        ).values()
      );

        console.log(
      `✅ Final videos: ${uniqueItems.length}`
    );

    // --------------------------------------------------
    // 13. Benchmark Score 계산
    // --------------------------------------------------

    const scoredItems =
      uniqueItems.map(
        (video) => ({
          ...video,

          benchmarkScore:
            calculateBenchmarkScore(
              video as Video
            ),
        })
      );

    console.log(
      "📊 Benchmark scores calculated"
    );

    // --------------------------------------------------
    // 14. 응답
    // --------------------------------------------------

    return NextResponse.json(
      {
        items: scoredItems,

        meta: {
          keyword,
          order,
          language,
          last30Days,
          resultCount:
            scoredItems.length,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "🔥 YouTube route error:",
      error
    );

    return jsonError(
      "Unexpected YouTube API error",
      500
    );
  }
}