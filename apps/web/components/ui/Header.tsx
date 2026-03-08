"use client";

import Link from "next/link";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

const headerVariants = cva(
  "w-full flex items-center justify-between px-5 py-4 bg-primary text-primary-foreground shadow-lg",
  {
    variants: {
      sticky: {
        true: "sticky top-0 z-50",
        false: "",
      },
    },
    defaultVariants: {
      sticky: false,
    },
  },
);

interface HeaderProps extends VariantProps<typeof headerVariants> {
  className?: string;
}

export function Header({ className, sticky, ...props }: HeaderProps) {
  return (
    <header className={cn(headerVariants({ sticky, className }))} {...props}>
      <div className="font-heading text-lg font-extrabold tracking-tight">
        <Link href="/">GearGrit</Link>
      </div>
      <nav className="flex flex-wrap items-center gap-3">
        <Link href="/badminton" className={cn(buttonVariants({ variant: "link" }))}>
          Badminton
        </Link>
        <Link href="/trekking" className={cn(buttonVariants({ variant: "link" }))}>
          Trekking
        </Link>
        <Link href="/reviews" className={cn(buttonVariants({ variant: "link" }))}>
          Reviews
        </Link>
        <Link href="/guides" className={cn(buttonVariants({ variant: "link" }))}>
          Guides
        </Link>
        <Link href="/search" className={cn(buttonVariants({ variant: "link" }))}>`r`n          Search`r`n        </Link>`r`n        <Link href="/blog" className={cn(buttonVariants({ variant: "link" }))}>`r`n          Blog`r`n        </Link>
        <Link href="/about" className={cn(buttonVariants({ variant: "link" }))}>
          About
        </Link>
      </nav>
    </header>
  );
}