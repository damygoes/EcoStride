import { Feature } from "@type-definitions/PointOfInterest";
import { getPOICategories } from "@utils/point-of-interest/getPOICategories";
import { useMemo } from "react";
import PointOfInterestFeatureCategoryBadge from "./PointOfInterestFeatureCategoryGroupBadge";
import PointOfInterestFeatureCategoryNameBadge from "./PointOfInterestFeatureCategoryNameBadge";

type PointOfInterestItemProps = {
  feature: Feature;
};

function PointOfInterestItem({ feature }: PointOfInterestItemProps) {
  const categoryItems = useMemo(() => {
    const categories = Object.values(feature.properties.category_ids || {}).map(
      (value) => ({
        category_group: value.category_group,
        category_name: value.category_name,
      }),
    );
    return categories;
  }, [feature]);

  const poiCategories = useMemo(
    () => getPOICategories({ categoryItems }),
    [categoryItems],
  );

  const featureName = useMemo(() => {
    return feature.properties.osm_tags?.name;
  }, [feature.properties.osm_tags?.name]);

  return (
    <>
      {featureName !== undefined && (
        <>
          <div className="flex flex-col flex-wrap items-start justify-between w-full h-48 gap-3 p-3 rounded-md cursor-default text-pretty bg-gradient-to-br from-secondary/10 via-secondary/20 to-secondary/10">
            <h5 className="text-sm font-semibold text-text-color">
              {feature.properties.osm_tags?.name}
            </h5>
            <div className="flex flex-wrap items-center justify-start w-full gap-2">
              <PointOfInterestFeatureCategoryNameBadge
                poiCategories={poiCategories}
              />
              <PointOfInterestFeatureCategoryBadge
                poiCategories={poiCategories}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PointOfInterestItem;
