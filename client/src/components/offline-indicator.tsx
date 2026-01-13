import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOnlineNotification, setShowOnlineNotification] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineNotification(true);
      setTimeout(() => setShowOnlineNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineNotification(false);
    };

    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && !showOnlineNotification) return null;

  return (
    <div
      className={cn(
        "fixed top-16 left-0 right-0 z-40 py-2 px-4 text-center text-sm font-medium transition-all duration-300",
        isOnline
          ? "bg-green-500 text-white"
          : "bg-yellow-500 text-yellow-900"
      )}
      data-testid="indicator-offline"
    >
      <div className="flex items-center justify-center gap-2">
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            Back online! Your data will sync.
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            You're offline. Some features may be limited.
          </>
        )}
      </div>
    </div>
  );
}
