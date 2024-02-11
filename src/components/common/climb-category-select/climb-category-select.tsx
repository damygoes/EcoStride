import { useState } from "react";
import SelectComponent from "../select-component/select-component";

type ClimbCategorySelectProps = {
  selectedClimbCategory: string;
  onChange: (value: string) => void;
  isErrored?: boolean;
};

function ClimbCategorySelect({
  selectedClimbCategory,
  onChange,
  isErrored,
}: ClimbCategorySelectProps) {
  const [climbCategories] = useState<string[]>([
    "One",
    "Two",
    "Three",
    "Four",
    "Hors Categorie (HC)",
  ]);

  return (
    <SelectComponent
      items={climbCategories}
      selected={selectedClimbCategory}
      onChange={onChange}
      placeholder="Climb Category"
      isErrored={isErrored}
    />
  );
}

export default ClimbCategorySelect;
