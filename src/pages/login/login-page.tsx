import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { useLogin } from "../../utils/auth/use-login";

const RightContent = () => {
  const { handleLoginSuccess, handleLoginFailure } = useLogin();
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center pt-20 pb-4 text-text-color md:py-20"
    >
      <div className="max-w-lg px-4 mx-auto my-auto md:pr-0">
        <motion.p
          variants={primaryVariants}
          className="mb-2 text-sm font-light text-center"
        >
          Ready for a new adventure?
        </motion.p>
        <motion.h1
          variants={primaryVariants}
          className="mb-8 text-5xl font-semibold text-center text-accent "
        >
          Let's Ride
        </motion.h1>

        <motion.div
          variants={primaryVariants}
          className="flex flex-col items-center justify-start w-full gap-12 p-6 mb-2 shadow-md min-w-72 rounded-xl bg-background min-h-48"
        >
          <div className="flex flex-col items-start justify-center w-full gap-1 mx-auto">
            <h4 className="text-xl font-normal text-text-color">Sign in</h4>
            <p className="text-sm font-light text-text-color/60">
              to continue to Summit Seekers
            </p>
          </div>
          <div className="flex items-center justify-start w-full mx-auto">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SupplementalContent = () => {
  return (
    <div className="group sticky m-4 h-80 overflow-hidden rounded-tl-3xl rounded-tr-3xl bg-background md:h-[calc(100vh_-_5rem)]">
      <img
        alt="cycling photo"
        src="https://images.unsplash.com/photo-1534146789009-76ed5060ec70?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3ljbGluZ3xlbnwwfHwwfHx8Mg%3D%3D"
        className="object-cover w-full h-full transition-all duration-500 bg-white group-hover:scale-105 group-hover:opacity-50"
      />

      <motion.div
        initial="initial"
        whileInView="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-start justify-end p-8 bg-gradient-to-t from-text-color/80 to-text-color/10"
      >
        <motion.h2
          className="mb-2 text-3xl font-semibold text-balance leading-[1.25] text-white lg:text-4xl"
          variants={primaryVariants}
        >
          Bringing you
          <br />
          to new Heights
        </motion.h2>
        <motion.p
          variants={primaryVariants}
          className="max-w-md mb-6 text-sm text-accent text-balance"
        >
          With Summit Seekers, every pedal leads to adventure. Discover new ways
          to explore the world around you.
        </motion.p>
      </motion.div>
    </div>
  );
};

const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

function LoginScreen() {
  return (
    <section className="md:grid min-h-screen grid-cols-1 bg-background md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px]">
      <SupplementalContent />
      <RightContent />
    </section>
  );
}

export default LoginScreen;
