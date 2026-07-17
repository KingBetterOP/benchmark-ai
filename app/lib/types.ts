export interface Thumbnail {
  url: string;
}

export interface VideoSnippet {
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: {
    high: Thumbnail;
  };
}

export interface VideoStatistics {
  viewCount: string;
  likeCount?: string;
  commentCount?: string;
}

export interface VideoContentDetails {
  duration: string;
}


export interface VideoChannel {
  name: string;
  thumbnail: string;
  subscribers: number;
}

export interface Video {
  id: string;
  snippet: VideoSnippet;
  statistics: VideoStatistics;
  contentDetails: VideoContentDetails;
  channel?: Channel;
}


export interface Channel {
  name: string;
  thumbnail: string;
  subscribers: number;
  videos: number;
  views: number;
}