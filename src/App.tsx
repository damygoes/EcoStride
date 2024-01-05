import NetworkStatusNotifier from "@components/common/network-status-notifier/network-status-notifier";
import { ThemeProvider } from "@context/theme-provider/theme-provider";
import { router } from "@routes/router";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <Suspense fallback={<div>Loading ... </div>}>
      <ThemeProvider>
        <NetworkStatusNotifier />
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
