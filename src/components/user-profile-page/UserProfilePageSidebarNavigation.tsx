import { cn } from "@lib/utils";
import { userProfileRoutes } from "@routes/routes";
import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

function UserProfilePageSidebarNavigation() {
  const { pathname } = useLocation();
  const modifiedPath = useMemo(() => {
    // Split the pathname and attempt to get the second segment
    const pathSegments = pathname.split("/");
    // Check if the base path is exactly '/profile' (or '/profile/') and no further path, then consider 'profile' as the active segment
    if (
      pathSegments.length === 2 ||
      (pathSegments.length === 3 && pathSegments[2] === "")
    ) {
      return "profile"; // indicate the active state for the base profile route
    }
    return pathSegments[2];
  }, [pathname]);
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 p-4 rounded-md bg-gradient-to-br from-primary/30 via-primary/70 to-primary">
      {userProfileRoutes.map((link) => {
        const isActive =
          modifiedPath === (link.path === "" ? "profile" : link.path);
        return (
          <NavLink
            key={link.path}
            to={`/profile/${link.path}`}
            className={cn(
              "w-full p-4 bg-background/80 rounded-md text-text-color text-base font-medium hover:bg-background hover:text-accent transition-all duration-300 ease-in-out",
              {
                "text-accent bg-background": isActive,
              },
            )}
          >
            {link.name}
          </NavLink>
        );
      })}
    </div>
  );
}

export default UserProfilePageSidebarNavigation;
