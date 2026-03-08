import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Affiliate Disclosure",
  description:
    "Read how GearGrit uses affiliate links, how commissions work, and how editorial independence is protected.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-4xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">Affiliate Disclosure</h1>
        <p className="mb-6 text-muted-foreground">
          GearGrit may earn commissions when readers purchase products through some links on this website.
        </p>

        <section className="mb-6 grid gap-3">
          <Card>
            <h2 className="mb-2 text-xl font-semibold">How Affiliate Links Work</h2>
            <p className="text-sm text-muted-foreground">
              Some links on reviews, guides, and comparison pages route through our `/go/[slug]` system to partner
              merchants. If you complete a purchase, we may receive a commission at no extra cost to you.
            </p>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">Editorial Independence</h2>
            <p className="text-sm text-muted-foreground">
              Commissions do not determine product ratings. Our scoring framework is based on usefulness, value,
              durability, and suitability for specific user profiles.
            </p>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">Pricing & Availability</h2>
            <p className="text-sm text-muted-foreground">
              Prices and availability can change quickly. Always verify the latest price and shipping terms on the
              merchant site before purchasing.
            </p>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">Questions or Corrections</h2>
            <p className="mb-3 text-sm text-muted-foreground">
              If you spot an inaccurate disclosure placement or unclear monetization language, contact us directly.
            </p>
            <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
              Contact GearGrit
            </Link>
          </Card>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Related Pages</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/about" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
              About
            </Link>
            <Link href="/reviews" className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>
              Reviews
            </Link>
            <Link href="/guides" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Guides
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}