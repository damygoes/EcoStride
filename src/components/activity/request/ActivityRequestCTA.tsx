import LoginModal from "@components/activity/request/ActivityRequestModal";
import { Button } from "@components/ui/button/button";
import { useActivityRequestModalStore } from "@utils/activity/activity-request-modal-store";
import { useUser } from "@utils/user/user-store";
import { useLocation, useNavigate } from "react-router-dom";

function ActivityRequestCTA() {
  const navigate = useNavigate();
  const currentURL = useLocation();
  const { user } = useUser();

  const { isActivityRequestModalOpen, setIsActivityRequestModalOpen } =
    useActivityRequestModalStore();

  const handleActivityRequestModalOpen = () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      setIsActivityRequestModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between w-full gap-3 p-3 rounded-md shadow-sm text-text-color bg-background">
      {user?.role !== "ADMIN" && (
        <h5 className="text-sm font-light text-wrap">
          Is there an activity you would like us to add?
        </h5>
      )}
      <Button
        className="w-full"
        variant="gradient"
        onClick={handleActivityRequestModalOpen}
      >
        {user?.role === "ADMIN" ? "Add Activity" : "Submit a Request"}
      </Button>
      {isActivityRequestModalOpen && <LoginModal />}
    </div>
  );
}

export default ActivityRequestCTA;
