import ActivityRequestCTA from "@components/activity/request/ActivityRequestCTA";
import ActivityFiltersAndSort from "./ActivityFiltersAndSort";

function Filters() {
  return (
    <div className="w-full h-full p-3 space-y-4 text-text-color">
      <ActivityFiltersAndSort />
      <ActivityRequestCTA />
    </div>
  );
}

export default Filters;
