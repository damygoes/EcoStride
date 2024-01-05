import MainNavbar from "@components/common/navigation/desktop/navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <section className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-background">
      <MainNavbar />
      <Outlet />
    </section>
  );
}

export default AppLayout;
