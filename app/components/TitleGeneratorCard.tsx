import { TitleSuggestion } from "../lib/types";

type Props = {
  titles: TitleSuggestion[];
};

export default function TitleGeneratorCard({
  titles,
}: Props) {
  if (titles.length === 0) return null;

  return (
    <div className="rounded-2xl border border-yellow-500 bg-zinc-900 p-6">
      <h2 className="mb-6 text-3xl font-bold">
        📝 AI Title Generator
      </h2>

      <div className="space-y-5">
        {titles.map((title, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-700 bg-zinc-800 p-5"
          >
            <h3 className="text-xl font-bold">
              {title.title}
            </h3>

            <div className="mt-5 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-400">
                  CTR
                </p>

                <p className="text-2xl font-bold text-cyan-400">
                  {title.ctr}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  SEO
                </p>

                <p className="text-2xl font-bold text-green-400">
                  {title.seo}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Emotion
                </p>

                <p className="text-2xl font-bold text-pink-400">
                  {title.emotion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}