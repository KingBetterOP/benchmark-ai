import { NextRequest, NextResponse } from "next/server";
import type { Channel } from "@/app/lib/types";
type SearchItem = {
  id: {
    videoId: string;
  };
};

type VideoApiItem = {
  snippet: {
    channelId: string;
  };
  channel?: Channel;
};

type ChannelApiItem = {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  statistics: {
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
  };
};

export async function GET(request: NextRequest) {
  
  

  const keyword = request.nextUrl.searchParams.get("q");
  const order = request.nextUrl.searchParams.get("order") || "relevance";
  const last30Days =
  request.nextUrl.searchParams.get("last30Days") === "true";

  if (!keyword) {
    return NextResponse.json({
      error: "Keyword is required",
    });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  let publishedAfter = "";

if (last30Days) {
  const date = new Date();
  date.setDate(date.getDate() - 30);

  publishedAfter = `&publishedAfter=${date.toISOString()}`;
}

  // 1. 검색
  const searchUrl =
  `https://www.googleapis.com/youtube/v3/search` +
  `?part=snippet` +
  `&maxResults=50` +
  `&order=${order}` +
  `&q=${encodeURIComponent(keyword)}` +
  `&type=video` +
  `${publishedAfter}` +
  `&key=${apiKey}`;

  const searchResponse = await fetch(searchUrl);
const searchData = await searchResponse.json();




if (!searchData.items || searchData.items.length === 0) {
  return NextResponse.json({
    items: [],
  });
}

  const ids = searchData.items
  .map((item: SearchItem) => item.id.videoId)
  .join(",");

  // 2. 상세정보 가져오기
  const videoUrl =
    `https://www.googleapis.com/youtube/v3/videos` +
    `?part=snippet,statistics,contentDetails` +
    `&id=${ids}` +
    `&key=${apiKey}`;

  const videoResponse = await fetch(videoUrl);
  const videoData = await videoResponse.json();
  if (!videoData.items) {
  return NextResponse.json({
    items: [],
  });
}
  const channelIds = [
  ...new Set(
    (videoData.items ?? []).map((video: VideoApiItem) => video.snippet.channelId)
  ),
].join(",");
const channelResponse = await fetch(
  `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${apiKey}`
);

const channelData = await channelResponse.json();

const channelMap: Record<string, Channel> = {};

(channelData.items ?? []).forEach((channel: ChannelApiItem) => {
  channelMap[channel.id] = {
    name: channel.snippet.title,
    subscribers: Number(channel.statistics.subscriberCount),
    videos: Number(channel.statistics.videoCount),
    views: Number(channel.statistics.viewCount),
    thumbnail: channel.snippet.thumbnails.high.url,
  };
});

videoData.items = (videoData.items ?? []).map((video: VideoApiItem) => ({
  ...video,
  channel: channelMap[video.snippet.channelId],
}));

return NextResponse.json(videoData);
}