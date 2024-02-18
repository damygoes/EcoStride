import { axiosClient } from "@services/axios/axios-client";
import { useUser } from "@utils/user/user-store";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const logout = async () => {
    const response = await axiosClient.post(
      "http://localhost:3000/api/auth/logout",
    );
    if (response.data.message === "Logout successful") {
      // Clear user store/state
      setUser(null);
      navigate("/");
    }
  };

  return logout;
};
