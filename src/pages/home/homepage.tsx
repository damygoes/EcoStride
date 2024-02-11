import ActivitiesList from "@components/activity/list/ActivitiesList";
import ErrorFallback from "@components/common/error-fallback/error-fallback";
import HeroSection from "@components/hero/HeroSection";
import PageLayout from "@layouts/page-layout/page-layout";
import { useQuery } from "@tanstack/react-query";
import { useActivity } from "@utils/activity/activity-store";
import { useUser } from "@utils/user/user-store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function HomePageScreen() {
  // const location = useContext(UserLocationContext);
  const { t } = useTranslation();
  const { userGeolocationData } = useUser();
  const usersCity = userGeolocationData?.city ?? "";
  const { fetchActivities } = useActivity();
  useState(false);
  const [shoudFetchAllActivities, setShouldFetchAllActivities] =
    useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  // First query: fetch activities based on usersCity
  const {
    data: nearbyActivities,
    isLoading: isLoadingNearbyActivities,
    isError: isErrorNearbyActivities,
  } = useQuery({
    queryKey: ["nearby-activities", usersCity],
    queryFn: () => fetchActivities(usersCity),
    enabled: !!usersCity,
    refetchInterval: 1000 * 60 * 1, // 1 minute
  });

  useEffect(() => {
    if (nearbyActivities && nearbyActivities.length === 0) {
      setTimeout(() => {
        setShouldFetchAllActivities(true);
      }, 3000);
    }
  }, [nearbyActivities]);

  // Second query: fetch all activities if no activities are found in usersCity
  const {
    data: allActivities,
    isLoading: isLoadingAllActivities,
    isError: isErrorAllActivities,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchActivities(),
    enabled: shoudFetchAllActivities,
    refetchInterval: 1000 * 60 * 1, // 1 minute
  });

  useEffect(() => {
    if (allActivities && allActivities.length > 0) {
      setShouldFetchAllActivities(false);
    }
  }, [allActivities, shoudFetchAllActivities]);

  useEffect(() => {
    if (userGeolocationData?.loading && !usersCity) {
      setLocationMessage(t("hero.location-loading"));
    }
    if (
      userGeolocationData?.error &&
      userGeolocationData?.error === "User denied the request for Geolocation."
    ) {
      setLocationMessage(t("hero.location-denied"));
    }
    if (!userGeolocationData?.loading && !userGeolocationData?.error === null) {
      setLocationMessage(t(`hero.location-not-found`));
    }
    if (usersCity && nearbyActivities && nearbyActivities.length === 0) {
      setLocationMessage(
        `${t("hero.activity-not-found-near-location")} ${usersCity}. ${t("hero.location-all")}`,
      );
    }
    if (usersCity && nearbyActivities && nearbyActivities.length > 0) {
      setLocationMessage(`${t("hero.location-found-nearby")} ${usersCity}`);
    }
  }, [userGeolocationData, usersCity, nearbyActivities, t]);

  return (
    <PageLayout
      withFooter
      withSidebar
      pageTitle={
        userGeolocationData?.cityAndState
          ? t("page-header.nearby-activities")
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
          {isLoadingNearbyActivities && (
            <div>Finding Activities near {usersCity} ...</div>
          )}
          {isLoadingAllActivities && <div>Loading all activities ...</div>}
          {(isErrorAllActivities || isErrorNearbyActivities) && (
            <ErrorFallback />
          )}
          {nearbyActivities && nearbyActivities.length > 0 ? (
            <ActivitiesList activities={nearbyActivities} />
          ) : allActivities && allActivities.length > 0 ? (
            <ActivitiesList activities={allActivities} />
          ) : null}
        </div>
      </section>
    </PageLayout>
  );
}

export default HomePageScreen;
