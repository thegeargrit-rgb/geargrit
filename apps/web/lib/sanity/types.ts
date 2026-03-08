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
