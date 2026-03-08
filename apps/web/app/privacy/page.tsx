import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy placeholder for GearGrit. Includes data collection, analytics, and contact information overview.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const lastUpdated = "2026-03-08";

  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-4xl p-4">
        <h1 className="mb-2 text-3xl font-heading font-bold">Privacy Policy</h1>
        <p className="mb-6 text-muted-foreground">Last updated: {lastUpdated}</p>

        <section className="mb-6 grid gap-3">
          <Card>
            <h2 className="mb-2 text-xl font-semibold">Placeholder Notice</h2>
            <p className="text-sm text-muted-foreground">
              This is a temporary privacy policy placeholder for MVP launch preparation. Final legal review and
              policy text will be added before public growth campaigns.
            </p>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">Data We May Collect</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>Basic analytics events and page views.</li>
              <li>Affiliate click interaction logs for operational reporting.</li>
              <li>Contact form submissions (when enabled).</li>
            </ul>
          </Card>

          <Card>
            <h2 className="mb-2 text-xl font-semibold">Contact for Privacy Requests</h2>
            <p className="text-sm text-muted-foreground">privacy@thegeargrit.com</p>
          </Card>
        </section>

        <div className="flex flex-wrap gap-2">
          <Link href="/terms" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            Terms
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>
            Contact
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}