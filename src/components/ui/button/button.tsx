"use client";

import { cn } from "@lib/utils";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { buttonVariants } from "./button-variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "secondary"
    | "error"
    | "outline"
    | "gradient"
    | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "icon";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type = "button",
      variant = "primary",
      size = "md",
      iconLeft,
      iconRight,
      disabled = false,
      isLoading = false,
      loadingText = "Loading...",
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const iconWrapperStyle = "inline-flex items-center justify-center"; // Center the icons
    const iconStyle = "h-5 w-5"; // Fixed height and width for icons

    // Common button structure
    const renderButtonContent = () => (
      <div className="flex items-center justify-center">
        {iconLeft && (
          <span className={`${iconWrapperStyle} ${iconStyle} mr-2`}>
            {iconLeft}
          </span>
        )}
        <span className="flex-1 text-center">{children}</span>
        {iconRight && (
          <span className={`${iconWrapperStyle} ${iconStyle} ml-2`}>
            {iconRight}
          </span>
        )}
      </div>
    );

    if (isLoading) {
      return (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={cn(buttonVariants({ variant, size, className }))}
          aria-busy="true"
          {...props}
        >
          <div className="flex items-center justify-center">
            <span className="w-5 h-5 mr-3 me-2 animate-spin">
              <svg
                className="w-full h-full text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            <span>{loadingText}</span>
          </div>
        </button>
      );
    }

    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          buttonVariants({ variant, size, className }),
          "flex items-center justify-center",
        )}
        {...props}
        ref={ref}
      >
        {renderButtonContent()}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
