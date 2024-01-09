import { create } from "zustand";
import { persist } from "zustand/middleware";

type FiltersAndSortingStore = {
  // Existing filter states
  country: string;
  state: string;
  category: string;

  // Sorting states
  sortKey: string;
  sortOrder: "asc" | "desc";

  // Existing filter actions
  setCountry: (country: string) => void;
  setState: (state: string) => void;
  setCategory: (category: string) => void;

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
      category: "",
      sortKey: "",
      sortOrder: "asc",
      setCountry: (country) => set({ country }),
      setState: (state) => set({ state }),
      setCategory: (category) => set({ category }),
      setSortKey: (sortKey) => set({ sortKey }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      resetFiltersAndSorting: () =>
        set({
          country: "",
          state: "",
          category: "",
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
