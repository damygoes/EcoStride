import { heroSectionSquareData } from "@lib/constants";
import { motion } from "framer-motion";
import { shuffle } from "../../utils/hero/shuffle";

export const HeroGenerateSquares = () => {
  // Shuffle and then take the first 4 elements
  return shuffle(heroSectionSquareData)
    .slice(0, 4)
    .map((sq, index) => (
      <motion.div
        key={index}
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
