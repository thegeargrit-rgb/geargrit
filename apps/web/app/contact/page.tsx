import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Get in touch with GearGrit for editorial feedback, corrections, and partnership inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-4xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">Contact GearGrit</h1>
        <p className="mb-6 text-muted-foreground">
          We welcome feedback, corrections, and partnership inquiries. Please use the relevant contact channel below.
        </p>

        <section className="mb-6 grid gap-3 sm:grid-cols-2">
          <Card>
            <h2 className="mb-2 text-xl font-semibold">Editorial & Corrections</h2>
            <p className="mb-3 text-sm text-muted-foreground">
              Found an issue in a review or guide? Send details and source links so we can verify and update quickly.
            </p>
            <p className="font-mono text-sm">editorial@thegeargrit.com</p>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">Business & Partnerships</h2>
            <p className="mb-3 text-sm text-muted-foreground">
              For partnerships, collaborations, and media requests, contact us with clear context and expected timelines.
            </p>
            <p className="font-mono text-sm">partners@thegeargrit.com</p>
          </Card>
        </section>

        <section className="mb-6">
          <Card>
            <h2 className="mb-2 text-xl font-semibold">Response Time</h2>
            <p className="text-sm text-muted-foreground">
              Typical response window: 2-4 business days. Complex editorial corrections may take longer due to verification.
            </p>
          </Card>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Related Pages</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/about" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
              About
            </Link>
            <Link href="/affiliate-disclosure" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
              Affiliate Disclosure
            </Link>
            <Link href="/reviews" className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>
              Reviews
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}