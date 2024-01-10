import { Button } from "@components/ui/button/button";

function ClimbRequestCTA() {
  return (
    <div className="flex flex-col items-start justify-between w-full gap-3 p-3 rounded-md shadow-sm text-text-color bg-background">
      <h5 className="text-sm font-light text-wrap">
        Is there a climb you would like us to add?
      </h5>
      <Button className="w-full" variant="gradient">
        Submit a Request
      </Button>
    </div>
  );
}

export default ClimbRequestCTA;
