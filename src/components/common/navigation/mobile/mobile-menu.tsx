import LocaleSwitch from "@components/common/locale-switch/locale-switch";
import ThemeToggle from "@components/common/theme-toggle/theme-toggle";
import UserProfileButton from "@components/common/user-profile-button/user-profile-button";
import { Button } from "@components/ui/button/button";
import { navbarRoutes } from "@routes/routes";
import { useLogout } from "@utils/auth/use-logout";
import { useUser } from "@utils/user/user-store";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import MobileMenuLinkItem from "./menu-link-item";

type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const { user } = useUser();
  const { t } = useTranslation();
  const logout = useLogout();
  const handleMenuClick = () => {
    setIsOpen((previousState) => !previousState);
  };
  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute left-0 right-0 z-50 flex flex-col items-center justify-center h-screen gap-3 p-5 overflow-hidden origin-top shadow-md backdrop-blur-lg top-full bg-gradient-to-b from-background to-primary/90 dark:bg-background dark:from-background dark:to-background"
    >
      <div>
        {navbarRoutes.map((link) => {
          return (
            <MobileMenuLinkItem
              key={link.path}
              link={link}
              onClick={handleMenuClick}
            />
          );
        })}
      </div>
      <div className="flex flex-col items-start justify-between gap-4 my-5 w-72">
        {user !== null && <UserProfileButton className="w-full" />}
        <ThemeToggle className="w-full" />
        <LocaleSwitch className="w-full" />
        {!user ? (
          <Link to="/login">
            <Button size="sm" className="w-full">
              {t("navbar.login")}
            </Button>
          </Link>
        ) : (
          <Button variant="error" onClick={handleLogout} className="w-full">
            {t("navbar.logout")}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

const menuVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

export default MobileMenu;
