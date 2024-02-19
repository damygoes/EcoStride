import { Category } from "@type-definitions/PointOfInterest";

type getPOICategoriesProps = {
  categoryItems: Category[];
};

export const getPOICategories = ({ categoryItems }: getPOICategoriesProps) => {
  if (!categoryItems || categoryItems.length === 0) {
    return [];
  }
  return categoryItems.map((category) => {
    const featureCategoryGroup = category.category_group.split("_").join(" ");
    const featureCategoryName = category.category_name.split("_").join(" ");

    return {
      featureCategoryGroup,
      featureCategoryName,
    };
  });
};
