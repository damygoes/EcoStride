import { Button } from "@components/ui/button/button";
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

const shuffle = (array: (typeof squareData)[0][]) => {
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

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1478059299873-f047d8c5fe1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGN5Y2xpbmclMjByb2FkfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGN5Y2xpbmclMjByb2FkfGVufDB8fDB8fHwy",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1676372261080-82d7f5b18749?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGN5Y2xpbmclMjByb2FkfGVufDB8fDB8fHwy",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1681295694506-80838945c430?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGN5Y2xpbmclMjByb2FkfGVufDB8fDB8fHwy",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1699389359817-6d17d0880c2f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGN5Y2xpbmclMjByb2FkfGVufDB8fDB8fHwy",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1676372763678-e23205476250?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3ljbGluZyUyMHJvYWRzfGVufDB8fDB8fHww",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1603646427277-b0389c096a96?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc3fHxjeWNsaW5nJTIwcm9hZHxlbnwwfHwwfHx8Mg%3D%3D",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1695238070179-218301c2480d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI1fHxjeWNsaW5nJTIwcm9hZHxlbnwwfHwwfHx8Mg%3D%3D",
  },
];

const generateSquares = () => {
  // Shuffle and then take the first 4 elements
  return shuffle(squareData)
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
