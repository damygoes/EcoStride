import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NotFoundFallback() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8 px-6 py-3 overflow-hidden rounded-md shadow-sm md:gap-3 md:p-12 bg-background">
      <div className="flex flex-col items-start justify-start gap-3 px-5 md:px-24 md:py-8">
        <h5 className="text-xl font-semibold text-text-color">
          {t("not-found.title-one")}
        </h5>
        <p className="text-sm font-light text-text-color/80 text-balance">
          {t("not-found.description-one")}
        </p>
      </div>
      <div className="flex flex-col items-start justify-start gap-3 px-5 md:px-24 md:py-8">
        <h5 className="text-xl font-semibold text-text-color">
          {t("not-found.title-two")}
        </h5>
        <p className="text-sm font-light text-text-color/80 text-balance">
          {t("not-found.description-two")}
        </p>
      </div>
      <div className="flex items-center justify-start w-full px-5 md:px-24 md:py-8">
        <Link
          to="/activities"
          className="text-base font-semibold text-accent/80 hover:text-accent"
        >
          {t("not-found.guide-link")}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundFallback;
