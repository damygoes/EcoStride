import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "group flex items-center justify-center text-white whitespace-nowrap rounded text-md font-medium cursor-pointer ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary/80",
        secondary: "bg-secondary hover:bg-secondary/80",
        error: "bg-accent hover:bg-accent/80",
        outline:
          "border border-solid border-text-color/80 bg-transparent text-text-color hover:bg-transparent",
        gradient:
          "bg-gradient-to-br from-primary to-secondary hover:from-secondary hover:to-primary dark:bg-background dark:from-background dark:to-background dark:border dark:border-solid dark:border-text-color dark:hover:border-from-secondary dark:hover:border-to-primary",
        ghost:
          "bg-transparent text-text-color hover:bg-transparent hover:text-secondary dark:bg-background",
      },
      size: {
        xs: "h-6 p-3 text-sm",
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
