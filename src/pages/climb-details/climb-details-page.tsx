import ClimbDetailsHeader from "@components/climb/details/ClimbDetailsHeader";
import ClimbDetailsSection from "@components/climb/details/ClimbDetailsSection";
import CommentList from "@components/comments/CommentList";
import CommentTextArea from "@components/comments/CommentTextArea";
import BreadCrumbsComponent from "@components/common/breadcrumbs/breadcrumbs";
import PhotoCarousel from "@components/common/carousel/photo-carousel";
import RelatedClimbsList from "@components/related-climbs/RelatedClimbsList";
import PageLayout from "@layouts/page-layout/page-layout";
import { ALL_CLIMB_COMMENTS } from "@mock/comments";
import { useClimb } from "@utils/climb/climb-store";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function ClimbDetails() {
  const { t } = useTranslation();
  const { climbSlug } = useParams();
  const { fetchClimb } = useClimb({
    query: {
      slug: climbSlug,
    },
  });
  const { data: Climb, isLoading, isError } = fetchClimb;

  // TODO: Handle properly in backend
  const climbComments = useMemo(() => {
    return ALL_CLIMB_COMMENTS.filter(
      (comment) => comment.climbId === Climb?.id,
    );
  }, [Climb?.id]);

  if (!Climb) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <PageLayout
      pageTitle={Climb?.name.toUpperCase() || ""}
      withSidebar
      sidebarContent={<RelatedClimbsList selectedClimb={Climb} />}
    >
      <BreadCrumbsComponent className="p-4" />
      <div className="flex flex-col items-start justify-between flex-1 w-full h-[92%] gap-4 p-3 mt-3 overflow-x-hidden overflow-y-auto rounded-md bg-background">
        <ClimbDetailsHeader selectedClimb={Climb} t={t} />
        <ClimbDetailsSection title="About" content={Climb.description} />
        <PhotoCarousel images={Climb.photos || []} />
        <ClimbDetailsSection
          title="Comments"
          content={
            <>
              <CommentTextArea />
              <CommentList comments={climbComments} />
            </>
          }
        />
      </div>
    </PageLayout>
  );
}

export default ClimbDetails;
