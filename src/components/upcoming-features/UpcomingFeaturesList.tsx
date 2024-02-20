import {
  UpcomingFeatureTranslationKeys,
  upcomingFeatures,
} from "@lib/constants";
import { useTranslation } from "react-i18next";

function UpcomingFeaturesList() {
  const { t } = useTranslation();
  return (
    <ul className="flex flex-col gap-4 pr-3 overflow-auto scrollbar-hide">
      {upcomingFeatures.map((feature) => (
        <li
          key={feature.id}
          className="flex flex-col gap-1 p-3 transition-colors duration-300 ease-in-out rounded-md bg-accent/10 hover:bg-accent/20"
        >
          <div className="flex items-start justify-start gap-2">
            <span className="text-sm">{feature.icon}</span>
            <h4 className="text-sm font-semibold text-text-color">
              {t(feature.titleKey as UpcomingFeatureTranslationKeys)}
            </h4>
          </div>
          <p className="text-sm font-light text-text-color">
            {t(feature.descriptionKey as UpcomingFeatureTranslationKeys)}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default UpcomingFeaturesList;
