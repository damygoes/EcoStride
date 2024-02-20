import SelectComponent from "@components/common/select-component/select-component";
import { useFilterAndSortingStore } from "@utils/filters/filters-and-sorting-store";
import { useTranslation } from "react-i18next";

const SortingComponent: React.FC = () => {
  const { sortKey, sortOrder, setSortKey, setSortOrder } =
    useFilterAndSortingStore();
  const { t } = useTranslation();

  // Define optionMap with an explicit index signature
  const optionMap: { [key: string]: string } = {
    name: "Name",
    distance: "Distance",
    elevationGain: "Elevation",
    averageGrade: "Avg. Grade",
  };

  // The getLabelForSortOption function
  const getLabelForSortOption = (value: string) => {
    return optionMap[value] || value;
  };

  // Function to handle sortOrder change
  const handleSortOrderChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h4 className="my-3 text-sm uppercase text-text-color">
          {t("activities-page-sidebar.sort")}
        </h4>
        <div className="flex space-x-2 text-sm text-text-color/60">
          <span
            className={`cursor-pointer ${
              sortOrder === "asc" ? "text-accent" : ""
            }`}
            onClick={() => handleSortOrderChange("asc")}
          >
            {t("activities-page-sidebar.sort-ascending")}
          </span>
          <span
            className={`cursor-pointer ${
              sortOrder === "desc" ? "text-accent" : ""
            }`}
            onClick={() => handleSortOrderChange("desc")}
          >
            {t("activities-page-sidebar.sort-descending")}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-start w-full gap-3">
        <SelectComponent
          items={Object.keys(optionMap)} // Use the keys of optionMap
          selected={sortKey}
          onChange={setSortKey}
          labelFunction={getLabelForSortOption}
          placeholder={t("activities-page-sidebar.select")}
          className="flex-1"
        />
      </div>
    </>
  );
};

export default SortingComponent;
