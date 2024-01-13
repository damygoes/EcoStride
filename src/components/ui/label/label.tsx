import { cn } from "@lib/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const LabelRoot = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn("", className)} {...props} />
));

LabelRoot.displayName = LabelPrimitive.Root.displayName;

const labelVariants = cva(
  "text-sm text-text-color/80 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-80 peer-focus:text-primary",
);

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  required?: boolean;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> &
    LabelProps
>(({ className, htmlFor, required = false, ...props }, ref) => {
  if (htmlFor === undefined) {
    throw new Error("htmlFor is required");
  }

  return (
    <LabelPrimitive.Root
      ref={ref}
      htmlFor={htmlFor}
      className={
        required
          ? cn(
              labelVariants(),
              "after:content-['*'] after:ml-0.5 after:text-text-color",
              className,
            )
          : cn(labelVariants(), className)
      }
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
