import { useState } from "react";
import MobileMenu from "../mobile/mobile-menu.tsx";
import NavLeft from "./nav-left.tsx.tsx";
import NavRight from "./nav-right.tsx";

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="relative flex items-center justify-between gap-4 px-4 py-2 shadow-sm bg-inherit">
      <NavLeft setIsOpen={setIsOpen} />
      <NavRight />
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default MainNavbar;
