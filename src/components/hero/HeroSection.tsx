import { Button } from "@components/ui/button/button";
import { heroSectionSquareData } from "@lib/constants";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="grid items-center w-full max-w-6xl grid-cols-1 gap-8 px-8 py-12 mx-auto md:grid-cols-2">
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
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof heroSectionSquareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = () => {
  // Shuffle and then take the first 4 elements
  return shuffle(heroSectionSquareData)
    .slice(0, 4)
    .map((sq) => (
      <motion.div
        key={sq.id}
        layout
        transition={{ duration: 1.5, type: "spring" }}
        className="object-cover w-full h-full rounded-md"
        style={{
          backgroundImage: `url(${sq.src})`,
          backgroundSize: "cover",
        }}
      ></motion.div>
    ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<number | null>(null);
  const [squares, setSquares] = useState(generateSquares());

  const shuffleSquares = useCallback(() => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 30000) as unknown as number; // 30 seconds
  }, []);
  useEffect(() => {
    shuffleSquares();

    return () => {
      if (typeof timeoutRef.current === "number") {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shuffleSquares]);

  return (
    <div className="hidden  md:grid md:grid-cols-2 md:grid-rows-2 md:h-[450px] md:gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default HeroSection;
