import {
  AverageGradientIcon,
  DistanceIcon,
  ElevationIcon,
} from "@assets/Icons";
import defaultImage from "@assets/mountain-elevation.svg";
import type { Climb } from "@type-definitions/Climb";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ClimbDetail = ({
  icon,
  name,
  value,
}: {
  icon: ReactNode;
  name: string;
  value: string;
}) => {
  return (
    <div className="inline-flex items-center gap-2 shrink-0">
      {icon}

      <div className="w-1/2 mt-1.5 md:mt-0 flex-1">
        <p className="overflow-hidden text-text-color overflow-ellipsis whitespace-nowrap">
          {name}
        </p>

        <p className="overflow-hidden font-medium overflow-ellipsis whitespace-nowrap">
          {value}
        </p>
      </div>
    </div>
  );
};

function ClimbCard({
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
      className="block max-w-sm p-4 overflow-hidden rounded-lg shadow-sm text-text-color shadow-accent/30 md:max-w-xs"
    >
      <img
        alt="climb photo"
        src={climb.photos[0]}
        onError={(e) => {
          const target = e.target as HTMLImageElement; // assert the target as an HTMLImageElement
          target.onerror = null; // prevents looping
          target.src = defaultImage; // set the default image
        }}
        className="object-cover w-full h-56 rounded-md"
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Address</dt>

            <dd className="text-xs font-light text-text-color">
              {`${climb.city}, ${climb.state}, ${climb.country}`}
            </dd>
          </div>

          <div>
            <dt className="sr-only">Name</dt>

            <dd className="text-xl font-semibold">{climb.name}</dd>
          </div>
          <div>
            <dt className="sr-only">Description</dt>

            <dd className="text-sm font-normal truncate text-pretty">
              {climb.description}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-4 mt-6 text-xs">
          <ClimbDetail
            icon={<DistanceIcon />}
            name={t("climb-card.distance")}
            value={`${climb.distance}km`}
          />

          <ClimbDetail
            icon={<AverageGradientIcon />}
            name={t("climb-card.avg-grade")}
            value={`${climb.averageGrade}%`}
          />

          <ClimbDetail
            icon={<ElevationIcon />}
            name={t("climb-card.elevation")}
            value={`${climb.elevationGain}m`}
          />
        </div>
      </div>
    </Link>
  );
}

export default ClimbCard;
