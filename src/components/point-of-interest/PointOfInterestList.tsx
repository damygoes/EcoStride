import { POIApiResponse } from "@type-definitions/PointOfInterest";
import { useMemo } from "react";
import PointOfInterestItem from "./PointOfInterestItem";

type PointOfInterestListProps = {
  pois: POIApiResponse | null;
};

function PointOfInterestList({ pois }: PointOfInterestListProps) {
  const POIFeatures = useMemo(() => {
    return pois?.features || [];
  }, [pois]);
  return (
    <div className="flex flex-col justify-between w-full h-full gap-1 rounded-md shadow-sm">
      <h5 className="px-4 py-2 text-lg font-medium text-text-color">
        Points of Interest
      </h5>
      <div className="flex flex-col items-start justify-start w-full h-[95%] gap-4 p-4 overflow-x-hidden overflow-y-auto scrollbar-hide">
        {POIFeatures.length === 0 && (
          <p className="text-sm font-light text-text-color">
            Looking for points of interests around this area...
          </p>
        )}
        {POIFeatures.map((feature, index) => {
          return <PointOfInterestItem key={index} feature={feature} />;
        })}
      </div>
    </div>
  );
}

export default PointOfInterestList;
