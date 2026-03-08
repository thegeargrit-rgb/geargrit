import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button-variants";
import { absoluteUrl } from "@/lib/seo";
import { getBlogArticlePageData } from "@/lib/sanity/loaders";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

function blockText(block: {
  children?: Array<{ _type?: string; text?: string }>;
}): string {
  if (!block.children) return "";
  return block.children
    .filter((child) => child._type === "span" && typeof child.text === "string")
    .map((child) => child.text)
    .join("");
}

function formatDate(date?: string) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getWordCount(body?: Array<{ children?: Array<{ text?: string }> }>) {
  if (!body?.length) return 0;

  return body
    .map((block) =>
      (block.children ?? [])
        .map((child) => child.text ?? "")
        .join(" ")
        .trim(),
    )
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function getReadingTime(wordCount: number) {
  if (wordCount <= 0) return "1 min read";
  return `${Math.max(1, Math.round(wordCount / 210))} min read`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogArticlePageData(slug);
  const canonical = absoluteUrl(`/blog/${encodeURIComponent(slug)}`);

  if (!article) {
    return {
      title: "Article Not Found",
      alternates: { canonical },
      robots: { index: false, follow: false },
    };
  }

  const title = article.seo?.metaTitle ?? article.title;
  const description = article.seo?.metaDescription ?? article.excerpt ?? "";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "GearGrit",
      type: "article",
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getBlogArticlePageData(slug);

  if (!article) notFound();

  const publishedLabel = formatDate(article.publishedAt);
  const updatedLabel = formatDate(article.updatedAt);
  const wordCount = getWordCount(article.body);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-4xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: article.title },
          ]}
        />

        <article className="mt-4">
          <header className="gg-fade-up mb-7 rounded-2xl border bg-gradient-to-br from-background via-card to-muted/35 p-6 sm:p-8 md:gg-soft-glow">
            <p className="mb-3 inline-flex rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              GearGrit Blog
            </p>
            <h1 className="mb-4 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
              <span className="rounded-full border border-border/70 bg-background px-3 py-1">
                {article.author?.name ? `By ${article.author.name}` : "By GearGrit"}
              </span>
              {publishedLabel ? (
                <span className="rounded-full border border-border/70 bg-background px-3 py-1">
                  Published {publishedLabel}
                </span>
              ) : null}
              {updatedLabel ? (
                <span className="rounded-full border border-border/70 bg-background px-3 py-1">
                  Updated {updatedLabel}
                </span>
              ) : null}
              <span className="rounded-full border border-border/70 bg-background px-3 py-1">
                {getReadingTime(wordCount)}
              </span>
            </div>
          </header>

          {article.excerpt ? (
            <Card className="gg-fade-up gg-delay-1 mb-6 rounded-2xl border-border/70 bg-muted/25 p-5">
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                {article.excerpt}
              </p>
            </Card>
          ) : null}

          <Card className="gg-fade-up gg-delay-2 mb-7 rounded-2xl border-border/70 bg-card/95 p-6 sm:p-8">
            {article.body?.length ? (
              <div className="space-y-4">
                {article.body.map((block) => {
                  const text = blockText(block);
                  if (!text.trim()) return null;

                  if (block.style === "h2") {
                    return (
                      <h2
                        key={block._key}
                        className="pt-2 text-2xl font-semibold tracking-tight"
                      >
                        {text}
                      </h2>
                    );
                  }

                  if (block.style === "h3") {
                    return (
                      <h3
                        key={block._key}
                        className="pt-1 text-xl font-semibold tracking-tight"
                      >
                        {text}
                      </h3>
                    );
                  }

                  if (block.listItem === "bullet") {
                    return (
                      <ul
                        key={block._key}
                        className="list-disc pl-6 text-base leading-8 marker:text-primary"
                      >
                        <li>{text}</li>
                      </ul>
                    );
                  }

                  if (block.listItem === "number") {
                    return (
                      <ol
                        key={block._key}
                        className="list-decimal pl-6 text-base leading-8 marker:font-semibold"
                      >
                        <li>{text}</li>
                      </ol>
                    );
                  }

                  if (block.style === "blockquote") {
                    return (
                      <blockquote
                        key={block._key}
                        className="rounded-r-xl border-l-4 border-primary/40 bg-muted/40 px-4 py-2 text-base leading-8 text-muted-foreground"
                      >
                        {text}
                      </blockquote>
                    );
                  }

                  return (
                    <p key={block._key} className="text-base leading-8 text-foreground/95">
                      {text}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No article body found.</p>
            )}
          </Card>

          <div className="gg-fade-up gg-delay-3 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: "outline" }), "md:gg-hover-lift")}
            >
              Back to Blog
            </Link>
            <Link href="/reviews" className={cn(buttonVariants({ variant: "ghost" }), "md:gg-hover-lift")}>
              Explore Reviews
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}


