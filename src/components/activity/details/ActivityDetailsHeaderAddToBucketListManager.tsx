import { useToast } from "@components/common/toast/use-toast";
import { Tooltip } from "@components/common/tooltip/tooltip";
import { IconPlaylistAdd, IconPlaylistX } from "@tabler/icons-react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Activity } from "@type-definitions/Activity";
import { useActivity } from "@utils/activity/activity-store";
import { useUser } from "@utils/user/user-store";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

type ActivityDetailsHeaderAddToBucketListManagerProps = {
  selectedActivity: Activity;
};

export type BucketListActivity = {
  userId: string;
  activityId: string;
  doneAt: string;
  id: string;
};

function ActivityDetailsHeaderAddToBucketListManager({
  selectedActivity,
}: ActivityDetailsHeaderAddToBucketListManagerProps) {
  const { t } = useTranslation();
  const queryClient = new QueryClient();
  const { user, removeActivityFromBucketList } = useUser();
  const navigate = useNavigate();
  const currentURL = useLocation();
  const { effectUserActionOnActivity, fetchAllBucketListActivities } =
    useActivity();
  const { toast } = useToast();

  const {
    data: allBucketListActivities,
    // isLoading: isCommentsLoading,
    // isError: isCommentsError,
  } = useQuery({
    queryKey: ["allBucketListActivities"],
    queryFn: () => fetchAllBucketListActivities(),
    refetchInterval: 1000 * 2, // 2 seconds
  });

  const markedAsBucketList = useCallback(() => {
    return allBucketListActivities?.some(
      (activity) =>
        activity.userId === user?.id &&
        activity.activityId === selectedActivity.id,
    );
  }, [allBucketListActivities, user, selectedActivity]);

  const hasUserMarkedActivityAsBucketList = markedAsBucketList();

  const { mutateAsync: addActivityToUsersBucketListMutation } = useMutation({
    mutationFn: effectUserActionOnActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bucketListActivities"] });
      toast({
        title: `${t("activity-details-header-toast.activity-added-to-bucket-list")}`,
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: `${t("activity-details-header-toast.error-toast")}`,
        variant: "destructive",
      });
    },
  });
  const { mutateAsync: removeActivityFromUsersBucketList } = useMutation({
    mutationFn: removeActivityFromBucketList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bucketListActivities"],
      });
      toast({
        title: `${t("activity-details-header-toast.activity-removed-from-bucket-list")}`,
        variant: "destructive",
      });
    },
    onError: () => {
      toast({
        title: `${t("activity-details-header-toast.error-toast")}`,
        variant: "destructive",
      });
    },
  });

  const handleAddToBucketList = async () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      await addActivityToUsersBucketListMutation({
        activitySlug: selectedActivity.slug,
        action: "addToBucketList",
      });
    }
  };

  const handleRemoveFromBucketList = async () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      await removeActivityFromUsersBucketList({
        activitySlug: selectedActivity.slug,
        userId: user?.id ?? "",
      });
    }
  };

  return (
    <>
      {hasUserMarkedActivityAsBucketList ? (
        <Tooltip
          content={t("activity-details-header-tooltip.remove-from-bucket-list")}
          side="top"
          align="end"
        >
          <IconPlaylistX
            className="cursor-pointer text-accent/70 hover:text-accent"
            onClick={handleRemoveFromBucketList}
            stroke={2}
            size={34}
          />
        </Tooltip>
      ) : (
        <Tooltip
          content={t("activity-details-header-tooltip.add-to-bucket-list")}
          side="top"
        >
          <IconPlaylistAdd
            className="cursor-pointer text-primary/70 hover:text-primary"
            onClick={handleAddToBucketList}
            stroke={2}
            size={34}
          />
        </Tooltip>
      )}
    </>
  );
}

export default ActivityDetailsHeaderAddToBucketListManager;
