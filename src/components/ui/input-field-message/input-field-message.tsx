import { cn } from "@lib/utils";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { inputFieldMessageVariants } from "./input-field-message-variants";

export interface InputFieldMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof inputFieldMessageVariants> {
  kind?: "primary" | "secondary" | "error"; // This is the kind of form message
}

const InputFieldMessage = React.forwardRef<
  HTMLParagraphElement,
  InputFieldMessageProps
>(({ className, children, kind = "primary", ...props }, ref) => {
  if (!children) {
    return null;
  }

  return (
    <p
      ref={ref}
      className={cn(inputFieldMessageVariants({ kind }), className)}
      {...props}
    >
      {children}
    </p>
  );
});
InputFieldMessage.displayName = "InputFieldMessage";

export { InputFieldMessage };
