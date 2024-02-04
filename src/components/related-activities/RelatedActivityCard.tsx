import { Activity } from "@type-definitions/Activity";
import { Link } from "react-router-dom";

type RelatedActivityCardProps = {
  activity: Activity;
};

function RelatedActivityCard({ activity }: RelatedActivityCardProps) {
  return (
    <Link to={`/activities/${activity.slug}`}>
      <li className="text-sm font-light cursor-pointer text-text-color/60 text-wrap hover:text-text-color/90">
        {activity.name}
      </li>
    </Link>
  );
}

export default RelatedActivityCard;
