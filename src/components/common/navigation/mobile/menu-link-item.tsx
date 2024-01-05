import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type MobileMenuLinkItemProps = {
  link: {
    name: string;
    path: string;
  };
  onClick: () => void;
};

function MobileMenuLinkItem({ link, onClick }: MobileMenuLinkItemProps) {
  return (
    <Link
      to={link.path}
      onClick={onClick}
      className="flex items-center justify-start p-3 w-72"
    >
      <motion.div
        variants={menuLinkVariants}
        className="h-[30px] overflow-hidden font-medium text-3xl uppercase flex  gap-2"
      >
        <motion.span variants={menuLinkArrowVariants} className="self-center">
          <IconArrowRight
            size={12}
            className="bg-gradient-to-br from-secondary to-accent text-text-color"
          />
        </motion.span>
        <motion.div whileHover={{ y: -30 }}>
          <span className="flex items-center h-[30px] text-text-color">
            {link.name}
          </span>
          <span className="flex items-center h-[30px] text-accent">
            {link.name}
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
}

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -10,
    opacity: 0,
  },
};

const menuLinkArrowVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: -4,
  },
};

export default MobileMenuLinkItem;
