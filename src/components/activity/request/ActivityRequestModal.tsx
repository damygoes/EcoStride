import SpringModal from "@components/common/modal/spring-modal";
import { useActivityRequestModalStore } from "@utils/activity/activity-request-modal-store";
import ActivityForm from "../form/ActivityForm";

function ActivityRequestModal() {
  const { isActivityRequestModalOpen, setIsActivityRequestModalOpen } =
    useActivityRequestModalStore();
  return (
    <SpringModal
      isOpen={isActivityRequestModalOpen}
      setIsOpen={() => setIsActivityRequestModalOpen(false)}
      className="max-w-4xl scrollbar-hide"
    >
      <ActivityForm />
    </SpringModal>
  );
}

export default ActivityRequestModal;
