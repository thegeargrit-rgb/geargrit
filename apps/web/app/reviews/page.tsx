import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getReviewsListData } from "@/lib/sanity/loaders";

export const metadata: Metadata = buildPageMetadata({
  title: "Reviews",
  description: "Independent review scorecards with pros, cons, and verdicts.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const data = await getReviewsListData();

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-4xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">Reviews</h1>
        <p className="mb-6 text-muted-foreground">
          Independent review scorecards with pros, cons, and verdicts.
        </p>

        {data.reviews.length > 0 ? (
          <div className="grid gap-3">
            {data.reviews.map((review) => (
              <Card key={review._id}>
                <div className="mb-2 flex items-center gap-2">
                  <Badge size="sm">REVIEW</Badge>
                  <span className="font-semibold">{review.title}</span>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <ScoreBadge score={review.score} color="success" />
                  <span className="text-sm text-muted-foreground">/ 10</span>
                </div>
                {review.productTitle ? (
                  <p className="mb-2 text-sm text-muted-foreground">
                    Product: {review.productTitle}
                  </p>
                ) : null}
                {review.verdict ? (
                  <p className="mb-3 text-sm text-muted-foreground">
                    {review.verdict}
                  </p>
                ) : null}
                <Link
                  href={`/reviews/${review.slug.current}`}
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Read Review
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-muted-foreground">
              No reviews available yet.
            </p>
          </Card>
        )}
      </main>
      <Footer />
    </>
  );
}