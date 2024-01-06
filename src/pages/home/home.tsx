import ClimbCard from "@features/climb/components/climb-card";
import PageLayout from "@layouts/page-layout/page-layout";
import { climbs } from "@mock/climbs";

function Home() {
  return (
    <PageLayout withFooter withSidebar pageTitle="nearby climbs">
      <div className="flex w-full space-x-3">
        {climbs.map((climb) => {
          return <ClimbCard key={climb.id} climb={climb} basePath="home" />;
        })}
      </div>
    </PageLayout>
  );
}

export default Home;
