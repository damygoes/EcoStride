import { LocationContext } from "@context/location-provider/location-provider";
import ClimbCard from "@features/climb/components/climb-card";
import PageLayout from "@layouts/page-layout/page-layout";
import { climbs } from "@mock/climbs";
import { useContext } from "react";

function Home() {
  const location = useContext(LocationContext);

  if (!location) {
    return <div>Location loading...</div>;
  }

  return (
    <PageLayout withFooter withSidebar pageTitle="nearby climbs">
      <div className="flex w-full space-x-3">
        {climbs.map((climb) => {
          return <ClimbCard key={climb.id} climb={climb} basePath="home" />;
        })}
      </div>
      <div>
        <h1>Your Location</h1>
        {location.error ? (
          <p>Error: {location.error}</p>
        ) : location.latitude && location.longitude ? (
          <p>
            Location: {location.city}, {location.state}, {location.country}
          </p>
        ) : (
          <p>Locating...</p>
        )}
      </div>
    </PageLayout>
  );
}

export default Home;
