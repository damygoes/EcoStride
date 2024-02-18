import { cn } from "@lib/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isErrored?: boolean;
  maskTextArea?: boolean;
  rows?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      placeholder = "Type here...",
      isErrored,
      maskTextArea = false,
      rows = 3,
      ...props
    },
    ref,
  ) => {
    return (
      <textarea
        rows={rows}
        className={cn(
          "flex min-h-[80px] w-full resize-none rounded border-none bg-white text-text-color px-3 py-2 text-md ring-offset-background placeholder:text-xs placeholder:text-text-color/50 placeholder:italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          {
            "ring-1 ring-accent": isErrored,
            "bg-transparent": maskTextArea,
          },
          className,
        )}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
