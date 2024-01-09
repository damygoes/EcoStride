import {
  AverageGradientIcon,
  DistanceIcon,
  ElevationIcon,
  MaximumGradientIcon,
  MinimumGradientIcon,
} from "@assets/Icons";
import Badge from "@components/common/badge/badge";
import BreadCrumbsComponent from "@components/common/breadcrumbs/breadcrumbs";
import PhotoCarousel from "@components/common/carousel/photo-carousel";
import { Button } from "@components/ui/button/button";
import PageLayout from "@layouts/page-layout/page-layout";
import { climbs } from "@mock/climbs";
import { IconChecks, IconPlus } from "@tabler/icons-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import CommentList from "@features/comments/components/comment-list";
import CommentTextArea from "@features/comments/components/comment-text-area";
import { MOCK_COMMENTS } from "@mock/comments";
import { ClimbDetail } from "../components/climb-card";

function ClimbDetails() {
  const { t } = useTranslation();
  const { climbSlug } = useParams();

  const selectedClimb = useMemo(() => {
    return climbs.find((climb) => climb.slug === climbSlug);
  }, [climbSlug]);

  if (!selectedClimb) {
    return null;
  }

  return (
    <PageLayout
      pageTitle={selectedClimb?.name.toLocaleUpperCase() || ""}
      withSidebar
      sidebarContent={<p>sidebar content</p>}
    >
      <BreadCrumbsComponent className="p-4" />
      <div className="flex flex-col items-start justify-between flex-1 w-full h-[92%] gap-4 p-3 mt-3 overflow-x-hidden overflow-y-auto rounded-md bg-background">
        {/* First Section */}
        <div className="flex flex-col items-start justify-between flex-1 w-full gap-4 md:flex-row md:items-center md:flex-none">
          {/* Left */}
          <div className="flex flex-col items-center justify-between flex-1 w-full gap-5 p-3 rounded-md bg-gradient-to-br from-text-color/10 via-text-color/40 to-secondary text-text-color md:h-full md:py-5 md:gap-8">
            <div className="space-y-2 text-center">
              <h3 className="text-3xl font-semibold">
                {selectedClimb.name.toLocaleUpperCase() || "Climb Name"}
              </h3>
              <p className="text-sm font-light">
                {`Located in ${selectedClimb.city}, ${selectedClimb.state}, ${selectedClimb.country}`}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center w-full gap-3">
              <Badge variant="accent">
                {`Category: ${
                  selectedClimb.category.toLocaleUpperCase() || "N/A"
                }`}
              </Badge>
              {selectedClimb.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <ClimbDetail
                icon={<DistanceIcon />}
                name={t("climb-card.distance")}
                value={`${selectedClimb.distance}km`}
              />

              <ClimbDetail
                icon={<MinimumGradientIcon />}
                name={"Min. Gradient"}
                value={`${selectedClimb.minGrade}%`}
              />
              <ClimbDetail
                icon={<AverageGradientIcon />}
                name={t("climb-card.avg-grade")}
                value={`${selectedClimb.averageGrade}%`}
              />
              <ClimbDetail
                icon={<MaximumGradientIcon />}
                name={"Max. Gradient"}
                value={`${selectedClimb.maxGrade}%`}
              />

              <ClimbDetail
                icon={<ElevationIcon />}
                name={t("climb-card.elevation")}
                value={`${selectedClimb.elevationGain}m`}
              />
            </div>
            <div className="flex flex-wrap items-center justify-center w-full gap-4">
              <Button iconLeft={<IconPlus />} variant="primary" size="sm">
                Add to my Bucket List
              </Button>
              <Button iconLeft={<IconChecks />} variant="secondary" size="sm">
                Already ridden
              </Button>
            </div>
          </div>
          {/* Right */}
          <div className="w-full rounded-md bg-inherit md:w-2/5 md:h-full">
            <img
              src="https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFwfGVufDB8fDB8fHww"
              alt="map"
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        </div>
        {/* Second Section */}
        <div className="w-full p-4 rounded-md shadow-sm bg-background text-text-color">
          <h5 className="text-4xl capitalize">About</h5>
          <p className="w-full my-3 text-base text-balance first-letter:uppercase first-letter:text-2xl">
            {selectedClimb.description}
          </p>
        </div>
        {/* Third Section */}
        <PhotoCarousel images={selectedClimb.photos} />

        <div className="flex flex-col items-start justify-start w-full gap-3 p-4 rounded-md shadow-sm bg-gradient-to-b from-text-color/5 via-white to-white text-text-color">
          <h5 className="w-full text-4xl capitalize">Comments</h5>
          <CommentTextArea />
          <CommentList comments={MOCK_COMMENTS} />
        </div>
      </div>
    </PageLayout>
  );
}

export default ClimbDetails;
