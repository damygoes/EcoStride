import { cn } from "@lib/utils";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type ErrorFallbackProps = {
  withAction?: boolean;
  actionText?: string;
  redirectUrl?: string;
  className?: string;
};

function ErrorFallback({
  withAction,
  actionText,
  redirectUrl,
  className,
}: ErrorFallbackProps) {
  if (withAction && !redirectUrl) {
    throw new Error("ErrorFallback: withAction and action are required");
  }
  if (withAction && !actionText) {
    throw new Error("ErrorFallback: actionText is required");
  }

  if (withAction && redirectUrl && !actionText) {
    throw new Error("ErrorFallback: actionText is required");
  }

  if (withAction && actionText && !redirectUrl) {
    throw new Error("ErrorFallback: redirectUrl is required");
  }

  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex flex-col gap-2 items-center justify-center w-full h-full p-4 bg-background",
        className,
      )}
    >
      <p className="text-lg font-light text-accent">
        Oops! Something went wrong
      </p>
      {withAction && (
        <button
          onClick={() => navigate(redirectUrl as string)}
          className="flex items-center justify-center gap-1 px-4 py-2 ml-3 rounded-md text-text-color bg-primary hover:bg-primary/80"
        >
          <span>
            <IconArrowNarrowLeft size={20} />
          </span>
          {actionText}
        </button>
      )}
    </div>
  );
}

export default ErrorFallback;
