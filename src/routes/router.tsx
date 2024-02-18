import NotFoundFallback from "@components/common/not-found-fallback/NotFoundFallback";
import UserBucketList from "@components/user-profile-page/user-bucket-list/UserBucketList";
import UserCompletedActivities from "@components/user-profile-page/user-completed-activities/UserCompletedActivities";
import UserLikedActivities from "@components/user-profile-page/user-liked-activities/UserLikedActivities";
import UserProfile from "@components/user-profile-page/user-profile/UserProfile";
import { BasicPageLayout, RootAppLayout } from "@layouts/index";
import {
  ActivitiesPage,
  ActivityDetailsPage,
  HomePage,
  LoginPage,
} from "@pages/index";
import UserProfilePage from "@pages/user-profile/user-profile-page";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RequireAuth from "./require-auth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootAppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="create-account" element={<div>Create Account</div>} />
      <Route path="activities" element={<ActivitiesPage />} />
      <Route
        path="activities/:activitySlug"
        element={<ActivityDetailsPage />}
      />
      <Route
        path="unauthorized"
        element={<div>You are not authorized to view this page</div>}
      />

      <Route element={<RequireAuth />}>
        <Route path="profile" element={<UserProfilePage />}>
          <Route index element={<UserProfile />} />
          <Route path="my-bucket" element={<UserBucketList />} />
          <Route path="liked-activities" element={<UserLikedActivities />} />
          <Route
            path="completed-activities"
            element={<UserCompletedActivities />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <BasicPageLayout pageTitle="NOT FOUND">
            <NotFoundFallback />
          </BasicPageLayout>
        }
      />
    </Route>,
  ),
);
