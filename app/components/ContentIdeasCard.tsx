import { ContentIdea } from "../lib/types";

type Props = {
  content: ContentIdea[];
};

export default function ContentIdeasCard({
  content,
}: Props) {
  if (content.length === 0) return null;

  return (
    <div className="rounded-2xl border border-green-500 bg-zinc-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        💡 Content Ideas
      </h2>

      <div className="space-y-5">
        {content.map((idea, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-700 bg-zinc-800 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {idea.title}
              </h3>

              <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-bold">
                ⭐ {idea.trendScore}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">
                  Expected Views
                </p>

                <p className="font-semibold">
                  {idea.expectedViews}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Difficulty
                </p>

                <p className="font-semibold">
                  {idea.difficulty}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Why this idea?
              </p>

              <p className="mt-1">
                {idea.reason}
              </p>
            </div>

            <div className="mt-4 rounded-lg bg-zinc-900 p-4">
              <p className="text-sm text-gray-400">
                Thumbnail Idea
              </p>

              <p className="mt-1 font-semibold">
                {idea.thumbnail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}