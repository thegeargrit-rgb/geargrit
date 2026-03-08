import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { buildPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: "Editorial articles, updates, and practical gear knowledge.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <main className="mx-auto my-8 max-w-3xl p-4">
        <h1 className="mb-3 text-3xl font-heading font-bold">Blog</h1>
        <Card className="mb-4">
          <p className="mb-3 text-sm text-muted-foreground">
            Blog index template is live. Hook article listing from Sanity in the content wiring pass.
          </p>
          <Link href="/blog/sample-article" className={cn(buttonVariants({ variant: "outline" }))}>
            Open Sample Article Route
          </Link>
        </Card>
      </main>
      <Footer />
    </>
  );
}