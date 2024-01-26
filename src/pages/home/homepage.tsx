import ClimbsCardCarousel from "@components/climb/carousel/ClimbsCardCarousel";
import ClimbsList from "@components/climb/list/ClimbsList";
import HeroSection from "@components/hero/HeroSection";
import { LocationContext } from "@context/location-provider/location-provider";
import PageLayout from "@layouts/page-layout/page-layout";
import { useQuery } from "@tanstack/react-query";
import { Climb } from "@type-definitions/Climb";
import { useClimb } from "@utils/climb/climb-store";
import { useUserStore } from "@utils/user/user-store";
import { useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

function HomePageScreen() {
  const location = useContext(LocationContext);
  const { t } = useTranslation();
  const { userLocation, setUserLocation } = useUserStore();
  const { fetchClimbs, setNearbyClimbs, nearbyClimbs } = useClimb();
  const { isLoading, data } = useQuery({
    queryKey: ["climbs"],
    queryFn: fetchClimbs,
  });

  console.log("data", data);

  const climbs: Climb[] = useMemo(() => data ?? [], [data]);

  useEffect(() => {
    if (location && !location.loading && !location.error) {
      setUserLocation(`${location.city}, ${location.state}`);
      const matchingClimbs = climbs.filter(
        (climb: Climb) =>
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

  if (!location) {
    return <div>Location loading...</div>;
  }

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
          {nearbyClimbs.length > 0 ? <ClimbsCardCarousel /> : null}
          {(!location?.loading && nearbyClimbs.length) === 0 && (
            <ClimbsList climbs={climbs} isLoading={isLoading} />
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default HomePageScreen;
