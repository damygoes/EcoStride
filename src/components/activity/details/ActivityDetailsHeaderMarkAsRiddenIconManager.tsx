import { useToast } from "@components/common/toast/use-toast";
import { Tooltip } from "@components/common/tooltip/tooltip";
import { IconCircleCheck, IconCircleCheckFilled } from "@tabler/icons-react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Activity } from "@type-definitions/Activity";
import { useActivity } from "@utils/activity/activity-store";
import { useUser } from "@utils/user/user-store";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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

  const { mutateAsync: addActivityToUsersCompletedActivitiesListMutation } =
    useMutation({
      mutationFn: effectUserActionOnActivity,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["completedActivities"] });
        toast({
          title: `${t("activity-details-header-toast.activity-completed")}`,
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
  const { mutateAsync: removeActivityFromUsersCompletedActivitiesList } =
    useMutation({
      mutationFn: removeActivityFromCompletedList,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["completedActivities"],
        });
        toast({
          title: `${t("activity-details-header-toast.activity-uncompleted")}`,
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

  const handleMarkAsRidden = async () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      await addActivityToUsersCompletedActivitiesListMutation({
        activitySlug: selectedActivity.slug,
        action: "alreadyCompleted",
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
    }
  };

  return (
    <>
      {hasUserMarkedActivityAsRidden ? (
        <Tooltip
          content={t("activity-details-header-tooltip.uncomplete-activity")}
          side="top"
          align="end"
        >
          <IconCircleCheckFilled
            className="cursor-pointer text-accent/70 hover:text-accent"
            onClick={handleUnMarkAsRidden}
            stroke={2}
            size={26}
          />
        </Tooltip>
      ) : (
        <Tooltip
          content={t("activity-details-header-tooltip.complete-activity")}
          side="top"
          align="end"
        >
          <IconCircleCheck
            className="cursor-pointer text-primary/70 hover:text-primary"
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
