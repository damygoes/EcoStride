import BreadCrumbsComponent from "@components/common/breadcrumbs/breadcrumbs";
import PageLayout from "@layouts/page-layout/page-layout";
import { climbs } from "@mock/climbs";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

function ClimbDetails() {
  const { climbSlug } = useParams();

  // TODO: Find the climb with the id of climbId
  const selectedClimb = useMemo(() => {
    return climbs.find((climb) => climb.slug === climbSlug);
  }, [climbSlug]);

  return (
    <PageLayout
      pageTitle={selectedClimb?.name.toLocaleUpperCase() || ""}
      withSidebar
      sidebarContent={<p>sidebar content</p>}
    >
      <BreadCrumbsComponent />
      <p>Climb Details Page</p>
    </PageLayout>
  );
}

export default ClimbDetails;
