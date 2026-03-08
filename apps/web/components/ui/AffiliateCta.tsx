import Link from "next/link";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  label?: string;
  className?: string;
};

export function AffiliateCta({
  slug,
  label = "Check Latest Price",
  className,
}: Props) {
  return (
    <Link
      href={`/go/${slug}`}
      rel="nofollow sponsored noopener"
      className={cn(buttonVariants({ variant: "default" }), className)}
    >
      {label}
    </Link>
  );
}