import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { AffiliateCta } from "@/components/ui/AffiliateCta";
import { AffiliateDisclosure } from "@/components/ui/AffiliateDisclosure";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ScoreBadge } from "@/components/ui/ScoreBadge";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { absoluteUrl } from "@/lib/seo";
import { getReviewPageData } from "@/lib/sanity/loaders";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewPageData(slug);
  const path = `/reviews/${encodeURIComponent(slug)}`;
  const canonical = absoluteUrl(path);

  if (!review) {
    return {
      title: "Review Not Found",
      alternates: { canonical },
      robots: { index: false, follow: false },
    };
  }

  return {
    title: review.seo?.metaTitle ?? review.title,
    description: review.seo?.metaDescription ?? review.verdict,
    alternates: { canonical },
    openGraph: {
      title: review.seo?.metaTitle ?? review.title,
      description: review.seo?.metaDescription ?? review.verdict ?? "",
      url: canonical,
      siteName: "GearGrit",
      type: "article",
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = await getReviewPageData(slug);

  if (!review) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Reviews", href: "/reviews" },
            { label: review.title },
          ]}
        />

        <h1 className="mb-3 text-3xl font-heading font-bold">{review.title}</h1>
        <div className="mb-4 flex items-center gap-2">
          <ScoreBadge score={review.score} color="success" />
          <span className="text-sm text-muted-foreground">/ 10</span>
        </div>

        <Card className="mb-5">
          <h2 className="mb-2 text-lg font-semibold">Verdict</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {review.verdict ?? "Verdict coming soon."}
          </p>

          {review.product?.affiliateSlug ? (
            <div className="grid gap-2">
              <AffiliateCta slug={review.product.affiliateSlug} />
              <AffiliateDisclosure />
            </div>
          ) : null}
        </Card>

        <div className="mb-5 grid gap-3 md:grid-cols-2">
          <Card>
            <h3 className="mb-2 font-semibold">Pros</h3>
            {review.pros?.length ? (
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {review.pros.map((pro) => (
                  <li key={pro}>{pro}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No pros listed yet.
              </p>
            )}
          </Card>

          <Card>
            <h3 className="mb-2 font-semibold">Cons</h3>
            {review.cons?.length ? (
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {review.cons.map((con) => (
                  <li key={con}>{con}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No cons listed yet.
              </p>
            )}
          </Card>
        </div>

        <Card>
          <h2 className="mb-2 text-lg font-semibold">Review Meta</h2>
          <p className="text-sm text-muted-foreground">
            Product: {review.product?.title ?? "Unknown product"}
          </p>
          <p className="text-sm text-muted-foreground">
            Author: {review.author?.name ?? "Unknown author"}
          </p>
</Card>

        <section className="mt-8">
          <h2 className="mb-3 text-xl font-semibold">FAQ</h2>
          <FaqAccordion
            items={[
              {
                question: "How should I interpret the score?",
                answer: "The score is a quick summary of overall value and suitability, but always read pros, cons, and verdict for context.",
              },
              {
                question: "Do prices in reviews stay constant?",
                answer: "No. Market prices change frequently. Use the price CTA to check current pricing before purchase.",
              },
            ]}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}