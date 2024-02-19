import { useToast } from "@components/common/toast/use-toast";
import { Tooltip } from "@components/common/tooltip/tooltip";
import { IconCircleCheck, IconCircleCheckFilled } from "@tabler/icons-react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Activity } from "@type-definitions/Activity";
import { useActivity } from "@utils/activity/activity-store";
import { useUser } from "@utils/user/user-store";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ActivityDetailsHeaderMarkAsRiddenIconManagerProps = {
  selectedActivity: Activity;
};

export type DoneActivity = {
  userId: string;
  activityId: string;
  doneAt: string;
  id: string;
};

function ActivityDetailsHeaderMarkAsRiddenIconManager({
  selectedActivity,
}: ActivityDetailsHeaderMarkAsRiddenIconManagerProps) {
  const queryClient = new QueryClient();
  const { user, removeActivityFromCompletedList } = useUser();
  const navigate = useNavigate();
  const currentURL = useLocation();
  const { fetchAllDoneActivities, effectUserActionOnActivity } = useActivity();
  const { toast } = useToast();

  const {
    data: doneActivities,
    // isLoading: isCommentsLoading,
    // isError: isCommentsError,
  } = useQuery({
    queryKey: ["allDoneActivities"],
    queryFn: () => fetchAllDoneActivities(),
    refetchInterval: 1000 * 2, // 2 seconds
  });

  const markedAsRidden = useCallback(() => {
    return doneActivities?.some(
      (activity) =>
        activity.userId === user?.id &&
        activity.activityId === selectedActivity.id,
    );
  }, [doneActivities, user, selectedActivity]);

  const hasUserMarkedActivityAsRidden = markedAsRidden();

  const { mutateAsync: addActivityToUsersCompletedActivitiestListMutation } =
    useMutation({
      mutationFn: effectUserActionOnActivity,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["completedActivities"] });
      },
    });
  const { mutateAsync: removeActivityFromUsersCompletedActivitiesList } =
    useMutation({
      mutationFn: removeActivityFromCompletedList,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["completedActivities"],
        });
      },
    });

  const handleMarkAsRidden = async () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      await addActivityToUsersCompletedActivitiestListMutation({
        activitySlug: selectedActivity.slug,
        action: "alreadyCompleted",
      });
      toast({
        title: "Activity marked as completed",
        description:
          "You can view all your completed activities in your profile",
        variant: "success",
      });
    }
  };

  const handleUnMarkAsRidden = async () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      await removeActivityFromUsersCompletedActivitiesList({
        activitySlug: selectedActivity.slug,
        userId: user?.id ?? "",
      });
      toast({
        title: "Activity removed from your completed activities",
        description:
          "You can view all your completed activities in your profile",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {hasUserMarkedActivityAsRidden ? (
        <Tooltip content="Mark as not completed" side="top" align="end">
          <IconCircleCheckFilled
            className="cursor-pointer text-accent/80 hover:text-accent"
            onClick={handleUnMarkAsRidden}
            stroke={2}
            size={26}
          />
        </Tooltip>
      ) : (
        <Tooltip content="Mark as completed" side="top" align="end">
          <IconCircleCheck
            className="cursor-pointer text-primary hover:text-primary/60"
            onClick={handleMarkAsRidden}
            stroke={2}
            size={26}
          />
        </Tooltip>
      )}
    </>
  );
}

export default ActivityDetailsHeaderMarkAsRiddenIconManager;
