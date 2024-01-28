import ClimbRequestCTA from "@components/climb/request/ClimbRequestCTA";
import { Climb } from "@type-definitions/Climb";
import ClimbFiltersAndSort from "./ClimbFiltersAndSort";

type FiltersProps = {
  climbs: Climb[];
};

function Filters({ climbs }: FiltersProps) {
  return (
    <div className="w-full h-full p-3 space-y-4 text-text-color">
      <ClimbFiltersAndSort climbs={climbs} />
      <ClimbRequestCTA />
    </div>
  );
}

export default Filters;
