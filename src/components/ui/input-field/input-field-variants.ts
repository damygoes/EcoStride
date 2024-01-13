import { cva } from "class-variance-authority";

export const inputFieldVariants = cva(
  "peer flex w-full rounded border-none bg-white text-text-color text-md ring-offset-background font-normal italic file:border-0 file:bg-transparent file:text-xs file:font-semibold file:text-text-color/50 placeholder:text-text-color/50 placeholder:italic placeholder:text-xs focus:ring-1 focus:ring-text-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      width: {
        sm: "h-8 px-2 py-1.5",
        md: "h-10 px-3 py-2",
        lg: "h-12 p-3.5",
      },
    },
    defaultVariants: {
      width: "md",
    },
  },
);
