import type { LocationState } from "@hooks/useLocation";
import useLocation from "@hooks/useLocation";
import { createContext, FC, ReactNode } from "react";

type LocationProviderProps = {
  children: ReactNode;
};

// Create the context with a default value
export const LocationContext = createContext<LocationState | undefined>(
  undefined,
);

const LocationProvider: FC<LocationProviderProps> = ({ children }) => {
  const location = useLocation();

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
