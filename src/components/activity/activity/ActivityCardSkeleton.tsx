import { useActivity } from "@utils/activity/activity-store";

function ActivityCardSkeleton() {
  const { activitiesViewMode } = useActivity();

  if (activitiesViewMode === "list") {
    return (
      <div className="w-full h-24 p-3 overflow-hidden rounded-lg bg-text-color/10 animate-pulse" />
    );
  }

  return (
    <div className="block p-4 overflow-hidden rounded-lg shadow-sm w-80 animate-pulse text-text-color shadow-accent/30">
      <div className="w-full h-56 rounded-md bg-text-color/20" />

      <div className="mt-2">
        <div className="space-y-2">
          <div className="w-1/2 h-4 rounded-md bg-text-color/20" />
          <div className="w-11/12 h-5 rounded-md bg-text-color/20" />
          <div className="w-3/4 rounded-md h-7 bg-text-color/20" />
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-6 text-xs">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-1/5 rounded-md h-7 bg-text-color/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActivityCardSkeleton;
