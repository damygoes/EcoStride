import SpringModal from "@components/common/modal/spring-modal";
import { IconCircleX } from "@tabler/icons-react";
import { useActivityActions } from "@utils/activity/activity-actions-store";
import { useActivityForm } from "@utils/activity/activity-form-store";
import ActivityForm from "../form/ActivityForm";

function ActivityRequestModal() {
  const { isActivityRequestModalOpen, setIsActivityRequestModalOpen } =
    useActivityActions();
  const { resetExistingActivity } = useActivityForm();

  const handleCancelActivityRequest = () => {
    setIsActivityRequestModalOpen(false);
    resetExistingActivity();
  };

  return (
    <SpringModal
      isOpen={isActivityRequestModalOpen}
      setIsOpen={() => setIsActivityRequestModalOpen(false)}
      shouldCloseOnOutsideClick={false}
      className="relative max-w-7xl scrollbar-hide bg-gradient-to-br from-white/80 via-secondary/90 to-secondary"
    >
      <IconCircleX
        className="absolute transition-colors cursor-pointer top-3 right-3 text-text-color/70 hover:text-text-color"
        size={24}
        onClick={handleCancelActivityRequest}
      />
      <ActivityForm />
    </SpringModal>
  );
}

export default ActivityRequestModal;
