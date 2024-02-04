import useFilteredActivities from "@hooks/useFilteredActivities";
import { Activity } from "@type-definitions/Activity";
import RelatedActivityListSection from "./RelatedActivityListSection";

type RelatedActivitiesListProps = {
  selectedActivity: Activity;
};

type RenderSectionProps = {
  activities: Activity[];
  type: string;
};

const RelatedActivitiesList = ({
  selectedActivity,
}: RelatedActivitiesListProps) => {
  const { address, climbCategory, id } = selectedActivity;
  const filteredByCity = useFilteredActivities({
    type: "city",
    parameter: address.city,
    excludeId: id,
  });
  const filteredByState = useFilteredActivities({
    type: "state",
    parameter: address.state,
    excludeId: id,
  });
  const filteredByCountry = useFilteredActivities({
    type: "country",
    parameter: address.country,
    excludeId: id,
  });
  const filteredByCategory = useFilteredActivities({
    type: "category",
    parameter: climbCategory ?? "",
    excludeId: id,
  });

  const renderSection = ({ activities, type }: RenderSectionProps) => {
    if (!activities) return null;
    if (activities.length === 0) return null;
    const title = `${activities.length} more ${activities.length > 1 ? "Activities" : "Activity"} in ${type}`;
    return (
      <RelatedActivityListSection
        title={title}
        activitiesToRender={activities}
      />
    );
  };

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 p-3 overflow-x-hidden overflow-y-auto rounded-md text-text-color bg-gradient-to-br from-primary/60 via-primary to-secondary">
      {renderSection({ activities: filteredByCity, type: address.city })}
      {renderSection({ activities: filteredByState, type: address.state })}
      {renderSection({ activities: filteredByCountry, type: address.country })}
      {renderSection({
        activities: filteredByCategory,
        type: climbCategory ?? "",
      })}
    </div>
  );
};

export default RelatedActivitiesList;
