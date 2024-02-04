import { cn } from "@lib/utils";
import { Activity } from "@type-definitions/Activity";
import { useActivity } from "@utils/activity/activity-store";
import ActivityCard from "../activity/ActivityCard";
import ActivityCardHorizontalFormat from "../activity/ActivityCardHorizontalFormat";
import ActivityCardSkeleton from "../activity/ActivityCardSkeleton";

type ActivitiesListProps = {
  activities: Activity[];
  isLoading?: boolean;
  className?: string;
};

export default function ActivitiesList({
  activities,
  isLoading,
  className,
}: ActivitiesListProps) {
  const { activitiesViewMode } = useActivity();
  if (!activities) {
    return;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-6 md:justify-start",
        className,
      )}
    >
      {isLoading &&
        Array.from({ length: 9 }).map((_, index) => (
          <ActivityCardSkeleton key={index} />
        ))}
      {!isLoading && activities.length === 0 && (
        <p className="mx-auto text-sm italic text-center text-accent">
          No activities found. Try changing the filters.
        </p>
      )}
      {activities.map((activity: Activity) => {
        if (activitiesViewMode === "grid") {
          return <ActivityCard key={activity.id} activity={activity} />;
        }
        if (activitiesViewMode === "list") {
          return (
            <ActivityCardHorizontalFormat
              key={activity.id}
              activity={activity}
            />
          );
        }
      })}
    </div>
  );
}
