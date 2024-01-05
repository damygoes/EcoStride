import { navbarRoutes } from "@routes/routes";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import MobileMenuLinkItem from "./menu-link-item";

type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  const handleMenuClick = () => {
    setIsOpen((previousState) => !previousState);
  };
  return (
    <motion.div
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      className="absolute left-0 right-0 z-50 flex flex-col items-center justify-center h-screen gap-3 p-5 overflow-hidden origin-top shadow-md backdrop-blur-lg top-full bg-gradient-to-br from-primary to-secondary dark:bg-background dark:from-background dark:to-background"
    >
      {navbarRoutes.map((link) => {
        return (
          <MobileMenuLinkItem
            key={link.path}
            link={link}
            onClick={handleMenuClick}
          />
        );
      })}
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
