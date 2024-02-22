import { useCallback, useEffect, useRef, useState } from "react";
import { HeroGenerateSquares } from "./HeroGenerateSquares";

export const HeroShuffleGrid = () => {
  const timeoutRef = useRef<number | null>(null);
  const [squares, setSquares] = useState(HeroGenerateSquares());

  const shuffleSquares = useCallback(() => {
    setSquares(HeroGenerateSquares());

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
      {squares.map((sq, index) => (
        <span key={index}>{sq}</span>
      ))}
    </div>
  );
};
