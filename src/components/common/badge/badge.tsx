import { cn } from "@lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center justify-center border-none rounded-full text-text-color/40 px-4 py-2 h-6 text-sm whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pointer-events-none",

  {
    variants: {
      variant: {
        outline: "bg-transparent border border-solid border-text-color/30",
        primary: "bg-primary",
        secondary: "bg-secondary",
        accent: "bg-accent",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ className, variant, children }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)}>{children}</div>
  );
}

export default Badge;
