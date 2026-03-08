import { runSanityQuery } from "@/lib/sanity/client";
import {
  CATEGORY_BY_SLUG_QUERY,
  GUIDE_BY_SLUG_QUERY,
  HOMEPAGE_QUERY,
  REVIEW_BY_SLUG_QUERY,
} from "@/lib/sanity/queries";
import type {
  CategoryPageData,
  GuidePageData,
  HomePageData,
  ReviewPageData,
} from "@/lib/sanity/types";

const EMPTY_HOMEPAGE: HomePageData = {
  featuredReview: null,
  latestGuides: [],
  topCategories: [],
};

export async function getHomePageData(): Promise<HomePageData> {
  try {
    return await runSanityQuery<HomePageData>(HOMEPAGE_QUERY);
  } catch (error) {
    console.error("Failed to load homepage data from Sanity", error);
    return EMPTY_HOMEPAGE;
  }
}

export async function getCategoryPageData(
  slug: string,
): Promise<CategoryPageData | null> {
  try {
    return await runSanityQuery<CategoryPageData | null>(
      CATEGORY_BY_SLUG_QUERY,
      { slug },
    );
  } catch (error) {
    console.error(`Failed to load category data for slug: ${slug}`, error);
    return null;
  }
}

export async function getReviewPageData(
  slug: string,
): Promise<ReviewPageData | null> {
  try {
    return await runSanityQuery<ReviewPageData | null>(REVIEW_BY_SLUG_QUERY, {
      slug,
    });
  } catch (error) {
    console.error(`Failed to load review data for slug: ${slug}`, error);
    return null;
  }
}

export async function getGuidePageData(
  slug: string,
): Promise<GuidePageData | null> {
  try {
    return await runSanityQuery<GuidePageData | null>(GUIDE_BY_SLUG_QUERY, {
      slug,
    });
  } catch (error) {
    console.error(`Failed to load guide data for slug: ${slug}`, error);
    return null;
  }
}
