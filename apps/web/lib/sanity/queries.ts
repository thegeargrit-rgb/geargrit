export const HOMEPAGE_QUERY = /* groq */ `
{
  "featuredReview": *[_type == "review"] | order(publishedAt desc)[0]{
    _id,
    title,
    slug,
    score,
    publishedAt,
    verdict,
    "productTitle": product->title
  },
  "latestGuides": *[_type == "guide"] | order(publishedAt desc)[0...3]{
    _id,
    title,
    slug,
    guideType,
    excerpt,
    publishedAt
  },
  "topCategories": *[_type == "category"] | order(title asc)[0...6]{
    _id,
    title,
    slug,
    niche,
    description
  }
}
`;

export const CATEGORY_BY_SLUG_QUERY = /* groq */ `
*[_type == "category" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  niche,
  description,
  seo,
  "relatedReviews": *[_type == "review" && references(^._id)] | order(publishedAt desc)[0...6]{
    _id,
    title,
    slug,
    score,
    publishedAt,
    verdict,
    "productTitle": product->title
  },
  "relatedGuides": *[_type == "guide" && references(^._id)] | order(publishedAt desc)[0...6]{
    _id,
    title,
    slug,
    guideType,
    excerpt,
    publishedAt
  }
}
`;

export const REVIEW_BY_SLUG_QUERY = /* groq */ `
*[_type == "review" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  score,
  verdict,
  pros,
  cons,
  publishedAt,
  seo,
  "author": author->{name},
  "product": product->{title, affiliateSlug}
}
`;

export const GUIDE_BY_SLUG_QUERY = /* groq */ `
*[_type == "guide" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  guideType,
  excerpt,
  publishedAt,
  seo,
  "author": author->{name},
  "categories": categories[]->{
    _id,
    title,
    slug,
    niche,
    description
  }
}
`;
