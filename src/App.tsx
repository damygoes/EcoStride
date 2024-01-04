import { ThemeProvider } from "@context/theme-provider/theme-provider";
import { Suspense, lazy } from "react";

const LazyComponent = lazy(async () => {
  return import("./components/test-component");
});

const App = () => {
  return (
    <Suspense fallback={<div>Loading ... </div>}>
      <ThemeProvider>
        <LazyComponent />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
