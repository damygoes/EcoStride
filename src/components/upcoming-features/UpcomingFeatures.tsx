import { useTranslation } from "react-i18next";
import UpcomingFeaturesList from "./UpcomingFeaturesList";

function UpcomingFeatures() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full h-full gap-3 p-3">
      <h3 className="text-lg font-semibold text-primary">
        {t("upcoming-features.title")}
      </h3>
      <UpcomingFeaturesList />
    </div>
  );
}

export default UpcomingFeatures;
