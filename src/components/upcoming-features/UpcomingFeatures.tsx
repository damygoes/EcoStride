import { upcomingFeatures } from "@lib/constants";

function UpcomingFeatures() {
  return (
    <div className="flex flex-col w-full h-full gap-3 p-3">
      <h3 className="text-lg font-semibold text-primary">Upcoming Features</h3>
      <ul className="flex flex-col gap-4 pr-3 overflow-auto scrollbar-hide">
        {upcomingFeatures.map((feature) => (
          <li
            key={feature.id}
            className="flex flex-col gap-1 p-3 transition-colors duration-300 ease-in-out rounded-md bg-accent/10 hover:bg-accent/20"
          >
            <div className="flex items-start justify-start gap-2">
              <span className="text-sm">{feature.icon}</span>
              <h4 className="text-sm font-semibold text-text-color">
                {feature.title}
              </h4>
            </div>
            <p className="text-sm font-light text-text-color">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingFeatures;
