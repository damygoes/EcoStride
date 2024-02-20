import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <SelectComponent
      items={climbCategories}
      selected={selectedClimbCategory}
      onChange={onChange}
      placeholder={t("activities-page-sidebar.climb-category")}
      isErrored={isErrored}
    />
  );
}

export default ClimbCategorySelect;
