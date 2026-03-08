import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const footerVariants = cva(
  "w-full text-center px-5 py-6 mt-10 bg-accent text-accent-foreground font-body border-t",
  {
    variants: {
      sticky: {
        true: "fixed bottom-0 left-0",
        false: "",
      },
    },
    defaultVariants: {
      sticky: false,
    },
  },
);

interface FooterProps extends VariantProps<typeof footerVariants> {
  className?: string;
}

export function Footer({ className, sticky, ...props }: FooterProps) {
  return (
    <footer className={cn(footerVariants({ sticky, className }))} {...props}>
      <div>
        &copy; {new Date().getFullYear()} GearGrit.com &mdash; All rights
        reserved.
      </div>
      <div className="text-xs mt-1">
        As an Amazon Associate, GearGrit earns from qualifying purchases.
        <br />
        Affiliate links use <span className="underline">/go/[slug]</span>.
        Disclosure on every page.
      </div>
    </footer>
  );
}

