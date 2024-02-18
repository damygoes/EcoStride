import { useUser } from "@utils/user/user-store";

function UserProfilePageTitle() {
  const { user } = useUser();
  return (
    <div>
      <h3 className="text-base">
        {user?.firstName} {user?.lastName}
      </h3>
      <p className="text-sm font-light">My Profile</p>
    </div>
  );
}

export default UserProfilePageTitle;
