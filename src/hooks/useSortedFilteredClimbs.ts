import { Climb } from "@type-definitions/Climb";
import { useFilterAndSortingStore } from "@utils/filters/filters-and-sorting-store";
import { useMemo, useState } from "react";

export const useSortedFilteredClimbs = (climbs: Climb[]) => {
  const {
    category,
    state,
    country,
    sortKey,
    sortOrder,
    resetFiltersAndSorting,
  } = useFilterAndSortingStore();
  const [searchTerm, setSearchTerm] = useState("");

  const sortedAndFilteredClimbs = useMemo(() => {
    let result = climbs ?? [];

    // Apply filters
    if (country) {
      result = result.filter(
        (climb) =>
          climb.location.country.toLowerCase() === country.toLowerCase(),
      );
    }
    if (state) {
      result = result.filter(
        (climb) => climb.location.state?.toLowerCase() === state.toLowerCase(),
      );
    }
    if (category) {
      result = result.filter(
        (climb) => climb.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (climb) =>
          climb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          climb.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          climb.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          climb.location.city
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          climb.location.state
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          climb.location.country
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          climb.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const aAvgGrade = a.gradient.averageGrade || 0; // Provide default value if undefined
      const bAvgGrade = b.gradient.averageGrade || 0; // Provide default value if undefined
      switch (sortKey) {
        case "name":
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "minGrade":
          return sortOrder === "asc"
            ? a.gradient.minGrade - b.gradient.minGrade
            : b.gradient.minGrade - a.gradient.minGrade;
        case "maxGrade":
          return sortOrder === "asc"
            ? a.gradient.maxGrade - b.gradient.maxGrade
            : b.gradient.maxGrade - a.gradient.maxGrade;
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
  }, [climbs, country, state, category, searchTerm, sortKey, sortOrder]);

  return {
    sortedAndFilteredClimbs,
    searchTerm,
    setSearchTerm,
    category,
    state,
    country,
    resetFiltersAndSorting,
  };
};
