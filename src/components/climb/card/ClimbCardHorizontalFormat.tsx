import {
  AverageGradientIcon,
  DistanceIcon,
  ElevationIcon,
} from "@assets/Icons";
import defaultImage from "@assets/mountain-elevation.svg";
import { cn } from "@lib/utils";
import type { Climb } from "@type-definitions/Climb";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const ClimbCardHorizontalFormatDetail = ({
  icon,
  value,
  className,
}: {
  icon: ReactNode;
  name: string;
  value: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-2 shrink-0 md:flex-row",
        className,
      )}
    >
      {icon}
      <p className="overflow-hidden font-medium overflow-ellipsis whitespace-nowrap">
        {value}
      </p>
    </div>
  );
};

function ClimbCardHorizontalFormat({
  climb,
  basePath = "climbs",
}: {
  climb: Climb;
  basePath?: string;
}) {
  const { t } = useTranslation();

  if (!climb) {
    return null;
  }

  return (
    <Link
      to={`/${basePath}/${climb.slug}`}
      className="flex items-center justify-start w-full h-24 gap-4 p-3 overflow-hidden rounded-lg shadow-sm text-text-color shadow-accent/30"
    >
      <img
        alt="climb photo"
        src={
          climb.photos && climb.photos?.length > 1
            ? climb.photos[0]
            : defaultImage
        }
        onError={(e) => {
          const target = e.target as HTMLImageElement; // assert the target as an HTMLImageElement
          target.onerror = null; // prevents looping
          target.src = defaultImage; // set the default image
        }}
        className="object-cover w-24 h-full rounded-md shrink-0"
      />

      <dl className="flex flex-col items-start justify-center flex-1 h-full">
        <div>
          <dt className="sr-only">Address</dt>

          <dd className="hidden md:flex md:text-xs md:font-light md:text-text-color">
            {`${climb.location.city}, ${climb.location.state}, ${climb.location.country}`}
          </dd>
        </div>

        <div>
          <dt className="sr-only">Name</dt>

          <dd className="text-base font-semibold line-clamp-1 md:text-lg">
            {climb.name}
          </dd>
        </div>
      </dl>
      <dl className="flex-1">
        <dt className="sr-only">Summary</dt>

        <dd className="hidden lg:flex lg:text-sm lg:font-normal lg:text-pretty">
          {climb.summary}
        </dd>
      </dl>

      <div className="flex items-center justify-center flex-1 h-full gap-4 text-base">
        <ClimbCardHorizontalFormatDetail
          icon={<DistanceIcon />}
          name={t("climb-card.distance")}
          value={`${climb.distance}km`}
        />

        <ClimbCardHorizontalFormatDetail
          icon={<AverageGradientIcon />}
          name={t("climb-card.avg-grade")}
          value={`${climb.gradient.averageGrade}%`}
        />

        <ClimbCardHorizontalFormatDetail
          icon={<ElevationIcon />}
          name={t("climb-card.elevation")}
          value={`${climb.elevationGain}m`}
        />
      </div>
    </Link>
  );
}

export default ClimbCardHorizontalFormat;
