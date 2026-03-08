import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "sample-subcategory" }];
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
  const title = `${toTitle(slug)} Subcategory`;
  const canonical = absoluteUrl(`/subcategories/${encodeURIComponent(slug)}`);

  return {
    title,
    description: "Subcategory landing template for filtered content.",
    alternates: { canonical },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: "Subcategory landing template for filtered content.",
      url: canonical,
      siteName: "GearGrit",
      type: "website",
    },
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { slug } = await params;
  const title = toTitle(slug) || "Subcategory";

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: title },
          ]}
        />

        <h1 className="mb-3 text-3xl font-heading font-bold">{title}</h1>
        <Card>
          <p className="text-sm text-muted-foreground">
            Subcategory template is live. Connect taxonomy data in the upcoming Sanity schema extension.
          </p>
        </Card>
      </main>
      <Footer />
    </>
  );
}