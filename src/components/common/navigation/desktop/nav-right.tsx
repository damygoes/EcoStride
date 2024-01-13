import Avatar from "@components/common/avatar/avatar";
import LocaleSwitch from "@components/common/locale-switch/locale-switch";
import ThemeToggle from "@components/common/theme-toggle/theme-toggle";
import { Button } from "@components/ui/button/button";
import { useLogout } from "@features/login/utils/use-logout";
import { useUserStore } from "@features/user/utils/user-store";
import { Link } from "react-router-dom";

function NavRight() {
  const { user } = useUserStore();
  const logout = useLogout();
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="hidden md:flex md:gap-2 md:items-center">
        {user !== null && (
          <Avatar
            src={user?.image ?? undefined}
            alt={`Photo of ${user?.email} ${user?.lastName}`}
            size="sm"
          />
        )}
        <ThemeToggle />
        <LocaleSwitch />
      </div>
      {!user ? (
        <Link to="/login">
          <Button size="sm">Login</Button>
        </Link>
      ) : (
        <Button variant="error" onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  );
}

export default NavRight;
