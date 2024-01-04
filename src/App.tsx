import React, { Suspense } from "react";

const LazyComponent = React.lazy(async () => {
  return import("./components/test-component");
});

const App = () => {
  return (
    <Suspense fallback={<div>Loading ... </div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default App;
