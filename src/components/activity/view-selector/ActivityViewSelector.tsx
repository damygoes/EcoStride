import { cn } from "@lib/utils";
import {
  ACTIVITIES_VIEW_MODE,
  useActivity,
} from "@utils/activity/activity-store";
import { motion } from "framer-motion";

type ChipProps = {
  label: string;
  value: ACTIVITIES_VIEW_MODE;
};

const tabs: ChipProps[] = [
  {
    label: "Grid",
    value: "grid",
  },
  {
    label: "List",
    value: "list",
  },
];

const ActivityViewSelector = () => {
  const { activitiesViewMode, setActivitiesViewMode } = useActivity();

  const Chip = ({ label, value }: ChipProps) => {
    return (
      <button
        value={value}
        onClick={() => setActivitiesViewMode(value)}
        className={cn(
          "text-base transition-colors px-2.5 py-0.5 rounded-md relative",
          {
            "text-white": value === activitiesViewMode,
            "text-text-color hover:text-text-color/80 hover:bg-background":
              value !== activitiesViewMode,
          },
        )}
      >
        <span className="relative z-10">{label}</span>
        {value === activitiesViewMode && (
          <motion.span
            layoutId="pill-tab"
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-primary to-secondary"
          ></motion.span>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-md bg-background">
      {tabs.map((tab) => (
        <Chip key={tab.value} label={tab.label} value={tab.value} />
      ))}
    </div>
  );
};

export default ActivityViewSelector;
