"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Video } from "../lib/types";

type Props = {
  videos: Video[];
};

const COLORS = [
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
];

export default function AnalyticsCharts({
  videos,
}: Props) {
  if (videos.length === 0) return null;

  // 조회수 차트
  const viewsData = videos.slice(0, 10).map((video) => ({
    title:
      video.snippet.title.length > 15
        ? video.snippet.title.slice(0, 15) + "..."
        : video.snippet.title,
    views: Number(video.statistics.viewCount),
  }));

  // 영상 길이 분포
  const durationData = [
    {
      name: "10분 이상",
      value: videos.filter((v) => {
        const match =
          v.contentDetails.duration.match(/PT(\d+)M/);

        const minutes = Number(match?.[1] || 0);

        return minutes >= 10;
      }).length,
    },
    {
      name: "10분 미만",
      value: videos.filter((v) => {
        const match =
          v.contentDetails.duration.match(/PT(\d+)M/);

        const minutes = Number(match?.[1] || 0);

        return minutes < 10;
      }).length,
    },
  ];

  return (
    <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-bold">
        📊 Analytics Dashboard
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* 조회수 차트 */}

        <div className="rounded-2xl border border-zinc-800 bg-black/30 p-6">

          <h3 className="mb-4 text-xl font-semibold">
            👀 View Distribution
          </h3>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
  data={viewsData}
  margin={{
    top: 10,
    right: 20,
    left: 20,
    bottom: 40,
  }}
>
                <CartesianGrid
  stroke="#3f3f46"
  strokeDasharray="3 3"
/>

                <XAxis
  dataKey="title"
  tick={{
    fill: "#d4d4d8",
    fontSize: 12,
  }}
  angle={-20}
  textAnchor="end"
/>

                <YAxis
  tick={{
    fill: "#d4d4d8",
  }}
/>

                <Tooltip
  contentStyle={{
    backgroundColor: "#18181b",
    border: "1px solid #3f3f46",
    borderRadius: "12px",
    color: "#fff",
  }}
  labelStyle={{
    color: "#fff",
  }}
/>

                <Bar
  dataKey="views"
  radius={[8, 8, 0, 0]}
  fill="#06B6D4"
/>
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* 영상 길이 */}

        <div className="rounded-2xl border border-zinc-800 bg-black/30 p-6">

          <h3 className="mb-4 text-xl font-semibold">
            ⏱ Video Length
          </h3>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
  data={durationData}
  dataKey="value"
  nameKey="name"
  outerRadius={100}
  label
  stroke="#27272a"
  strokeWidth={2}
>
                  {durationData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
  contentStyle={{
    backgroundColor: "#18181b",
    border: "1px solid #3f3f46",
    borderRadius: "12px",
    color: "#fff",
  }}
  labelStyle={{
    color: "#fff",
  }}
/>

              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </section>
  );
}