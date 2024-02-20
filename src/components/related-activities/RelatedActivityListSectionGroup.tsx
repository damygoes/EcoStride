import RelatedActivityListSection from "@components/related-activities/RelatedActivityListSection";
import { Activity } from "@type-definitions/Activity";
import { useTranslation } from "react-i18next";

type RelatedActivityListSectionGroupProps = {
  activities: Activity[];
  type: string;
};

export const RelatedActivityListSectionGroup = ({
  activities,
  type,
}: RelatedActivityListSectionGroupProps) => {
  const { t } = useTranslation();
  if (!activities) return null;
  if (activities.length === 0) return null;
  const title = `${activities.length} ${t("related-activities.more")} ${activities.length > 1 ? "Activities" : "Activity"} in ${type}`;
  return (
    <RelatedActivityListSection title={title} activitiesToRender={activities} />
  );
};
