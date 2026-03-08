"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground shadow transition hover:shadow-md",
  {
    variants: {
      size: {
        default: "p-4",
        sm: "p-2 text-sm",
        lg: "p-8 text-lg",
      },
      variant: {
        default: "bg-card",
        outline: "bg-background border-dashed",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, size, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ size, variant, className }))}
      {...props}
    />
  ),
);
Card.displayName = "Card";
