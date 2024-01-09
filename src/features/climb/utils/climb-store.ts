import { climbs } from "@mock/climbs";
import type { Climb } from "@type-definitions/Climb";
import { create } from "zustand";

type ClimbStore = {
  climbs: Climb[];
  nearbyClimbs: Climb[];
  addClimb: (climb: Climb) => void;
  removeClimb: (climb: Climb) => void;
  updateClimb: (climb: Climb) => void;
  findClimb: (climbId: string) => Climb | undefined;
  setNearbyClimbs: (climbs: Climb[]) => void;
};

export const useClimbStore = create<ClimbStore>((set, get) => ({
  climbs: climbs,
  nearbyClimbs: [],

  addClimb: (climb) => {
    set((state) => {
      const climbToAdd = state.climbs.find((c) => c.id === climb.id);
      if (!climbToAdd) {
        return { climbs: [...state.climbs, climb] };
      }
      return state;
    });
  },

  removeClimb: (climb) => {
    set((state) => ({
      climbs: state.climbs.filter((c) => c.id !== climb.id),
    }));
  },

  updateClimb: (climb) => {
    set((state) => ({
      climbs: state.climbs.map((c) => (c.id === climb.id ? climb : c)),
    }));
  },

  findClimb: (climbId) => {
    return get().climbs.find((c) => c.id === climbId);
  },

  setNearbyClimbs: (climbs) => {
    set({ nearbyClimbs: climbs });
  },
}));
