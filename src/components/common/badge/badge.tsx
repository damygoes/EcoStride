import { cn } from "@lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center justify-center border-none rounded-full text-text-color px-4 py-2 h-6 whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 pointer-events-none dark:text-text-color",

  {
    variants: {
      variant: {
        outline: "bg-transparent border border-solid border-text-color/30",
        primary: "bg-primary",
        secondary: "bg-secondary",
        accent: "bg-accent text-white",
      },
      size: {
        sm: "h-4 text-xs",
        md: "h-6 text-sm",
        lg: "h-8 text-base",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ className, variant, size, children }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </div>
  );
}

export default Badge;
