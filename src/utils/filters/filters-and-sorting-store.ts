import { create } from "zustand";
import { persist } from "zustand/middleware";

type FiltersAndSortingStore = {
  // Existing filter states
  country: string;
  state: string;
  climbCategory: string;

  // Sorting states
  sortKey: string;
  sortOrder: "asc" | "desc";

  // Existing filter actions
  setCountry: (country: string) => void;
  setState: (state: string) => void;
  setClimbCategory: (category: string) => void;

  // Sorting actions
  setSortKey: (sortKey: string) => void;
  setSortOrder: (sortOrder: "asc" | "desc") => void;

  // Reset action
  resetFiltersAndSorting: () => void;
};

export const useFilterAndSortingStore = create<FiltersAndSortingStore>()(
  persist(
    (set) => ({
      country: "",
      state: "",
      climbCategory: "",
      sortKey: "",
      sortOrder: "asc",
      setCountry: (country) => set({ country }),
      setState: (state) => set({ state }),
      setClimbCategory: (climbCategory) => set({ climbCategory }),
      setSortKey: (sortKey) => set({ sortKey }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      resetFiltersAndSorting: () =>
        set({
          country: "",
          state: "",
          climbCategory: "",
          sortKey: "",
          sortOrder: "asc",
        }),
    }),
    {
      name: "filters-and-sorting-store",
      version: 1,
    },
  ),
);
