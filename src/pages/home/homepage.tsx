import ClimbsCardCarousel from "@components/climb/carousel/ClimbsCardCarousel";
import ClimbErrorStateFallback from "@components/climb/climb-error-state-fallback/ClimbErrorStateFallback";
import ClimbsList from "@components/climb/list/ClimbsList";
import HeroSection from "@components/hero/HeroSection";
import PageLayout from "@layouts/page-layout/page-layout";
import { useClimb } from "@utils/climb/climb-store";
import { useUser } from "@utils/user/user-store";
import { useTranslation } from "react-i18next";

function HomePageScreen() {
  // const location = useContext(UserLocationContext);
  const { t } = useTranslation();
  const { userGeolocationData } = useUser();
  const { fetchClimbs } = useClimb({
    query: {
      city: userGeolocationData?.city ?? "",
    },
  });
  const { data: climbs, isLoading, isError } = fetchClimbs;

  /* Define message content outside of the JSX for clarity */
  let locationMessage;
  if (userGeolocationData?.loading) {
    locationMessage = t("hero.location-loading");
  } else if (
    userGeolocationData?.error &&
    userGeolocationData?.error === "User denied the request for Geolocation."
  ) {
    locationMessage = t("hero.location-denied");
  } else if (
    !userGeolocationData?.loading &&
    !userGeolocationData?.error === null
  ) {
    locationMessage = t("hero.location-not-found");
  } else if (
    userGeolocationData &&
    !userGeolocationData?.error &&
    !userGeolocationData?.loading
  ) {
    locationMessage = `${t("hero.location-found")} ${userGeolocationData?.cityAndState}`;
  }

  // Conditional checks to determine what to render
  const shouldShowClimbsCardCarousel =
    userGeolocationData?.city &&
    !userGeolocationData.loading &&
    climbs &&
    climbs?.length > 0;
  const shouldShowClimbsList =
    userGeolocationData.city === null &&
    !userGeolocationData.loading &&
    climbs &&
    climbs?.length > 0;

  return (
    <PageLayout
      withFooter
      withSidebar
      pageTitle={
        userGeolocationData?.cityAndState
          ? t("page-header.nearby-climbs")
          : t("page-header.home")
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
          {isError && <ClimbErrorStateFallback />}
          {shouldShowClimbsCardCarousel && (
            <ClimbsCardCarousel climbs={climbs} />
          )}
          {shouldShowClimbsList && (
            <ClimbsList climbs={climbs} isLoading={isLoading} />
          )}
        </div>
      </section>
    </PageLayout>
  );
}

export default HomePageScreen;
