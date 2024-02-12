import { Activity } from "@type-definitions/Activity";
import { useFilterAndSortingStore } from "@utils/filters/filters-and-sorting-store";
import { useMemo, useState } from "react";

export const useSortedFilteredActivities = (activities: Activity[]) => {
  const {
    climbCategory,
    state,
    country,
    sortKey,
    sortOrder,
    resetFiltersAndSorting,
  } = useFilterAndSortingStore();
  const [searchTerm, setSearchTerm] = useState("");

  const sortedAndFilteredActivities = useMemo(() => {
    let result = activities ?? [];

    // Apply filters
    if (country) {
      result = result.filter(
        (activity) =>
          activity.address.country.toLowerCase() === country.toLowerCase(),
      );
    }
    if (state) {
      result = result.filter(
        (activity) =>
          activity.address.state?.toLowerCase() === state.toLowerCase(),
      );
    }
    if (climbCategory) {
      result = result.filter(
        (activity) => activity.climbCategory === climbCategory,
      );
    }

    // Apply search
    if (searchTerm) {
      result = result.filter((activity) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        // Applying optional chaining and guard clauses
        return (
          activity.name?.toLowerCase().includes(lowerSearchTerm) ||
          activity.description?.toLowerCase().includes(lowerSearchTerm) ||
          activity.address.city?.toLowerCase().includes(lowerSearchTerm) ||
          activity.address.state?.toLowerCase().includes(lowerSearchTerm) ||
          activity.address.country?.toLowerCase().includes(lowerSearchTerm) ||
          activity.climbCategory?.toLowerCase().includes(lowerSearchTerm)
        );
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      const aAvgGrade = a.averageGrade || 0;
      const bAvgGrade = b.averageGrade || 0;
      switch (sortKey) {
        case "name":
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "minGrade":
          return sortOrder === "asc"
            ? (a.minimumGrade ?? 0) - (b.minimumGrade ?? 0)
            : (b.minimumGrade ?? 0) - (a.minimumGrade ?? 0);
        case "maxGrade":
          return sortOrder === "asc"
            ? (a.maximumGrade ?? 0) - (b.maximumGrade ?? 0)
            : (b.maximumGrade ?? 0) - (a.maximumGrade ?? 0);
        case "averageGrade":
          if (sortOrder === "asc") {
            return aAvgGrade - bAvgGrade;
          } else {
            return bAvgGrade - aAvgGrade;
          }
        case "elevationGain":
          return sortOrder === "asc"
            ? a.elevationGain - b.elevationGain
            : b.elevationGain - a.elevationGain;
        case "distance":
          return sortOrder === "asc"
            ? a.distance - b.distance
            : b.distance - a.distance;
        default:
          return 0;
      }
    });
    return result;
  }, [
    activities,
    country,
    state,
    climbCategory,
    searchTerm,
    sortKey,
    sortOrder,
  ]);

  return {
    sortedAndFilteredActivities,
    searchTerm,
    setSearchTerm,
    climbCategory,
    state,
    country,
    resetFiltersAndSorting,
  };
};
