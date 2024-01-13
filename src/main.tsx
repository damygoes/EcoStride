import GoogleAuthProvider from "@services/google/google-auth-provider.tsx";
import "@services/i18n/i18n.ts";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleAuthProvider>
        <App />
      </GoogleAuthProvider>
    </Suspense>
  </React.StrictMode>,
);
