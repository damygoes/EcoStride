import { setAuthToken } from "@services/axios/axios-client";
import { useUser } from "@utils/user/user-store";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    // setUser({
    //   id: null,
    //   firstName: null,
    //   lastName: null,
    //   email: null,
    //   avatar: null,
    //   location: null,
    //   createdAt: null,
    //   updatedAt: null,
    //   details: null,
    //   token: null,
    // });
    navigate("/");
  };

  return logout;
};
