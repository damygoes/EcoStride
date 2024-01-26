import Filters from "@components/climb/filters/Filters";
import ClimbsList from "@components/climb/list/ClimbsList";
import ClimbViewSelector from "@components/climb/view-selector/ClimbViewSelector";
import Badge from "@components/common/badge/badge";
import SearchInput from "@components/common/search-input/search-input";
import PageLayout from "@layouts/page-layout/page-layout";
import { cn } from "@lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useClimb } from "@utils/climb/climb-store";
import { useFilterAndSortingStore } from "@utils/filters/filters-and-sorting-store";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

function ClimbsScreen() {
  const { fetchClimbs } = useClimb();
  const { isLoading, data: climbs } = useQuery({
    queryKey: ["climbs"],
    queryFn: fetchClimbs,
  });
  const {
    category,
    state,
    country,
    sortKey,
    sortOrder,
    resetFiltersAndSorting,
  } = useFilterAndSortingStore();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

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

  const { t } = useTranslation();
  return (
    <PageLayout
      withFooter
      withSidebar
      pageTitle={t("page-header.all-climbs")}
      sidebarContent={<Filters />}
    >
      <section className="flex flex-col items-start justify-start h-full gap-4 overflow-hidden">
        <header
          className={cn(
            "flex flex-col-reverse w-full rounded-md justify-start items-start p-2 gap-4 md:flex-row md:justify-between md:items-center md:h-[10%] bg-gradient-to-r from-white via-white to-primary dark:from-secondary dark:via-primary dark:to-white",
            {
              "md:justify-end": !category || !state || !country,
            },
          )}
        >
          {(category || state || country) && (
            <div className="flex items-center justify-start w-full h-full gap-3 p-3 overflow-x-auto overflow-y-hidden bg-inherit md:flex-1">
              {category && <Badge>{category}</Badge>}
              {state && <Badge>{state}</Badge>}
              {country && <Badge>{country}</Badge>}
              <span
                className="text-sm italic cursor-pointer text-accent hover:underline hover:underline-offset-1"
                onClick={resetFiltersAndSorting}
              >
                clear
              </span>
            </div>
          )}
          <div className="w-full md:w-1/3">
            <SearchInput
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
          <ClimbViewSelector />
        </header>
        <section className="w-full h-full px-5 py-3 overflow-x-hidden overflow-y-auto md:flex-1">
          <ClimbsList climbs={sortedAndFilteredClimbs} isLoading={isLoading} />
        </section>
      </section>
    </PageLayout>
  );
}

export default ClimbsScreen;