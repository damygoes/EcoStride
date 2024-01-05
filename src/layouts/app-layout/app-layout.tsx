import MainNavbar from "@components/common/navigation/desktop/navbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <section className="relative flex flex-col w-screen h-screen gap-4 overflow-hidden bg-background">
      <MainNavbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  );
}

export default AppLayout;
