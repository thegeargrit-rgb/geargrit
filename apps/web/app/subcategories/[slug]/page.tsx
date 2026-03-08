import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button-variants";
import { absoluteUrl } from "@/lib/seo";
import { getSubcategoryPageData } from "@/lib/sanity/loaders";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subcategory = await getSubcategoryPageData(slug);
  const canonical = absoluteUrl(`/subcategories/${encodeURIComponent(slug)}`);

  if (!subcategory) {
    return {
      title: "Subcategory Not Found",
      alternates: { canonical },
      robots: { index: false, follow: false },
    };
  }

  const title = subcategory.seo?.metaTitle ?? subcategory.title;
  const description =
    subcategory.seo?.metaDescription ??
    subcategory.description ??
    "Subcategory landing page.";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "GearGrit",
      type: "website",
    },
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { slug } = await params;
  const subcategory = await getSubcategoryPageData(slug);

  if (!subcategory) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            subcategory.parentCategory
              ? {
                  label: subcategory.parentCategory.title,
                  href: `/categories/${subcategory.parentCategory.slug.current}`,
                }
              : { label: "Subcategories" },
            { label: subcategory.title },
          ]}
        />

        <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
          {subcategory.niche}
        </p>
        <h1 className="mb-3 text-3xl font-heading font-bold">
          {subcategory.title}
        </h1>

        {subcategory.description ? (
          <Card className="mb-5">
            <p className="text-sm text-muted-foreground">
              {subcategory.description}
            </p>
          </Card>
        ) : null}

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">Related Reviews</h2>
          {subcategory.relatedReviews.length > 0 ? (
            <div className="grid gap-3">
              {subcategory.relatedReviews.map((review) => (
                <Card key={review._id}>
                  <h3 className="mb-2 font-semibold">{review.title}</h3>
                  {review.verdict ? (
                    <p className="mb-3 text-sm text-muted-foreground">
                      {review.verdict}
                    </p>
                  ) : null}
                  <Link
                    href={`/reviews/${review.slug.current}`}
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    Read Review
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-sm text-muted-foreground">
                No reviews mapped to this subcategory yet.
              </p>
            </Card>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Related Guides</h2>
          {subcategory.relatedGuides.length > 0 ? (
            <div className="grid gap-3">
              {subcategory.relatedGuides.map((guide) => (
                <Card key={guide._id}>
                  <h3 className="mb-2 font-semibold">{guide.title}</h3>
                  {guide.excerpt ? (
                    <p className="mb-3 text-sm text-muted-foreground">
                      {guide.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={`/guides/${guide.slug.current}`}
                    className={cn(buttonVariants({ variant: "secondary" }))}
                  >
                    Read Guide
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-sm text-muted-foreground">
                No guides mapped to this subcategory yet.
              </p>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}