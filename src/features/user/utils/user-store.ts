import type { User, UserLocation } from "@type-definitions/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: User | null;
  userLocation: UserLocation | null;
  setUser: (user: User) => void;
  setUserLocation: (userLocation: UserLocation) => void;
  updateUser: (user: User) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      userLocation: null,
      setUser: (user) => set({ user }),
      setUserLocation: (userLocation) => set({ userLocation }),
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
      partialize: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userLocation, ...rest } = state;
        return rest as Omit<typeof state, "userLocation">; // Ensures type safety
      },
    },
  ),
);
