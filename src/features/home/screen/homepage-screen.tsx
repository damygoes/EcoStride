import { LocationContext } from "@context/location-provider/location-provider";
import ClimbsList from "@features/climb/components/climbs-list";
import FiltersScreen from "@features/filters/screen/filters-screen";
import PageLayout from "@layouts/page-layout/page-layout";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "../scenes/hero-section";

function HomePageScreen() {
  const location = useContext(LocationContext);
  const { t } = useTranslation();
  return (
    <PageLayout
      withFooter
      withSidebar
      pageTitle={t("page-header.nearby-climbs")}
      sidebarContent={<FiltersScreen />}
    >
      <section className="w-full h-full overflow-x-hidden overflow-y-auto">
        <HeroSection />
        <div className="px-8 py-4 space-y-6">
          <h3 className="text-xs font-medium text-accent md:text-sm">
            {location
              ? `${t("hero.location-found")} ${location.city}, ${
                  location.state
                }`
              : `${t("hero.location-not-found")}`}
          </h3>
          <ClimbsList />
        </div>
      </section>
    </PageLayout>
  );
}

export default HomePageScreen;
