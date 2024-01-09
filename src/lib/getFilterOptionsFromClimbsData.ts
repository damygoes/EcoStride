import type { Climb } from "@type-definitions/Climb";

export const getFilterOptionsFromClimbsData = (climbs: Climb[]) => {
  const cities = climbs.map((climb) => climb.city);
  const state = climbs.map((climb) => climb.state);
  const country = climbs.map((climb) => climb.country);
  const uniqueCities = [...new Set(cities)];
  const uniqueStates = [...new Set(state)];
  const uniqueCountries = [...new Set(country)];
  return { uniqueCities, uniqueStates, uniqueCountries };
};
