import { ENV_VARIABLES } from "@lib/env";
import { axiosClient } from "@services/axios/axios-client";
import { useUser } from "@utils/user/user-store";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const logout = async () => {
    const response = await axiosClient.post(
      `${ENV_VARIABLES.GOOGLE_AUTH_LOG_OUT_URL}`,
    );
    if (response.data.message === "Logout successful") {
      // Clear user store/state
      setUser(null);
      navigate("/");
    }
  };

  return logout;
};
