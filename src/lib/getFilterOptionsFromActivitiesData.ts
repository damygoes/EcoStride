import type { Activity, ClimbCategory } from "@type-definitions/Activity";

export const getFilterOptionsFromActivitiesData = (activities: Activity[]) => {
  if (!activities) return null;
  const cities = activities.map((activity) => activity.address.city);
  const states = activities.map((activity) => activity.address.state);
  const countries = activities.map((activity) => activity.address.country);
  const uniqueCities = [...new Set(cities)];
  const uniqueStates = [...new Set(states)];
  const uniqueCountries = [...new Set(countries)];

  const categoryOrder: ClimbCategory[] = [
    "one",
    "two",
    "three",
    "four",
    "hors-categorie",
  ];
  const uniqueCategories = [
    ...new Set(
      activities
        .map((activity) => activity.climbCategory)
        .filter((category) => category !== null && category !== undefined),
    ),
  ].sort((a, b) => {
    const indexA = categoryOrder.indexOf(a!); // 'a!' tells TypeScript i'm sure 'a' is not null/undefined
    const indexB = categoryOrder.indexOf(b!);
    return indexA - indexB;
  });

  return { uniqueCities, uniqueStates, uniqueCountries, uniqueCategories };
};
