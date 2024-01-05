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
    name: "All Climbs",
    path: "/climbs",
  },
  {
    name: "PR Estimator",
    path: "/pr-estimator",
  },
];
