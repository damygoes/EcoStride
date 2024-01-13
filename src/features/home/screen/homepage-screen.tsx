import { LocationContext } from "@context/location-provider/location-provider";
import ClimbsList from "@features/climb/components/list/climbs-list";
import { useClimbStore } from "@features/climb/utils/climb-store";
import { useUserStore } from "@features/user/utils/user-store";
import PageLayout from "@layouts/page-layout/page-layout";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CardCarousel from "../scenes/carousel-section";
import HeroSection from "../scenes/hero-section";

function HomePageScreen() {
  const location = useContext(LocationContext);
  const { t } = useTranslation();
  const { userLocation, setUserLocation } = useUserStore();
  const { climbs, setNearbyClimbs, nearbyClimbs } = useClimbStore();

  useEffect(() => {
    if (location && !location.loading && !location.error) {
      setUserLocation(`${location.city}, ${location.state}`);
      const matchingClimbs = climbs.filter(
        (climb) =>
          climb.location.city === location.city &&
          climb.location.state === location.state,
      );
      // Update nearbyClimbs in climb store with the filtered climbs
      setNearbyClimbs(matchingClimbs);
    } else {
      // Reset nearbyClimbs and user location if there's an error or while loading
      setUserLocation(null);
      setNearbyClimbs([]);
    }
  }, [climbs, location, setNearbyClimbs, setUserLocation]);

  /* Define message content outside of the JSX for clarity */
  let locationMessage;
  if (location?.loading) {
    locationMessage = t("hero.location-loading");
  } else if (
    !location?.loading &&
    location?.error === null &&
    nearbyClimbs.length === 0
  ) {
    locationMessage = t("hero.location-not-found");
  } else if (
    location?.error &&
    location?.error === "User denied the request for Geolocation."
  ) {
    locationMessage = t("hero.location-denied");
  } else if (location && !location?.error && !location?.loading) {
    locationMessage = `${t("hero.location-found")} ${userLocation}`;
  }

  return (
    <PageLayout
      withFooter
      withSidebar
      pageTitle={
        userLocation === null
          ? t("page-header.home")
          : t("page-header.nearby-climbs")
      }
      sidebarContent={
        <div className="w-full p-4 space-y-4">Content Coming Soon</div>
      }
    >
      <section className="w-full h-full overflow-x-hidden overflow-y-auto">
        <HeroSection />
        <div className="px-8 py-4 space-y-6">
          <h3 className="text-xs font-medium text-accent md:text-sm">
            {locationMessage}
          </h3>
          {nearbyClimbs.length > 0 ? <CardCarousel /> : null}
          {(!location?.loading && nearbyClimbs.length) === 0 && (
            <ClimbsList climbs={climbs} />
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default HomePageScreen;
