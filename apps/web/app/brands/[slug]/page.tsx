import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { absoluteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: "sample-brand" }];
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
  const title = `${toTitle(slug)} Brand`;
  const canonical = absoluteUrl(`/brands/${encodeURIComponent(slug)}`);

  return {
    title,
    description: "Brand profile and related GearGrit content.",
    alternates: { canonical },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: "Brand profile and related GearGrit content.",
      url: canonical,
      siteName: "GearGrit",
      type: "website",
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const title = toTitle(slug) || "Brand";

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Brand", href: "/brands/sample-brand" },
            { label: title },
          ]}
        />

        <h1 className="mb-3 text-3xl font-heading font-bold">{title}</h1>
        <Card>
          <p className="text-sm text-muted-foreground">
            Brand template is live. Connect Sanity brand data in the next content pass.
          </p>
        </Card>
      </main>
      <Footer />
    </>
  );
}