import SelectComponent from "@components/common/select-component/select-component";
import { Button } from "@components/ui/button/button";
import { useClimbStore } from "@features/climb/utils/climb-store";
import { getFilterOptionsFromClimbsData } from "@lib/getFilterOptionsFromClimbsData";
import { useMemo } from "react";
import { useFilterAndSortingStore } from "../utils/filters-and-sorting-store";
import SortingComponent from "./sort-component";

const ClimbFiltersAndSort = () => {
  const {
    country,
    state,
    category,
    setCountry,
    setState,
    setCategory,
    resetFiltersAndSorting,
  } = useFilterAndSortingStore();
  const { climbs } = useClimbStore();

  // Dynamic Filter Options
  const { uniqueCategories, uniqueStates, uniqueCountries } = useMemo(() => {
    return getFilterOptionsFromClimbsData(climbs);
  }, [climbs]);

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
    <div>
      <h4 className="my-3 text-sm uppercase text-text-color">Filters</h4>
      <>
        <SelectComponent
          items={uniqueCategories}
          selected={category}
          onChange={handleCategoryChange}
          placeholder="Category"
          className="w-11/12"
        />
        <SelectComponent
          items={uniqueStates}
          selected={state}
          onChange={handleStateChange}
          placeholder="State"
          className="w-11/12"
        />
        <SelectComponent
          items={uniqueCountries}
          selected={country}
          onChange={handleCountryChange}
          placeholder="Country"
          className="w-11/12"
        />
        <br />
        <SortingComponent />
        <br />
        <Button variant="error" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </>
    </div>
  );
};

export default ClimbFiltersAndSort;
