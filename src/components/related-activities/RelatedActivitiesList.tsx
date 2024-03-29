import useFilteredActivities from "@hooks/useFilteredActivities";
import { Activity } from "@type-definitions/Activity";
import { RelatedActivityListSectionGroup } from "./RelatedActivityListSectionGroup";

type RelatedActivitiesListProps = {
  selectedActivity: Activity;
};

const RelatedActivitiesList = ({
  selectedActivity,
}: RelatedActivitiesListProps) => {
  const filteredByCity = useFilteredActivities({
    type: "city",
    parameter: selectedActivity.address.city,
    excludeId: selectedActivity.id,
  });
  const filteredByState = useFilteredActivities({
    type: "state",
    parameter: selectedActivity.address?.state,
    excludeId: selectedActivity.id,
  });
  const filteredByCountry = useFilteredActivities({
    type: "country",
    parameter: selectedActivity.address?.country,
    excludeId: selectedActivity.id,
  });
  const filteredByCategory = useFilteredActivities({
    type: "category",
    parameter: selectedActivity.climbCategory ?? "",
    excludeId: selectedActivity.id,
  });

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 p-3 overflow-x-hidden overflow-y-auto rounded-md text-text-color bg-gradient-to-br from-primary/10 via-primary/20 to-primary/30 scrollbar-hide">
      <RelatedActivityListSectionGroup
        activities={filteredByCity}
        type={selectedActivity.address?.city}
      />
      <RelatedActivityListSectionGroup
        activities={filteredByState}
        type={selectedActivity.address?.state}
      />
      <RelatedActivityListSectionGroup
        activities={filteredByCountry}
        type={selectedActivity.address?.country}
      />
      <RelatedActivityListSectionGroup
        activities={filteredByCategory}
        type={selectedActivity.climbCategory ?? ""}
      />
    </div>
  );
};

export default RelatedActivitiesList;
