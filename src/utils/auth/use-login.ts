import { CredentialResponse } from "@react-oauth/google";
import { axiosClient } from "@services/axios/axios-client";
import { useUser } from "@utils/user/user-store";
import { useLocation, useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    const googleToken = credentialResponse.credential;
    try {
      const response = await axiosClient.post("/auth/google", {
        token: googleToken,
      });

      const user = response.data;
      const userDoc = user?.user;
      setUser({ ...userDoc });
      navigate(from);
    } catch (error) {
      console.error("Error creating user document", error);
    }
  };

  const handleLoginFailure = () => {
    console.error("Login Failed");
  };

  return { handleLoginSuccess, handleLoginFailure };
};
