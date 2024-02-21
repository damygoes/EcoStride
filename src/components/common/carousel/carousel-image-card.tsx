import defaultImage from "@assets/dslr-camera.svg";

type CarouselImageCardProps = {
  imageSrc: string;
  width: number;
  marginRight: number;
};

function CarouselImageCard({
  imageSrc,
  width,
  marginRight,
}: CarouselImageCardProps) {
  return (
    <div
      className="relative transition-transform cursor-pointer shrink-0 hover:-translate-y-1"
      style={{
        width,
        marginRight,
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
}

export default CarouselImageCard;
