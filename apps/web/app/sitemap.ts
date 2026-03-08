import type { MetadataRoute } from "next";
import {
  getCategoriesListData,
  getGuidesListData,
  getReviewsListData,
} from "@/lib/sanity/loaders";
import { absoluteUrl } from "@/lib/seo";

function toIsoDate(value?: string): string {
  if (!value) {
    return new Date().toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString()
    : parsed.toISOString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, priority: 1 },
    { url: absoluteUrl("/badminton"), lastModified: now, priority: 0.9 },
    { url: absoluteUrl("/trekking"), lastModified: now, priority: 0.9 },
    { url: absoluteUrl("/categories"), lastModified: now, priority: 0.9 },
    { url: absoluteUrl("/reviews"), lastModified: now, priority: 0.9 },
    { url: absoluteUrl("/guides"), lastModified: now, priority: 0.9 },
    { url: absoluteUrl("/search"), lastModified: now, priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: now, priority: 0.7 },
    { url: absoluteUrl("/about"), lastModified: now, priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: now, priority: 0.5 },
    {
      url: absoluteUrl("/affiliate-disclosure"),
      lastModified: now,
      priority: 0.4,
    },
    { url: absoluteUrl("/privacy"), lastModified: now, priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: now, priority: 0.3 },
  ];

  try {
    const [categories, reviews, guides] = await Promise.all([
      getCategoriesListData(),
      getReviewsListData(),
      getGuidesListData(),
    ]);

    const categoryUrls: MetadataRoute.Sitemap = [
      ...categories.badminton,
      ...categories.trekking,
    ].map((category) => ({
      url: absoluteUrl(`/categories/${category.slug.current}`),
      lastModified: now,
      priority: 0.8,
    }));

    const reviewUrls: MetadataRoute.Sitemap = reviews.reviews.map((review) => ({
      url: absoluteUrl(`/reviews/${review.slug.current}`),
      lastModified: toIsoDate(review.publishedAt),
      priority: 0.8,
    }));

    const guideUrls: MetadataRoute.Sitemap = guides.guides.map((guide) => ({
      url: absoluteUrl(`/guides/${guide.slug.current}`),
      lastModified: toIsoDate(guide.publishedAt),
      priority: 0.8,
    }));

    return [...staticRoutes, ...categoryUrls, ...reviewUrls, ...guideUrls];
  } catch {
    return staticRoutes;
  }
}