import { cn } from "@lib/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(
  (
    {
      align,
      alignOffset,
      className,
      children,
      side,
      sideOffset = 10,
      ...props
    },
    ref,
  ) => (
    <TooltipPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        "min-w-[9.5625rem] max-w-xs shrink-0 z-50 overflow-y-auto whitespace-normal break-words rounded border-none bg-primary px-3 py-1.5 text-center text-md shadow-sm text-text-color/80 fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {children}
      <TooltipArrow className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 shrink-0 fill-primary" />
    </TooltipPrimitive.Content>
  ),
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delay?: number;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  className?: string;
}

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Root>,
  TooltipProps
>(
  (
    {
      align = "center",
      alignOffset = 0,
      children,
      content,
      delay = 800,
      side = "top",
      sideOffset = 10,
      className,
      ...props
    },
    ref,
  ) => {
    const [isTooltipVisible, setTooltipVisible] = React.useState(false);

    return (
      <TooltipProvider>
        <TooltipRoot delayDuration={delay}>
          <TooltipTrigger
            {...props}
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            {children}
          </TooltipTrigger>
          <TooltipContent
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
            ref={ref}
            style={{ display: isTooltipVisible ? "block" : "none" }}
            className={className}
          >
            {content}
          </TooltipContent>
        </TooltipRoot>
      </TooltipProvider>
    );
  },
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
