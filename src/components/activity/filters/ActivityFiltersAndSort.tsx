import ClimbCategorySelect from "@components/common/climb-category-select/climb-category-select";
import CountrySelect from "@components/common/country-select/country-select";
import StateSelect from "@components/common/state-select/state-select";
import { Button } from "@components/ui/button/button";
import { useTranslation } from "react-i18next";
import { useFilterAndSortingStore } from "../../../utils/filters/filters-and-sorting-store";
import SortingComponent from "./SortComponent";

const ActivityFiltersAndSort = () => {
  const {
    country,
    state,
    climbCategory,
    setCountry,
    setState,
    setClimbCategory,
    resetFiltersAndSorting,
  } = useFilterAndSortingStore();
  const { t } = useTranslation();

  // Handlers for each filter
  const handleCountryChange = (newCountry: string) => setCountry(newCountry);
  const handleStateChange = (newState: string) => setState(newState);
  const handleCategoryChange = (newCategory: string) => {
    setClimbCategory(newCategory);
  };

  // Handler for reset button
  const handleResetFilters = () => {
    resetFiltersAndSorting();
  };

  return (
    <div className="space-y-3">
      <h4 className="my-3 text-sm uppercase text-text-color">
        {t("activities-page-sidebar.filter")}
      </h4>
      <ClimbCategorySelect
        selectedClimbCategory={climbCategory}
        onChange={handleCategoryChange}
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
        {t("activities-page-sidebar.reset")}
      </Button>
    </div>
  );
};

export default ActivityFiltersAndSort;
