import MainNavbar from "@components/common/navigation/desktop/navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <section className="relative flex flex-col w-screen h-screen overflow-hidden bg-background">
      <MainNavbar />
      <Outlet />
    </section>
  );
}

export default AppLayout;
