import { ReactNode } from "react";

type ActivityCardDetailProps = {
  icon: ReactNode;
  name: string;
  value: string;
};

function ActivityCardDetail({ icon, name, value }: ActivityCardDetailProps) {
  return (
    <div className="inline-flex items-center gap-2 shrink-0">
      {icon}

      <div className="w-1/2 mt-1.5 md:mt-0 flex-1">
        <p className="overflow-hidden text-text-color overflow-ellipsis whitespace-nowrap">
          {name}
        </p>

        <p className="overflow-hidden font-medium overflow-ellipsis whitespace-nowrap">
          {value}
        </p>
      </div>
    </div>
  );
}

export default ActivityCardDetail;
