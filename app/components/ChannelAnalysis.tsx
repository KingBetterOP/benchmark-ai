type Channel = {
  name: string;
  subscribers: number;
  videos: number;
  views: number;
  thumbnail: string;
};

type Props = {
  channels: Channel[];
};

function formatNumber(num: number) {
  return new Intl.NumberFormat("ko-KR").format(num);
}
function getGrowthGrade(
  subscribers: number,
  views: number,
  videos: number
) {
  const averageViews = views / Math.max(videos, 1);
  const ratio = averageViews / Math.max(subscribers, 1);

  if (ratio >= 1) return { grade: "S", stars: "★★★★★" };
  if (ratio >= 0.5) return { grade: "A", stars: "★★★★☆" };
  if (ratio >= 0.2) return { grade: "B", stars: "★★★☆☆" };
  if (ratio >= 0.1) return { grade: "C", stars: "★★☆☆☆" };

  return { grade: "D", stars: "★☆☆☆☆" };
}
export default function ChannelAnalysis({
  channels,
}: Props) {
  if (channels.length === 0) return null;

  return (
    <div className="mt-8 rounded-xl border border-indigo-500 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        🏆 경쟁 채널 분석
      </h2>

      <div className="space-y-4">
        {channels.map((channel, index) => {
  const growth = getGrowthGrade(
    channel.subscribers,
    channel.views,
    channel.videos
  );

  return (
          <div
            key={channel.name}
            className="flex items-center gap-4 rounded-lg border border-zinc-700 p-4"
          >
            <img
              src={channel.thumbnail}
              alt={channel.name}
              className="h-16 w-16 rounded-full"
            />

            <div>
              <h3 className="text-xl font-bold">
                #{index + 1} {channel.name}
              </h3>

              <p>👥 구독자 : {formatNumber(channel.subscribers)}</p>

              <p>🎬 영상 수 : {formatNumber(channel.videos)}</p>

              <p>👀 총 조회수 : {formatNumber(channel.views)}</p>

<p>
  📊 평균 조회수 :{" "}
  {formatNumber(
    Math.round(channel.views / Math.max(channel.videos, 1))
  )}
</p>
<p>
  🚀 성장성 : {growth.grade} ({growth.stars})
</p>
            </div>
          </div>
                );
      })}
      </div>
    </div>
  );
}