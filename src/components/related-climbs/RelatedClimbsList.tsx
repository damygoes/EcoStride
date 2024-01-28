import { Climb } from "@type-definitions/Climb";
import { useClimb } from "@utils/climb/climb-store";
import { useMemo } from "react";
import RelatedClimbCard from "./RelatedClimbCard";

type RelatedClimbsListProps = {
  selectedClimb: Climb;
};

type ClimbListSectionProps = {
  title: string;
  climbsToRender: Climb[];
};

type Section = {
  getLabel: (climb: Climb) => string;
  label: string;
};
const ClimbListSection = ({ title, climbsToRender }: ClimbListSectionProps) => (
  <div className="flex flex-col items-start justify-start w-full h-32 gap-1">
    <h6 className="pb-[0.2rem] text-sm font-normal capitalize text-balance">
      {title}
    </h6>
    <hr className="w-11/12 border-b border-solid border-text-color/50" />
    <ul className="flex-1 w-full px-3 overflow-x-hidden overflow-y-auto list-disc list-inside">
      {climbsToRender.map((similarClimb) => (
        <RelatedClimbCard key={similarClimb.id} climb={similarClimb} />
      ))}
    </ul>
  </div>
);

const RelatedClimbsList = ({ selectedClimb }: RelatedClimbsListProps) => {
  const { fetchClimbs } = useClimb({
    query: {
      city: selectedClimb.location.city ?? "",
    },
  });
  const { data: climbs } = fetchClimbs;

  const sections: Section[] = useMemo(
    () => [
      {
        getLabel: (climb) => climb.location.city ?? "",
        label: "city",
      },
      {
        getLabel: (climb) => climb.location.state ?? "",
        label: "state",
      },
      {
        getLabel: (climb) => climb.location.country,
        label: "country",
      },
      {
        getLabel: (climb) => `category ${climb.category}`,
        label: "category",
      },
    ],
    [],
  );

  const filterClimbs = (getLabel: (climb: Climb) => string) =>
    climbs?.filter(
      (climb) =>
        getLabel(climb) === getLabel(selectedClimb) &&
        climb.id !== selectedClimb.id,
    );

  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-4 p-3 overflow-x-hidden overflow-y-auto rounded-md text-text-color bg-gradient-to-br from-primary/60 via-primary to-secondary">
      {sections.map(({ getLabel, label }) => {
        const filteredClimbs = filterClimbs(getLabel);
        if ((filteredClimbs?.length ?? 0) > 0) {
          const title =
            filteredClimbs && filteredClimbs?.length > 1
              ? `${filteredClimbs?.length} more climbs in ${label}`
              : `${filteredClimbs?.length} more climb in ${label}`;
          return (
            <ClimbListSection
              key={label}
              title={title}
              climbsToRender={filteredClimbs ?? []}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default RelatedClimbsList;
