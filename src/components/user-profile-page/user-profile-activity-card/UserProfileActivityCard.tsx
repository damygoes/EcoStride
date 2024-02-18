import defaultCardImage from "@assets/mountain-elevation.svg";
import ActivityCardActions from "@components/activity/activity/ActivityCardActions";
import { Activity } from "@type-definitions/Activity";
import { Link } from "react-router-dom";

type UserProfileActivityCardProps = {
  activity: Activity;
};

function UserProfileActivityCard({ activity }: UserProfileActivityCardProps) {
  return (
    <Link
      to={`/activities/${activity.slug}`}
      className="relative flex flex-col justify-end rounded-md w-60 h-60 aspect-square bg-background group"
    >
      <img
        alt={activity.name}
        src={
          activity.photos && activity.photos?.length > 1
            ? activity.photos[0]
            : defaultCardImage
        }
        onError={(e) => {
          const target = e.target as HTMLImageElement; // assert the target as an HTMLImageElement
          target.onerror = null; // prevents looping
          target.src = defaultCardImage; // set the default image
        }}
        className="absolute inset-0 object-cover w-full h-full transition-opacity rounded-lg opacity-75 group-hover:opacity-30"
      />

      <div className="relative p-4 bg-transparent sm:p-6 lg:p-8">
        <p className="text-sm font-medium tracking-widest capitalize text-text-color">
          {`${activity.address.city} ${activity.address.state}, ${activity.address.country}`}
        </p>

        <p className="text-xl font-bold text-text-color">{activity.name}</p>
      </div>
      <ActivityCardActions activity={activity} />
    </Link>
  );
}

export default UserProfileActivityCard;
