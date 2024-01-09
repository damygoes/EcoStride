import SelectComponent from "@components/common/select-component/select-component";
import { Button } from "@components/ui/button/button";
import { useFilterAndSortingStore } from "../utils/filters-and-sorting-store";

const ClimbFilter = () => {
  const {
    country,
    state,
    city,
    setCountry,
    setState,
    setCity,
    resetFiltersAndSorting,
  } = useFilterAndSortingStore();

  // Dynamic Filter Options
  // const { uniqueCities, uniqueStates, uniqueCountries } = useMemo(() => {
  //   return getFilterOptionsFromClimbsData(climbs);
  // }, [climbs]);

  const cities = [
    "Mountainville",
    "Riverstown",
    "Chamonix",
    "Cortina d'Ampezzo",
    "Granada",
    "Garmisch-Partenkirchen",
    "Freiburg",
    "Bad Schandau",
    "Reutlingen",
    "Heidelberg",
    "Freudenstadt",
    "Offenburg",
  ];
  const states = [
    "Colorado",
    "Oregon",
    "Auvergne-Rhône-Alpes",
    "Veneto",
    "Andalusia",
    "Bavaria",
    "Baden-Württemberg",
    "Saxony",
  ];
  const countries = ["USA", "France", "Italy", "Spain", "Germany"];

  // Handlers for each filter
  const handleCountryChange = (newCountry: string) => setCountry(newCountry);
  const handleStateChange = (newState: string) => setState(newState);
  const handleCityChange = (newCity: string) => setCity(newCity);

  // Handler for reset button
  const handleResetFilters = () => {
    resetFiltersAndSorting();
  };

  return (
    <div>
      <h4 className="my-3 text-sm uppercase text-text-color">Filters</h4>
      <>
        <SelectComponent
          items={cities}
          selected={city}
          onChange={handleCityChange}
          placeholder="City"
        />
        <SelectComponent
          items={states}
          selected={state}
          onChange={handleStateChange}
          placeholder="State"
        />
        <SelectComponent
          items={countries}
          selected={country}
          onChange={handleCountryChange}
          placeholder="Country"
        />
        <br />
        <Button variant="error" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      </>
    </div>
  );
};

export default ClimbFilter;
