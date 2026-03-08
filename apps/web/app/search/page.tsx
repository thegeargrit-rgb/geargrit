import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Search",
  description:
    "Search GearGrit content. Full Algolia search is planned in upcoming milestones.",
  path: "/search",
  noIndex: true,
});

export default function SearchPage() {
  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">Search</h1>
        <p className="mb-6 text-muted-foreground">
          Search UX placeholder is live. Full Algolia integration is planned next.
        </p>

        <Card className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">What You Can Use Now</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Browse by route until full search ships.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/categories"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              Categories
            </Link>
            <Link
              href="/reviews"
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
            >
              Reviews
            </Link>
            <Link
              href="/guides"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Guides
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </>
  );
}