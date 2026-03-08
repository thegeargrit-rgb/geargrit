import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "sample-article" }];
}

type Props = {
  params: Promise<{ slug: string }>;
};

function toTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = toTitle(slug) || "Article";
  const canonical = absoluteUrl(`/blog/${encodeURIComponent(slug)}`);

  return {
    title,
    description: "GearGrit article template.",
    alternates: { canonical },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: "GearGrit article template.",
      url: canonical,
      siteName: "GearGrit",
      type: "article",
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const title = toTitle(slug) || "Article";

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: title },
          ]}
        />

        <h1 className="mb-3 text-3xl font-heading font-bold">{title}</h1>
        <Card>
          <p className="text-sm text-muted-foreground">
            Article template is live. Connect this route to Sanity article content in the next content sync pass.
          </p>
        </Card>
      </main>
      <Footer />
    </>
  );
}