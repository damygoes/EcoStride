import ClimbRequestCTA from "@features/climb/components/request/climb-request-cta";
import ClimbFiltersAndSort from "../components/climb-filters-and-sort";

function FiltersScreen() {
  return (
    <div className="w-full h-full p-3 space-y-4 text-text-color">
      <ClimbFiltersAndSort />
      <ClimbRequestCTA />
    </div>
  );
}

export default FiltersScreen;
