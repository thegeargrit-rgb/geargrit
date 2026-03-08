import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getGuidePageData } from "@/lib/sanity/loaders";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuidePageData(slug);

  if (!guide) return { title: "Guide Not Found | GearGrit" };

  return {
    title: guide.seo?.metaTitle ?? `${guide.title} | GearGrit Guide`,
    description: guide.seo?.metaDescription ?? guide.excerpt,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuidePageData(slug);

  if (!guide) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
          {guide.guideType}
        </p>
        <h1 className="mb-3 text-3xl font-heading font-bold">{guide.title}</h1>
        {guide.excerpt ? (
          <p className="mb-6 text-muted-foreground">{guide.excerpt}</p>
        ) : null}

        <Card className="mb-5">
          <h2 className="mb-2 text-lg font-semibold">Guide Meta</h2>
          <p className="text-sm text-muted-foreground">
            Author: {guide.author?.name ?? "Unknown author"}
          </p>
          <p className="text-sm text-muted-foreground">
            Published:{" "}
            {guide.publishedAt
              ? new Date(guide.publishedAt).toLocaleDateString()
              : "Not set"}
          </p>
        </Card>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Categories</h2>
          {guide.categories?.length ? (
            <div className="flex flex-wrap gap-2">
              {guide.categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category.slug.current}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                  )}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-sm text-muted-foreground">
                No categories attached to this guide yet.
              </p>
            </Card>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
