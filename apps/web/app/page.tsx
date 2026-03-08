import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getHomePageData } from "@/lib/sanity/loaders";

export const metadata: Metadata = buildPageMetadata({
  title: "Best Badminton & Trekking Gear Reviews",
  description:
    "Expert reviews and buying guides for badminton and trekking gear. Find the best equipment for your game and adventures.",
  path: "/",
});

export default async function HomePage() {
  const data = await getHomePageData();
  const featuredReview = data.featuredReview;
  const hasAnyContent =
    Boolean(featuredReview) ||
    data.latestGuides.length > 0 ||
    data.topCategories.length > 0;

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <section className="gg-fade-up relative overflow-hidden rounded-3xl border bg-gradient-to-br from-background via-muted/60 to-accent/30 p-6 sm:p-10">
          <div className="absolute -right-24 -top-24 hidden h-64 w-64 rounded-full bg-primary/10 blur-3xl sm:block" />
          <div className="absolute -bottom-24 -left-16 hidden h-56 w-56 rounded-full bg-chart-2/15 blur-3xl sm:block" />
          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Reviews · Guides · Field Notes
            </p>
            <h1 className="mb-4 max-w-3xl font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Gear choices that hold up in the real world
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              GearGrit helps you buy with confidence through practical testing,
              clear scoring, and honest recommendations for badminton and
              trekking equipment in India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/reviews"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "md:gg-hover-lift",
                )}
              >
                Explore Reviews
              </Link>
              <Link
                href="/guides"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "md:gg-hover-lift",
                )}
              >
                Read Buying Guides
              </Link>
            </div>
          </div>
        </section>

        <section className="gg-fade-up gg-delay-1 mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="rounded-2xl border-border/70 bg-card/90 p-5 md:gg-hover-lift md:gg-soft-glow sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <Badge size="sm">Featured Review</Badge>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Editor Pick
              </span>
            </div>
            {featuredReview ? (
              <>
                <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                  {featuredReview.title}
                </h2>
                <div className="mb-3 flex items-center gap-2 text-sm">
                  <ScoreBadge score={featuredReview.score} color="success" />
                  <span className="text-muted-foreground">Overall score</span>
                </div>
                {featuredReview.productTitle ? (
                  <p className="mb-4 text-sm text-muted-foreground">
                    Product: {featuredReview.productTitle}
                  </p>
                ) : null}
                <Link
                  href={`/reviews/${featuredReview.slug.current}`}
                  className={cn(buttonVariants({ variant: "default" }), "md:gg-hover-lift")}
                >
                  Read Full Review
                </Link>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No featured review yet. Add a review document in Sanity to
                populate this section.
              </p>
            )}
          </Card>

          <Card className="rounded-2xl border-border/70 bg-muted/30 p-5 md:gg-hover-lift md:gg-soft-glow sm:p-6">
            <h2 className="mb-3 text-xl font-semibold tracking-tight">
              Browse Categories
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Jump directly into sports-specific research.
            </p>
            {data.topCategories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.topCategories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug.current}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "md:gg-hover-lift",
                    )}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No categories available yet. Add category documents in Sanity.
              </p>
            )}
          </Card>
        </section>

        <section className="gg-fade-up gg-delay-2 mt-10">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-2xl font-heading font-bold tracking-tight">
              Latest Guides
            </h2>
            <Link
              href="/guides"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "md:gg-hover-lift",
              )}
            >
              View all guides
            </Link>
          </div>
          {data.latestGuides.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.latestGuides.map((guide) => (
                <Card
                  key={guide._id}
                  className="group rounded-2xl border-border/70 bg-card/95 p-5 md:gg-hover-lift md:gg-soft-glow"
                >
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {guide.guideType.replace("-", " ")}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {guide.title}
                  </h3>
                  {guide.excerpt ? (
                    <p className="mb-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {guide.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={`/guides/${guide.slug.current}`}
                    className={cn(
                      buttonVariants({ variant: "secondary" }),
                      "md:gg-hover-lift",
                    )}
                  >
                    Read Guide
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="rounded-2xl border-border/70">
              <p className="text-sm text-muted-foreground">
                No guides published yet. Add guide documents in Sanity to
                populate this section.
              </p>
            </Card>
          )}
        </section>

        {!hasAnyContent ? (
          <Card className="gg-fade-up gg-delay-3 mt-8 rounded-2xl border-dashed bg-muted/40">
            <p className="text-sm text-muted-foreground">
              Content placeholders are active. Publish reviews, guides, and
              categories in Sanity to unlock the full homepage.
            </p>
          </Card>
        ) : null}
      </main>
      <Footer />
    </>
  );
}


