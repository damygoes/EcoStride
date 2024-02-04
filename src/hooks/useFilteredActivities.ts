// hooks/useFilteredActivities.js
import { useQuery } from "@tanstack/react-query";
import { useActivity } from "@utils/activity/activity-store";
import { useMemo } from "react";

type FilterTypes = "city" | "state" | "country" | "category";

type useFilteredActivitiesProps = {
  type: FilterTypes;
  parameter: string;
  excludeId: string;
};

const useFilteredActivities = ({
  type,
  parameter,
  excludeId,
}: useFilteredActivitiesProps) => {
  const activityFetcher = useActivity();
  const fetchFunctionMap = {
    city: activityFetcher.fetchRelatedActivitiesByCity,
    state: activityFetcher.fetchRelatedActivitiesByState,
    country: activityFetcher.fetchRelatedActivitiesByCountry,
    category: activityFetcher.fetchRelatedActivitiesByCategory,
  };

  const query = useQuery({
    queryKey: [`related-by-${type}`, parameter],
    queryFn: () => fetchFunctionMap[type](parameter),
    enabled: !!parameter,
  });

  const filteredActivities = useMemo(() => {
    return query.data?.filter((activity) => activity.id !== excludeId) ?? [];
  }, [query.data, excludeId]);

  return filteredActivities;
};

export default useFilteredActivities;
