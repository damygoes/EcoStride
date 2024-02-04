import { create } from "zustand";

type ActivityRequestModalStore = {
  isActivityRequestModalOpen: boolean;
  setIsActivityRequestModalOpen: (value: boolean) => void;
};

export const useActivityRequestModalStore = create<ActivityRequestModalStore>()(
  (set) => ({
    isActivityRequestModalOpen: false,
    setIsActivityRequestModalOpen: (value) =>
      set({ isActivityRequestModalOpen: value }),
  }),
);
