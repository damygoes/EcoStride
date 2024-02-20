import ActivityFiltersAndSort from "../filters/ActivityFiltersAndSort";
import ActivityRequestCTA from "../request/ActivityRequestCTA";

function ActivityPageSideBarContent() {
  return (
    <div className="w-full h-full p-3 space-y-4 rounded-md text-text-color bg-text-color/15">
      <ActivityFiltersAndSort />
      <ActivityRequestCTA />
    </div>
  );
}

export default ActivityPageSideBarContent;
