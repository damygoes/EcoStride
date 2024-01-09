import { cn } from "@lib/utils";
import { Link, useLocation } from "react-router-dom";

type BreadCrumbsComponentProps = {
  className?: string;
};

function BreadCrumbsComponent({ className }: BreadCrumbsComponentProps) {
  const location = useLocation();
  const { pathname } = location;
  const segments = pathname.split("/").filter((path) => path !== "");

  let currentPath = "";
  const crumbs = segments.map((segment, index) => {
    // Determine if this segment is the last one
    const isLast = index === segments.length - 1;

    // Special handling for "home" at index 0
    if (segment === "home" && index === 0) {
      currentPath = "/";
    } else {
      currentPath += `/${segment}`;
    }

    // Determine the display name, customize this as needed
    const displayName = segment === "home" ? "home" : segment;

    // Render the segment as a link or plain text
    return (
      <span key={index}>
        {!isLast ? (
          // Render as a link if it's not the last segment
          <Link
            to={currentPath}
            className="text-sm italic font-light text-secondary hover:underline"
          >
            {displayName}
          </Link>
        ) : (
          // Render as plain text if it's the last segment
          <span className="text-sm italic font-light text-secondary">
            {displayName}
          </span>
        )}
        {index < segments.length - 1 && <span className="mx-2">→</span>}
      </span>
    );
  });

  return (
    <nav aria-label="breadcrumb" className={cn(className)}>
      {crumbs}
    </nav>
  );
}

export default BreadCrumbsComponent;
