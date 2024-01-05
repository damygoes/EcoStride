// ThemeContext.tsx
import { ReactNode, createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType,
);

// Provider component that wraps your app and makes the theme value available to any child component that calls the useTheme() hook.
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state and function to toggle the theme
  const [theme, setTheme] = useState<Theme>("light");

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  // Effect to handle side-effects of theme change
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
