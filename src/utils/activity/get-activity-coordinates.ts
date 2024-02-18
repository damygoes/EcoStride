import { Activity } from "@type-definitions/Activity";

export function getActivityCoordinates(activity: Activity | null) {
  if (!activity) {
    return null;
  }
  if (!activity.startCoordinate || !activity.endCoordinate) {
    return null;
  }
  const startCoordinates = {
    longitude: activity.startCoordinate.longitude,
    latitude: activity.startCoordinate.latitude,
  };
  const endCoordinates = {
    longitude: activity.endCoordinate.longitude,
    latitude: activity.endCoordinate.latitude,
  };
  return { startCoordinates, endCoordinates };
}
