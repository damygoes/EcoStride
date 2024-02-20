import { useQuery } from "@tanstack/react-query";
import { useActivityCard } from "@utils/activity/activity-card-store";
import { useUser } from "@utils/user/user-store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import UserProfileActivitiesSectionAndList from "../UserProfileActivitiesSectionAndList";

function UserBucketList() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { getUsersBucketList } = useUser();
  const {
    cardType,
    activityCardPageContext,
    setActivityCardPageContext,
    setActivityCardType,
  } = useActivityCard();
  const {
    data: bucketListActivities,
    // isLoading: isCommentsLoading,
    // isError: isCommentsError,
  } = useQuery({
    queryKey: ["bucketListActivities"],
    queryFn: () => getUsersBucketList(user?.id ?? ""),
    enabled: !!user?.id,
    refetchInterval: 1000 * 2, // 2 seconds
  });

  useEffect(() => {
    if (activityCardPageContext !== "bucketList") {
      setActivityCardPageContext("bucketList");
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
      title={t("user-bucket-list-page.title")}
      activities={bucketListActivities ?? []}
      emptyMessage={t("user-bucket-list-page.no-activities")}
    />
  );
}

export default UserBucketList;
