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
  {
    name: "PR Estimator",
    path: "/pr-estimator",
  },
];
