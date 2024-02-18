import defaultUserIcon from "@assets/user-fallback.svg";
import Avatar from "@components/common/avatar/avatar";
import LocaleSwitch from "@components/common/locale-switch/locale-switch";
import ThemeToggle from "@components/common/theme-toggle/theme-toggle";
import { Button } from "@components/ui/button/button";
import { useLogout } from "@utils/auth/use-logout";
import { useUser } from "@utils/user/user-store";
import { Link, useNavigate } from "react-router-dom";

function NavRight() {
  const { user } = useUser();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleUserProfileNavigation = () => {
    navigate("/profile");
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="hidden md:flex md:gap-2 md:items-center">
        {user !== null && (
          <Button
            size="sm"
            iconLeft={
              <Avatar
                src={user?.avatar ?? defaultUserIcon}
                alt={`Photo of ${user?.firstName} ${user?.lastName}`}
                size="xs"
              />
            }
            onClick={handleUserProfileNavigation}
          >
            Profile
          </Button>
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
