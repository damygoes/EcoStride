import CountrySelect from "@components/common/country-select/country-select";
import SelectComponent from "@components/common/select-component/select-component";
import StateSelect from "@components/common/state-select/state-select";
import { Button } from "@components/ui/button/button";
import { getFilterOptionsFromClimbsData } from "@lib/getFilterOptionsFromClimbsData";
import { Climb } from "@type-definitions/Climb";
import { useMemo } from "react";
import { useFilterAndSortingStore } from "../../../utils/filters/filters-and-sorting-store";
import SortingComponent from "./SortComponent";

type ClimbFiltersAndSortProps = {
  climbs: Climb[];
};

const ClimbFiltersAndSort = ({ climbs }: ClimbFiltersAndSortProps) => {
  const {
    country,
    state,
    category,
    setCountry,
    setState,
    setCategory,
    resetFiltersAndSorting,
  } = useFilterAndSortingStore();

  // Dynamic Filter Options
  const result = useMemo(() => {
    return getFilterOptionsFromClimbsData(climbs);
  }, [climbs]);

  const climbCategories = result?.uniqueCategories ?? [];

  // Handlers for each filter
  const handleCountryChange = (newCountry: string) => setCountry(newCountry);
  const handleStateChange = (newState: string) => setState(newState);
  const handleCategoryChange = (newCategory: string) =>
    setCategory(newCategory);

  // Handler for reset button
  const handleResetFilters = () => {
    resetFiltersAndSorting();
  };

  return (
    <div className="space-y-3">
      <h4 className="my-3 text-sm uppercase text-text-color">Filters</h4>
      <SelectComponent
        items={climbCategories}
        selected={category}
        onChange={handleCategoryChange}
        placeholder="Category"
      />
      <CountrySelect selectedCountry={country} onChange={handleCountryChange} />
      <StateSelect
        selectedCountry={country}
        selectedState={state}
        onChange={handleStateChange}
      />
      <br />
      <SortingComponent />
      <br />
      <Button variant="error" onClick={handleResetFilters} className="w-full">
        Reset Filters
      </Button>
    </div>
  );
};

export default ClimbFiltersAndSort;
