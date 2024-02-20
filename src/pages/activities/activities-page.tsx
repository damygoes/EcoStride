import ActivityDeleteConfirmation from "@components/activity/activity-delete-confirmation/ActivityDeleteConfirmation";
import ActivityPageSideBarContent from "@components/activity/activity/ActivityPageSideBarContent";
import ActivitiesList from "@components/activity/list/ActivitiesList";
import ClimbViewSelector from "@components/activity/view-selector/ActivityViewSelector";
import Badge from "@components/common/badge/badge";
import ErrorFallback from "@components/common/error-fallback/error-fallback";
import SearchInput from "@components/common/search-input/search-input";
import { useSortedFilteredActivities } from "@hooks/useSortedFilteredActivities";
import PageLayout from "@layouts/page-layout/page-layout";
import { cn } from "@lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useActivityActions } from "@utils/activity/activity-actions-store";
import { useActivity } from "@utils/activity/activity-store";
import { useTranslation } from "react-i18next";

function ActivitiesPage() {
  const { fetchActivities } = useActivity();
  const { isActivityDeleteModalOpen } = useActivityActions();
  const {
    data: activities,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchActivities(),
    refetchInterval: 1000 * 60 * 1, // 1 minute
  });
  const {
    sortedAndFilteredActivities,
    searchTerm,
    setSearchTerm,
    climbCategory,
    state,
    country,
    resetFiltersAndSorting,
  } = useSortedFilteredActivities(activities ?? []);

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const { t } = useTranslation();
  return (
    <PageLayout
      withFooter
      withSidebar
      pageTitle={t("page-header.all-activities")}
      sidebarContent={<ActivityPageSideBarContent />}
    >
      <section className="flex flex-col items-start justify-start h-full gap-4 overflow-hidden">
        <header
          className={cn(
            "flex flex-col-reverse w-full rounded-md justify-start items-start p-2 gap-4 md:flex-row md:justify-between md:items-center md:h-[10%] bg-gradient-to-r from-white via-white to-primary dark:from-secondary dark:via-primary dark:to-white",
            {
              "md:justify-end": !climbCategory || !state || !country,
            },
          )}
        >
          {(climbCategory || state || country) && (
            <div className="flex items-center justify-start w-full h-full gap-3 p-3 overflow-x-auto overflow-y-hidden bg-inherit md:flex-1">
              {climbCategory && <Badge>{climbCategory}</Badge>}
              {state && <Badge>{state}</Badge>}
              {country && <Badge>{country}</Badge>}
              <span
                className="text-sm italic cursor-pointer text-accent hover:underline hover:underline-offset-1"
                onClick={resetFiltersAndSorting}
              >
                {t("activities-page-sidebar.clear-filters")}
              </span>
            </div>
          )}
          <div className="w-full md:w-1/3">
            <SearchInput
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder={t("activities-page.searchbar-placeholder")}
            />
          </div>
          <ClimbViewSelector />
        </header>
        <section className="w-full h-full px-5 py-3 overflow-x-hidden overflow-y-auto md:flex-1 scrollbar-hide">
          {isError ? (
            <ErrorFallback
              withAction
              actionText={t("error-fallback.back-to-home")}
              redirectUrl="/"
            />
          ) : (
            <ActivitiesList
              activities={sortedAndFilteredActivities}
              isLoading={isLoading}
            />
          )}
          {isActivityDeleteModalOpen && <ActivityDeleteConfirmation />}
        </section>
      </section>
    </PageLayout>
  );
}

export default ActivitiesPage;
