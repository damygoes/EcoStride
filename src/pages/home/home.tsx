import { LocationContext } from "@context/location-provider/location-provider";
import HomePageScreen from "@features/home/screen/homepage-screen";
import { useContext } from "react";

function Home() {
  const location = useContext(LocationContext);

  if (!location) {
    return <div>Location loading...</div>;
  }

  return <HomePageScreen />;
}

export default Home;
