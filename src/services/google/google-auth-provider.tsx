import { ENV_VARIABLES } from "@lib/env";
import { GoogleOAuthProvider } from "@react-oauth/google";

function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={ENV_VARIABLES.GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
}

export default GoogleAuthProvider;
