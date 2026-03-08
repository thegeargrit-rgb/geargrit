import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description:
    "Learn how GearGrit tests badminton and trekking gear, our editorial standards, and how affiliate monetization works.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-4xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">About GearGrit</h1>
        <p className="mb-6 text-muted-foreground">
          GearGrit helps buyers in India choose better badminton and trekking gear through practical reviews,
          comparisons, and buying guides.
        </p>

        <section className="mb-6 grid gap-3">
          <Card>
            <h2 className="mb-2 text-xl font-semibold">Our Mission</h2>
            <p className="text-sm text-muted-foreground">
              We simplify gear decisions with clear scoring, plain-language verdicts, and real-world context.
              Every page aims to answer one question: &quot;Is this worth buying for my use case?&quot;
            </p>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">Editorial Principles</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Reader-first recommendations over commission-first recommendations.</li>
              <li>Transparent tradeoffs: pros, cons, and who should avoid a product.</li>
              <li>Ongoing updates when products, pricing, or alternatives change.</li>
            </ul>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">How Monetization Works</h2>
            <p className="mb-3 text-sm text-muted-foreground">
              Some outbound links are affiliate links. If you buy through them, GearGrit may earn a commission at
              no extra cost to you. This does not change our scoring framework.
            </p>
            <Link href="/affiliate-disclosure" className={cn(buttonVariants({ variant: "outline" }))}>
              Read Full Disclosure
            </Link>
          </Card>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Explore GearGrit</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/categories" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
              Categories
            </Link>
            <Link href="/reviews" className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>
              Reviews
            </Link>
            <Link href="/guides" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Guides
            </Link>
            <Link href="/contact" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Contact
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}