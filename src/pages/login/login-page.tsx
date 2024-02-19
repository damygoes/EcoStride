import LoginPageCTA from "./login-page-cta";
import LoginSupplementalContent from "./login-supplemental-content";

function LoginScreen() {
  return (
    <section className="md:grid min-h-screen grid-cols-1 bg-background md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px]">
      <LoginSupplementalContent />
      <LoginPageCTA />
    </section>
  );
}

export default LoginScreen;
