import { cva } from "class-variance-authority";

export const inputFieldMessageVariants = cva("text-sm font-normal italic", {
  variants: {
    kind: {
      primary: "text-text-secondary",
      secondary: "text-text-primary/80",
      error: "text-error",
    },
  },
  defaultVariants: {
    kind: "primary",
  },
});
