import { useUserStore } from "@utils/user/user-store";

export const useLogout = () => {
  const { setUser } = useUserStore();

  const logout = () => {
    setUser(null);
  };

  return logout;
};
