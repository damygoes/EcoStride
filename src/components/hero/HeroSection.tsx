import { Button } from "@components/ui/button/button";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HeroShuffleGrid } from "./HeroShuffleGrid";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="grid items-center w-full grid-cols-1 gap-8 px-8 py-12 mx-auto md:grid-cols-2">
      <div>
        <span className="block mb-4 text-xs font-medium text-accent md:text-sm">
          {t("hero.subtitle")}
        </span>
        <h3 className="text-4xl font-semibold text-text-color text-pretty md:text-6xl">
          {t("hero.title")}
        </h3>
        <p className="my-4 text-base text-pretty text-text-color/60 md:my-6">
          {t("hero.description")}
        </p>

        <Link to="/activities">
          <Button>{t("hero.button")}</Button>
        </Link>
      </div>
      <HeroShuffleGrid />
    </section>
  );
};

export default HeroSection;
