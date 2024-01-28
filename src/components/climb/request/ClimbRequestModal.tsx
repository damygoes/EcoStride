import SpringModal from "@components/common/modal/spring-modal";
import { useClimbRequestModalStore } from "@utils/climb/climb-request-modal-store";
import ClimbRequestForm from "../form/ClimbForm";

function ClimbRequestModal() {
  const { isClimbRequestModalOpen, setIsClimbRequestModalOpen } =
    useClimbRequestModalStore();
  return (
    <SpringModal
      isOpen={isClimbRequestModalOpen}
      setIsOpen={() => setIsClimbRequestModalOpen(false)}
    >
      <ClimbRequestForm />
    </SpringModal>
  );
}

export default ClimbRequestModal;
