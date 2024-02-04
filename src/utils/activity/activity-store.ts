import { axiosClient } from "@services/axios/axios-client";
import { Activity } from "@type-definitions/Activity";
import { create } from "zustand";

export type ACTIVITIES_VIEW_MODE = "grid" | "list";

type ActivityStore = {
  activitiesViewMode: ACTIVITIES_VIEW_MODE;
  setActivitiesViewMode: (view: "grid" | "list") => void;
};

const useActivityStore = create<ActivityStore>((set) => ({
  activitiesViewMode: "grid",
  setActivitiesViewMode: (view) => {
    set({ activitiesViewMode: view });
  },
}));

export const useActivity = () => {
  const { activitiesViewMode, setActivitiesViewMode } = useActivityStore();

  const fetchActivities = async (cityQuery?: string | null) => {
    const url = cityQuery ? `/activities?city=${cityQuery}` : "/activities";
    const response = await axiosClient.get(url);
    return response.data as Activity[];
  };

  const fetchActivity = async (activitySlug?: string | null) => {
    const response = await axiosClient.get(`/activities/${activitySlug}`);
    return response.data as Activity;
  };

  return {
    activitiesViewMode,
    setActivitiesViewMode,
    fetchActivities,
    fetchActivity,
  };
};
