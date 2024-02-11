import { Activity } from "@type-definitions/Activity";
import { create } from "zustand";

type ActivityFormStore = {
  activity: Activity | null;
  setActivity: (activity: Activity) => void;
  resetActivity: () => void;
  onSave: () => void;
};

const useActivityFormStore = create<ActivityFormStore>((set) => ({
  activity: null,
  setActivity: (activity) => {
    set({ activity });
  },
  resetActivity: () => {
    set({ activity: null });
  },
  onSave: () => {},
}));

export const useActivityForm = () => {
  const { activity, setActivity, resetActivity, onSave } =
    useActivityFormStore();

  return {
    activity,
    setActivity,
    resetActivity,
    onSave,
  };
};
