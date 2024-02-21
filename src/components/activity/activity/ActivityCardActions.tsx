import { useToast } from "@components/common/toast/use-toast";
import { Tooltip } from "@components/common/tooltip/tooltip";
import { IconEdit, IconTrashX, IconTrashXFilled } from "@tabler/icons-react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Activity } from "@type-definitions/Activity";
import { useActivityActions } from "@utils/activity/activity-actions-store";
import { useActivityCard } from "@utils/activity/activity-card-store";
import { useActivityForm } from "@utils/activity/activity-form-store";
import { useUser } from "@utils/user/user-store";
import { useTranslation } from "react-i18next";

type ActivityCardActionsProps = {
  activity: Activity;
};

function ActivityCardActions({ activity }: ActivityCardActionsProps) {
  const queryClient = new QueryClient();
  const { t } = useTranslation();
  const { cardType, activityCardPageContext } = useActivityCard();
  const {
    user,
    removeActivityFromCompletedList,
    removeActivityFromLikedList,
    removeActivityFromBucketList,
  } = useUser();
  const { setIsActivityRequestModalOpen, setIsActivityDeleteModalOpen } =
    useActivityActions();
  const { setExistingActivity } = useActivityForm();
  const { toast } = useToast();

  const { mutateAsync: removeActivityFromUsersCompletedList } = useMutation({
    mutationFn: removeActivityFromCompletedList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completedActivities"] });
      toast({
        title: `${t("activity-details-header-toast.activity-uncompleted")}`,
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
      queryClient.invalidateQueries({ queryKey: ["bucketListActivities"] });
      toast({
        title: `${t("activity-details-header-toast.activity-removed-from-bucket-list")}`,
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

  const handleEditActivity = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsActivityRequestModalOpen(true);
    setIsActivityDeleteModalOpen(false);
    setExistingActivity(activity);
  };

  const handleDeleteActivity = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setExistingActivity(activity);
    setIsActivityDeleteModalOpen(true);
    setIsActivityRequestModalOpen(false);
  };

  const handleRemoveFromList = async (
    event: React.MouseEvent<SVGSVGElement>,
    slug: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const userId = user?.id ?? "";

    switch (activityCardPageContext) {
      case "completedActivities":
        await removeActivityFromUsersCompletedList({
          activitySlug: slug,
          userId,
        });
        break;
      case "likedActivities":
        await removeActivityFromUsersLikedList({
          activitySlug: slug,
          userId,
        });
        break;
      case "bucketList":
        await removeActivityFromUsersBucketList({
          activitySlug: slug,
          userId,
        });
        break;
      default:
        console.error("Unknown page context");
        toast({
          title: `${t("activity-details-header-toast.error-toast")}`,
          variant: "destructive",
        });
    }
  };

  return (
    <div className="absolute top-0 left-0 z-10 items-center justify-end hidden gap-3 px-3 py-1 group-hover:flex text-text-color rounded-ee-xl bg-background">
      {cardType === "activity" ? (
        <>
          <Tooltip
            content={`${t("activity-card-actions-tooltip.edit-activity")}`}
            side="top"
            align="start"
          >
            <IconEdit
              size={20}
              stroke={1}
              className="hover:text-primary"
              onClick={(event) => handleEditActivity(event)}
            />
          </Tooltip>
          <Tooltip
            content={`${t("activity-card-actions-tooltip.delete-activity")}`}
            side="top"
            align="start"
          >
            <IconTrashXFilled
              size={20}
              stroke={1}
              className="hover:text-accent"
              onClick={(event) => handleDeleteActivity(event)}
            />
          </Tooltip>
        </>
      ) : (
        <Tooltip
          content={`${t("activity-card-actions-tooltip.remove-from-list")}`}
          side="right"
        >
          <IconTrashX
            size={20}
            stroke={1}
            className="hover:text-accent"
            onClick={(event) =>
              handleRemoveFromList(event, activity.slug as string)
            }
          />
        </Tooltip>
      )}
    </div>
  );
}

export default ActivityCardActions;
