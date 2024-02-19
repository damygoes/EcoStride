import Badge from "@components/common/badge/badge";
import { POI } from "@type-definitions/PointOfInterest";
import { useMemo } from "react";

type PointOfInterestItemProps = {
  poi: POI;
};

function PointOfInterestItem({ poi }: PointOfInterestItemProps) {
  const poiTags = useMemo(() => {
    const tags = poi.properties.category.split(",");
    return tags;
  }, [poi.properties.category]);

  return (
    <div className="flex flex-col items-start justify-between gap-3 p-5 rounded-md cursor-default bg-gradient-to-br from-primary/10 via-primary/20 to-primary/60 ">
      <div className="space-y-1">
        <h5 className="text-sm font-semibold">{poi.text}</h5>
        <p className="text-sm font-light text-balance">{poi.place_name}</p>
      </div>
      <div className="flex items-center justify-start w-full gap-3">
        {poiTags.map((tag) => {
          return <Badge key={tag}>{tag}</Badge>;
        })}
      </div>
    </div>
  );
}

export default PointOfInterestItem;
