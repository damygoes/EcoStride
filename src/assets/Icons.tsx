import { cn } from "@lib/utils";
import maximumGradient from "./chart-maximum.svg";
import minimumGradient from "./chart-minimum.svg";
import defaultCardImage from "./default-card-image.svg";
import distance from "./distance.svg";
import homepageIcon from "./homepage-icon.svg";
import elevation from "./mountain-elevation.svg";
import EndPin from "./mountain-location.svg";
import gradient from "./percentage.svg";
import startPin from "./pin.svg";

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

function DefaultClimbCardImage({ className }: IconProps) {
  return (
    <img
      src={defaultCardImage}
      alt="mountain-icon"
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
function EndMapPin() {
  return <img src={EndPin} alt="end pin map point" className="w-12 h-12" />;
}

function HomepageHeaderIcon() {
  return <img src={homepageIcon} alt="homepage-icon" />;
}
function MaximumGradientIcon({ className }: IconProps) {
  return (
    <img
      src={maximumGradient}
      alt="maximum-gradient-icon"
      className={cn((className = "w-4 h-4 text-accent"), className)}
    />
  );
}
function MinimumGradientIcon({ className }: IconProps) {
  return (
    <img
      src={minimumGradient}
      alt="minimum-gradient-icon"
      className={cn((className = "w-4 h-4 text-accent"), className)}
    />
  );
}
function StartMapPin() {
  return (
    <img src={startPin} alt="start pin map point" className="w-12 h-12 " />
  );
}

export {
  AverageGradientIcon,
  DefaultClimbCardImage,
  DistanceIcon,
  ElevationIcon,
  EndMapPin,
  HomepageHeaderIcon,
  MaximumGradientIcon,
  MinimumGradientIcon,
  StartMapPin,
};
