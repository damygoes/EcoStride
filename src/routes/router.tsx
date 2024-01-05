import { BasicPageLayout, RootAppLayout } from "@layouts/index";
import { AllClimbsPage, HomePage, PrEstimatorPage } from "@pages/index";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RequireAuth from "./require-auth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RootAppLayout />}>
        {/* //* Public Routes */}
        <Route path="/" element={<HomePage />} />,
        <Route path="login" element={<div>Login Page</div>} />,
        <Route path="create-account" element={<div>Create Account</div>} />,
        <Route path="/climbs" element={<AllClimbsPage />} />,
        <Route
          path="unauthorized"
          element={<div> You are not authorized to view this page </div>}
        />
        ,
        {/* // TODO: Add an unauthorized path and component for role-based access */}
        {/* //* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/pr-estimator" element={<PrEstimatorPage />} />,
          <Route path="/profile" element={<div>User Profile</div>}>
            {/* <Route
              index
              element={<Navigate to="external-integrations" replace />}
            /> //TODO: Change this later, it will set the default page to load when a user visits /profile */}

            <Route path="account" element={<div>User Account</div>} />
            <Route path="my-bucket" element={<div>User Bucket List</div>} />
          </Route>
          ,{/* //* Catch All */}
          <Route
            path="*"
            element={
              <BasicPageLayout pageTitle="NOT FOUND">
                <p>Page not found</p>
              </BasicPageLayout>
            }
          />
          {/* //TODO: change this route later to a catch-all component */},
        </Route>
      </Route>
    </Route>,
  ),
);
