import { Button } from "@components/ui/button/button";
import { IconLoaderQuarter } from "@tabler/icons-react";
import { POIApiResponse } from "@type-definitions/PointOfInterest";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import PointOfInterestItem from "./PointOfInterestItem";

type PointOfInterestListProps = {
  pois: POIApiResponse | null;
};

function PointOfInterestList({ pois }: PointOfInterestListProps) {
  const { t } = useTranslation();
  const POIFeatures = useMemo(() => {
    return pois?.features || [];
  }, [pois]);
  return (
    <div className="flex flex-col justify-between w-full h-full gap-1 rounded-md shadow-sm">
      <h5 className="px-4 py-2 text-lg font-medium text-text-color">
        {t("points-of-interest.title")}
      </h5>
      <div className="flex flex-col items-start justify-start w-full h-[95%] gap-4 p-4 overflow-x-hidden overflow-y-auto scrollbar-hide scroll-smooth">
        {POIFeatures.length === 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-light text-text-color text-pretty"
            iconLeft={<IconLoaderQuarter className="animate-spin" />}
          >
            {t("points-of-interest.searching")}
          </Button>
        )}
        {POIFeatures.map((feature, index) => {
          return <PointOfInterestItem key={index} feature={feature} />;
        })}
      </div>
    </div>
  );
}

export default PointOfInterestList;
