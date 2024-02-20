import { useUser } from "@utils/user/user-store";
import { useTranslation } from "react-i18next";

function UserProfilePageTitle() {
  const { t } = useTranslation();
  const { user } = useUser();
  return (
    <div>
      <h3 className="text-base">
        {user?.firstName} {user?.lastName}
      </h3>
      <p className="text-sm font-light">{t("user-profile-page.title")}</p>
    </div>
  );
}

export default UserProfilePageTitle;
