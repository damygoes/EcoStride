import { useToast } from "@components/common/toast/use-toast";
import { Tooltip } from "@components/common/tooltip/tooltip";
import { IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Activity } from "@type-definitions/Activity";
import { useActivity } from "@utils/activity/activity-store";
import { useUser } from "@utils/user/user-store";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

type ActivityDetailsHeaderLikeCounterProps = {
  selectedActivity: Activity;
};

type Like = {
  userId: string;
  activityId: string;
  likedAt: string;
  id: string;
};

function ActivityDetailsHeaderLikeCounter({
  selectedActivity,
}: ActivityDetailsHeaderLikeCounterProps) {
  const { t } = useTranslation();
  const queryClient = new QueryClient();
  const { user, removeActivityFromLikedList } = useUser();
  const navigate = useNavigate();
  const currentURL = useLocation();
  const { effectUserActionOnActivity, getActivityLikesCount } = useActivity();
  const { toast } = useToast();
  const slug = selectedActivity.slug;

  const {
    data: likeCount = [],
    // isLoading: isCommentsLoading,
    // isError: isCommentsError,
  } = useQuery({
    queryKey: ["activityLikeCount", selectedActivity?.slug],
    queryFn: () => getActivityLikesCount(selectedActivity.slug || null),
    enabled: !!selectedActivity,
    refetchInterval: 1000 * 2, // 2 seconds
  });

  const { mutateAsync: addActivityToUsersLikedList } = useMutation({
    mutationFn: effectUserActionOnActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedActivities"] });
      toast({
        title: `${t("activity-details-header-toast.activity-liked")}`,
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

  const { mutateAsync: removeActivityFromUsersLikedList } = useMutation({
    mutationFn: removeActivityFromLikedList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedActivities"] });
      toast({
        title: `${t("activity-details-header-toast.activity-unliked")}`,
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

  const activityLikeCount = useMemo(() => {
    return likeCount ? likeCount.length : 0;
  }, [likeCount]);

  const handleLikeActivity = async () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      await addActivityToUsersLikedList({
        activitySlug: slug,
        action: "like",
      });
    }
  };

  const handleUnlikeActivity = async () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      const userId = user?.id ?? "";
      await removeActivityFromUsersLikedList({
        activitySlug: slug,
        userId,
      });
    }
  };

  const checkIfUserLikedActivity = useCallback(() => {
    return likeCount.some((like: Like) => like.userId === user?.id);
  }, [user?.id, likeCount]);

  const hasUserLikedActivity = useMemo(() => {
    return checkIfUserLikedActivity();
  }, [checkIfUserLikedActivity]);

  return (
    <div className="flex items-end justify-start gap-1">
      {hasUserLikedActivity ? (
        <Tooltip
          content={t("activity-details-header-tooltip.unlike-activity")}
          side="top"
          align="center"
        >
          <IconThumbUpFilled
            className="cursor-pointer text-accent/70 hover:text-accent"
            onClick={handleUnlikeActivity}
            size={28}
          />
        </Tooltip>
      ) : (
        <Tooltip
          content={t("activity-details-header-tooltip.like-activity")}
          side="top"
          align="end"
        >
          <IconThumbUp
            className="cursor-pointer text-primary/70 hover:text-primary"
            onClick={handleLikeActivity}
            size={28}
          />
        </Tooltip>
      )}
      <p className="text-sm font-medium">{activityLikeCount}</p>
    </div>
  );
}

export default ActivityDetailsHeaderLikeCounter;
