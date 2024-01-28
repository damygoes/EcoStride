import type { UserLocationState } from "@hooks/useUserLocation";
import useUserLocation from "@hooks/useUserLocation";
import { createContext, FC, ReactNode } from "react";

type UserLocationProviderProps = {
  children: ReactNode;
};

// Create the context with a default value
export const UserLocationContext = createContext<UserLocationState | undefined>(
  undefined,
);

const UserLocationProvider: FC<UserLocationProviderProps> = ({ children }) => {
  const userLocation = useUserLocation();

  return (
    <UserLocationContext.Provider value={userLocation}>
      {children}
    </UserLocationContext.Provider>
  );
};

export default UserLocationProvider;
