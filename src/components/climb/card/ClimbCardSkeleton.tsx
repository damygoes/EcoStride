import { useClimb } from "@utils/climb/climb-store";

function ClimbCardSkeleton() {
  const { climbsViewMode } = useClimb();

  if (climbsViewMode === "list") {
    return (
      <div className="flex items-center justify-start w-full h-24 gap-4 p-3 overflow-hidden rounded-lg shadow-sm text-text-color shadow-accent/30 animate-pulse" />
    );
  }

  return (
    <div className="block max-w-sm p-4 overflow-hidden rounded-lg shadow-sm animate-pulse text-text-color shadow-accent/30 md:max-w-xs">
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

export default ClimbCardSkeleton;
