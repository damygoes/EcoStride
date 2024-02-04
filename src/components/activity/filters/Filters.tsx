import ActivityRequestCTA from "@components/activity/request/ActivityRequestCTA";
import { Activity } from "@type-definitions/Activity";
import ActivityFiltersAndSort from "./ActivityFiltersAndSort";

type FiltersProps = {
  activities: Activity[];
};

function Filters({ activities }: FiltersProps) {
  return (
    <div className="w-full h-full p-3 space-y-4 text-text-color">
      <ActivityFiltersAndSort activities={activities} />
      <ActivityRequestCTA />
    </div>
  );
}

export default Filters;
