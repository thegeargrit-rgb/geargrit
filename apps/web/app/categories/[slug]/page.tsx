import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { getCategoryPageData } from "@/lib/sanity/loaders";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryPageData(slug);

  if (!category) return { title: "Category Not Found | GearGrit" };

  return {
    title: category.seo?.metaTitle ?? `${category.title} | GearGrit`,
    description: category.seo?.metaDescription ?? category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryPageData(slug);

  if (!category) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
          {category.niche}
        </p>
        <h1 className="mb-3 text-3xl font-heading font-bold">
          {category.title}
        </h1>
        {category.description ? (
          <p className="mb-6 text-muted-foreground">{category.description}</p>
        ) : null}

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">Related Reviews</h2>
          {category.relatedReviews.length > 0 ? (
            <div className="grid gap-3">
              {category.relatedReviews.map((review) => (
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
                No reviews yet for this category.
              </p>
            </Card>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Related Guides</h2>
          {category.relatedGuides.length > 0 ? (
            <div className="grid gap-3">
              {category.relatedGuides.map((guide) => (
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
                No guides yet for this category.
              </p>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
