
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, CameraOff } from 'lucide-react';
import { toast } from 'sonner';

const CameraButton = () => {
  const [isOn, setIsOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleCamera = async () => {
    try {
      if (!isOn) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Connect stream to video element if available
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        
        // Store stream reference for later cleanup
        streamRef.current = stream;
        toast.success("Camera activated");
        setIsOn(true);
      } else {
        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        
        // Clear video source
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        
        toast.info("Camera deactivated");
        setIsOn(false);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error("Failed to access camera. Please check permissions.");
      setIsOn(false);
    }
  };

  return (
    <>
      <Button
        onClick={toggleCamera}
        variant="outline"
        className={`glass-card transition-all duration-300 ${
          isOn ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}
      >
        {isOn ? (
          <>
            <Camera className="mr-2 h-4 w-4" />
            Camera Active
          </>
        ) : (
          <>
            <CameraOff className="mr-2 h-4 w-4" />
            Start Camera
          </>
        )}
      </Button>
      <video 
        ref={videoRef} 
        className="hidden" // Hidden but available for use by detection algorithms
        muted
      />
    </>
  );
};

export default CameraButton;
