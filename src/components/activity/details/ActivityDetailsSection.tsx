import { cn } from "@lib/utils";
import { ReactNode } from "react";

type ActivityDetailsSectionProps = {
  title: string;
  content: string | ReactNode;
  className?: string;
};

function ActivityDetailsSection({
  title,
  content,
  className,
}: ActivityDetailsSectionProps) {
  return (
    <div
      className={cn(
        "w-full p-4 rounded-md shadow-sm bg-background text-text-color",
        className,
      )}
    >
      <h5 className="mb-4 text-4xl capitalize">{title}</h5>
      {typeof content === "string" ? (
        <p className="w-full my-3 text-base text-balance first-letter:uppercase first-letter:text-2xl">
          {content}
        </p>
      ) : (
        content
      )}
    </div>
  );
}

export default ActivityDetailsSection;
