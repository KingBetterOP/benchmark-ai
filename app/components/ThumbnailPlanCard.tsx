import { ThumbnailPlan } from "../lib/types";

type Props = {
  thumbnail: ThumbnailPlan[];
};

export default function ThumbnailPlanCard({
  thumbnail,
}: Props) {
  if (thumbnail.length === 0) return null;

  return (
    <div className="rounded-2xl border border-blue-500 bg-zinc-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        🎨 Thumbnail Blueprint
      </h2>

      <div className="space-y-5">
        {thumbnail.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-700 bg-zinc-800 p-5"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-400">
                  Background
                </p>

                <p>{item.background}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Expression
                </p>

                <p>{item.expression}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Text
                </p>

                <p>{item.text}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Color
                </p>

                <p>{item.color}</p>
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-zinc-900 p-4">
              <p className="text-sm text-gray-400">
                AI Reason
              </p>

              <p className="mt-2">
                {item.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}