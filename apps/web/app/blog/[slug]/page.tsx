import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo";
import { getBlogArticlePageData } from "@/lib/sanity/loaders";

type Props = {
  params: Promise<{ slug: string }>;
};

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

        <h1 className="mb-3 text-3xl font-heading font-bold">{article.title}</h1>

        <div className="mb-5 text-xs text-muted-foreground">
          {article.author?.name ? `By ${article.author.name}` : "By GearGrit"}
          {article.publishedAt
            ? ` • ${new Date(article.publishedAt).toLocaleDateString()}`
            : ""}
          {article.updatedAt
            ? ` • Updated ${new Date(article.updatedAt).toLocaleDateString()}`
            : ""}
        </div>

        {article.excerpt ? (
          <Card className="mb-5">
            <p className="text-sm text-muted-foreground">{article.excerpt}</p>
          </Card>
        ) : null}

        <Card>
          <p className="text-sm text-muted-foreground">
            Body rendering for portable text can be added next. CMS article is wired and metadata is live.
          </p>
        </Card>
      </main>
      <Footer />
    </>
  );
}