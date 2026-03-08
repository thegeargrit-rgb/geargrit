"use client";

import Link from "next/link";
import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headerVariants = cva(
  "w-full border-b border-primary-foreground/15 bg-primary text-primary-foreground shadow-sm",
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

const navItems = [
  { href: "/badminton", label: "Badminton" },
  { href: "/trekking", label: "Trekking" },
  { href: "/reviews", label: "Reviews" },
  { href: "/guides", label: "Guides" },
  { href: "/search", label: "Search" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

export function Header({ className, sticky, ...props }: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className={cn(headerVariants({ sticky, className }))} {...props}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="font-heading text-lg font-extrabold tracking-tight">
          <Link href="/">GearGrit</Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-primary-foreground/30 px-3 py-1.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10 md:hidden"
          onClick={() => setIsMobileOpen((current) => !current)}
          aria-expanded={isMobileOpen}
          aria-controls="primary-mobile-nav"
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? "Close" : "Menu"}
        </button>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-primary-foreground/90 transition hover:text-primary-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {isMobileOpen ? (
        <nav
          id="primary-mobile-nav"
          className="mx-auto w-full max-w-6xl px-4 pb-4 md:hidden sm:px-6 lg:px-8"
          aria-hidden={!isMobileOpen}
        >
          <div className="grid gap-2 border-t border-primary-foreground/20 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2 text-sm font-medium text-primary-foreground/90 transition hover:bg-primary-foreground/10 hover:text-primary-foreground"
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
