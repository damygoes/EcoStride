import FiltersScreen from "@features/filters/screen/filters-screen";
import PageLayout from "@layouts/page-layout/page-layout";
import { useTranslation } from "react-i18next";
import ClimbsList from "../components/climbs-list";

function ClimbsScreen() {
  const { t } = useTranslation();
  return (
    <PageLayout
      withFooter
      withSidebar
      pageTitle={t("page-header.all-climbs")}
      sidebarContent={<FiltersScreen />}
    >
      <section className="flex flex-col items-start justify-start h-full gap-4 overflow-hidden">
        <header className="hidden md:flex md:w-full md:h-[10%] bg-inherit">
          Tags and Sort Section
        </header>
        <section className="w-full h-full px-5 py-3 overflow-x-hidden overflow-y-auto md:flex-1">
          <ClimbsList />
        </section>
      </section>
    </PageLayout>
  );
}

export default ClimbsScreen;
