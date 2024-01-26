import { climbs } from "@mock/climbs";
import { axiosClient } from "@services/axios/axios-client";
import type { Climb } from "@type-definitions/Climb";
import { useEffect } from "react";
import { create } from "zustand";

export type CLIMBS_VIEW_MODE = "grid" | "list";

type ClimbStore = {
  climbs: Climb[];
  nearbyClimbs: Climb[];
  climbsViewMode: CLIMBS_VIEW_MODE;
  addClimb: (climb: Climb) => void;
  removeClimb: (climb: Climb) => void;
  updateClimb: (climb: Climb) => void;
  findClimb: (climbId: string) => Climb | undefined;
  setNearbyClimbs: (climbs: Climb[]) => void;
  setClimbsViewMode: (view: "grid" | "list") => void;
};

const useClimbStore = create<ClimbStore>((set, get) => ({
  climbs: climbs,
  nearbyClimbs: [],
  climbsViewMode: "grid",
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
  setClimbsViewMode: (view) => {
    set({ climbsViewMode: view });
  },
}));

export const useClimb = () => {
  const {
    climbs,
    nearbyClimbs,
    climbsViewMode,
    addClimb,
    removeClimb,
    updateClimb,
    findClimb,
    setNearbyClimbs,
    setClimbsViewMode,
  } = useClimbStore();

  const fetchClimbs = async () => {
    const response = await axiosClient.get("/climbs");
    return response.data as Climb[];
  };

  useEffect(() => {
    fetchClimbs();
  }, []);

  return {
    climbs,
    nearbyClimbs,
    climbsViewMode,
    addClimb,
    removeClimb,
    updateClimb,
    findClimb,
    setNearbyClimbs,
    setClimbsViewMode,
    fetchClimbs,
  };
};
