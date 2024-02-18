export type NavbarLink = {
  name: string;
  path: string;
};

export const navbarRoutes: NavbarLink[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Activities",
    path: "/activities",
  },
];

export const userProfileRoutes: NavbarLink[] = [
  {
    name: "Profile",
    path: "",
  },
  {
    name: "Bucket List",
    path: "my-bucket",
  },
  {
    name: "Liked Activities",
    path: "liked-activities",
  },
  {
    name: "Completed Activities",
    path: "completed-activities",
  },
];
