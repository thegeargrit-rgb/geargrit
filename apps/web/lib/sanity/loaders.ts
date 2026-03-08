import { runSanityQuery } from "@/lib/sanity/client";
import {
  BLOG_BY_SLUG_QUERY,
  BLOG_LIST_QUERY,
  BRANDS_LIST_QUERY,
  BRAND_BY_SLUG_QUERY,
  CATEGORIES_LIST_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  GUIDES_LIST_QUERY,
  GUIDE_BY_SLUG_QUERY,
  HOMEPAGE_QUERY,
  REVIEWS_LIST_QUERY,
  REVIEW_BY_SLUG_QUERY,
  SUBCATEGORIES_LIST_QUERY,
  SUBCATEGORY_BY_SLUG_QUERY,
} from "@/lib/sanity/queries";
import type {
  BlogArticlePageData,
  BlogListData,
  BrandsListData,
  BrandPageData,
  CategoriesListData,
  CategoryPageData,
  GuidesListData,
  GuidePageData,
  HomePageData,
  ReviewsListData,
  ReviewPageData,
  SubcategoriesListData,
  SubcategoryPageData,
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

const EMPTY_SUBCATEGORIES_LIST: SubcategoriesListData = {
  subcategories: [],
};

const EMPTY_REVIEWS_LIST: ReviewsListData = {
  reviews: [],
};

const EMPTY_GUIDES_LIST: GuidesListData = {
  guides: [],
};

const EMPTY_BLOG_LIST: BlogListData = {
  articles: [],
};

const EMPTY_BRANDS_LIST: BrandsListData = {
  brands: [],
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

export async function getSubcategoriesListData(): Promise<SubcategoriesListData> {
  try {
    return await runSanityQuery<SubcategoriesListData>(SUBCATEGORIES_LIST_QUERY);
  } catch (error) {
    console.error("Failed to load subcategory list data from Sanity", error);
    return EMPTY_SUBCATEGORIES_LIST;
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

export async function getBlogListData(): Promise<BlogListData> {
  try {
    return await runSanityQuery<BlogListData>(BLOG_LIST_QUERY);
  } catch (error) {
    console.error("Failed to load blog list data from Sanity", error);
    return EMPTY_BLOG_LIST;
  }
}

export async function getBrandsListData(): Promise<BrandsListData> {
  try {
    return await runSanityQuery<BrandsListData>(BRANDS_LIST_QUERY);
  } catch (error) {
    console.error("Failed to load brand list data from Sanity", error);
    return EMPTY_BRANDS_LIST;
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

export async function getSubcategoryPageData(
  slug: string,
): Promise<SubcategoryPageData | null> {
  try {
    return await runSanityQuery<SubcategoryPageData | null>(
      SUBCATEGORY_BY_SLUG_QUERY,
      { slug },
    );
  } catch (error) {
    console.error(`Failed to load subcategory data for slug: ${slug}`, error);
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

export async function getBlogArticlePageData(
  slug: string,
): Promise<BlogArticlePageData | null> {
  try {
    return await runSanityQuery<BlogArticlePageData | null>(BLOG_BY_SLUG_QUERY, {
      slug,
    });
  } catch (error) {
    console.error(`Failed to load blog article for slug: ${slug}`, error);
    return null;
  }
}

export async function getBrandPageData(
  slug: string,
): Promise<BrandPageData | null> {
  try {
    return await runSanityQuery<BrandPageData | null>(BRAND_BY_SLUG_QUERY, {
      slug,
    });
  } catch (error) {
    console.error(`Failed to load brand data for slug: ${slug}`, error);
    return null;
  }
}