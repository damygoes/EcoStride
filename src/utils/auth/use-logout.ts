import { useUser } from "@utils/user/user-store";

export const useLogout = () => {
  const { setUser } = useUser();

  const logout = () => {
    setUser(null);
  };

  return logout;
};
