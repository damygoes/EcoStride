import defaultImage from "@assets/mountain-elevation.svg";
import { cn } from "@lib/utils";
import { Activity } from "@type-definitions/Activity";
import { getActivityCardBadgeInfo } from "@utils/activity/get-activity-card-badge-info";
import { Link } from "react-router-dom";

function ActivityCardHorizontalFormat({
  activity,
  basePath = "activities",
}: {
  activity: Activity;
  basePath?: string;
}) {
  const { color: badgeColor, icon: BadgeIcon } = getActivityCardBadgeInfo(
    activity.activityType,
  );

  if (!activity) {
    return null;
  }

  return (
    <Link
      to={`/${basePath}/${activity.slug}`}
      className="flex items-center justify-start w-full h-24 gap-4 p-3 overflow-hidden rounded-lg shadow-sm text-text-color shadow-accent/30"
    >
      <img
        alt="activity photo"
        src={
          activity.photos && activity.photos?.length > 1
            ? activity.photos[0]
            : defaultImage
        }
        onError={(e) => {
          const target = e.target as HTMLImageElement; // assert the target as an HTMLImageElement
          target.onerror = null; // prevents looping
          target.src = defaultImage; // set the default image
        }}
        className="object-cover w-24 h-full rounded-md shrink-0"
      />

      <div className="flex items-center justify-start w-full h-full gap-6">
        <div className="flex items-center justify-start p-2 truncate 2xl:flex-1 w-52 line-clamp-1">
          <h4>{activity.name}</h4>
        </div>
        <div className="flex items-center justify-start p-2 truncate 2xl:flex-1 w-52 line-clamp-1">
          <p>
            {`${activity.addressDetails.city}, ${activity.addressDetails.state}, ${activity.addressDetails.country}`}
          </p>
        </div>
        <div className="flex items-center justify-start flex-none p-2 truncate w-28 shrink-0 2xl:flex-1 line-clamp-1">
          <span
            className={cn(
              "flex items-center justify-start gap-2 h-4 w-fit p-4 text-sm text-white uppercase bg-white rounded-lg",
              badgeColor,
            )}
          >
            {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
            {activity.activityType}
          </span>
        </div>
        <div className="flex items-center justify-start p-2 truncate 2xl:flex-1 w-52 line-clamp-1">
          {activity.climbCategory && (
            <div className="flex flex-col text-sm font-semibold">
              Category:
              <span className="font-medium uppercase">{`${activity.climbCategory}`}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ActivityCardHorizontalFormat;
