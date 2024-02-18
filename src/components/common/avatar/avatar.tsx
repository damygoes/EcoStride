"use client";

import defaultUserImage from "@assets/user.svg";
import { cn } from "@lib/utils";
import { VariantProps } from "class-variance-authority";
import React from "react";
import { avatarVariants } from "./avatar-variants";

interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  alt: string;
  fallback?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "square";
  className?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = "md", className, ...props }, ref) => {
    // Use the src prop if available, otherwise use the fallback prop
    const imgSrc = src || fallback || defaultUserImage;

    return (
      <div
        className={cn(avatarVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        {src ? (
          <img
            src={imgSrc}
            alt={alt}
            className="h-full w-full aspect-square rounded-[inherit] object-cover"
            width={40}
            height={40}
          />
        ) : (
          <div
            className={cn(
              "h-full w-full rounded-[inherit] object-cover text-text-color leading-1 flex  items-center justify-center text-sm font-sm bg-transparent border border-solid border-text-color/50",
            )}
          >
            {fallback}
          </div>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";

export default Avatar;
