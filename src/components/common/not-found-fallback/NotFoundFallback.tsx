import { Link } from "react-router-dom";

function NotFoundFallback() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8 px-6 py-3 overflow-hidden rounded-md shadow-sm md:gap-3 md:p-12 bg-background">
      <div className="flex flex-col items-start justify-start gap-3 px-5 md:px-24 md:py-8">
        <h5 className="text-xl font-semibold text-text-color">
          Oops! You've strayed off the path...
        </h5>
        <p className="text-sm font-light text-text-color/80 text-balance">
          Unexpected turns open the door to new adventures. Though this digital
          trail ends here, countless others await your discovery.
        </p>
      </div>
      <div className="flex flex-col items-start justify-start gap-3 px-5 md:px-24 md:py-8">
        <h5 className="text-xl font-semibold text-text-color">
          Let's Get Back on Track!
        </h5>
        <p className="text-sm font-light text-text-color/80 text-balance">
          Embark on a new journey now. Whether you're cycling up challenging
          slopes, jogging through tranquil forests, or trekking across
          breathtaking landscapes, adventure is just a click away:
        </p>
      </div>
      <div className="flex items-center justify-start w-full px-5 md:px-24 md:py-8">
        <Link
          to="/activities"
          className="text-base font-semibold text-accent/80 hover:text-accent"
        >
          Let us guide you.
        </Link>
      </div>
    </div>
  );
}

export default NotFoundFallback;
