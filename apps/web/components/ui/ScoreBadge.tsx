"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const scoreBadgeVariants = cva(
  "inline-flex items-center justify-center rounded font-mono font-bold px-2 py-0.5 transition",
  {
    variants: {
      color: {
        success: "bg-emerald-600 text-white",
        info: "bg-blue-600 text-white",
        warn: "bg-yellow-500 text-black",
        danger: "bg-destructive text-destructive-foreground",
      },
      size: {
        default: "text-base",
        sm: "text-xs px-1.5",
        lg: "text-lg px-3 py-1",
      },
    },
    defaultVariants: {
      color: "success",
      size: "default",
    },
  },
);

export interface ScoreBadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof scoreBadgeVariants> {
  score: number;
}

export const ScoreBadge = React.forwardRef<HTMLSpanElement, ScoreBadgeProps>(
  ({ className, color, size, score, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(scoreBadgeVariants({ color, size, className }))}
      {...props}
    >
      {score}
    </span>
  ),
);
ScoreBadge.displayName = "ScoreBadge";
