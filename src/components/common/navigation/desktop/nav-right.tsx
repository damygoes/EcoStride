import LocaleSwitch from "@components/common/locale-switch/locale-switch";
import ThemeToggle from "@components/common/theme-toggle/theme-toggle";
import { Button } from "@components/ui/button/button";

function NavRight() {
  return (
    <div className="flex items-center justify-end gap-2">
      <Button size="sm">Login</Button>
      <div className="hidden md:flex md:gap-2">
        <ThemeToggle />
        <LocaleSwitch />
      </div>
    </div>
  );
}

export default NavRight;
