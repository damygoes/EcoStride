import {
  AverageGradientIcon,
  DistanceIcon,
  ElevationIcon,
  MaximumGradientIcon,
  MinimumGradientIcon,
} from "@assets/Icons";
import Badge from "@components/common/badge/badge";
import SummitSeekersMap from "@components/common/map/Map";
import { Button } from "@components/ui/button/button";
import { IconChecks, IconPlus } from "@tabler/icons-react";
import { Activity } from "@type-definitions/Activity";
import { capitaliseString } from "@utils/capitaliseString";
import { useUser } from "@utils/user/user-store";
import i18next from "i18next";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClimbCardDetail from "../activity/ActivityCardDetail";

type ActivityDetailsHeaderProps = {
  selectedActivity: Activity;
  t: typeof i18next.t;
};

function ActivityDetailsHeader({
  selectedActivity,
  t,
}: ActivityDetailsHeaderProps) {
  const navigate = useNavigate();
  const currentURL = useLocation();
  const { user } = useUser();
  const handleAddToBucketList = () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      console.log("Add to bucket list");
    }
  };

  const handleMarkAsRidden = () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      console.log("Mark as ridden");
    }
  };

  // Extract the coordinates from the selected climb
  const startCoordinates = {
    longitude:
      selectedActivity.startCoordinate &&
      selectedActivity.startCoordinate.longitude
        ? selectedActivity.startCoordinate.longitude
        : null,
    latitude:
      selectedActivity.startCoordinate &&
      selectedActivity.startCoordinate.latitude
        ? selectedActivity.startCoordinate.latitude
        : null,
  };

  const endCoordinates = {
    longitude:
      selectedActivity.endCoordinate && selectedActivity.endCoordinate.longitude
        ? selectedActivity.endCoordinate.longitude
        : null,
    latitude:
      selectedActivity.endCoordinate && selectedActivity.endCoordinate.latitude
        ? selectedActivity.endCoordinate.latitude
        : null,
  };

  const capitalisedClimbCategory = useMemo(() => {
    return capitaliseString(selectedActivity.climbCategory ?? "");
  }, [selectedActivity.climbCategory]);

  return (
    <div className="flex flex-col items-start justify-between flex-1 w-full gap-4 md:flex-row md:items-center md:flex-none">
      {/* Left */}
      <div className="flex flex-col items-center justify-between flex-1 w-full gap-5 p-3 rounded-md bg-gradient-to-br from-text-color/10 via-text-color/40 to-secondary text-text-color md:h-full md:py-5 md:gap-8">
        <div className="space-y-2 text-center">
          <h3 className="text-3xl font-semibold">
            {selectedActivity.name.toLocaleUpperCase() || "Climb Name"}
          </h3>
          <p className="text-sm font-light">
            {`Located in ${selectedActivity.address.city}, ${selectedActivity.address.state}, ${selectedActivity.address.country}`}
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
            <Badge key={tag} variant="secondary">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <ClimbCardDetail
            icon={<DistanceIcon />}
            name={t("activity-card.distance")}
            value={`${selectedActivity.distance}km`}
          />

          <ClimbCardDetail
            icon={<MinimumGradientIcon />}
            name={"Min. Gradient"}
            value={`${selectedActivity.minimumGrade}%`}
          />
          <ClimbCardDetail
            icon={<AverageGradientIcon />}
            name={t("activity-card.avg-grade")}
            value={`${selectedActivity.averageGrade}%`}
          />
          <ClimbCardDetail
            icon={<MaximumGradientIcon />}
            name={"Max. Gradient"}
            value={`${selectedActivity.maximumGrade}%`}
          />

          <ClimbCardDetail
            icon={<ElevationIcon />}
            name={t("activity-card.elevation")}
            value={`${selectedActivity.elevationGain}m`}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center w-full gap-4">
          <Button
            iconLeft={<IconPlus />}
            variant="primary"
            size="sm"
            onClick={handleAddToBucketList}
          >
            Add to my Bucket List
          </Button>
          <Button
            iconLeft={<IconChecks />}
            variant="secondary"
            size="sm"
            onClick={handleMarkAsRidden}
          >
            Already ridden
          </Button>
        </div>
      </div>
      {/* Right (MAP) */}
      <div className="w-full rounded-md bg-inherit md:w-2/5 md:h-full">
        <SummitSeekersMap
          startCoordinates={startCoordinates}
          endCoordinates={endCoordinates}
        />
        {/* <img
          src="https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFwfGVufDB8fDB8fHww"
          alt="map"
          className="object-cover w-full h-full rounded-md"
        /> */}
      </div>
    </div>
  );
}

export default ActivityDetailsHeader;
