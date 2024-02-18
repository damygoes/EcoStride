import { Activity } from "@type-definitions/Activity";
import { ReactNode } from "react";
import UserProfileActivityCard from "./user-profile-activity-card/UserProfileActivityCard";

type UserProfileActivitiesSectionAndListProps = {
  title: string | ReactNode;
  activities: Activity[] | null;
  emptyMessage?: string;
};

function UserProfileActivitiesSectionAndList({
  title,
  activities,
  emptyMessage,
}: UserProfileActivitiesSectionAndListProps) {
  if (!activities) {
    return null;
  }
  return (
    <div className="flex flex-col items-start justify-between w-full h-full p-4 overflow-hidden rounded-md gap-7">
      <h3 className="text-2xl text-text-color">{title}</h3>
      <div className="flex flex-wrap items-start justify-start flex-1 w-full gap-4 p-2 overflow-x-hidden overflow-y-auto rounded-md shadow-sm bg-background">
        {activities.length === 0 && (
          <p className="text-center">{emptyMessage}</p>
        )}
        {activities.map((activity) => {
          return (
            <UserProfileActivityCard key={activity.slug} activity={activity} />
          );
        })}
      </div>
    </div>
  );
}

export default UserProfileActivitiesSectionAndList;
