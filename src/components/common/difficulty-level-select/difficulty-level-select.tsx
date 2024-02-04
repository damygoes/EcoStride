import { useState } from "react";
import SelectComponent from "../select-component/select-component";

type DifficultyLevelSelectProps = {
  selectedDifficultyLevel: string;
  onChange: (value: string) => void;
  isErrored?: boolean;
};

function DifficultyLevelSelect({
  selectedDifficultyLevel,
  onChange,
  isErrored,
}: DifficultyLevelSelectProps) {
  const [difficultyLevels] = useState<string[]>([
    "Easy",
    "Moderate",
    "Hard",
    "Very Hard",
    "Extremely Hard",
  ]);

  return (
    <SelectComponent
      items={difficultyLevels}
      selected={selectedDifficultyLevel}
      onChange={onChange ?? (() => {})}
      placeholder="Difficulty Level"
      isErrored={isErrored}
    />
  );
}

export default DifficultyLevelSelect;
