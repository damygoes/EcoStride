import useNetworkStatus from "@hooks/useNetworkStatus";
import { cn } from "@lib/utils";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const NetworkStatusNotifier = () => {
  const isOnline = useNetworkStatus();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      // Network is offline, show error message
      setShowError(true);
    } else {
      // Network is online, hide error message after 2 seconds
      const timeoutId = setTimeout(() => {
        setShowError(false);
      }, 2000);

      // Cleanup the timeout when the component unmounts or when network status changes
      return () => clearTimeout(timeoutId);
    }
  }, [isOnline]);

  if (!isOnline && showError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center w-fit h-8 px-6 py-2 bg-warning text-text-color rounded-lg text-sm fixed top-7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent/80 shadow-md",
        )}
      >
        <IconAlertTriangle className="w-4 h-4 mr-2" />
        You are offline. Please check your internet connection
      </div>
    );
  }

  return null; // Don't render anything if the network is online or if there's no error
};

export default NetworkStatusNotifier;
