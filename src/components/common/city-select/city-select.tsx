import { getCities } from "@services/api/countries-api";
import { useEffect, useState } from "react";
import SelectComponent from "../select-component/select-component";

type CitySelectProps = {
  selectedCountry: string;
  selectedState: string;
  selectedCity: string;
  onChange: (value: string) => void;
  isErrored: boolean;
};

function CitySelect({
  selectedCountry,
  selectedState,
  selectedCity,
  onChange,
  isErrored,
}: CitySelectProps) {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (selectedState) {
      getCities(selectedCountry, selectedState)
        .then((res) => {
          const result = res.data;
          setCities(result);
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((_error) => {
          setCities([]); // Set to empty or a default value
        });
    } else {
      setCities([]); // Reset or set to default when state changes
    }
  }, [selectedCountry, selectedState]);

  return (
    <SelectComponent
      items={cities}
      selected={selectedCity}
      onChange={onChange}
      placeholder={cities.length === 0 ? "No cities found" : "State"}
      isErrored={isErrored}
      disabled={cities.length === 0}
    />
  );
}

export default CitySelect;
