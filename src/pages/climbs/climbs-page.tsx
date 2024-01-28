import ClimbErrorStateFallback from "@components/climb/climb-error-state-fallback/ClimbErrorStateFallback";
import Filters from "@components/climb/filters/Filters";
import ClimbsList from "@components/climb/list/ClimbsList";
import ClimbViewSelector from "@components/climb/view-selector/ClimbViewSelector";
import Badge from "@components/common/badge/badge";
import SearchInput from "@components/common/search-input/search-input";
import { useSortedFilteredClimbs } from "@hooks/useSortedFilteredClimbs";
import PageLayout from "@layouts/page-layout/page-layout";
import { cn } from "@lib/utils";
import { useClimb } from "@utils/climb/climb-store";
import { useTranslation } from "react-i18next";

function ClimbsPage() {
  const { fetchClimbs } = useClimb();
  const { data: climbs, isLoading, isError } = fetchClimbs;
  const {
    sortedAndFilteredClimbs,
    searchTerm,
    setSearchTerm,
    category,
    state,
    country,
    resetFiltersAndSorting,
  } = useSortedFilteredClimbs(climbs ?? []);

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const { t } = useTranslation();
  return (
    <PageLayout
      withFooter
      withSidebar
      pageTitle={t("page-header.all-climbs")}
      sidebarContent={<Filters climbs={climbs ?? []} />}
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
          {isError ? (
            <ClimbErrorStateFallback />
          ) : (
            <ClimbsList
              climbs={sortedAndFilteredClimbs}
              isLoading={isLoading}
            />
          )}
        </section>
      </section>
    </PageLayout>
  );
}

export default ClimbsPage;
