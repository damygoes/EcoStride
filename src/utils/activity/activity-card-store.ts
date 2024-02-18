import { create } from "zustand";

export type PageContext =
  | "bucketList"
  | "likedActivities"
  | "completedActivities";

export type ActivityCardType = "user-profile" | "activity";

type ActivityCardStore = {
  cardType: ActivityCardType;
  activityCardPageContext: PageContext;
  setActivityCardType: (type: ActivityCardType) => void;
  setActivityCardPageContext: (context: PageContext) => void;
};

const useActivityCardStore = create<ActivityCardStore>((set) => ({
  cardType: "activity",
  activityCardPageContext: "bucketList",
  setActivityCardType: (type) => set({ cardType: type }),
  setActivityCardPageContext: (context) =>
    set({ activityCardPageContext: context }),
}));

export const useActivityCard = () => {
  const {
    cardType,
    activityCardPageContext,
    setActivityCardType,
    setActivityCardPageContext,
  } = useActivityCardStore();

  return {
    cardType,
    activityCardPageContext,
    setActivityCardType,
    setActivityCardPageContext,
  };
};
