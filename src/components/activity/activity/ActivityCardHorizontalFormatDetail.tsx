import { cn } from "@lib/utils";
import { ReactNode } from "react";

type ActivityCardHorizontalFormatDetailProps = {
  icon: ReactNode;
  name: string;
  value: string;
  className?: string;
};

const ActivityCardHorizontalFormatDetail = ({
  icon,
  value,
  className,
}: ActivityCardHorizontalFormatDetailProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-2 shrink-0 md:flex-row",
        className,
      )}
    >
      {icon}
      <p className="overflow-hidden font-medium overflow-ellipsis whitespace-nowrap">
        {value}
      </p>
    </div>
  );
};

export default ActivityCardHorizontalFormatDetail;
