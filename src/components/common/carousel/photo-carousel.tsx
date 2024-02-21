import { Button } from "@components/ui/button/button";
import { cn } from "@lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useMeasure from "react-use-measure";
import CarouselImageCard from "./carousel-image-card";

type PhotoCarouselProps = {
  images: string[];
  carouselTitle?: string;
};

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const PhotoCarousel = ({ images, carouselTitle }: PhotoCarouselProps) => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);
  const { t } = useTranslation();

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (images.length - CARD_BUFFER);

  const shiftLeft = () => {
    if (!CAN_SHIFT_LEFT) {
      return;
    }
    setOffset((pv) => (pv += CARD_SIZE));
  };

  const shiftRight = () => {
    if (!CAN_SHIFT_RIGHT) {
      return;
    }
    setOffset((pv) => (pv -= CARD_SIZE));
  };

  if (!images) {
    return null;
  }

  return (
    <section
      className="w-full py-2 rounded-md shadow-sm bg-gradient-to-br from-white to-text-color/40"
      ref={ref}
    >
      <div className="relative p-4 overflow-hidden">
        <div className="mx-auto lg:mx-0">
          <div className="flex items-center justify-between flex-1 mb-3">
            <h2 className="mb-4 text-lg font-medium">
              {carouselTitle
                ? carouselTitle
                : t("activity-details-page.photos")}
            </h2>
            {images.length > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className={cn("opacity-30", {
                    "": CAN_SHIFT_LEFT,
                  })}
                  disabled={!CAN_SHIFT_LEFT}
                  onClick={shiftLeft}
                >
                  <IconChevronLeft />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className={cn("opacity-30", {
                    "": CAN_SHIFT_RIGHT,
                  })}
                  disabled={!CAN_SHIFT_RIGHT}
                  onClick={shiftRight}
                >
                  <IconChevronRight />
                </Button>
              </div>
            )}
          </div>
          <motion.div
            animate={{
              x: offset,
            }}
            transition={{
              ease: "easeInOut",
            }}
            className="flex"
          >
            {images.length === 0 && (
              <p> {t("activity-details-page.no-photo")} </p>
            )}
            {images.map((image, index) => {
              return (
                <CarouselImageCard
                  key={index}
                  imageSrc={image}
                  width={CARD_WIDTH}
                  marginRight={MARGIN}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhotoCarousel;
