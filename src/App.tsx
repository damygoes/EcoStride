import NetworkStatusNotifier from "@components/common/network-status-notifier/network-status-notifier";
import LocationProvider from "@context/location-provider/location-provider";
import { ThemeProvider } from "@context/theme-provider/theme-provider";
import { router } from "@routes/router";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <Suspense fallback={<div>Loading ... </div>}>
      <ThemeProvider>
        <LocationProvider>
          <NetworkStatusNotifier />
          <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </LocationProvider>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
