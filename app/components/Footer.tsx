import { translations } from "../lib/translations";
type Props = {
  language: string;
};

export default function Footer({
  language,
}: Props) {
  const t =
  translations[language as keyof typeof translations];
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-8 text-center">
        <h3 className="text-lg font-bold">🚀 Benchmark AI</h3>

        <p className="mt-2 text-sm text-gray-400">
          {t.footerDescription}
        </p>

        <p className="mt-6 text-xs text-gray-500">
          {t.footerCopyright}
        </p>
      </div>
    </footer>
  );
}