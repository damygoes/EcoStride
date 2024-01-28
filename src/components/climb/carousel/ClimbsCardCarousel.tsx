import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { Climb } from "@type-definitions/Climb";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 350;
const CARD_HEIGHT = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
  sm: 480,
  lg: 976,
};

type ClimbsCardCarouselProps = {
  climbs: Climb[];
};

const ClimbsCardCarousel = ({ climbs }: ClimbsCardCarouselProps) => {
  const [ref, { width }] = useMeasure();
  const [offset, setOffset] = useState(0);

  const CARD_BUFFER =
    width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

  const CAN_SHIFT_LEFT = offset < 0;

  const CAN_SHIFT_RIGHT =
    Math.abs(offset) < CARD_SIZE * (climbs.length - CARD_BUFFER);

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

  return (
    <section className="rounded-md bg-text-color/10" ref={ref}>
      <div className="relative p-4 overflow-hidden">
        {/* CARDS */}
        <div className="max-w-6xl mx-auto">
          <p className="mb-4 text-2xl font-semibold text-secondary">
            Everything. <span className="text-text-color">Yes, even that.</span>
          </p>
          <motion.div
            animate={{
              x: offset,
            }}
            className="flex"
          >
            {climbs.map((climb) => {
              return <Card key={climb.id} {...climb} />;
            })}
          </motion.div>
        </div>

        {/* BUTTONS */}
        <>
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_LEFT ? "0%" : "-100%",
            }}
            className="absolute left-0 top-[60%] z-30 rounded-r-xl bg-text-color/30 p-3 pl-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pl-3"
            onClick={shiftLeft}
          >
            <IconChevronLeft />
          </motion.button>
          <motion.button
            initial={false}
            animate={{
              x: CAN_SHIFT_RIGHT ? "0%" : "100%",
            }}
            className="absolute right-0 top-[60%] z-30 rounded-l-xl bg-text-color/30 p-3 pr-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pr-3"
            onClick={shiftRight}
          >
            <IconChevronRight />
          </motion.button>
        </>
      </div>
    </section>
  );
};

const Card = ({ photos, location: { city }, name, summary, slug }: Climb) => {
  const [backgroundImage, setBackgroundImage] = useState(
    photos && photos.length > 1 ? photos[0] : "",
  );

  useEffect(() => {
    const img = new Image();
    img.onload = () =>
      setBackgroundImage(photos && photos.length > 1 ? photos[0] : "");
    img.onerror = () =>
      setBackgroundImage(
        "https://images.unsplash.com/photo-1523357585206-175e971f2ad9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGN5Y2xpbmclMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
      ); // Set the SVG as the fallback
    img.src = photos && photos.length > 1 ? photos[0] : "";
  }, [photos]);

  return (
    <Link
      to={`/home/${slug}`}
      className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.015] hover:shadow-xl"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: MARGIN,
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter] hover:backdrop-blur-sm">
        <span className="text-xs font-semibold uppercase text-accent">
          {city}
        </span>
        <p className="my-2 text-3xl font-bold">{name}</p>
        <p className="text-lg">{summary}</p>
      </div>
    </Link>
  );
};

export default ClimbsCardCarousel;
