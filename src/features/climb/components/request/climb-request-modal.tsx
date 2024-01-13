import SpringModal from "@components/common/modal/spring-modal";
import { useClimbRequestModalStore } from "@features/climb/utils/climb-request-modal-store";
import ClimbRequestForm from "../form/climb-form";

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
