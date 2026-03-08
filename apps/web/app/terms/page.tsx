import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "Terms of use placeholder for GearGrit. Includes usage expectations, liability notice, and policy update notice.",
  path: "/terms",
});

export default function TermsPage() {
  const lastUpdated = "2026-03-08";

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-4xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">Terms of Use</h1>
        <p className="mb-6 text-muted-foreground">Last updated: {lastUpdated}</p>

        <section className="mb-6 grid gap-3">
          <Card>
            <h2 className="mb-2 text-xl font-semibold">Placeholder Notice</h2>
            <p className="text-sm text-muted-foreground">
              This is a temporary terms placeholder for MVP launch preparation. Final legal text and policy language
              will be added before major public promotion.
            </p>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">Usage Expectations</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Content is for informational purposes and buyer guidance.</li>
              <li>Product availability and pricing may change without notice.</li>
              <li>External merchant purchases are governed by merchant terms.</li>
            </ul>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">Contact for Legal Requests</h2>
            <p className="text-sm text-muted-foreground">legal@thegeargrit.com</p>
          </Card>
        </section>

        <div className="flex flex-wrap gap-2">
          <Link href="/privacy" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            Privacy
          </Link>
          <Link href="/affiliate-disclosure" className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>
            Affiliate Disclosure
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}