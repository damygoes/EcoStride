import { useQuery } from "@tanstack/react-query";
import { useActivityCard } from "@utils/activity/activity-card-store";
import { useUser } from "@utils/user/user-store";
import { useEffect } from "react";
import UserProfileActivitiesSectionAndList from "../UserProfileActivitiesSectionAndList";

function UserCompletedActivities() {
  const { user } = useUser();
  const { getUsersCompletedActivities } = useUser();
  const {
    cardType,
    activityCardPageContext,
    setActivityCardPageContext,
    setActivityCardType,
  } = useActivityCard();
  const {
    data: completedActivities,
    // isLoading: isCommentsLoading,
    // isError: isCommentsError,
  } = useQuery({
    queryKey: ["completedActivities"],
    queryFn: () => getUsersCompletedActivities(user?.id ?? ""),
    enabled: !!user?.id,
    refetchInterval: 1000 * 2, // 2 seconds
  });

  useEffect(() => {
    if (activityCardPageContext !== "completedActivities") {
      setActivityCardPageContext("completedActivities");
    }
    if (cardType !== "user-profile") {
      setActivityCardType("user-profile");
    }
  }, [
    activityCardPageContext,
    cardType,
    setActivityCardPageContext,
    setActivityCardType,
  ]);

  return (
    <UserProfileActivitiesSectionAndList
      title="Completed Activities"
      activities={completedActivities ?? []}
      emptyMessage="You haven't completed any activity yet."
    />
  );
}

export default UserCompletedActivities;
