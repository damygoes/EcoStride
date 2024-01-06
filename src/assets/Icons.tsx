import { cn } from "@lib/utils";
import distance from "./distance.svg";
import homepageIcon from "./homepage-icon.svg";
import elevation from "./mountain-elevation.svg";
import gradient from "./percentage.svg";

type IconProps = {
  className?: string;
};

function AverageGradientIcon({ className }: IconProps) {
  return (
    <img
      src={gradient}
      alt="avergae gradient icon"
      className={cn((className = "w-4 h-4 text-accent"), className)}
    />
  );
}

function DistanceIcon({ className }: IconProps) {
  return (
    <img
      src={distance}
      alt="distance-icon"
      className={cn((className = "w-4 h-4 text-accent"), className)}
    />
  );
}
function ElevationIcon({ className }: IconProps) {
  return (
    <img
      src={elevation}
      alt="elevation-icon"
      className={cn((className = "w-4 h-4 text-accent"), className)}
    />
  );
}

function HomepageHeaderIcon() {
  return <img src={homepageIcon} alt="homepage-icon" />;
}

export { AverageGradientIcon, DistanceIcon, ElevationIcon, HomepageHeaderIcon };
