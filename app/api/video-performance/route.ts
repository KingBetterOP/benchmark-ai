import { NextRequest, NextResponse } from "next/server";

function extractVideoId(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "").slice(0, 11);
    }

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");

      if (videoId) {
        return videoId.slice(0, 11);
      }

      const parts = parsed.pathname.split("/");

      const shortsIndex = parts.indexOf("shorts");

      if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
        return parts[shortsIndex + 1].slice(0, 11);
      }

      const embedIndex = parts.indexOf("embed");

      if (embedIndex !== -1 && parts[embedIndex + 1]) {
        return parts[embedIndex + 1].slice(0, 11);
      }
    }

    return null;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return NextResponse.json(
        {
          error: "YouTube 영상 URL을 입력해주세요.",
        },
        { status: 400 }
      );
    }

    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      return NextResponse.json(
        {
          error: "올바른 YouTube 영상 URL이 아닙니다.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "YOUTUBE_API_KEY가 설정되지 않았습니다.",
        },
        { status: 500 }
      );
    }

    const apiUrl =
      `https://www.googleapis.com/youtube/v3/videos` +
      `?part=snippet,contentDetails,statistics` +
      `&id=${encodeURIComponent(videoId)}` +
      `&key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("YouTube API Error:", errorText);

      return NextResponse.json(
        {
          error: "YouTube API 요청에 실패했습니다.",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        {
          error: "해당 YouTube 영상을 찾을 수 없습니다.",
        },
        { status: 404 }
      );
    }

    const video = data.items[0];

    return NextResponse.json({
      videoId,

      title: video.snippet?.title ?? "",
      description: video.snippet?.description ?? "",

      channelId: video.snippet?.channelId ?? "",
      channelTitle: video.snippet?.channelTitle ?? "",

      publishedAt: video.snippet?.publishedAt ?? "",

      thumbnail:
        video.snippet?.thumbnails?.high?.url ??
        video.snippet?.thumbnails?.medium?.url ??
        video.snippet?.thumbnails?.default?.url ??
        "",

      duration: video.contentDetails?.duration ?? "",

      views: Number(video.statistics?.viewCount ?? 0),
      likes: Number(video.statistics?.likeCount ?? 0),
      comments: Number(video.statistics?.commentCount ?? 0),

      url: `https://www.youtube.com/watch?v=${videoId}`,
    });
  } catch (error) {
    console.error("Performance API Error:", error);

    return NextResponse.json(
      {
        error: "영상 데이터를 가져오는 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}