import { Button } from "@components/ui/button/button";
import { useTheme } from "@hooks/useTheme";
import { cn } from "@lib/utils";
import { IconMoon, IconSun } from "@tabler/icons-react";

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="gradient"
      size="sm"
      className={cn(className)}
    >
      {theme === "light" ? (
        <IconMoon className="w-5 h-5" />
      ) : (
        <IconSun className="w-5 h-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
