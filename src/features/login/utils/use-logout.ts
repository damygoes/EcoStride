import { useUserStore } from "@features/user/utils/user-store";

export const useLogout = () => {
  const { setUser } = useUserStore();

  const logout = () => {
    setUser(null);
  };

  return logout;
};
