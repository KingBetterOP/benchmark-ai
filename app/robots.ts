import type { MetadataRoute } from "next";

const BASE_URL = "https://benchmark-ai-indol.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/projects/",
        "/report/",
        "/sign-in/",
        "/sign-up/",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}