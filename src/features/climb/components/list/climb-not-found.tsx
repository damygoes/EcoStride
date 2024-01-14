function ClimbNotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <h3 className="text-2xl font-semibold text-center text-text-color">
        No climbs found
      </h3>
      <p className="text-sm text-center text-text-color">
        Try changing your filters or search term
      </p>
    </div>
  );
}

export default ClimbNotFound;
