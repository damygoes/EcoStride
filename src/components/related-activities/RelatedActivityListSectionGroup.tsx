import RelatedActivityListSection from "@components/related-activities/RelatedActivityListSection";
import { Activity } from "@type-definitions/Activity";

type RelatedActivityListSectionGroupProps = {
  activities: Activity[];
  type: string;
};

export const RelatedActivityListSectionGroup = ({
  activities,
  type,
}: RelatedActivityListSectionGroupProps) => {
  if (!activities) return null;
  if (activities.length === 0) return null;
  const title = `${activities.length} more ${activities.length > 1 ? "Activities" : "Activity"} in ${type}`;
  return (
    <RelatedActivityListSection title={title} activitiesToRender={activities} />
  );
};
