import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  "relative flex shrink-0 items-center justify-center align-middle rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        square: "h-30 w-30 aspect-square rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
