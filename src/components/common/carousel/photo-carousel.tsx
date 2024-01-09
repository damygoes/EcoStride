import defaultImage from "@assets/dslr-camera.svg";
import { Button } from "@components/ui/button/button";
import { cn } from "@lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

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
      className="w-full py-8 shadow-sm bg-gradient-to-br from-white to-text-color/40"
      ref={ref}
    >
      <div className="relative p-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="mb-4 text-4xl">
              {carouselTitle ? carouselTitle : "Photos"}
            </h2>
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
            {images.map((image, index) => {
              return <ImageCard key={index} imageSrc={image} />;
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ImageCard = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <div
      className="relative transition-transform cursor-pointer shrink-0 hover:-translate-y-1"
      style={{
        width: CARD_WIDTH,
        marginRight: MARGIN,
      }}
    >
      <img
        alt="photo"
        src={imageSrc}
        onError={(e) => {
          const target = e.target as HTMLImageElement; // assert the target as an HTMLImageElement
          target.onerror = null; // prevents looping
          target.src = defaultImage; // set the default image
        }}
        className="mb-3 h-[350px] w-full rounded-lg object-cover"
      />
    </div>
  );
};

export default PhotoCarousel;
