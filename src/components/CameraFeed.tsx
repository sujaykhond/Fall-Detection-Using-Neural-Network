
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Video } from 'lucide-react';

interface CameraFeedProps {
  cameraId?: string;
  title?: string;
}

// This is a simulated camera feed component
const CameraFeed: React.FC<CameraFeedProps> = ({ cameraId = "main", title = "Live Feed" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fallDetected, setFallDetected] = useState(false);
  const [lastDetection, setLastDetection] = useState<string | null>(null);

  useEffect(() => {
    // Simulate camera feed loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Simulate random fall detections for demo
    const fallDetectionInterval = setInterval(() => {
      const shouldTrigger = Math.random() < 0.1; // 10% chance of triggering a fall detection
      if (shouldTrigger) {
        setFallDetected(true);
        setLastDetection(new Date().toLocaleTimeString());
        
        // Reset the alert after 3 seconds
        setTimeout(() => {
          setFallDetected(false);
        }, 3000);
      }
    }, 15000); // Check every 15 seconds

    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(fallDetectionInterval);
    };
  }, []);

  return (
    <div className="detector-card space-y-4">
      <div className="flex items-center gap-2">
        <Video className="text-blue-500" />
        <h2 className="text-xl font-medium">{title}</h2>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Live feed from incident place camera
      </div>
      
      <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* This would be replaced with an actual video feed in production */}
            <div className="absolute inset-0 bg-detector-darker flex items-center justify-center">
              <img 
                src="/lovable-uploads/c3c64b4d-c5ad-4161-aba0-3efe4af2057a.png" 
                alt="Camera Feed" 
                className="w-full h-full object-cover opacity-60"
              />
            </div>
            
            {/* Recording indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-xs text-white">REC</span>
            </div>
            
            {/* Camera ID */}
            <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 rounded text-xs">
              Camera ID: {cameraId}
            </div>
            
            {/* Fall detection alert */}
            {fallDetected && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/70 px-6 py-4 rounded-lg flex flex-col items-center gap-2">
                  <AlertTriangle className="h-8 w-8 text-red-500 animate-pulse" />
                  <span className="text-lg font-bold text-red-500">FALL DETECTED</span>
                  <span className="text-sm text-white">Alert sent at {lastDetection}</span>
                </div>
              </div>
            )}
            
            {/* Timestamp */}
            <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-xs">
              {new Date().toLocaleString()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraFeed;
