import { useToast } from "@components/common/toast/use-toast";
import { Tooltip } from "@components/common/tooltip/tooltip";
import { IconPlaylistAdd, IconPlaylistX } from "@tabler/icons-react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Activity } from "@type-definitions/Activity";
import { useActivity } from "@utils/activity/activity-store";
import { useUser } from "@utils/user/user-store";
import { useCallback } from "react";
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
    },
  });
  const { mutateAsync: removeActivityFromUsersBucketList } = useMutation({
    mutationFn: removeActivityFromBucketList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bucketListActivities"],
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
      toast({
        title: "Activity added to your bucket list",
        description: "You can view your bucket list in your profile",
        variant: "success",
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
      toast({
        title: "Activity removed from your bucket list",
        description: "You can view your bucket list in your profile",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {hasUserMarkedActivityAsBucketList ? (
        <Tooltip content="Remove from Bucket List" side="top" align="end">
          <IconPlaylistX
            className="cursor-pointer text-accent/80 hover:text-accent"
            onClick={handleRemoveFromBucketList}
            stroke={2}
            size={34}
          />
        </Tooltip>
      ) : (
        <Tooltip content="Add to Bucket List" side="top">
          <IconPlaylistAdd
            className="cursor-pointer text-primary hover:text-primary/60"
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
