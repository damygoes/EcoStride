import { climbs } from "@mock/climbs";
import ClimbCard from "./climb-card";

export default function ClimbsList() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
      {climbs.map((climb) => {
        return <ClimbCard key={climb.id} climb={climb} />;
      })}
    </div>
  );
}
