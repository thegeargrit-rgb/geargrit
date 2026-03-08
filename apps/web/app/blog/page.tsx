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

export default async function BlogIndexPage() {
  const data = await getBlogListData();

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <h1 className="mb-3 text-3xl font-heading font-bold">Blog</h1>
        <p className="mb-6 text-muted-foreground">
          Editorial notes, gear explainers, and product-learning content.
        </p>

        {data.articles.length > 0 ? (
          <div className="grid gap-3">
            {data.articles.map((article) => (
              <Card key={article._id}>
                <h2 className="mb-2 text-lg font-semibold">{article.title}</h2>
                {article.excerpt ? (
                  <p className="mb-3 text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                ) : null}
                <div className="mb-3 text-xs text-muted-foreground">
                  {article.authorName ? `By ${article.authorName}` : "By GearGrit"}
                  {article.publishedAt
                    ? ` • ${new Date(article.publishedAt).toLocaleDateString()}`
                    : ""}
                </div>
                <Link
                  href={`/blog/${article.slug.current}`}
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Read Article
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-muted-foreground">
              No blog articles published yet. Add `blogArticle` documents in Sanity.
            </p>
          </Card>
        )}
      </main>
      <Footer />
    </>
  );
}