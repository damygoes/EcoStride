import { CredentialResponse } from "@react-oauth/google";
import { useUser } from "@utils/user/user-store";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

type DecodedGoogleToken = {
  sub?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
  jti?: string;
  exp?: number;
};

export const useLogin = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    const decodedCredential: DecodedGoogleToken = jwtDecode(
      credentialResponse.credential ?? "",
    );
    setUser({
      id: decodedCredential.sub,
      firstName: decodedCredential.given_name,
      lastName: decodedCredential.family_name,
      email: decodedCredential.email,
      image: decodedCredential.picture,
      token: decodedCredential.jti,
      tokenExpiration: decodedCredential.exp,
    });
    navigate(from);
  };

  const handleLoginFailure = () => {
    console.error("Login Failed");
  };

  return { handleLoginSuccess, handleLoginFailure };
};
