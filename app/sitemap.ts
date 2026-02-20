import { MetadataRoute } from "next";

const BASE_URL = "https://urbancodestudio.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    url: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
  }[] = [
    { url: "", changeFrequency: "weekly", priority: 1 },
    { url: "/services", changeFrequency: "monthly", priority: 0.9 },
    { url: "/pricing", changeFrequency: "monthly", priority: 0.9 },
    { url: "/portfolio", changeFrequency: "monthly", priority: 0.8 },
    { url: "/reviews", changeFrequency: "monthly", priority: 0.8 },
    { url: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { url: "/about", changeFrequency: "monthly", priority: 0.7 },
    { url: "/faqs", changeFrequency: "monthly", priority: 0.7 },
    { url: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
