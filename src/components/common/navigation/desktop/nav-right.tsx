import LocaleSwitch from "@components/common/locale-switch/locale-switch";
import ThemeToggle from "@components/common/theme-toggle/theme-toggle";
import UserProfileButton from "@components/common/user-profile-button/user-profile-button";
import { Button } from "@components/ui/button/button";
import { useLogout } from "@utils/auth/use-logout";
import { useUser } from "@utils/user/user-store";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function NavRight() {
  const { user } = useUser();
  const logout = useLogout();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end gap-2">
      <div className="hidden md:flex md:gap-2 md:items-center">
        {user !== null && <UserProfileButton />}
        <ThemeToggle />
        <LocaleSwitch />
      </div>
      {!user ? (
        <Link to="/login">
          <Button size="sm">{t("navbar.login")}</Button>
        </Link>
      ) : (
        <Button variant="error" onClick={logout}>
          {t("navbar.logout")}
        </Button>
      )}
    </div>
  );
}

export default NavRight;
