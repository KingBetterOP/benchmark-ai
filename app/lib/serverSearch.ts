import type { Video } from "./types";

type ServerSearchOptions = {
  keyword: string;
  order: string;
  language: string;
  last30Days: boolean;
};

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

function youtubeError(
  message: string
): Error {
  return new Error(
    `YouTube API: ${message}`
  );
}

export async function searchYoutubeServer({
  keyword,
  order,
  language,
  last30Days,
}: ServerSearchOptions): Promise<{
  items: Video[];
  meta: {
    keyword: string;
    order: string;
    language: string;
    last30Days: boolean;
    resultCount: number;
  };
}> {
  const apiKey =
    process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw youtubeError(
      "API key is not configured."
    );
  }

  const publishedAfter =
    last30Days
      ? (() => {
          const date = new Date();

          date.setDate(
            date.getDate() - 30
          );

          return `&publishedAfter=${encodeURIComponent(
            date.toISOString()
          )}`;
        })()
      : "";

  const languageParam =
    language
      ? `&relevanceLanguage=${encodeURIComponent(
          language
        )}`
      : "";

  const searchUrl =
    "https://www.googleapis.com/youtube/v3/search" +
    `?part=snippet` +
    `&maxResults=50` +
    `&order=${encodeURIComponent(order)}` +
    `&q=${encodeURIComponent(keyword)}` +
    `&type=video` +
    publishedAfter +
    languageParam +
    `&key=${encodeURIComponent(apiKey)}`;

  const searchResponse =
    await fetch(searchUrl, {
      cache: "no-store",
    });

  const searchData =
    await searchResponse.json();

  if (!searchResponse.ok) {
    throw youtubeError(
      searchData?.error?.message ||
        "Search request failed."
    );
  }

  const allItems: SearchItem[] =
    Array.isArray(searchData?.items)
      ? searchData.items
      : [];

  if (
    searchData?.nextPageToken
  ) {
    const secondUrl =
      "https://www.googleapis.com/youtube/v3/search" +
      `?part=snippet` +
      `&maxResults=50` +
      `&order=${encodeURIComponent(order)}` +
      `&q=${encodeURIComponent(keyword)}` +
      `&type=video` +
      publishedAfter +
      languageParam +
      `&pageToken=${encodeURIComponent(
        searchData.nextPageToken
      )}` +
      `&key=${encodeURIComponent(apiKey)}`;

    const secondResponse =
      await fetch(secondUrl, {
        cache: "no-store",
      });

    if (secondResponse.ok) {
      const secondData =
        await secondResponse.json();

      if (
        Array.isArray(
          secondData?.items
        )
      ) {
        allItems.push(
          ...secondData.items
        );
      }
    }
  }

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

  if (
    videoIds.length === 0
  ) {
    return {
      items: [],
      meta: {
        keyword,
        order,
        language,
        last30Days,
        resultCount: 0,
      },
    };
  }

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
      "https://www.googleapis.com/youtube/v3/videos" +
      `?part=snippet,statistics,contentDetails` +
      `&id=${encodeURIComponent(ids)}` +
      `&key=${encodeURIComponent(apiKey)}`;

    const response =
      await fetch(videoUrl, {
        cache: "no-store",
      });

    if (!response.ok) {
      continue;
    }

    const data =
      await response.json();

    if (
      Array.isArray(data?.items)
    ) {
      videoItems.push(
        ...data.items
      );
    }
  }

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

  const channelMap =
    new Map<
      string,
      {
        name: string;
        subscribers: number;
        videos: number;
        views: number;
        thumbnail: string;
      }
    >();

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
      "https://www.googleapis.com/youtube/v3/channels" +
      `?part=snippet,statistics` +
      `&id=${encodeURIComponent(ids)}` +
      `&key=${encodeURIComponent(apiKey)}`;

    const response =
      await fetch(channelUrl, {
        cache: "no-store",
      });

    if (!response.ok) {
      continue;
    }

    const data =
      await response.json();

    if (
      Array.isArray(data?.items)
    ) {
      data.items.forEach(
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

  const items: Video[] =
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

  return {
    items,

    meta: {
      keyword,
      order,
      language,
      last30Days,
      resultCount:
        items.length,
    },
  };
}