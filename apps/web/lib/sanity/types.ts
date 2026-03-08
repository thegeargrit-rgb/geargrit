export type SanitySlug = {
  current: string;
};

export type CategorySummary = {
  _id: string;
  title: string;
  slug: SanitySlug;
  niche: "badminton" | "trekking";
  description?: string;
};

export type BrandSummary = {
  _id: string;
  name: string;
  slug: SanitySlug;
  description?: string;
  website?: string;
};

export type ReviewSummary = {
  _id: string;
  title: string;
  slug: SanitySlug;
  score: number;
  publishedAt?: string;
  verdict?: string;
  productTitle?: string;
};

export type GuideSummary = {
  _id: string;
  title: string;
  slug: SanitySlug;
  guideType: "buying-guide" | "comparison" | "how-to";
  excerpt?: string;
  publishedAt?: string;
};

export type BlogArticleSummary = {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  publishedAt?: string;
  authorName?: string;
};

export type HomePageData = {
  featuredReview: ReviewSummary | null;
  latestGuides: GuideSummary[];
  topCategories: CategorySummary[];
};

export type CategoriesListData = {
  badminton: CategorySummary[];
  trekking: CategorySummary[];
};

export type ReviewsListData = {
  reviews: ReviewSummary[];
};

export type GuidesListData = {
  guides: GuideSummary[];
};

export type BlogListData = {
  articles: BlogArticleSummary[];
};

export type BrandsListData = {
  brands: BrandSummary[];
};

export type SubcategoriesListData = {
  subcategories: CategorySummary[];
};

export type CategoryPageData = {
  _id: string;
  title: string;
  slug: SanitySlug;
  niche: "badminton" | "trekking";
  description?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  relatedReviews: ReviewSummary[];
  relatedGuides: GuideSummary[];
};

export type ReviewPageData = {
  _id: string;
  title: string;
  slug: SanitySlug;
  score: number;
  verdict?: string;
  pros?: string[];
  cons?: string[];
  publishedAt?: string;
  product?: {
    title?: string;
    affiliateSlug?: string;
  };
  author?: {
    name?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

export type GuidePageData = {
  _id: string;
  title: string;
  slug: SanitySlug;
  guideType: "buying-guide" | "comparison" | "how-to";
  excerpt?: string;
  publishedAt?: string;
  author?: {
    name?: string;
  };
  categories?: CategorySummary[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

export type BlogArticlePageData = {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: {
    name?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

export type BrandPageData = {
  _id: string;
  name: string;
  slug: SanitySlug;
  description?: string;
  website?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  relatedReviews: ReviewSummary[];
  relatedGuides: GuideSummary[];
};

export type SubcategoryPageData = {
  _id: string;
  title: string;
  slug: SanitySlug;
  niche: "badminton" | "trekking";
  description?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  parentCategory?: {
    _id: string;
    title: string;
    slug: SanitySlug;
  };
  relatedReviews: ReviewSummary[];
  relatedGuides: GuideSummary[];
};