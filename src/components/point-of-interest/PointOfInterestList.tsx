import { POI } from "@type-definitions/PointOfInterest";
import PointOfInterestItem from "./PointOfInterestItem";

type PointOfInterestListProps = {
  pois: POI[];
};

function PointOfInterestList({ pois }: PointOfInterestListProps) {
  return (
    <div className="w-full h-full overflow-hidden rounded-md shadow-sm bg-background">
      <h5 className="p-4 text-lg font-medium uppercase text-text-color">
        Cafes around
      </h5>
      <div className="flex flex-col items-start justify-start gap-4 p-4">
        {pois.length === 0 && (
          <p className="text-sm font-light text-text-color">
            No cafes found around this activity route
          </p>
        )}
        {pois.map((poi) => {
          return <PointOfInterestItem key={poi.id} poi={poi} />;
        })}
      </div>
    </div>
  );
}

export default PointOfInterestList;
