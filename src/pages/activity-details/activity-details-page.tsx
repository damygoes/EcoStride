import ActivityLoadingStateFallback from "@components/activity/activity-loading-state-fallback/ActivityLoadingStateFallback";
import ActivityDetailsHeader from "@components/activity/details/ActivityDetailsHeader";
import ActivityDetailsSection from "@components/activity/details/ActivityDetailsSection";
import CommentCountDisplay from "@components/comments/CommentCountDisplay";
import CommentList from "@components/comments/CommentList";
import CommentTextArea from "@components/comments/CommentTextArea";
import BreadCrumbsComponent from "@components/common/breadcrumbs/breadcrumbs";
import PhotoCarousel from "@components/common/carousel/photo-carousel";
import ErrorFallback from "@components/common/error-fallback/error-fallback";
import EcoStrideMap from "@components/common/map/EcoStrideMap";
import PointOfInterestList from "@components/point-of-interest/PointOfInterestList";
import RelatedActivitiesList from "@components/related-activities/RelatedActivitiesList";
import PageLayout from "@layouts/page-layout/page-layout";
import { useQuery } from "@tanstack/react-query";
import { POIApiResponse } from "@type-definitions/PointOfInterest";
import { useActivity } from "@utils/activity/activity-store";
import { useComment } from "@utils/comment/comment-store";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function ActivityDetails() {
  const { t } = useTranslation();
  const { activitySlug } = useParams();
  const { fetchActivity } = useActivity();
  const { fetchComments } = useComment();
  const [pois, setPois] = useState<POIApiResponse | null>(null);
  const {
    data: Activity,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activity", activitySlug],
    queryFn: () => fetchActivity(activitySlug),
    enabled: !!activitySlug,
  });

  const {
    data: Comments,
    // isLoading: isCommentsLoading,
    // isError: isCommentsError,
  } = useQuery({
    queryKey: ["comments", activitySlug],
    queryFn: () => fetchComments(activitySlug),
    enabled: !!activitySlug,
    refetchInterval: 1000 * 2, // 2 seconds
  });

  const activityCommentsCount = useMemo(() => {
    return Comments?.length || 0;
  }, [Comments]);

  if (!Activity) {
    return null;
  }

  return (
    <PageLayout
      pageTitle={Activity?.name.toUpperCase() || ""}
      withSidebar
      sidebarContent={<RelatedActivitiesList selectedActivity={Activity} />}
    >
      <BreadCrumbsComponent className="p-4" />
      <div className="flex flex-col items-center justify-between flex-1 w-full h-[92%] gap-7 p-7 mt-3 overflow-x-hidden overflow-y-auto rounded-md bg-background scrollbar-hide">
        {isLoading && <ActivityLoadingStateFallback />}
        {isError && (
          <ErrorFallback
            withAction
            actionText="Back to Activities"
            redirectUrl="/activities"
          />
        )}
        <div className="flex items-center justify-between w-full gap-4">
          <div>
            <ActivityDetailsHeader selectedActivity={Activity} t={t} />
          </div>
          <div className="hidden rounded-md lg:flex lg:w-full bg-inherit md:h-full">
            <EcoStrideMap
              startCoordinates={Activity.startCoordinate}
              endCoordinates={Activity.endCoordinate}
              setPois={setPois}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between w-full gap-2 lg:gap-4 lg:flex-row">
          <div className="w-full h-full lg:flex-1">
            <ActivityDetailsSection
              title="About"
              content={Activity.description}
            />
          </div>
          <div className="w-full lg:w-1/4 overflow-hidden h-[27.5rem] bg-background max-h-[32rem]">
            <PointOfInterestList pois={pois ?? null} />
          </div>
        </div>
        <div className="w-full lg:col-span-3 lg:row-start-3">
          <PhotoCarousel images={Activity.photos || []} />
        </div>
        <div className="w-full lg:col-span-full">
          <ActivityDetailsSection
            title={<CommentCountDisplay commentCount={activityCommentsCount} />}
            content={
              <div className="flex flex-col gap-4">
                <CommentTextArea placeholder="What do you think of this activity?" />
                <CommentList comments={Comments ?? []} />
              </div>
            }
          />
        </div>
      </div>
    </PageLayout>
  );
}

export default ActivityDetails;
