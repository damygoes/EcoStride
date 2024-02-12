import { IconEdit, IconTrashXFilled } from "@tabler/icons-react";
import { Activity } from "@type-definitions/Activity";
import { useActivityActions } from "@utils/activity/activity-actions-store";
import { useActivityForm } from "@utils/activity/activity-form-store";

type ActivityCardActionsProps = {
  activity: Activity;
};

function ActivityCardActions({ activity }: ActivityCardActionsProps) {
  const { setIsActivityRequestModalOpen, setIsActivityDeleteModalOpen } =
    useActivityActions();
  const { setExistingActivity } = useActivityForm();

  const handleEditActivity = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsActivityRequestModalOpen(true);
    setIsActivityDeleteModalOpen(false);
    setExistingActivity(activity);
  };

  const handleDeleteActivity = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setExistingActivity(activity);
    setIsActivityDeleteModalOpen(true);
    setIsActivityRequestModalOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 z-10 items-center justify-end hidden gap-3 px-3 py-1 group-hover:flex text-text-color rounded-ee-xl bg-background">
      <IconEdit
        size={20}
        stroke={1}
        className="hover:text-primary"
        onClick={(event) => handleEditActivity(event)}
      />
      <IconTrashXFilled
        size={20}
        stroke={1}
        className="hover:text-accent"
        onClick={(event) => handleDeleteActivity(event)}
      />
    </div>
  );
}

export default ActivityCardActions;
