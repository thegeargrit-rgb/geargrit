import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { getHomePageData } from "@/lib/sanity/loaders";

export default async function HomePage() {
  const data = await getHomePageData();
  const featuredReview = data.featuredReview;

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">
          Welcome to GearGrit
        </h1>
        <p className="mb-6 font-body">
          Find trusted expert reviews and detailed guides for the best badminton
          and trekking gear in India.
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">Featured Review</h2>
          {featuredReview ? (
            <Card className="mb-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge size="sm">NEW</Badge>
                <span className="font-semibold">{featuredReview.title}</span>
              </div>
              <div className="mb-2">
                <ScoreBadge score={featuredReview.score} color="success" /> / 10
              </div>
              {featuredReview.productTitle ? (
                <p className="mb-3 text-sm text-muted-foreground">
                  Product: {featuredReview.productTitle}
                </p>
              ) : null}
              <Link
                href={`/reviews/${featuredReview.slug.current}`}
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Read Full Review
              </Link>
            </Card>
          ) : (
            <Card className="mb-4">
              <p className="text-sm text-muted-foreground">
                No featured review yet. Add a review document in Sanity to
                populate this section.
              </p>
            </Card>
          )}
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">Latest Guides</h2>
          {data.latestGuides.length > 0 ? (
            <div className="grid gap-3">
              {data.latestGuides.map((guide) => (
                <Card key={guide._id}>
                  <div className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                    {guide.guideType}
                  </div>
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
                No guides published yet. Add guide documents in Sanity to
                populate this section.
              </p>
            </Card>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Browse Categories</h2>
          {data.topCategories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.topCategories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category.slug.current}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                  )}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-sm text-muted-foreground">
                No categories available yet. Add category documents in Sanity to
                populate this section.
              </p>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
