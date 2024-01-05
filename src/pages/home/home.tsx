import PageLayout from "@layouts/page-layout/page-layout";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  return (
    <PageLayout>
      <h2>React-i18next + Lazyloading Re-Implemented</h2>
      <p className="text-4xl text-text-color">{t("welcome")}</p>
    </PageLayout>
  );
}

export default Home;
