import { Button } from "@components/ui/button/button";
import { useTheme } from "@hooks/useTheme";
import { IconMoon, IconSun } from "@tabler/icons-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} variant="gradient" size="sm">
      {theme === "light" ? (
        <IconMoon className="w-5 h-5" />
      ) : (
        <IconSun className="w-5 h-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
