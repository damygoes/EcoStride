import { cn } from "@lib/utils";
import { VariantProps } from "class-variance-authority";
import * as React from "react";
import { inputFieldVariants } from "./input-field-variants";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputFieldVariants> {
  type: "text" | "email" | "password" | "number" | "file" | "tel" | "search"; // This is the type of input field
  width?: "sm" | "md" | "lg"; // This is the size of the input field
  icon?: React.ReactNode; // This is the icon that appears to the left of the input field
  iconPosition?: "left" | "right"; // This is the position of the icon
  placeholder?: string; // This is the placeholder text that appears in the input field
  className?: string; // This is the className that is passed to the input field
  isErrored?: boolean; // This is the boolean that determines if the input field is errored
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      type = "text",
      width = "md",
      icon,
      iconPosition = "left",
      placeholder,
      isErrored = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative flex items-center w-full text-text-color">
        <input
          type={type}
          placeholder={placeholder}
          className={cn(inputFieldVariants({ width, className }), {
            "pr-10": icon && iconPosition === "right",
            "pl-10": icon && iconPosition === "left",
            "ring-accent": isErrored,
          })}
          ref={ref}
          {...props}
        />
        {icon && iconPosition === "left" && (
          <span className="absolute ml-3 pointer-events-none">{icon}</span>
        )}
        {icon && iconPosition === "right" && (
          <span className="absolute right-0 mr-3 pointer-events-none">
            {icon}
          </span>
        )}
      </div>
    );
  },
);
InputField.displayName = "InputField";

export { InputField };
