import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getCategoriesListData } from "@/lib/sanity/loaders";

export const metadata: Metadata = buildPageMetadata({
  title: "Categories",
  description: "Explore GearGrit content by niche and category.",
  path: "/categories",
});

export default async function CategoriesPage() {
  const data = await getCategoriesListData();

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-4xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">Categories</h1>
        <p className="mb-6 text-muted-foreground">
          Explore GearGrit content by niche and category.
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold">Badminton</h2>
          {data.badminton.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {data.badminton.map((category) => (
                <Card key={category._id}>
                  <h3 className="mb-2 font-semibold">{category.title}</h3>
                  {category.description ? (
                    <p className="mb-3 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  ) : null}
                  <Link
                    href={`/categories/${category.slug.current}`}
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    Open Category
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-sm text-muted-foreground">
                No badminton categories yet.
              </p>
            </Card>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Trekking</h2>
          {data.trekking.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {data.trekking.map((category) => (
                <Card key={category._id}>
                  <h3 className="mb-2 font-semibold">{category.title}</h3>
                  {category.description ? (
                    <p className="mb-3 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  ) : null}
                  <Link
                    href={`/categories/${category.slug.current}`}
                    className={cn(buttonVariants({ variant: "secondary" }))}
                  >
                    Open Category
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-sm text-muted-foreground">
                No trekking categories yet.
              </p>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}