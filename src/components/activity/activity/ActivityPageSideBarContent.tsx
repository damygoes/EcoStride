import ActivityFiltersAndSort from "../filters/ActivityFiltersAndSort";
import ActivityRequestCTA from "../request/ActivityRequestCTA";

function ActivityPageSideBarContent() {
  return (
    <div className="w-full h-full p-3 space-y-4 text-text-color">
      <ActivityFiltersAndSort />
      <ActivityRequestCTA />
    </div>
  );
}

export default ActivityPageSideBarContent;
