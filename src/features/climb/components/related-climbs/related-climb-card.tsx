import { Climb } from "@type-definitions/Climb";
import { Link } from "react-router-dom";

type RelatedClimbCardProps = {
  climb: Climb;
};

function RelatedClimbCard({ climb }: RelatedClimbCardProps) {
  return (
    <Link to={`/climbs/${climb.slug}`}>
      <li className="text-sm font-light cursor-pointer text-text-color/60 text-wrap hover:text-text-color/90">
        {climb.name}
      </li>
    </Link>
  );
}

export default RelatedClimbCard;
