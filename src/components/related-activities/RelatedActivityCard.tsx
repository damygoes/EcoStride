import { cn } from "@lib/utils";
import { Activity } from "@type-definitions/Activity";
import { getActivityCardBadgeInfo } from "@utils/activity/get-activity-card-badge-info";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type RelatedActivityCardProps = {
  activity: Activity;
};

function RelatedActivityCard({ activity }: RelatedActivityCardProps) {
  const { color: badgeColor } = useMemo(() => {
    return getActivityCardBadgeInfo(activity.activityType);
  }, [activity.activityType]);

  return (
    <Link to={`/activities/${activity.slug}`}>
      <div className="flex items-center justify-start gap-1 text-sm font-light list-none cursor-pointer text-text-color/60 text-wrap hover:text-text-color/90">
        <div
          className={cn(
            "flex items-center justify-center h-3 p-2 text-xs rounded-sm w-fit",
            badgeColor,
          )}
        >
          {activity.activityType}
        </div>
        <p className="truncate">{activity.name}</p>
      </div>
    </Link>
  );
}

export default RelatedActivityCard;
