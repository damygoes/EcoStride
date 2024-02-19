import Badge from "@components/common/badge/badge";
import { transformedCategory } from "@type-definitions/PointOfInterest";

type PointOfInterestFeatureCategoryBadgeProps = {
  poiCategories: transformedCategory[];
};

function PointOfInterestFeatureCategoryNameBadge({
  poiCategories,
}: PointOfInterestFeatureCategoryBadgeProps) {
  return (
    <>
      {poiCategories.map((tag, index) => {
        return (
          <Badge size="sm" key={index}>
            {tag.featureCategoryName}
          </Badge>
        );
      })}
    </>
  );
}

export default PointOfInterestFeatureCategoryNameBadge;
