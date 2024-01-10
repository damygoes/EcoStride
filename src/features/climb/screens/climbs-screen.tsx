import Badge from "@components/common/badge/badge";
import SearchInput from "@components/common/search-input/search-input";
import FiltersScreen from "@features/filters/screen/filters-screen";
import { useFilterAndSortingStore } from "@features/filters/utils/filters-and-sorting-store";
import PageLayout from "@layouts/page-layout/page-layout";
import { cn } from "@lib/utils";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ClimbsList from "../components/list/climbs-list";
import { useClimbStore } from "../utils/climb-store";

function ClimbsScreen() {
  const { climbs } = useClimbStore();
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
    let result = climbs;

    // Apply filters
    if (country) {
      result = result.filter(
        (climb) => climb.country.toLowerCase() === country.toLowerCase(),
      );
    }
    if (state) {
      result = result.filter(
        (climb) => climb.state.toLowerCase() === state.toLowerCase(),
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
          climb.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          climb.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          climb.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          climb.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          climb.category.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortKey) {
        case "name":
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "minGrade":
          return sortOrder === "asc"
            ? a.minGrade - b.minGrade
            : b.minGrade - a.minGrade;
        case "maxGrade":
          return sortOrder === "asc"
            ? a.maxGrade - b.maxGrade
            : b.maxGrade - a.maxGrade;
        case "averageGrade":
          return sortOrder === "asc"
            ? a.averageGrade - b.averageGrade
            : b.averageGrade - a.averageGrade;
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
      sidebarContent={<FiltersScreen />}
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
        </header>
        <section className="w-full h-full px-5 py-3 overflow-x-hidden overflow-y-auto md:flex-1">
          <ClimbsList climbs={sortedAndFilteredClimbs} />
        </section>
      </section>
    </PageLayout>
  );
}

export default ClimbsScreen;
