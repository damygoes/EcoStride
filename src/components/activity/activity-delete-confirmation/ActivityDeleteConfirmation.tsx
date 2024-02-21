import SpringModal from "@components/common/modal/spring-modal";
import { useToast } from "@components/common/toast/use-toast";
import { Button } from "@components/ui/button/button";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useActivityActions } from "@utils/activity/activity-actions-store";
import { useActivityForm } from "@utils/activity/activity-form-store";
import { useActivity } from "@utils/activity/activity-store";
import { useTranslation } from "react-i18next";

function ActivityDeleteConfirmation() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = new QueryClient();
  const { deleteActivity } = useActivity();
  const { isActivityDeleteModalOpen, setIsActivityDeleteModalOpen } =
    useActivityActions();
  const { existingActivity, resetExistingActivity } = useActivityForm();

  const { mutateAsync: deleteActivityMutation } = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
      toast({
        title: `${t("activity-delete-modal.activity-deleted-toast")}`,
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: `${t("activity-delete-modal.activity-deleted-error-toast")}`,
        variant: "destructive",
      });
    },
  });

  const handleCancelDeleteActivity = () => {
    resetExistingActivity;
    setIsActivityDeleteModalOpen(false);
  };

  const handleConfirmlDeleteActivity = async () => {
    if (!existingActivity) return;
    await deleteActivityMutation(existingActivity.slug);
    resetExistingActivity;
    setIsActivityDeleteModalOpen(false);
  };

  return (
    <SpringModal
      isOpen={isActivityDeleteModalOpen}
      setIsOpen={() => setIsActivityDeleteModalOpen(false)}
      shouldCloseOnOutsideClick={false}
      className="flex flex-col items-center justify-center h-56 max-w-md gap-10 px-6 overflow-hidden text-white bg-secondary"
    >
      <h3 className="text-2xl text-center">
        {t("activity-delete-modal.description")}
      </h3>
      <div className="flex items-center justify-between w-full gap-4">
        <Button
          className="w-full"
          variant="primary"
          onClick={handleCancelDeleteActivity}
        >
          {t("activity-delete-modal.cancel-button")}
        </Button>
        <Button
          className="w-full"
          variant="error"
          onClick={handleConfirmlDeleteActivity}
        >
          {t("activity-delete-modal.delete-button")}
        </Button>
      </div>
    </SpringModal>
  );
}

export default ActivityDeleteConfirmation;
