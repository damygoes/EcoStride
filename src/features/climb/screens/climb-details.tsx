import BreadCrumbsComponent from "@components/common/breadcrumbs/breadcrumbs";
import PhotoCarousel from "@components/common/carousel/photo-carousel";
import CommentList from "@features/comments/components/comment-list";
import CommentTextArea from "@features/comments/components/comment-text-area";
import PageLayout from "@layouts/page-layout/page-layout";
import { climbs } from "@mock/climbs";
import { MOCK_COMMENTS } from "@mock/comments";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ClimbDetailsHeader from "../components/details/climb-details-header";
import ClimbDetailsSection from "../components/details/climb-details-section";
import RelatedClimbsList from "../components/related-climbs/related-climbs-list";

function ClimbDetails() {
  const { t } = useTranslation();
  const { climbSlug } = useParams();
  const selectedClimb = useMemo(
    () => climbs.find((climb) => climb.slug === climbSlug),
    [climbSlug],
  );

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
        <PhotoCarousel images={selectedClimb.photos} />
        <ClimbDetailsSection
          title="Comments"
          content={
            <>
              <CommentTextArea />
              <CommentList comments={MOCK_COMMENTS} />
            </>
          }
        />
      </div>
    </PageLayout>
  );
}

export default ClimbDetails;
