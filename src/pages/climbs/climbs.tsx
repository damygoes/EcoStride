import ClimbCard from "@features/climb/components/climb-card";
import PageLayout from "@layouts/page-layout/page-layout";
import { climbs } from "@mock/climbs";

function Climbs() {
  return (
    <PageLayout withFooter withSidebar pageTitle="all climbs">
      <h2 className="text-4xl text-text-color">All Climbs</h2>
      <div className="flex w-full space-x-3">
        {climbs.map((climb) => {
          return <ClimbCard key={climb.id} climb={climb} />;
        })}
      </div>
    </PageLayout>
  );
}

export default Climbs;
