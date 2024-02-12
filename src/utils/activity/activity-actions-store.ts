import { create } from "zustand";

type ActivityActionsModalStore = {
  isActivityRequestModalOpen: boolean;
  isActivityDeleteModalOpen: boolean;
  setIsActivityRequestModalOpen: (value: boolean) => void;
  setIsActivityDeleteModalOpen: (value: boolean) => void;
};

const useActivityActionsModal = create<ActivityActionsModalStore>((set) => ({
  isActivityRequestModalOpen: false,
  isActivityDeleteModalOpen: false,
  setIsActivityRequestModalOpen: (value) => {
    set({
      isActivityRequestModalOpen: value,
    });
  },
  setIsActivityDeleteModalOpen: (value) => {
    set({
      isActivityDeleteModalOpen: value,
    });
  },
}));

export const useActivityActions = () => {
  const {
    isActivityRequestModalOpen,
    isActivityDeleteModalOpen,
    setIsActivityRequestModalOpen,
    setIsActivityDeleteModalOpen,
  } = useActivityActionsModal();

  return {
    isActivityRequestModalOpen,
    isActivityDeleteModalOpen,
    setIsActivityRequestModalOpen,
    setIsActivityDeleteModalOpen,
  };
};
