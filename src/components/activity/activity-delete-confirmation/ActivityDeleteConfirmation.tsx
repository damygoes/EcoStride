import SpringModal from "@components/common/modal/spring-modal";
import { Button } from "@components/ui/button/button";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useActivityActions } from "@utils/activity/activity-actions-store";
import { useActivityForm } from "@utils/activity/activity-form-store";
import { useActivity } from "@utils/activity/activity-store";

function ActivityDeleteConfirmation() {
  const queryClient = new QueryClient();
  const { deleteActivity } = useActivity();
  const { isActivityDeleteModalOpen, setIsActivityDeleteModalOpen } =
    useActivityActions();
  const { existingActivity, resetExistingActivity } = useActivityForm();

  const { mutateAsync: deleteActivityMutation } = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
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
      className="flex flex-col items-center justify-center h-56 max-w-md gap-10 px-6 overflow-hidden text-text-color"
    >
      <h3 className="text-2xl text-center">
        Are you sure you want to delete this activity?
      </h3>
      <div className="flex items-center justify-between w-full gap-4">
        <Button
          className="w-full"
          variant="primary"
          onClick={handleCancelDeleteActivity}
        >
          No
        </Button>
        <Button
          className="w-full"
          variant="error"
          onClick={handleConfirmlDeleteActivity}
        >
          Yes
        </Button>
      </div>
    </SpringModal>
  );
}

export default ActivityDeleteConfirmation;
