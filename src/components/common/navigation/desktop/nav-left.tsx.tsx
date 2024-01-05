import Logo from "@components/common/logo/logo";
import { IconMenu2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import NavigationLinks from "./navigation-links";
type NavLeftProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function NavLeft({ setIsOpen }: NavLeftProps) {
  return (
    <div className="flex items-center flex-1 gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="block text-2xl lg:hidden text-text-color"
        onClick={() => setIsOpen((previousValue) => !previousValue)}
      >
        <IconMenu2 size={32} />
      </motion.button>
      <Logo />
      <NavigationLinks />
    </div>
  );
}

export default NavLeft;
