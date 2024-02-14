import ActivityLoadingStateFallback from "@components/activity/activity-loading-state-fallback/ActivityLoadingStateFallback";
import ActivityDetailsHeader from "@components/activity/details/ActivityDetailsHeader";
import ActivityDetailsSection from "@components/activity/details/ActivityDetailsSection";
import CommentCountDisplay from "@components/comments/CommentCountDisplay";
import CommentList from "@components/comments/CommentList";
import CommentTextArea from "@components/comments/CommentTextArea";
import BreadCrumbsComponent from "@components/common/breadcrumbs/breadcrumbs";
import PhotoCarousel from "@components/common/carousel/photo-carousel";
import ErrorFallback from "@components/common/error-fallback/error-fallback";
import RelatedActivitiesList from "@components/related-activities/RelatedActivitiesList";
import PageLayout from "@layouts/page-layout/page-layout";
import { useQuery } from "@tanstack/react-query";
import { useActivity } from "@utils/activity/activity-store";
import { useComment } from "@utils/comment/comment-store";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function ActivityDetails() {
  const { t } = useTranslation();
  const { activitySlug } = useParams();
  const { fetchActivity } = useActivity();
  const { fetchComments } = useComment();
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
      <div className="flex flex-col items-start justify-between flex-1 w-full h-[92%] gap-4 p-3 mt-3 overflow-x-hidden overflow-y-auto rounded-md bg-background">
        {isLoading && <ActivityLoadingStateFallback />}
        {isError && (
          <ErrorFallback
            withAction
            actionText="Back to Activities"
            redirectUrl="/activities"
          />
        )}
        <ActivityDetailsHeader selectedActivity={Activity} t={t} />
        <ActivityDetailsSection title="About" content={Activity.description} />
        <PhotoCarousel images={Activity.photos || []} />
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
    </PageLayout>
  );
}

export default ActivityDetails;
