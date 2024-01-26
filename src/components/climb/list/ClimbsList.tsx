import { cn } from "@lib/utils";
import type { Climb } from "@type-definitions/Climb";
import { useClimb } from "@utils/climb/climb-store";
import ClimbCard from "../card/ClimbCard";
import ClimbListViewCard from "../card/ClimbCardHorizontalFormat";
import ClimbCardSkeleton from "../card/ClimbCardSkeleton";
import ClimbNotFound from "./ClimbNotFound";

type ClimbsListProps = {
  climbs: Climb[];
  isLoading?: boolean;
  className?: string;
};

export default function ClimbsList({
  climbs,
  isLoading = false,
  className,
}: ClimbsListProps) {
  const { climbsViewMode } = useClimb();
  if (!climbs) {
    return;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-6 md:justify-start",
        className,
      )}
    >
      {climbs.length === 0 && <ClimbNotFound />}
      {climbs.map((climb: Climb) => {
        if (isLoading) {
          {
            Array.from({ length: 3 }).map((_, index) => (
              <ClimbCardSkeleton key={index} />
            ));
          }
        }
        if (climbsViewMode === "grid") {
          return <ClimbCard key={climb.id} climb={climb} />;
        }
        if (climbsViewMode === "list") {
          return <ClimbListViewCard key={climb.id} climb={climb} />;
        }
      })}
    </div>
  );
}
