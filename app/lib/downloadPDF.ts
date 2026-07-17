import jsPDF from "jspdf";

type DownloadPDFOptions = {
  keyword: string;
  report: string;
  idea: string;
  strategy: string;
  competition: string;
  titles: string;
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

  const addSection = (title: string, content: string) => {
    doc.setFontSize(16);
    doc.text(title, 10, y);
    y += 8;

    doc.setFontSize(11);

    const lines = doc.splitTextToSize(content || "-", 180);

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