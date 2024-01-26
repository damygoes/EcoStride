import ClimbRequestCTA from "@components/climb/request/ClimbRequestCTA";
import ClimbFiltersAndSort from "./ClimbFiltersAndSort";

function Filters() {
  return (
    <div className="w-full h-full p-3 space-y-4 text-text-color">
      <ClimbFiltersAndSort />
      <ClimbRequestCTA />
    </div>
  );
}

export default Filters;
