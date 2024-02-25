import { useToast } from "@components/common/toast/use-toast";
import { ENV_VARIABLES } from "@lib/env";
import { axiosClient } from "@services/axios/axios-client";
import { useUser } from "@utils/user/user-store";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser, setIsAuthenticated } = useUser();

  const logout = useCallback(async () => {
    try {
      const response = await axiosClient.post(
        `${ENV_VARIABLES.GOOGLE_AUTH_LOG_OUT_URL}`,
      );
      if (
        response.status === 200 &&
        response.data === "Logged out successfully"
      ) {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.clear();
        navigate("/");
        toast({
          title: "Success",
          description: "You've been logged out successfully.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  }, [navigate, toast, setUser, setIsAuthenticated]);

  return logout;
};
