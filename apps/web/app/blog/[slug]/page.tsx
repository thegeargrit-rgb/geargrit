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

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: article.title },
          ]}
        />

        <h1 className="mb-3 text-3xl font-heading font-bold">
          {article.title}
        </h1>

        <div className="mb-5 text-xs text-muted-foreground">
          {article.author?.name ? `By ${article.author.name}` : "By GearGrit"}
          {article.publishedAt
            ? ` - ${new Date(article.publishedAt).toLocaleDateString()}`
            : ""}
          {article.updatedAt
            ? ` - Updated ${new Date(article.updatedAt).toLocaleDateString()}`
            : ""}
        </div>

        {article.excerpt ? (
          <Card className="mb-5">
            <p className="text-sm text-muted-foreground">{article.excerpt}</p>
          </Card>
        ) : null}

        <Card className="mb-5">
          {article.body?.length ? (
            <article className="prose prose-slate max-w-none dark:prose-invert">
              {article.body.map((block) => {
                const text = blockText(block);
                if (!text.trim()) return null;

                if (block.style === "h2") {
                  return (
                    <h2
                      key={block._key}
                      className="mb-3 mt-6 text-2xl font-semibold"
                    >
                      {text}
                    </h2>
                  );
                }

                if (block.style === "h3") {
                  return (
                    <h3
                      key={block._key}
                      className="mb-2 mt-5 text-xl font-semibold"
                    >
                      {text}
                    </h3>
                  );
                }

                if (block.listItem === "bullet") {
                  return (
                    <ul
                      key={block._key}
                      className="mb-3 list-disc pl-5 text-base leading-7"
                    >
                      <li>{text}</li>
                    </ul>
                  );
                }

                if (block.style === "blockquote") {
                  return (
                    <blockquote
                      key={block._key}
                      className="mb-4 border-l-4 pl-4 text-muted-foreground"
                    >
                      {text}
                    </blockquote>
                  );
                }

                return (
                  <p key={block._key} className="mb-4 text-base leading-7">
                    {text}
                  </p>
                );
              })}
            </article>
          ) : (
            <p className="text-sm text-muted-foreground">
              No article body found.
            </p>
          )}
        </Card>

        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Back to Blog
        </Link>
      </main>
      <Footer />
    </>
  );
}
