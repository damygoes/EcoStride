import { cn } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type SpringModalProps = {
  isOpen: boolean;
  setIsOpen: () => void;
  children?: React.ReactNode;
  shouldCloseOnOutsideClick?: boolean;
  className?: string;
};

function SpringModal({
  isOpen,
  setIsOpen,
  children,
  shouldCloseOnOutsideClick = true,
  className,
}: SpringModalProps) {
  const handleClose = () => {
    setIsOpen();
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={shouldCloseOnOutsideClick ? handleClose : undefined}
          className="fixed inset-0 z-50 grid p-8 overflow-y-scroll cursor-pointer backdrop-blur place-items-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full h-full max-w-2xl p-4 overflow-x-hidden overflow-y-auto text-white rounded-lg shadow-xl cursor-default bg-gradient-to-br from-primary via-secondary/90 to-white",
              className,
            )}
          >
            {children}
            {/* <div className="relative z-10 ">{children}</div> */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SpringModal;
