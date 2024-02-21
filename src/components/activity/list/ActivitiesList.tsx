import { cn } from "@lib/utils";
import { Activity } from "@type-definitions/Activity";
import { useActivityCard } from "@utils/activity/activity-card-store";
import { useActivity } from "@utils/activity/activity-store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { activitiesViewMode } = useActivity();
  const { cardType, setActivityCardType } = useActivityCard();

  useEffect(() => {
    if (cardType !== "activity") {
      setActivityCardType("activity");
    }
  }, [cardType, setActivityCardType]);

  if (!activities) {
    return;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-6",
        className,
      )}
    >
      {isLoading &&
        Array.from({ length: 9 }).map((_, index) => (
          <ActivityCardSkeleton key={index} />
        ))}
      {!isLoading && activities.length === 0 && (
        <p className="mx-auto text-sm italic text-center text-accent">
          {t("activities-page.activities-not-found")}
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
