import NetworkStatusNotifier from "@components/common/network-status-notifier/network-status-notifier";
import { Toaster } from "@components/common/toast/toaster";
import { ThemeProvider } from "@context/theme-provider/theme-provider";
import LocationProvider from "@context/user-location-provider/UserLocationProvider";
import { router } from "@routes/router";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <Suspense fallback={<div>Loading ... </div>}>
      <Toaster />
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
