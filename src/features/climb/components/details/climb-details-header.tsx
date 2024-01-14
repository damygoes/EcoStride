import {
  AverageGradientIcon,
  DistanceIcon,
  ElevationIcon,
  MaximumGradientIcon,
  MinimumGradientIcon,
} from "@assets/Icons";
import Badge from "@components/common/badge/badge";
import { Button } from "@components/ui/button/button";
import { useUserStore } from "@features/user/utils/user-store";
import { IconChecks, IconPlus } from "@tabler/icons-react";
import { Climb } from "@type-definitions/Climb";
import i18next from "i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { ClimbDetail } from "../card/climb-card";

type ClimbDetailsHeaderProps = {
  selectedClimb: Climb;
  t: typeof i18next.t;
};

function ClimbDetailsHeader({ selectedClimb, t }: ClimbDetailsHeaderProps) {
  const navigate = useNavigate();
  const currentURL = useLocation();
  const { user } = useUserStore();
  const handleAddToBucketList = () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      console.log("Add to bucket list");
    }
  };

  const handleMarkAsRidden = () => {
    if (user === null) {
      navigate("/login", { state: { from: currentURL }, replace: true });
    } else {
      console.log("Mark as ridden");
    }
  };

  return (
    <div className="flex flex-col items-start justify-between flex-1 w-full gap-4 md:flex-row md:items-center md:flex-none">
      {/* Left */}
      <div className="flex flex-col items-center justify-between flex-1 w-full gap-5 p-3 rounded-md bg-gradient-to-br from-text-color/10 via-text-color/40 to-secondary text-text-color md:h-full md:py-5 md:gap-8">
        <div className="space-y-2 text-center">
          <h3 className="text-3xl font-semibold">
            {selectedClimb.name.toLocaleUpperCase() || "Climb Name"}
          </h3>
          <p className="text-sm font-light">
            {`Located in ${selectedClimb.location.city}, ${selectedClimb.location.state}, ${selectedClimb.location.country}`}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center w-full gap-3">
          <Badge variant="accent">
            {`Category: ${selectedClimb.category.toLocaleUpperCase() || "N/A"}`}
          </Badge>
          {selectedClimb.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <ClimbDetail
            icon={<DistanceIcon />}
            name={t("climb-card.distance")}
            value={`${selectedClimb.distance}km`}
          />

          <ClimbDetail
            icon={<MinimumGradientIcon />}
            name={"Min. Gradient"}
            value={`${selectedClimb.gradient.minGrade}%`}
          />
          <ClimbDetail
            icon={<AverageGradientIcon />}
            name={t("climb-card.avg-grade")}
            value={`${selectedClimb.gradient.averageGrade}%`}
          />
          <ClimbDetail
            icon={<MaximumGradientIcon />}
            name={"Max. Gradient"}
            value={`${selectedClimb.gradient.maxGrade}%`}
          />

          <ClimbDetail
            icon={<ElevationIcon />}
            name={t("climb-card.elevation")}
            value={`${selectedClimb.elevationGain}m`}
          />
        </div>
        <div className="flex flex-wrap items-center justify-center w-full gap-4">
          <Button
            iconLeft={<IconPlus />}
            variant="primary"
            size="sm"
            onClick={handleAddToBucketList}
          >
            Add to my Bucket List
          </Button>
          <Button
            iconLeft={<IconChecks />}
            variant="secondary"
            size="sm"
            onClick={handleMarkAsRidden}
          >
            Already ridden
          </Button>
        </div>
      </div>
      {/* Right */}
      <div className="w-full rounded-md bg-inherit md:w-2/5 md:h-full">
        <img
          src="https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFwfGVufDB8fDB8fHww"
          alt="map"
          className="object-cover w-full h-full rounded-md"
        />
      </div>
    </div>
  );
}

export default ClimbDetailsHeader;
