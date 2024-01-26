import { getStates } from "@services/api/countries-api";
import { useEffect, useState } from "react";
import SelectComponent from "../select-component/select-component";

type StateSelectProps = {
  selectedCountry: string;
  selectedState: string;
  onChange: (value: string) => void;
  isErrored?: boolean;
};

function StateSelect({
  selectedCountry,
  selectedState,
  onChange,
  isErrored,
}: StateSelectProps) {
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      getStates(selectedCountry)
        .then((res) => {
          const statesArray = res.data.states.map(
            (state: { name: string }) => state.name,
          );
          setStates(statesArray);
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((_error) => {
          setStates([]); // Set to empty or a default value
        });
    } else {
      setStates([]); // Reset or set to default when country changes
    }
  }, [selectedCountry]);

  return (
    <SelectComponent
      items={states}
      selected={selectedState}
      onChange={onChange}
      placeholder={states.length === 0 ? "No states found" : "State"}
      isErrored={isErrored}
      disabled={states.length === 0}
    />
  );
}

export default StateSelect;
