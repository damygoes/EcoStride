const upcomingFeatures = [
  {
    id: 1,
    icon: "⏱️",
    title: "Strava Segment Timing",
    description:
      "Soon you'll be able to estimate the best times on Strava segments directly within our app.",
  },
  {
    id: 2,
    icon: "🔗",
    title: "Strava Integration",
    description:
      "Login with Strava and import your activities to keep all your adventures in one place.",
  },
  {
    id: 3,
    icon: "🚴‍♂️🏃‍♀️🧗‍♂️",
    title: "More Activities On The Way",
    description:
      "We're expanding our horizons! Stay tuned for more activity types to track and share.",
  },
  {
    id: 4,
    icon: "⚖️",
    title: "BMI Calculator",
    description:
      "Track your progress with our built-in BMI calculator, designed for athletes.",
  },
  {
    id: 5,
    icon: "🔥",
    title: "Calorie Counter",
    description:
      "Keep track of the energy you burn with our precise calorie calculator, tailored for outdoor sports.",
  },
  {
    id: 6,
    icon: "📈",
    title: "Training Plans",
    description:
      "Elevate your performance with cycling and running training plans, crafted for all levels.",
  },
];

function UpcomingFeatures() {
  return (
    <div className="flex flex-col w-full h-full gap-3 p-3">
      <h3 className="text-lg font-semibold text-primary">Upcoming Features</h3>
      <ul className="flex flex-col gap-4 pr-3 overflow-auto">
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
