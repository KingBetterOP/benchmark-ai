import type { MetadataRoute } from "next";

const BASE_URL = "https://benchmark-ai-indol.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/performance`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
  url: `${BASE_URL}/tools/youtube-keyword-analyzer`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.9,
},

{
  url: `${BASE_URL}/tools/youtube-competitor-analysis`,
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.9,
},

{
  url: `${BASE_URL}/tools/youtube-title-analyzer`,
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.9,
},

{
  url: `${BASE_URL}/tools/youtube-thumbnail-analyzer`,
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.9,
},

{
  url: `${BASE_URL}/tools/youtube-seo-analyzer`,
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.9,
},

{
  url: `${BASE_URL}/tools/youtube-content-gap`,
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.9,
},

{
  url: `${BASE_URL}/tools/youtube-channel-benchmark`,
  lastModified: now,
  changeFrequency: "weekly",
  priority: 0.9,
},
  ];
}