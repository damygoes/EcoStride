import { cn } from "@lib/utils";
import DOMPurify from "dompurify";
import { ReactNode, useMemo } from "react";

type ActivityDetailsSectionProps = {
  title: string | ReactNode;
  content: string | ReactNode;
  className?: string;
};

function ActivityDetailsSection({
  title,
  content,
  className,
}: ActivityDetailsSectionProps) {
  // Sanitize the content if it's a string, otherwise use it as is
  const sanitizedContent = useMemo(() => {
    if (typeof content === "string") {
      return { __html: DOMPurify.sanitize(content) };
    }
    // For ReactNode, no sanitization needed
    return content;
  }, [content]);

  return (
    <div
      className={cn(
        "w-full p-4 rounded-md shadow-sm bg-background text-text-color",
        className,
      )}
    >
      <h5 className="mb-4 text-4xl capitalize">{title}</h5>
      {sanitizedContent &&
      typeof sanitizedContent === "object" &&
      "__html" in sanitizedContent ? (
        // Render sanitized HTML content safely
        <div
          className="w-full my-3 text-base text-balance first-letter:uppercase first-letter:text-2xl"
          dangerouslySetInnerHTML={sanitizedContent}
        />
      ) : (
        // Render non-string content directly
        <div className="w-full my-3 text-base text-balance first-letter:uppercase first-letter:text-2xl">
          {sanitizedContent}
        </div>
      )}
    </div>
  );
}

export default ActivityDetailsSection;
