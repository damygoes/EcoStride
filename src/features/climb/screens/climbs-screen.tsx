import FiltersScreen from "@features/filters/screen/filters-screen";
import { useFilterAndSortingStore } from "@features/filters/utils/filters-and-sorting-store";
import PageLayout from "@layouts/page-layout/page-layout";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import ClimbsList from "../components/climbs-list";
import { useClimbStore } from "../utils/climb-store";

function ClimbsScreen() {
  const { climbs } = useClimbStore();
  const { city, state, country, sortKey, sortOrder } =
    useFilterAndSortingStore();

  const filteredClimbs = useMemo(() => {
    return climbs.filter(
      (climb) =>
        (country === "" || climb.country === country) &&
        (state === "" || climb.state === state) &&
        (city === "" || climb.city === city),
    );
  }, [climbs, country, state, city]);

  const sortedAndFilteredClimbs = useMemo(() => {
    return filteredClimbs.sort((a, b) => {
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
  }, [filteredClimbs, sortKey, sortOrder]);

  const { t } = useTranslation();
  return (
    <PageLayout
      withFooter
      withSidebar
      pageTitle={t("page-header.all-climbs")}
      sidebarContent={<FiltersScreen />}
    >
      <section className="flex flex-col items-start justify-start h-full gap-4 overflow-hidden">
        <header className="hidden md:flex md:w-full md:h-[10%] bg-inherit">
          Tags and Sort Section
        </header>
        <section className="w-full h-full px-5 py-3 overflow-x-hidden overflow-y-auto md:flex-1">
          <ClimbsList climbs={sortedAndFilteredClimbs} />
        </section>
      </section>
    </PageLayout>
  );
}

export default ClimbsScreen;
