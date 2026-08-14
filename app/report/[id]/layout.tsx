import type { Metadata } from "next";
import { adminDb } from "@/app/lib/firebase-admin";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;

  const fallbackTitle =
    "YouTube Research Report | Benchmark AI";

  const fallbackDescription =
    "AI-powered YouTube content opportunity analysis by Benchmark AI.";

  try {
    const doc = await adminDb
      .collection("reports")
      .doc(id)
      .get();

    if (!doc.exists) {
      return {
        title: fallbackTitle,
        description: fallbackDescription,
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const data = doc.data();

    const visibility =
      data?.visibility === "public"
        ? "public"
        : "private";

    /*
    ============================================================
    PRIVATE REPORT
    ============================================================
    */

    if (visibility !== "public") {
      return {
        title: fallbackTitle,
        description: fallbackDescription,
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    /*
    ============================================================
    PUBLIC REPORT
    ============================================================
    */

    const keyword =
      typeof data?.keyword === "string" &&
      data.keyword.trim().length > 0
        ? data.keyword.trim()
        : "YouTube";

    const title =
      `${keyword} YouTube Research Report | Benchmark AI`;

    const description =
      `Discover the YouTube opportunity, competition, expected views, and content strategy for "${keyword}" with Benchmark AI.`;

    const reportUrl =
      `https://benchmark-ai-indol.vercel.app/report/${id}`;

    return {
      title,

      description,

      robots: {
        index: true,
        follow: true,
      },

      alternates: {
        canonical: reportUrl,
      },

      openGraph: {
        title,
        description,
        url: reportUrl,
        siteName: "Benchmark AI",
        locale: "en_US",
        type: "article",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: `${keyword} YouTube Research Report - Benchmark AI`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-image.png"],
      },
    };
  } catch (error) {
    console.error(
      "Failed to generate report metadata:",
      error
    );

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}