import { Activity } from "@type-definitions/Activity";
import RelatedActivityCard from "./RelatedActivityCard";

type RelatedActivityListSectionProps = {
  title: string;
  activitiesToRender: Activity[];
};

function RelatedActivityListSection({
  title,
  activitiesToRender,
}: RelatedActivityListSectionProps) {
  if (!activitiesToRender || activitiesToRender.length === 0) return null;
  return (
    <div className="flex flex-col items-start justify-start w-full h-32 gap-1">
      <h6 className="pb-[0.2rem] text-sm font-normal text-balance">{title}</h6>
      <hr className="w-11/12 border-b border-solid border-text-color/50" />
      <ul className="flex-1 w-full px-3 overflow-x-hidden overflow-y-auto list-disc list-inside scrollbar-hide">
        {activitiesToRender.map((similarActivity) => (
          <RelatedActivityCard
            key={similarActivity.id}
            activity={similarActivity}
          />
        ))}
      </ul>
    </div>
  );
}

export default RelatedActivityListSection;
