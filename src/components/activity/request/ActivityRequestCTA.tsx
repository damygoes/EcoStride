import ActivityRequestModal from "@components/activity/request/ActivityRequestModal";
import { Button } from "@components/ui/button/button";
import { useActivityActions } from "@utils/activity/activity-actions-store";
import { useUser } from "@utils/user/user-store";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

function ActivityRequestCTA() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentURL = useLocation();
  const { user } = useUser();

  const { isActivityRequestModalOpen, setIsActivityRequestModalOpen } =
    useActivityActions();

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
          {t("activities-page-sidebar-cta.text")}
        </h5>
      )}
      <Button
        className="w-full"
        variant="gradient"
        onClick={handleActivityRequestModalOpen}
      >
        {user?.role === "ADMIN"
          ? `${t("activities-page-sidebar-cta.add-activity")}`
          : `${t("activities-page-sidebar-cta.request-activity")}`}
      </Button>
      {isActivityRequestModalOpen && <ActivityRequestModal />}
    </div>
  );
}

export default ActivityRequestCTA;
