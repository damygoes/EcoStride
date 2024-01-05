import PageLayout from "@layouts/page-layout/page-layout";
import { useTranslation } from "react-i18next";

function Climbs() {
  const { t } = useTranslation();
  return (
    <PageLayout withFooter withSidebar pageTitle="all climbs">
      <h2 className="text-4xl text-text-color">{t("welcome")}</h2>
    </PageLayout>
  );
}

export default Climbs;
