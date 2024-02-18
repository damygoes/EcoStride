import UserProfilePageSidebarNavigation from "@components/user-profile-page/UserProfilePageSidebarNavigation";
import UserProfilePageTitle from "@components/user-profile-page/UserProfilePageTitle";
import PageLayout from "@layouts/page-layout/page-layout";
import { Outlet } from "react-router-dom";

function UserProfilePage() {
  return (
    <PageLayout
      withFooter
      withSidebar
      pageTitle={<UserProfilePageTitle />}
      sidebarContent={<UserProfilePageSidebarNavigation />}
    >
      <Outlet />
    </PageLayout>
  );
}

export default UserProfilePage;
