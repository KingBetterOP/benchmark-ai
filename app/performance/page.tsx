"use client";

import { useMemo, useState } from "react";

type PerformanceData = {
  views: number;
  likes: number;
  comments: number;
  subscribers: number;
  ctr: number;
  retention: number;
  duration: number;
};

export default function PerformancePage() {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

const [videoData, setVideoData] = useState<any>(null);

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

  const [data, setData] = useState<PerformanceData>({
    views: 125000,
    likes: 8200,
    comments: 640,
    subscribers: 1450,
    ctr: 7.8,
    retention: 54.2,
    duration: 420,
  });

  const [analyzed, setAnalyzed] = useState(false);

  const performance = useMemo(() => {
    const likeRate =
      data.views > 0 ? (data.likes / data.views) * 100 : 0;

    const commentRate =
      data.views > 0 ? (data.comments / data.views) * 100 : 0;

    const subscriberRate =
      data.views > 0 ? (data.subscribers / data.views) * 100 : 0;

    let score = 0;

    // CTR
    if (data.ctr >= 10) score += 25;
    else if (data.ctr >= 7) score += 20;
    else if (data.ctr >= 5) score += 14;
    else score += 8;

    // Retention
    if (data.retention >= 60) score += 25;
    else if (data.retention >= 50) score += 20;
    else if (data.retention >= 40) score += 14;
    else score += 8;

    // Like rate
    if (likeRate >= 8) score += 20;
    else if (likeRate >= 5) score += 16;
    else if (likeRate >= 3) score += 11;
    else score += 6;

    // Comment rate
    if (commentRate >= 1) score += 15;
    else if (commentRate >= 0.5) score += 12;
    else if (commentRate >= 0.2) score += 8;
    else score += 4;

    // Subscriber conversion
    if (subscriberRate >= 1) score += 15;
    else if (subscriberRate >= 0.5) score += 12;
    else if (subscriberRate >= 0.2) score += 8;
    else score += 4;

    let grade = "D";

    if (score >= 90) grade = "S";
    else if (score >= 80) grade = "A";
    else if (score >= 70) grade = "B";
    else if (score >= 60) grade = "C";

    return {
      score,
      grade,
      likeRate,
      commentRate,
      subscriberRate,
    };
  }, [data]);

  const updateNumber = (
    key: keyof PerformanceData,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("ko-KR").format(number);
  };

  const getGradeDescription = () => {
    if (performance.grade === "S") {
      return "폭발적인 성과입니다. 다음 콘텐츠에서 이 패턴을 적극적으로 재사용할 가치가 있습니다.";
    }

    if (performance.grade === "A") {
      return "매우 좋은 성과입니다. 핵심 요소를 유지하면서 제목과 콘텐츠 구조를 확장해보세요.";
    }

    if (performance.grade === "B") {
      return "평균 이상의 성과입니다. 몇 가지 핵심 지표를 개선하면 크게 성장할 가능성이 있습니다.";
    }

    if (performance.grade === "C") {
      return "기본적인 성과는 있지만 클릭률과 시청 지속률 개선이 필요합니다.";
    }

    return "콘텐츠 구조를 다시 분석하고 제목, 썸네일, 초반 몰입도를 우선적으로 개선하세요.";
  };

  const insights = [
    {
      title: "클릭률",
      value: `${data.ctr.toFixed(1)}%`,
      description:
        data.ctr >= 7
          ? "좋은 수준입니다. 제목과 썸네일의 조합이 효과적으로 작동하고 있습니다."
          : "개선 여지가 큽니다. 제목과 썸네일의 첫인상을 강화해야 합니다.",
      positive: data.ctr >= 7,
    },
    {
      title: "시청 지속률",
      value: `${data.retention.toFixed(1)}%`,
      description:
        data.retention >= 50
          ? "시청자가 콘텐츠를 비교적 오래 유지하고 있습니다."
          : "초반 이탈을 줄이기 위해 첫 30초의 구조를 개선하는 것이 좋습니다.",
      positive: data.retention >= 50,
    },
    {
      title: "좋아요율",
      value: `${performance.likeRate.toFixed(2)}%`,
      description:
        performance.likeRate >= 5
          ? "시청자의 반응이 강합니다."
          : "콘텐츠에 대한 적극적인 반응을 유도할 여지가 있습니다.",
      positive: performance.likeRate >= 5,
    },
    {
      title: "댓글률",
      value: `${performance.commentRate.toFixed(2)}%`,
      description:
        performance.commentRate >= 0.5
          ? "커뮤니티 반응이 활발합니다."
          : "댓글을 유도할 수 있는 질문이나 논쟁 포인트를 추가해보세요.",
      positive: performance.commentRate >= 0.5,
    },
  ];
const fetchVideoData = async () => {
  if (!videoUrl.trim()) {
    setError("YouTube 영상 URL을 입력해주세요.");
    return;
  }

  setLoading(true);
  setError("");
  setVideoData(null);

  try {
    const response = await fetch(
      `/api/video-performance?url=${encodeURIComponent(videoUrl)}`
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || "영상을 가져오지 못했습니다."
      );
    }

    setVideoData(result);

    setVideoTitle(result.title);

    setData((prev) => ({
      ...prev,

      views: result.views,
      likes: result.likes,
      comments: result.comments,
    }));
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "영상 데이터를 가져오는 중 오류가 발생했습니다."
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
            Benchmark AI
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Content Performance
          </h1>

          <p className="mt-3 max-w-2xl text-gray-400">
            영상 성과 데이터를 분석하고 다음 콘텐츠의 성장 가능성을
            찾아보세요.
          </p>
        </div>

        {/* Video Information */}
<section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
  <h2 className="mb-5 text-xl font-semibold">
    01. YouTube 영상
  </h2>

  <div className="flex flex-col gap-3 md:flex-row">
    <input
      type="text"
      value={videoUrl}
      onChange={(e) => setVideoUrl(e.target.value)}
      placeholder="https://www.youtube.com/watch?v=..."
      className="flex-1 rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-white/30"
    />

    <button
      onClick={fetchVideoData}
      disabled={loading}
      className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "가져오는 중..." : "영상 가져오기"}
    </button>
  </div>

  {error && (
    <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
      {error}
    </div>
  )}

  {videoData && (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="grid md:grid-cols-[280px_1fr]">
        <img
          src={videoData.thumbnail}
          alt={videoData.title}
          className="h-full min-h-[180px] w-full object-cover"
        />

        <div className="p-6">
          <h3 className="text-xl font-semibold">
            {videoData.title}
          </h3>

          <p className="mt-2 text-sm text-gray-400">
            {videoData.channelTitle}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-gray-500">
                조회수
              </div>

              <div className="mt-1 font-semibold">
                {formatNumber(videoData.views)}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500">
                좋아요
              </div>

              <div className="mt-1 font-semibold">
                {formatNumber(videoData.likes)}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500">
                댓글
              </div>

              <div className="mt-1 font-semibold">
                {formatNumber(videoData.comments)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</section>

        {/* Metrics Input */}
        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-5 text-xl font-semibold">
            02. 성과 데이터
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <MetricInput
              label="조회수"
              value={data.views}
              onChange={(value) => updateNumber("views", value)}
            />

            <MetricInput
              label="좋아요"
              value={data.likes}
              onChange={(value) => updateNumber("likes", value)}
            />

            <MetricInput
              label="댓글"
              value={data.comments}
              onChange={(value) => updateNumber("comments", value)}
            />

            <MetricInput
              label="구독자 증가"
              value={data.subscribers}
              onChange={(value) =>
                updateNumber("subscribers", value)
              }
            />

            <MetricInput
              label="CTR (%)"
              value={data.ctr}
              step="0.1"
              onChange={(value) => updateNumber("ctr", value)}
            />

            <MetricInput
              label="평균 시청 지속률 (%)"
              value={data.retention}
              step="0.1"
              onChange={(value) =>
                updateNumber("retention", value)
              }
            />
          </div>

          <button
            onClick={() => setAnalyzed(true)}
            className="mt-6 w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            성과 분석하기
          </button>
        </section>

        {/* Results */}
        {analyzed && (
          <section className="space-y-6">
            {/* Score */}
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                <p className="text-sm text-gray-400">
                  Performance Score
                </p>

                <div className="mt-4 text-7xl font-black">
                  {performance.score}
                </div>

                <div className="mt-2 text-3xl font-bold">
                  Grade {performance.grade}
                </div>

                <p className="mt-5 text-sm leading-6 text-gray-400">
                  {getGradeDescription()}
                </p>
              </div>

              {/* Main Metrics */}
              <div className="grid gap-4 sm:grid-cols-2">
                {insights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">
                        {item.title}
                      </span>

                      <span
                        className={`text-sm ${
                          item.positive
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {item.positive ? "Good" : "Improve"}
                      </span>
                    </div>

                    <div className="mt-3 text-3xl font-bold">
                      {item.value}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-semibold">
                AI Performance Summary
              </h2>

              <p className="mt-4 leading-7 text-gray-300">
                {videoTitle
                  ? `"${videoTitle}"의 현재 성과를 분석한 결과,`
                  : "현재 영상의 성과를 분석한 결과,"}{" "}
                조회수 대비 시청자의 반응과 콘텐츠 유지력이 핵심적인
                성과 요인으로 나타났습니다.
              </p>
            </div>

            {/* What Worked */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="text-xl font-semibold">
                  잘된 점
                </h2>

                <div className="mt-5 space-y-4">
                  <InsightRow
                    title="높은 클릭률"
                    description="제목과 썸네일이 시청자의 클릭을 유도하고 있습니다."
                  />

                  <InsightRow
                    title="좋은 시청 지속률"
                    description="콘텐츠의 핵심 구조가 시청자의 이탈을 어느 정도 방지하고 있습니다."
                  />

                  <InsightRow
                    title="시청자 반응"
                    description="좋아요와 댓글을 통해 콘텐츠에 대한 적극적인 반응을 확인할 수 있습니다."
                  />
                </div>
              </div>

              {/* Improvements */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="text-xl font-semibold">
                  개선할 점
                </h2>

                <div className="mt-5 space-y-4">
                  <InsightRow
                    title="초반 몰입도"
                    description="영상 첫 30초에 핵심 내용을 더 빠르게 제시하면 유지율을 높일 수 있습니다."
                  />

                  <InsightRow
                    title="댓글 유도"
                    description="영상 마지막에 명확한 질문을 넣어 시청자의 참여를 유도해보세요."
                  />

                  <InsightRow
                    title="콘텐츠 확장"
                    description="현재 영상에서 반응이 좋았던 주제를 시리즈 형태로 확장할 수 있습니다."
                  />
                </div>
              </div>
            </div>

            {/* Next Content */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    Next Content Recommendations
                  </h2>

                  <p className="mt-2 text-sm text-gray-400">
                    현재 성과를 기반으로 다음에 테스트할 콘텐츠입니다.
                  </p>
                </div>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                  AI Recommended
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <RecommendationCard
                  number="01"
                  title="같은 주제의 후속 콘텐츠"
                  description="현재 영상에서 검증된 주제를 다른 관점으로 확장합니다."
                />

                <RecommendationCard
                  number="02"
                  title="강한 Hook 버전"
                  description="첫 10초에 핵심 결과를 먼저 보여주는 형식으로 테스트합니다."
                />

                <RecommendationCard
                  number="03"
                  title="시리즈 콘텐츠"
                  description="현재 콘텐츠를 여러 편으로 분리해 반복적인 조회를 노립니다."
                />
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!analyzed && (
          <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center">
            <div className="text-4xl">📊</div>

            <h2 className="mt-4 text-xl font-semibold">
              아직 분석 결과가 없습니다.
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              영상 데이터를 입력하고 성과 분석을 시작하세요.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function MetricInput({
  label,
  value,
  step = "1",
  onChange,
}: {
  label: string;
  value: number;
  step?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-gray-400">
        {label}
      </label>

      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition focus:border-white/30"
      />
    </div>
  );
}

function InsightRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-black/30 p-4">
      <div className="font-medium">{title}</div>

      <p className="mt-1 text-sm leading-6 text-gray-400">
        {description}
      </p>
    </div>
  );
}

function RecommendationCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-5">
      <div className="text-sm text-gray-500">{number}</div>

      <h3 className="mt-3 font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        {description}
      </p>

      <button className="mt-5 text-sm font-medium text-white hover:underline">
        아이디어 보기 →
      </button>
    </div>
  );
}