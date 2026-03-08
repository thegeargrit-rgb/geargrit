import Link from "next/link";

type Props = {
  className?: string;
};

export function AffiliateDisclosure({ className }: Props) {
  return (
    <p className={className ?? "text-xs text-muted-foreground"}>
      Disclosure: Some links may be affiliate links. If you buy through them,
      GearGrit may earn a commission at no extra cost to you. Learn more in our{" "}
      <Link href="/affiliate-disclosure" className="underline underline-offset-2">
        Affiliate Disclosure
      </Link>
      .
    </p>
  );
}