import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { getBlogListData } from "@/lib/sanity/loaders";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: "Editorial articles, updates, and practical gear knowledge.",
  path: "/blog",
});

function formatDate(date?: string) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const data = await getBlogListData();
  const hasArticles = data.articles.length > 0;
  const featured = hasArticles ? data.articles[0] : null;
  const rest = hasArticles ? data.articles.slice(1) : [];
  const featuredDate = formatDate(featured?.publishedAt);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-background via-muted/60 to-secondary/40 p-6 sm:p-10">
          <div className="absolute -right-20 -top-20 hidden h-52 w-52 rounded-full bg-primary/10 blur-3xl sm:block" />
          <div className="relative">
            <p className="mb-3 inline-flex rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              GearGrit Editorial
            </p>
            <h1 className="mb-4 max-w-3xl font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Practical stories and insights for smarter gear decisions
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Explore explainers, product context, and behind-the-scenes notes
              from our testing journey.
            </p>
          </div>
        </section>

        {featured ? (
          <section className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-2xl border-border/70 bg-card/95 p-6 md:gg-hover-lift md:gg-soft-glow">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Featured Article
              </p>
              <h2 className="mb-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {featured.title}
              </h2>
              {featured.excerpt ? (
                <p className="mb-4 text-sm leading-7 text-muted-foreground sm:text-base">
                  {featured.excerpt}
                </p>
              ) : null}
              <div className="mb-5 text-xs uppercase tracking-wide text-muted-foreground">
                {featured.authorName ? `By ${featured.authorName}` : "By GearGrit"}
                {featuredDate ? ` · ${featuredDate}` : ""}
              </div>
              <Link
                href={`/blog/${featured.slug.current}`}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "md:gg-hover-lift",
                )}
              >
                Read Featured Story
              </Link>
            </Card>

            <Card className="rounded-2xl border-border/70 bg-muted/25 p-6 md:gg-hover-lift md:gg-soft-glow">
              <h3 className="mb-3 text-xl font-semibold tracking-tight">
                Looking for product verdicts?
              </h3>
              <p className="mb-5 text-sm leading-7 text-muted-foreground">
                Jump to our score-driven reviews and buying guides if you are
                ready to compare options right away.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/reviews"
                  className={cn(buttonVariants({ variant: "secondary" }), "md:gg-hover-lift")}
                >
                  Browse Reviews
                </Link>
                <Link
                  href="/guides"
                  className={cn(buttonVariants({ variant: "outline" }), "md:gg-hover-lift")}
                >
                  Browse Guides
                </Link>
              </div>
            </Card>
          </section>
        ) : null}

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-2xl font-heading font-bold tracking-tight">
              Latest Articles
            </h2>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              {data.articles.length} published
            </span>
          </div>

          {hasArticles ? (
            <div className="grid gap-4 md:grid-cols-2">
              {rest.map((article) => {
                const publishedLabel = formatDate(article.publishedAt);

                return (
                  <Card
                    key={article._id}
                    className="group rounded-2xl border-border/70 bg-card/95 p-5 md:gg-hover-lift md:gg-soft-glow"
                  >
                    <h3 className="mb-2 text-xl font-semibold tracking-tight">
                      <Link
                        href={`/blog/${article.slug.current}`}
                        className="underline-offset-4 transition-colors hover:text-primary hover:underline"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    {article.excerpt ? (
                      <p className="mb-4 text-sm leading-6 text-muted-foreground">
                        {article.excerpt}
                      </p>
                    ) : null}
                    <div className="mb-4 text-xs uppercase tracking-wide text-muted-foreground">
                      {article.authorName ? `By ${article.authorName}` : "By GearGrit"}
                      {publishedLabel ? ` · ${publishedLabel}` : ""}
                    </div>
                    <Link
                      href={`/blog/${article.slug.current}`}
                      className={cn(buttonVariants({ variant: "outline" }), "md:gg-hover-lift")}
                    >
                      Read Full Article
                    </Link>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="rounded-2xl border-border/70 bg-muted/30">
              <p className="text-sm text-muted-foreground">
                No blog articles published yet. Add `blogArticle` documents in
                Sanity.
              </p>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
