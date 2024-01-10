// import { climbs } from "@mock/climbs";
import { cn } from "@lib/utils";
import type { Climb } from "@type-definitions/Climb";
import ClimbCard from "../card/climb-card";
import ClimbCardSkeleton from "../card/climb-card-skeleton";

type listState = "loading" | "error" | null;

type ClimbsListProps = {
  climbs: Climb[];
  listState?: listState;
  className?: string;
};

export default function ClimbsList({
  climbs,
  listState,
  className,
}: ClimbsListProps) {
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
      {climbs.map((climb: Climb) => {
        return listState === "loading" ? (
          <ClimbCardSkeleton key={climb.id} />
        ) : (
          <ClimbCard key={climb.id} climb={climb} />
        );
      })}
    </div>
  );
}
