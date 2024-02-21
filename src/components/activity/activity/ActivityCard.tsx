import defaultImage from "@assets/mountain-elevation.svg";
import { cn } from "@lib/utils";
import { Activity } from "@type-definitions/Activity";
import { getActivityCardBadgeInfo } from "@utils/activity/get-activity-card-badge-info";
import { useUser } from "@utils/user/user-store";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import ActivityCardActions from "./ActivityCardActions";

function ActivityCard({
  activity,
  basePath = "activities",
}: {
  activity: Activity;
  basePath?: string;
}) {
  const { pathname } = useLocation();
  const { user } = useUser();
  const isUserAdmin = useMemo(() => {
    return user?.role === "ADMIN";
  }, [user?.role]);
  const currentUrl = useMemo(() => {
    return pathname.split("/")[1];
  }, [pathname]);
  const { color: badgeColor, icon: BadgeIcon } = useMemo(() => {
    return getActivityCardBadgeInfo(activity.activityType);
  }, [activity.activityType]);

  if (!activity) {
    return null;
  }

  return (
    <Link
      to={`/${basePath}/${activity.slug}`}
      className="group relative block h-[22rem] w-72 max-w-sm overflow-hidden rounded-lg shadow-sm text-text-color shadow-accent/30 md:max-w-xs"
    >
      {isUserAdmin && currentUrl === "activities" && (
        <ActivityCardActions activity={activity} />
      )}
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
        className="object-cover w-full h-56 shadow-xs rounded-ss-md"
      />

      <div className="p-4 mt-2 ">
        <dl>
          <div>
            <dt className="sr-only">Address</dt>
            <dd className="text-xs font-light text-accent">
              {`${activity.address.city}, ${activity.address.state}, ${activity.address.country}`}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Name</dt>
            <dd className="text-2xl font-semibold truncate">{activity.name}</dd>
          </div>
        </dl>
      </div>
      <div className="flex items-center justify-between w-full gap-2 p-3 text-sm shrink-0 text-text-color bg-gradient-to-br from-white via-secondary/50 to-secondary">
        <div className="flex items-center justify-start flex-1 gap-2">
          {activity.climbCategory && (
            <p className="text-xs font-semibold">
              {activity.climbCategory === "Hors Categorie (HC)"
                ? "HC"
                : `Cat: ${activity.climbCategory.toUpperCase()}`}
            </p>
          )}
        </div>
        <div className="flex items-center justify-end flex-1 gap-1">
          <p> {`${activity.distance}km`} </p>|
          <p>{`${activity.elevationGain}m`}</p>|
          <p>{`${activity.averageGrade}%`}</p>
        </div>
      </div>
      <div
        className={cn(
          "absolute top-0 right-0 z-10 flex items-center justify-end gap-1 px-3 py-1 text-text-color rounded-es-xl",
          badgeColor,
        )}
      >
        {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
        <span className="text-sm font-medium sm:text-xs">
          {activity.activityType.toUpperCase()}
        </span>
      </div>
    </Link>
  );
}

export default ActivityCard;
