import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getGuidesListData } from "@/lib/sanity/loaders";

export const metadata: Metadata = buildPageMetadata({
  title: "Guides",
  description: "Buying guides, comparisons, and practical how-to content.",
  path: "/guides",
});

export default async function GuidesPage() {
  const data = await getGuidesListData();

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-4xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">Guides</h1>
        <p className="mb-6 text-muted-foreground">
          Buying guides, comparisons, and practical how-to content.
        </p>

        {data.guides.length > 0 ? (
          <div className="grid gap-3">
            {data.guides.map((guide) => (
              <Card key={guide._id}>
                <div className="mb-2">
                  <Badge size="sm">{guide.guideType.toUpperCase()}</Badge>
                </div>
                <h2 className="mb-2 font-semibold">{guide.title}</h2>
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
              No guides available yet.
            </p>
          </Card>
        )}
      </main>
      <Footer />
    </>
  );
}