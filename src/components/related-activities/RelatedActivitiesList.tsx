import { Activity } from "@type-definitions/Activity";
import { useActivity } from "@utils/activity/activity-store";
import { useMemo } from "react";
import RelatedActivityListSection from "./RelatedActivityListSection";

type RelatedActivitiesListProps = {
  selectedActivity: Activity;
};

type Section = {
  getLabel: (activity: Activity) => string;
  label: string;
};

const RelatedActivitiesList = ({
  selectedActivity,
}: RelatedActivitiesListProps) => {
  const { fetchActivities } = useActivity({
    query: {
      city: selectedActivity.address.city ?? "",
    },
  });
  const { data: activities } = fetchActivities;

  const sections: Section[] = useMemo(
    () => [
      {
        getLabel: (activity) => activity.address.city ?? "",
        label: "city",
      },
      {
        getLabel: (activity) => activity.address.state ?? "",
        label: "state",
      },
      {
        getLabel: (activity) => activity.address.country,
        label: "country",
      },
      {
        getLabel: (activity) => `category ${activity.climbCategory}`,
        label: "category",
      },
    ],
    [],
  );

  const filterActivities = (getLabel: (activity: Activity) => string) =>
    activities?.filter(
      (activity) =>
        getLabel(activity) === getLabel(selectedActivity) &&
        activity.id !== selectedActivity.id,
    );

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 p-3 overflow-x-hidden overflow-y-auto rounded-md text-text-color bg-gradient-to-br from-primary/60 via-primary to-secondary">
      {sections.map(({ getLabel, label }) => {
        const filteredClimbs = filterActivities(getLabel);
        if ((filteredClimbs?.length ?? 0) > 0) {
          const title =
            filteredClimbs && filteredClimbs?.length > 1
              ? `${filteredClimbs?.length} more climbs in ${label}`
              : `${filteredClimbs?.length} more climb in ${label}`;
          return (
            <RelatedActivityListSection
              key={label}
              title={title}
              activitiesToRender={filteredClimbs ?? []}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default RelatedActivitiesList;
