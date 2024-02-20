export type navbarRoutes = "navbarHome" | "navbarActivities";
export type userProfileRoutes =
  | "userProfile"
  | "userBucketList"
  | "userLikedActivities"
  | "userCompletedActivities";

export type NavbarLink = {
  name: string;
  path: string;
};

export const navbarRoutes: NavbarLink[] = [
  {
    name: "navbarHome",
    path: "/",
  },
  {
    name: "navbarActivities",
    path: "/activities",
  },
];

export const userProfileRoutes: NavbarLink[] = [
  {
    name: "userProfile",
    path: "",
  },
  {
    name: "userBucketList",
    path: "my-bucket",
  },
  {
    name: "userLikedActivities",
    path: "liked-activities",
  },
  {
    name: "userCompletedActivities",
    path: "completed-activities",
  },
];
