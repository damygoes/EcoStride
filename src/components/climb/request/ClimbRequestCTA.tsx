import LoginModal from "@components/climb/request/ClimbRequestModal";
import { Button } from "@components/ui/button/button";
import { useClimbRequestModalStore } from "@utils/climb/climb-request-modal-store";
import { useUser } from "@utils/user/user-store";
import { useLocation, useNavigate } from "react-router-dom";

function ClimbRequestCTA() {
  const navigate = useNavigate();
  const currentURL = useLocation();
  const { user } = useUser();
  const { isClimbRequestModalOpen, setIsClimbRequestModalOpen } =
    useClimbRequestModalStore();

  const handleClimbRequestModalOpen = () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      setIsClimbRequestModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between w-full gap-3 p-3 rounded-md shadow-sm text-text-color bg-background">
      <h5 className="text-sm font-light text-wrap">
        Is there a climb you would like us to add?
      </h5>
      <Button
        className="w-full"
        variant="gradient"
        onClick={handleClimbRequestModalOpen}
      >
        Submit a Request
      </Button>
      {isClimbRequestModalOpen && <LoginModal />}
    </div>
  );
}

export default ClimbRequestCTA;
