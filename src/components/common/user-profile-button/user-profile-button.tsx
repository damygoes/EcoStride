import defaultUserIcon from "@assets/user-fallback.svg";
import { Button } from "@components/ui/button/button";
import { cn } from "@lib/utils";
import { useUser } from "@utils/user/user-store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/avatar";

type UserProfileButtonProps = {
  className?: string;
};

function UserProfileButton({ className }: UserProfileButtonProps) {
  const { user } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleUserProfileNavigation = () => {
    navigate("/profile");
  };

  return (
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
      className={cn(className)}
    >
      {t("userProfile")}
    </Button>
  );
}

export default UserProfileButton;
