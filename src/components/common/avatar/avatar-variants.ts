import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  "relative flex shrink-0 items-center justify-center align-middle rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
