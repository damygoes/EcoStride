import { UserLocationContext } from "@context/user-location-provider/UserLocationProvider";
import type { User } from "@type-definitions/User";
import { useContext } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (user: User) => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      // userLocation: null,
      setUser: (user) => set({ user }),
      // setUserLocation: (userLocation) => set({ userLocation }),
      updateUser: (user) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...user } });
        }
      },
    }),
    {
      name: "user-store", // The name of the store
      version: 1, // Versioning the store is useful for migrations and helps keeps the cache fresh i.e. Increment version to reset state
      // partialize: (state) => {
      //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   // const { userLocation, ...rest } = state;
      //   // return rest as Omit<typeof state, "userLocation">; // Ensures type safety
      // },
    },
  ),
);

export const useUser = () => {
  const { user, setUser, updateUser } = useUserStore();
  const userGeoLocation = useContext(UserLocationContext);

  const userGeolocationData = {
    latitude: userGeoLocation?.latitude,
    longitude: userGeoLocation?.longitude,
    city: userGeoLocation?.city,
    state: userGeoLocation?.state,
    country: userGeoLocation?.country,
    loading: userGeoLocation?.loading,
    error: userGeoLocation?.error,
    cityAndState:
      userGeoLocation?.city && userGeoLocation.state
        ? `${userGeoLocation.city}, ${userGeoLocation.state}`
        : null,
  };

  // TODO: api calls to update and refetch user

  return {
    user,
    setUser,
    updateUser,
    userGeolocationData,
  };
};
