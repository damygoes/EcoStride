import { navbarRoutes } from "@routes/routes";
import NavLinkItem from "./nav-link-item";

function NavigationLinks() {
  return (
    <div className="items-center hidden gap-6 lg:flex">
      {navbarRoutes.map((link) => {
        return <NavLinkItem key={link.path} link={link} />;
      })}
    </div>
  );
}

export default NavigationLinks;
