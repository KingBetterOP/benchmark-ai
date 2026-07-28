import AIScriptGeneratorCard from "./AIScriptGeneratorCard";
import AIDescriptionGeneratorCard from "./AIDescriptionGeneratorCard";
import AIHashtagGeneratorCard from "./AIHashtagGeneratorCard";
import AIThumbnailPromptCard from "./AIThumbnailPromptCard";

type Props = {
  keyword: string;
};

export default function AICreatorToolkit({
  keyword,
}: Props) {
  return (
    <section className="mt-12">

      <h2 className="text-4xl font-extrabold">
        🤖 AI Creator Toolkit
      </h2>

      <p className="mt-2 text-zinc-400">
        Everything creators need after analyzing a keyword.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <AIScriptGeneratorCard
          keyword={keyword}
        />

        <AIDescriptionGeneratorCard
          keyword={keyword}
        />

        <AIHashtagGeneratorCard
          keyword={keyword}
        />

        <AIThumbnailPromptCard
          keyword={keyword}
        />

      </div>

    </section>
  );
}