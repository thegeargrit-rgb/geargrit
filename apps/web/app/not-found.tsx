import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="mx-auto my-12 max-w-3xl p-4">
        <Card className="text-center">
          <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            404
          </p>
          <h1 className="mb-3 text-3xl font-heading font-bold">
            Page Not Found
          </h1>
          <p className="mx-auto mb-6 max-w-xl text-sm text-muted-foreground">
            The page you are looking for may have moved, been removed, or is not
            published yet.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              Go Home
            </Link>
            <Link
              href="/categories"
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
            >
              Browse Categories
            </Link>
            <Link
              href="/reviews"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              View Reviews
            </Link>
            <Link
              href="/guides"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Read Guides
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </>
  );
}