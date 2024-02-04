import { useState } from "react";
import SelectComponent from "../select-component/select-component";

type RouteTypeSelectProps = {
  selectedRouteType: string;
  onChange: (value: string) => void;
  isErrored?: boolean;
};

function RouteTypeSelect({
  selectedRouteType,
  onChange,
  isErrored,
}: RouteTypeSelectProps) {
  const [activityTypes] = useState<string[]>(["Flat", "Rolling", "Hilly"]);

  return (
    <SelectComponent
      items={activityTypes}
      selected={selectedRouteType}
      onChange={onChange ?? (() => {})}
      placeholder="Route Type"
      isErrored={isErrored}
    />
  );
}

export default RouteTypeSelect;
