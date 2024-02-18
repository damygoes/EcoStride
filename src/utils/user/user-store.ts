import { UserLocationContext } from "@context/user-location-provider/UserLocationProvider";
import { axiosClient } from "@services/axios/axios-client";
import type { User } from "@type-definitions/User";
import { useContext } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (user: User) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (user) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...user } });
        }
      },
    }),
    {
      name: "user-store", // The name of the store
      version: 1, // Versioning the store is useful for migrations and helps keeps the cache fresh i.e. Increment version to reset state
      // partialize: (state) => {
      // const { userLocation, ...rest } = state;
      // return rest as Omit<typeof state, "userLocation">; // Ensures type safety
      // },
    },
  ),
);

export const useUser = () => {
  const { user, setUser, updateUser } = useUserStore();
  const userGeoLocation = useContext(UserLocationContext);

  const userGeolocationData = {
    latitude: userGeoLocation?.latitude,
    longitude: userGeoLocation?.longitude,
    city: userGeoLocation?.city,
    state: userGeoLocation?.state,
    country: userGeoLocation?.country,
    loading: userGeoLocation?.loading,
    error: userGeoLocation?.error,
    cityAndState:
      userGeoLocation?.city && userGeoLocation.state
        ? `${userGeoLocation.city}, ${userGeoLocation.state}`
        : null,
  };

  const fetchUser = async () => {
    const response = await axiosClient.get(`/users/current-user`);
    return response.data;
  };
  const fetchUserDetails = async () => {
    const response = await axiosClient.get(`/users/${user?.id}`);
    return response.data as User;
  };

  const updateUserDetails = async (updatedUser: User) => {
    const response = await axiosClient.patch(`/users/${user?.id}`, updatedUser);
    return response.data as User;
  };

  const getUsersBucketList = async (id: string | null) => {
    const response = await axiosClient.get(`/users/${id}/bucket-list`);
    return response.data;
  };

  const getUsersLikedActivities = async (id: string | null) => {
    const response = await axiosClient.get(`/users/${id}/liked-activities`);
    return response.data;
  };

  const getUsersCompletedActivities = async (id: string | null) => {
    const response = await axiosClient.get(`/users/${id}/done-activities`);
    return response.data;
  };

  const removeActivityFromBucketList = async ({
    activitySlug,
    userId,
  }: {
    activitySlug: string;
    userId: string;
  }) => {
    const response = await axiosClient.delete(
      `/users/${userId}}/bucket-list/${activitySlug}`,
    );
    return response.data;
  };

  const removeActivityFromCompletedList = async ({
    activitySlug,
    userId,
  }: {
    activitySlug: string;
    userId: string;
  }) => {
    const response = await axiosClient.delete(
      `/users/${userId}}/done-activities/${activitySlug}`,
    );
    return response.data;
  };

  const removeActivityFromLikedList = async ({
    activitySlug,
    userId,
  }: {
    activitySlug: string;
    userId: string;
  }) => {
    const response = await axiosClient.delete(
      `/users/${userId}}/liked-activities/${activitySlug}`,
    );
    return response.data;
  };

  return {
    user,
    setUser,
    updateUser,
    userGeolocationData,
    fetchUser,
    fetchUserDetails,
    updateUserDetails,
    getUsersBucketList,
    getUsersLikedActivities,
    getUsersCompletedActivities,
    removeActivityFromBucketList,
    removeActivityFromCompletedList,
    removeActivityFromLikedList,
  };
};
