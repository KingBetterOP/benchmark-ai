import AIScriptGeneratorCard from "./AIScriptGeneratorCard";
import AIDescriptionGeneratorCard from "./AIDescriptionGeneratorCard";
import AIHashtagGeneratorCard from "./AIHashtagGeneratorCard";
import AIThumbnailPromptCard from "./AIThumbnailPromptCard";
import { translations } from "../lib/translations";

type Props = {
  keyword: string;
  language: string;
};

export default function AICreatorToolkit({
  keyword,
  language,
}: Props) {

  const t =
    translations[language as keyof typeof translations];

  return (
    <section className="mt-12">

      <h2 className="text-4xl font-extrabold">
        {t.aiCreatorKit}
      </h2>

      <p className="mt-2 text-zinc-400">
        {t.aiCreatorKitDescription}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <AIScriptGeneratorCard
          keyword={keyword}
          language={language}
        />

        <AIDescriptionGeneratorCard
          keyword={keyword}
          language={language}
        />

        <AIHashtagGeneratorCard
          keyword={keyword}
          language={language}
        />

        <AIThumbnailPromptCard
          keyword={keyword}
          language={language}
        />

      </div>

    </section>
  );
}