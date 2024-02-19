import {
  AverageGradientIcon,
  DistanceIcon,
  ElevationIcon,
  MaximumGradientIcon,
  MinimumGradientIcon,
  TimeIcon,
} from "@assets/Icons";
import Badge from "@components/common/badge/badge";
import { Activity } from "@type-definitions/Activity";
import { getTimeToCompleteActivity } from "@utils/activity/getTimeToCompleteActivity";
import { capitaliseString } from "@utils/capitaliseString";
import i18next from "i18next";
import { useMemo } from "react";
import ClimbCardDetail from "../activity/ActivityCardDetail";
import ActivityDetailsHeaderAddToBucketListManager from "./ActivityDetailsHeaderAddToBucketListManager";
import ActivityDetailsHeaderLikeCounter from "./ActivityDetailsHeaderLikeCounter";
import ActivityDetailsHeaderMarkAsRiddenIconManager from "./ActivityDetailsHeaderMarkAsRiddenIconManager";

type ActivityDetailsHeaderProps = {
  selectedActivity: Activity;
  t: typeof i18next.t;
};

function ActivityDetailsHeader({
  selectedActivity,
  t,
}: ActivityDetailsHeaderProps) {
  const timeToCompleteActivity = useMemo(() => {
    return getTimeToCompleteActivity(selectedActivity.timeToComplete);
  }, [selectedActivity.timeToComplete]);

  const capitalisedClimbCategory = useMemo(() => {
    return capitaliseString(selectedActivity.climbCategory ?? "");
  }, [selectedActivity.climbCategory]);

  return (
    <div className="flex flex-col items-start justify-between flex-1 w-full gap-4 md:flex-row md:items-center md:flex-none">
      {/* Left */}
      <div className="flex flex-col items-center justify-between flex-1 w-full gap-5 p-3 rounded-md bg-gradient-to-br from-secondary/10 via-secondary/20 to-secondary/10 text-text-color md:h-full md:py-5 md:gap-12">
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-semibold">
            {selectedActivity.name.toLocaleUpperCase() || "Climb Name"}
          </h3>
          <p className="text-xs font-light">
            {` ${selectedActivity.address.city}, ${selectedActivity.address.state}, ${selectedActivity.address.country}`}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center w-full gap-3">
          {selectedActivity.activityType === "Bike" &&
            selectedActivity.routeType === "Hilly" && (
              <Badge variant="accent">
                {`Climb Category: ${capitalisedClimbCategory || "N/A"}`}
              </Badge>
            )}
          {selectedActivity.tags?.map((tag) => (
            <Badge key={tag} variant="accent">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 px-4 text-sm">
          <ClimbCardDetail
            icon={<DistanceIcon />}
            name={t("activity-card.distance")}
            value={`${selectedActivity.distance}km`}
          />

          <ClimbCardDetail
            icon={<MinimumGradientIcon />}
            name={t("activity-card.min-grade")}
            value={`${selectedActivity.minimumGrade}%`}
          />
          <ClimbCardDetail
            icon={<AverageGradientIcon />}
            name={t("activity-card.avg-grade")}
            value={`${selectedActivity.averageGrade}%`}
          />
          <ClimbCardDetail
            icon={<MaximumGradientIcon />}
            name={t("activity-card.max-grade")}
            value={`${selectedActivity.maximumGrade}%`}
          />

          <ClimbCardDetail
            icon={<ElevationIcon />}
            name={t("activity-card.elevation")}
            value={`${selectedActivity.elevationGain}m`}
          />
          <ClimbCardDetail
            icon={<TimeIcon />}
            name={t("activity-card.duration")}
            value={`${timeToCompleteActivity}`}
          />
        </div>
        <div className="flex items-center justify-end w-full gap-3">
          <ActivityDetailsHeaderAddToBucketListManager
            selectedActivity={selectedActivity}
          />
          <ActivityDetailsHeaderMarkAsRiddenIconManager
            selectedActivity={selectedActivity}
          />
          <ActivityDetailsHeaderLikeCounter
            selectedActivity={selectedActivity}
          />
        </div>
      </div>
    </div>
  );
}

export default ActivityDetailsHeader;
