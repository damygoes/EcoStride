import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function LoginSupplementalContent() {
  const { t } = useTranslation();
  return (
    <div className="group sticky m-4 h-80 overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-background md:h-[calc(100vh_-_5rem)]">
      <img
        alt="photo of trees and nature"
        src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5hdHVyZXxlbnwwfHwwfHx8Mg%3D%3D"
        className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
      />

      <motion.div
        initial="initial"
        whileInView="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-start justify-end p-8 bg-gradient-to-t from-text-color/80 to-text-color/10"
      >
        <motion.h2
          className="mb-2 text-3xl font-semibold text-balance leading-[1.25] text-white lg:text-4xl lg:max-w-md"
          variants={primaryVariants}
        >
          {t("login-page.supplementary-title")}
        </motion.h2>
        <motion.p
          variants={primaryVariants}
          className="max-w-md mb-6 text-sm text-accent text-balance"
        >
          {t("login-page.supplementary-text")}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default LoginSupplementalContent;

const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};
