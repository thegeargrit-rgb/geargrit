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

export const CATEGORIES_LIST_QUERY = /* groq */ `
{
  "badminton": *[_type == "category" && niche == "badminton" && !defined(parentCategory)] | order(title asc){
    _id,
    title,
    slug,
    niche,
    description
  },
  "trekking": *[_type == "category" && niche == "trekking" && !defined(parentCategory)] | order(title asc){
    _id,
    title,
    slug,
    niche,
    description
  }
}
`;

export const SUBCATEGORIES_LIST_QUERY = /* groq */ `
{
  "subcategories": *[_type == "category" && defined(parentCategory)] | order(title asc){
    _id,
    title,
    slug,
    niche,
    description
  }
}
`;

export const REVIEWS_LIST_QUERY = /* groq */ `
{
  "reviews": *[_type == "review"] | order(publishedAt desc){
    _id,
    title,
    slug,
    score,
    publishedAt,
    verdict,
    "productTitle": product->title
  }
}
`;

export const GUIDES_LIST_QUERY = /* groq */ `
{
  "guides": *[_type == "guide"] | order(publishedAt desc){
    _id,
    title,
    slug,
    guideType,
    excerpt,
    publishedAt
  }
}
`;

export const BLOG_LIST_QUERY = /* groq */ `
{
  "articles": *[_type == "blogArticle"] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "authorName": author->name
  }
}
`;

export const BRANDS_LIST_QUERY = /* groq */ `
{
  "brands": *[_type == "brand"] | order(name asc){
    _id,
    name,
    slug,
    description,
    website
  }
}
`;

export const CATEGORY_BY_SLUG_QUERY = /* groq */ `
*[_type == "category" && slug.current == $slug && !defined(parentCategory)][0]{
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

export const SUBCATEGORY_BY_SLUG_QUERY = /* groq */ `
*[_type == "category" && slug.current == $slug && defined(parentCategory)][0]{
  _id,
  title,
  slug,
  niche,
  description,
  seo,
  "parentCategory": parentCategory->{
    _id,
    title,
    slug
  },
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

export const BLOG_BY_SLUG_QUERY = /* groq */ `
*[_type == "blogArticle" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  updatedAt,
  seo,
  "author": author->{name}
}
`;

export const BRAND_BY_SLUG_QUERY = /* groq */ `
*[_type == "brand" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  description,
  website,
  seo,
  "relatedReviews": *[_type == "review" && product->brand->slug.current == ^.slug.current] | order(publishedAt desc)[0...8]{
    _id,
    title,
    slug,
    score,
    publishedAt,
    verdict,
    "productTitle": product->title
  },
  "relatedGuides": *[_type == "guide" && count(productsMentioned[@->brand->slug.current == ^.slug.current]) > 0] | order(publishedAt desc)[0...8]{
    _id,
    title,
    slug,
    guideType,
    excerpt,
    publishedAt
  }
}
`;