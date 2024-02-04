import { useState } from "react";
import SelectComponent from "../select-component/select-component";

type ContinentSelectProps = {
  selectedContinent: string;
  onChange: (value: string) => void;
  isErrored?: boolean;
};

function ContinentSelect({
  selectedContinent,
  onChange,
  isErrored,
}: ContinentSelectProps) {
  const [continents] = useState<string[]>([
    "Africa",
    "Antarctica",
    "Asia",
    "Europe",
    "North America",
    "Oceania",
    "South America",
  ]);

  return (
    <SelectComponent
      items={continents}
      selected={selectedContinent}
      onChange={onChange}
      placeholder="Choose Continent"
      isErrored={isErrored}
    />
  );
}

export default ContinentSelect;
