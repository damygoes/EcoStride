import ClimbCard from "@features/climb/components/climb-card";
import PageLayout from "@layouts/page-layout/page-layout";
import { climbs } from "@mock/climbs";

function PrEstimatorScreen() {
  return (
    <PageLayout withFooter pageTitle="PR CALCULATOR">
      <div className="flex w-full space-x-3">
        {climbs.map((climb) => {
          return (
            <ClimbCard key={climb.id} climb={climb} basePath="pr-estimator" />
          );
        })}
      </div>
    </PageLayout>
  );
}

export default PrEstimatorScreen;
