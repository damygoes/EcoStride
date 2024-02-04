import {
  IconBike,
  IconQuestionMark,
  IconRun,
  IconWalk,
} from "@tabler/icons-react";

export const getActivityCardBadgeInfo = (activityType: string) => {
  switch (activityType) {
    case "Bike":
      return {
        color: "bg-accent",
        icon: IconBike,
      };
    case "Hike":
      return {
        color: "bg-secondary",
        icon: IconWalk,
      };
    case "Run":
      return {
        color: "bg-primary",
        icon: IconRun,
      };
    default:
      return {
        color: "bg-background",
        icon: IconQuestionMark,
      };
  }
};
