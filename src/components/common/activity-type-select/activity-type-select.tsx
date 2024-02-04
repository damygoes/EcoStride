import { useState } from "react";
import SelectComponent from "../select-component/select-component";

type ActivityTypeSelectProps = {
  selectedActivityType: string;
  onChange: (value: string) => void;
  isErrored?: boolean;
};

function ActivityTypeSelect({
  selectedActivityType,
  onChange,
  isErrored,
}: ActivityTypeSelectProps) {
  const [activityTypes] = useState<string[]>(["Bike", "Hike", "Run"]);

  return (
    <SelectComponent
      items={activityTypes}
      selected={selectedActivityType ?? "Bike"}
      onChange={onChange ?? (() => {})}
      placeholder="Activity Type"
      isErrored={isErrored}
    />
  );
}

export default ActivityTypeSelect;
