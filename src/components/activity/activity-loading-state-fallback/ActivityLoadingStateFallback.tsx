function ActivityLoadingStateFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full gap-2">
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      <p className="text-sm font-medium text-primary">Processing...</p>
    </div>
  );
}

export default ActivityLoadingStateFallback;
