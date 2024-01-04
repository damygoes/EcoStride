import useTheme from "@hooks/useTheme";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { motion } from "framer-motion";

const TOGGLE_CLASSES =
  "text-sm text-text-color font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const ThemeToggle = () => {
  const [colorTheme, setTheme] = useTheme();

  return (
    <div className="relative flex items-center rounded-full w-fit">
      <button className={TOGGLE_CLASSES} onClick={() => setTheme("light")}>
        <IconSun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Light</span>
      </button>
      <button className={TOGGLE_CLASSES} onClick={() => setTheme("dark")}>
        <IconMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          colorTheme === "light" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="w-1/2 h-full rounded-full bg-gradient-to-br from-primary to-accent"
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
