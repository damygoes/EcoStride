import { BucketListActivity } from "@components/activity/details/ActivityDetailsHeaderAddToBucketListManager";
import { DoneActivity } from "@components/activity/details/ActivityDetailsHeaderMarkAsRiddenIconManager";
import { axiosClient } from "@services/axios/axios-client";
import { Activity, ActivityRequestObject } from "@type-definitions/Activity";
import { create } from "zustand";

export type ACTIVITIES_VIEW_MODE = "grid" | "list";
export type UserActionOnAnActivity =
  | "addToBucketList"
  | "alreadyCompleted"
  | "like"
  | "unlike"
  | "removeFromBucketList"
  | "unmarkAsCompleted";

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
  const fetchRelatedActivitiesByCity = async (city: string) => {
    const response = await axiosClient.get(`/activities?city=${city}`);
    return response.data as Activity[];
  };

  const fetchRelatedActivitiesByState = async (state: string) => {
    const response = await axiosClient.get(`/activities?state=${state}`);
    return response.data as Activity[];
  };

  const fetchRelatedActivitiesByCountry = async (country: string) => {
    const response = await axiosClient.get(`/activities?country=${country}`);
    return response.data as Activity[];
  };

  const fetchRelatedActivitiesByCategory = async (category: string) => {
    const response = await axiosClient.get(`/activities?category=${category}`);
    return response.data as Activity[];
  };

  const createActivity = async (activity: ActivityRequestObject) => {
    const response = await axiosClient.post("/activities/", activity);
    return response.data as Activity;
  };

  const updateActivity = async (updatedActivity: Activity) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, slug, ...newUpdateBody } = updatedActivity;

    const response = await axiosClient.patch(
      `/activities/${updatedActivity.slug}`,
      newUpdateBody,
    );
    return response.data as Activity;
  };

  const getActivityLikesCount = async (activitySlug: string | null) => {
    const response = await axiosClient.get(`/activities/${activitySlug}/likes`);
    return response.data;
  };

  const deleteActivity = async (activitySlug: string) => {
    const response = await axiosClient.delete(`/activities/${activitySlug}`);
    return response.data;
  };

  const fetchAllDoneActivities = async () => {
    const response = await axiosClient.get("/activities?done=true");
    return response.data as DoneActivity[];
  };

  const fetchAllBucketListActivities = async () => {
    const response = await axiosClient.get("/activities?bucketList=true");
    return response.data as BucketListActivity[];
  };

  const effectUserActionOnActivity = async ({
    activitySlug,
    action,
  }: {
    activitySlug: string;
    action: UserActionOnAnActivity;
  }) => {
    const response = await axiosClient.post(
      `/activities/${activitySlug}?${action}=true`,
    );
    return response.data;
  };

  return {
    activitiesViewMode,
    setActivitiesViewMode,
    fetchActivities,
    fetchRelatedActivitiesByCity,
    fetchRelatedActivitiesByState,
    fetchRelatedActivitiesByCountry,
    fetchRelatedActivitiesByCategory,
    fetchActivity,
    createActivity,
    updateActivity,
    deleteActivity,
    effectUserActionOnActivity,
    getActivityLikesCount,
    fetchAllDoneActivities,
    fetchAllBucketListActivities,
  };
};
