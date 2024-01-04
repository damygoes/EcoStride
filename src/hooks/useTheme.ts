import { useEffect, useState } from "react";

// Define the type for the theme, which can be either 'dark' or 'light' or undefined initially
type Theme = "dark" | "light" | undefined;

export default function useTheme() {
  // State with type annotation for the theme
  const [theme, setTheme] = useState<Theme>(
    localStorage.getItem("theme") as Theme,
  );
  const colorTheme: Theme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;

    // Safely manage class removal/addition with type checking
    if (colorTheme) root.classList.remove(colorTheme);
    if (theme) root.classList.add(theme);

    // Save theme to local storage
    if (theme) localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme] as const; // 'as const' ensures a readonly tuple is returned
}
