import Badge from "@components/common/badge/badge";
import { transformedCategory } from "@type-definitions/PointOfInterest";

type PointOfInterestFeatureCategoryBadgeProps = {
  poiCategories: transformedCategory[];
};

function PointOfInterestFeatureCategoryBadge({
  poiCategories,
}: PointOfInterestFeatureCategoryBadgeProps) {
  return (
    <>
      {poiCategories.map((tag, index) => {
        return (
          <Badge size="sm" key={index}>
            {tag.featureCategoryGroup}
          </Badge>
        );
      })}
    </>
  );
}

export default PointOfInterestFeatureCategoryBadge;
