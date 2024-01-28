import {
  AverageGradientIcon,
  DistanceIcon,
  ElevationIcon,
} from "@assets/Icons";
import defaultImage from "@assets/mountain-elevation.svg";
import type { Climb } from "@type-definitions/Climb";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ClimbCardDetail from "./ClimbCardDetail";

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
      className="block h-[28rem] max-w-sm p-4 overflow-hidden rounded-lg shadow-sm text-text-color shadow-accent/30 md:max-w-xs"
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
        className="object-cover w-full h-56 rounded-md"
      />

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Address</dt>

            <dd className="text-xs font-light text-text-color">
              {`${climb.location.city}, ${climb.location.state}, ${climb.location.country}`}
            </dd>
          </div>

          <div>
            <dt className="sr-only">Name</dt>

            <dd className="text-xl font-semibold">{climb.name}</dd>
          </div>
          <div>
            <dt className="sr-only">Summary</dt>

            <dd className="text-sm font-normal truncate text-pretty">
              {climb.summary}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-4 mt-6 text-xs">
          <ClimbCardDetail
            icon={<DistanceIcon />}
            name={t("climb-card.distance")}
            value={`${climb.distance}km`}
          />

          <ClimbCardDetail
            icon={<AverageGradientIcon />}
            name={t("climb-card.avg-grade")}
            value={`${climb.gradient.averageGrade}%`}
          />

          <ClimbCardDetail
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
