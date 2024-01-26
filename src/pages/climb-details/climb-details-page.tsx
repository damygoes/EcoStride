import CommentList from "@components/comments/CommentList";
import CommentTextArea from "@components/comments/CommentTextArea";
import BreadCrumbsComponent from "@components/common/breadcrumbs/breadcrumbs";
import PhotoCarousel from "@components/common/carousel/photo-carousel";
import PageLayout from "@layouts/page-layout/page-layout";
import { climbs } from "@mock/climbs";
import { ALL_CLIMB_COMMENTS } from "@mock/comments";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ClimbDetailsHeader from "../../components/climb/details/ClimbDetailsHeader";
import ClimbDetailsSection from "../../components/climb/details/ClimbDetailsSection";
import RelatedClimbsList from "../../components/related-climbs/RelatedClimbsList";

function ClimbDetails() {
  const { t } = useTranslation();
  const { climbSlug } = useParams();

  const selectedClimb = useMemo(
    () => climbs.find((climb) => climb.slug === climbSlug),
    [climbSlug],
  );

  const climbComments = useMemo(() => {
    return ALL_CLIMB_COMMENTS.filter(
      (comment) => comment.climbId === selectedClimb?.id,
    );
  }, [selectedClimb?.id]);

  if (!selectedClimb) {
    return null;
  }

  return (
    <PageLayout
      pageTitle={selectedClimb.name.toUpperCase() || ""}
      withSidebar
      sidebarContent={<RelatedClimbsList selectedClimb={selectedClimb} />}
    >
      <BreadCrumbsComponent className="p-4" />
      <div className="flex flex-col items-start justify-between flex-1 w-full h-[92%] gap-4 p-3 mt-3 overflow-x-hidden overflow-y-auto rounded-md bg-background">
        <ClimbDetailsHeader selectedClimb={selectedClimb} t={t} />
        <ClimbDetailsSection
          title="About"
          content={selectedClimb.description}
        />
        <PhotoCarousel images={selectedClimb.photos || []} />
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
