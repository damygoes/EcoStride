import { Activity } from "@type-definitions/Activity";
import { create } from "zustand";

type ActivityFormStore = {
  existingActivity: Activity | null;
  setExistingActivity: (activity: Activity) => void;
  resetExistingActivity: () => void;
  onSave: () => void;
};

const useActivityFormStore = create<ActivityFormStore>((set) => ({
  existingActivity: null,
  setExistingActivity: (existingActivity) => {
    set({ existingActivity });
  },
  resetExistingActivity: () => {
    set({ existingActivity: null });
  },
  onSave: () => {},
}));

export const useActivityForm = () => {
  const {
    existingActivity,
    setExistingActivity,
    resetExistingActivity,
    onSave,
  } = useActivityFormStore();

  return {
    existingActivity,
    setExistingActivity,
    resetExistingActivity,
    onSave,
  };
};
