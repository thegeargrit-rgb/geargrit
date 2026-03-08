import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { getCategoriesListData } from "@/lib/sanity/loaders";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Trekking Hub",
  description:
    "Explore trekking gear categories, trail-focused reviews, and practical buying guides on GearGrit.",
  path: "/trekking",
});

export default async function TrekkingHubPage() {
  const categories = await getCategoriesListData();

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-4xl p-4">
        <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Hub</p>
        <h1 className="mb-2 text-3xl font-heading font-bold">Trekking Gear Hub</h1>
        <p className="mb-6 text-muted-foreground">
          Discover backpacks, shoes, tents, and safety gear with practical long-trail buying guidance.
        </p>

        <section className="mb-6 grid gap-3 sm:grid-cols-2">
          <Card>
            <h2 className="mb-2 text-xl font-semibold">Start With Reviews</h2>
            <p className="mb-3 text-sm text-muted-foreground">
              Compare performance and durability tradeoffs before purchasing.
            </p>
            <Link href="/reviews" className={cn(buttonVariants({ variant: "default" }))}>
              Browse Reviews
            </Link>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">Read Buying Guides</h2>
            <p className="mb-3 text-sm text-muted-foreground">
              Learn how to choose based on terrain, climate, and trip duration.
            </p>
            <Link href="/guides" className={cn(buttonVariants({ variant: "secondary" }))}>
              Browse Guides
            </Link>
          </Card>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Trekking Categories</h2>
          {categories.trekking.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.trekking.map((category) => (
                <Card key={category._id}>
                  <h3 className="mb-2 font-semibold">{category.title}</h3>
                  {category.description ? (
                    <p className="mb-3 text-sm text-muted-foreground">{category.description}</p>
                  ) : null}
                  <Link
                    href={`/categories/${category.slug.current}`}
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    Open Category
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-sm text-muted-foreground">No trekking categories available yet.</p>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}