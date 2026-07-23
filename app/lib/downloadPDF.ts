import jsPDF from "jspdf";
import {
  BenchmarkReport,
  ContentIdea,
  Strategy,
  CompetitionAnalysis,
  TitleSuggestion,
} from "./types";

type DownloadPDFOptions = {
  keyword: string;
  report: BenchmarkReport | null;
  idea: ContentIdea[];
  strategy: Strategy[];
  competition: CompetitionAnalysis | null;
  titles: TitleSuggestion[];
  recommendedChannels: string;
};

export function downloadPDF({
  keyword,
  report,
  idea,
  strategy,
  competition,
  titles,
  recommendedChannels,
}: DownloadPDFOptions) {
  const doc = new jsPDF();

  let y = 20;

  const addSection = (title: string, content: unknown) => {
    doc.setFontSize(16);
    doc.text(title, 10, y);
    y += 8;

    doc.setFontSize(11);

    const text =
  typeof content === "string"
    ? content
    : JSON.stringify(content, null, 2);

const lines = doc.splitTextToSize(text, 180);

    doc.text(lines, 10, y);

    y += lines.length * 6 + 10;

    if (y > 260) {
      doc.addPage();
      y = 20;
    }
  };

  doc.setFontSize(20);
  doc.text("Benchmark AI Report", 10, y);

  y += 12;

  doc.setFontSize(12);
  doc.text(`Keyword : ${keyword}`, 10, y);

  y += 15;

  addSection("AI Report", report);
  addSection("Ideas", idea);
  addSection("Strategy", strategy);
  addSection("Competition", competition);
  addSection("Titles", titles);
  addSection("Recommended Channels", recommendedChannels);

  doc.save(`${keyword}_benchmark.pdf`);
}