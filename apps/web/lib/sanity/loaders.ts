import { runSanityQuery } from "@/lib/sanity/client";
import {
  CATEGORIES_LIST_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  GUIDES_LIST_QUERY,
  GUIDE_BY_SLUG_QUERY,
  HOMEPAGE_QUERY,
  REVIEWS_LIST_QUERY,
  REVIEW_BY_SLUG_QUERY,
} from "@/lib/sanity/queries";
import type {
  CategoriesListData,
  CategoryPageData,
  GuidesListData,
  GuidePageData,
  HomePageData,
  ReviewsListData,
  ReviewPageData,
} from "@/lib/sanity/types";

const EMPTY_HOMEPAGE: HomePageData = {
  featuredReview: null,
  latestGuides: [],
  topCategories: [],
};

const EMPTY_CATEGORIES_LIST: CategoriesListData = {
  badminton: [],
  trekking: [],
};

const EMPTY_REVIEWS_LIST: ReviewsListData = {
  reviews: [],
};

const EMPTY_GUIDES_LIST: GuidesListData = {
  guides: [],
};

export async function getHomePageData(): Promise<HomePageData> {
  try {
    return await runSanityQuery<HomePageData>(HOMEPAGE_QUERY);
  } catch (error) {
    console.error("Failed to load homepage data from Sanity", error);
    return EMPTY_HOMEPAGE;
  }
}

export async function getCategoriesListData(): Promise<CategoriesListData> {
  try {
    return await runSanityQuery<CategoriesListData>(CATEGORIES_LIST_QUERY);
  } catch (error) {
    console.error("Failed to load categories list data from Sanity", error);
    return EMPTY_CATEGORIES_LIST;
  }
}

export async function getReviewsListData(): Promise<ReviewsListData> {
  try {
    return await runSanityQuery<ReviewsListData>(REVIEWS_LIST_QUERY);
  } catch (error) {
    console.error("Failed to load reviews list data from Sanity", error);
    return EMPTY_REVIEWS_LIST;
  }
}

export async function getGuidesListData(): Promise<GuidesListData> {
  try {
    return await runSanityQuery<GuidesListData>(GUIDES_LIST_QUERY);
  } catch (error) {
    console.error("Failed to load guides list data from Sanity", error);
    return EMPTY_GUIDES_LIST;
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
