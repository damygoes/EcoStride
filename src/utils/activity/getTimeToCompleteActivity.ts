export const getTimeToCompleteActivity = (timeToComplete: number): string => {
  if (!timeToComplete) {
    return "Invalid Time";
  }

  const hours = Math.floor(timeToComplete / 60);
  const minutes = timeToComplete % 60;

  const hoursText = hours > 0 ? `${hours}h` : "";
  const minutesText = minutes > 0 ? `${minutes}mins` : "";

  return `${hoursText} ${minutesText}`.trim();
};
