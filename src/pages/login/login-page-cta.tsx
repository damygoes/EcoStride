import { Button } from "@components/ui/button/button";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
function LoginPageCTA() {
  const { t } = useTranslation();
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center pt-20 pb-4 text-text-color md:py-20"
    >
      <div className="max-w-lg px-4 mx-auto my-auto md:pr-0">
        <motion.p
          variants={primaryVariants}
          className="mb-2 text-sm font-light text-center"
        >
          {t("login-page-cta.sub-text")}
        </motion.p>
        <motion.h1
          variants={primaryVariants}
          className="mb-8 text-5xl font-semibold text-center text-balance text-accent "
        >
          {t("login-page-cta.title")}
        </motion.h1>

        <motion.div
          variants={primaryVariants}
          className="flex flex-col items-center justify-start w-full gap-12 p-6 mb-2 shadow-md min-w-72 rounded-xl bg-background min-h-48"
        >
          <div className="flex flex-col items-center justify-center w-full gap-1 mx-auto">
            <h4 className="text-xl font-normal text-text-color">
              {t("login-page-cta.sign-in")}
            </h4>
            <p className="text-sm font-light text-text-color/60">
              {t("login-page-cta.sign-in-sub-text")}
            </p>
          </div>
          <div className="flex items-center justify-start w-full mx-auto">
            <Button
              className="w-full rounded-lg"
              size="lg"
              variant="gradient"
              iconLeft={<IconBrandGoogleFilled className="text-accent" />}
            >
              <Link to="/api/auth/google">Sign in with Google</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default LoginPageCTA;

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
