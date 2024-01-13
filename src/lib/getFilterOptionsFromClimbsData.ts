import type { Climb, ClimbCategory } from "@type-definitions/Climb";

export const getFilterOptionsFromClimbsData = (climbs: Climb[]) => {
  const cities = climbs.map((climb) => climb.location.city);
  const states = climbs.map((climb) => climb.location.state);
  const countries = climbs.map((climb) => climb.location.country);
  const uniqueCities = [...new Set(cities)];
  const uniqueStates = [...new Set(states)];
  const uniqueCountries = [...new Set(countries)];

  const categoryOrder: ClimbCategory[] = [
    "one",
    "two",
    "three",
    "four",
    "Hors Catégorie (HC)",
  ];
  const uniqueCategories = [
    ...new Set(climbs.map((climb) => climb.category)),
  ].sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b));

  return { uniqueCities, uniqueStates, uniqueCountries, uniqueCategories };
};
