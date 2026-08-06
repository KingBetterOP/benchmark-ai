import { translations } from "../lib/translations";
type SearchFiltersProps = {
  min10Minutes: boolean;
  setMin10Minutes: React.Dispatch<React.SetStateAction<boolean>>;
  last30Days: boolean;
  setLast30Days: React.Dispatch<React.SetStateAction<boolean>>;
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  runSearchWithNextState: (callback: () => void) => void;
  onDownloadCSV: () => void;
  onDownloadPDF: () => void;
  onSaveProject: () => void;
  language: string;
};

export default function SearchFilters({
  min10Minutes,
  setMin10Minutes,
  last30Days,
  setLast30Days,
  order,
  setOrder,
  runSearchWithNextState,
  onDownloadCSV,
  onDownloadPDF,
  onSaveProject,
  language,
}: SearchFiltersProps) {
  const t =
  translations[language as keyof typeof translations];
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <button
        onClick={() =>
          runSearchWithNextState(() => {
            setMin10Minutes((prev) => !prev);
          })
        }
        className={
          min10Minutes
            ? "rounded-lg border border-red-600 bg-red-600 px-4 py-2"
            : "rounded-lg border border-gray-700 px-4 py-2 hover:bg-zinc-800"
        }
      >
        ⏱️ {t.moreThan10Minutes} {min10Minutes ? t.on : t.off}
      </button>

      <button
        onClick={() =>
          runSearchWithNextState(() => {
            setLast30Days((prev) => !prev);
          })
        }
        className={
          last30Days
            ? "rounded-lg border border-red-600 bg-red-600 px-4 py-2"
            : "rounded-lg border border-gray-700 px-4 py-2 hover:bg-zinc-800"
        }
      >
        📅 {t.last30Days} {last30Days ? t.on : t.off}
      </button>

      <button
        onClick={() =>
          runSearchWithNextState(() => {
  setOrder((prev) =>
    prev === "viewCount"
      ? "relevance"
      : "viewCount"
  );
})
        }
        className={
          order === "viewCount"
            ? "rounded-lg border border-red-600 bg-red-600 px-4 py-2"
            : "rounded-lg border border-gray-700 px-4 py-2 hover:bg-zinc-800"
        }
      >
        🔥 {t.viewCountOrder} {order === "viewCount" ? t.on : t.off}
      </button>

      <button
  onClick={onDownloadCSV}
  className="rounded-lg border border-green-600 bg-green-600 px-4 py-2 hover:bg-green-700"
>
  📄 {t.csvDownload}
</button>

<button
  onClick={onDownloadPDF}
  className="rounded-lg border border-red-600 bg-red-600 px-4 py-2 hover:bg-red-700"
>
  📕 {t.pdfDownload}
</button>

<button
  onClick={onSaveProject}
  className="rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 hover:bg-blue-700"
>
  💾 {t.saveProject}
</button>
    </div>
  );
}