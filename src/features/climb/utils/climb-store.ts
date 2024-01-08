import { climbs } from "@mock/climbs";
import type { Climb } from "@type-definitions/Climb";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type climbStore = {
  climbs: Climb[];
  nearbyClimbs: Climb[];
  addClimb: (climb: Climb) => void;
  removeClimb: (climb: Climb) => void;
  updateClimb: (climb: Climb) => void;
  findClimb: (climbId: string) => Climb | undefined;
  setNearbyClimbs: (climbs: Climb[]) => void;
};

export const useClimbStore = create<climbStore>()(
  persist(
    (set, get) => ({
      climbs: climbs,
      // climbs: [],
      addClimb: (climb) => {
        set((state) => {
          const climbToAdd = state.climbs.find((c) => c.id === climb.id);

          // Check if the climb is already in climbs
          if (!climbToAdd) {
            return { climbs: [...state.climbs, climb] };
          }

          return state;
        });
      },
      removeClimb: (climb) =>
        set((state) => ({
          climbs: state.climbs.filter((c) => c.id !== climb.id),
        })),
      updateClimb: (climb) =>
        set((state) => ({
          climbs: state.climbs.map((c) => {
            if (c.id === climb.id) {
              return climb;
            }
            return c;
          }),
        })),
      findClimb: (climbId) => {
        const climb = get().climbs.find((c) => c.id === climbId);
        return climb;
      },
      nearbyClimbs: [],
      setNearbyClimbs: (climbs) => set({ nearbyClimbs: climbs }),
    }),

    {
      name: "climbs-store", // The name of the store
      version: 1, // Versioning the store is useful for migrations and helps keeps the cache fresh i.e. Increment version to reset state
      partialize: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { nearbyClimbs, ...rest } = state;
        return rest as Omit<typeof state, "nearbyClimbs">; // Ensures type safety
      }, // Persist everything except the nearbyClimbs
    },
  ),
);
