import { create } from "zustand";

type ClimbRequestModalStore = {
  isClimbRequestModalOpen: boolean;
  setIsClimbRequestModalOpen: (value: boolean) => void;
};

export const useClimbRequestModalStore = create<ClimbRequestModalStore>()(
  (set) => ({
    isClimbRequestModalOpen: false,
    setIsClimbRequestModalOpen: (value) =>
      set({ isClimbRequestModalOpen: value }),
  }),
);
