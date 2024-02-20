import { cn } from "@lib/utils";
import { navbarRoutes } from "@routes/routes";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

type LinkItemProps = {
  link: {
    name: string;
    path: string;
  };
};

const BASE_LINK_STYLE = "flex items-center h-[30px]";

function NavLinkItem({ link }: LinkItemProps) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  return (
    <NavLink
      to={link.path}
      className="hidden lg:block h-[30px] overflow-hidden font-medium"
    >
      <motion.div whileHover={{ y: -30 }}>
        <span
          className={cn(BASE_LINK_STYLE, {
            "text-text-color": pathname !== link.path,
            "text-accent": pathname === link.path,
          })}
        >
          {t(link.name as navbarRoutes)}
        </span>
        <span className="flex items-center h-[30px] text-accent">
          {t(link.name as navbarRoutes)}
        </span>
      </motion.div>
    </NavLink>
  );
}

export default NavLinkItem;
