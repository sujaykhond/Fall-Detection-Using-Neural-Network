
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, CameraOff } from 'lucide-react';
import { toast } from 'sonner';

const CameraButton = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleCamera = async () => {
    try {
      if (!isOn) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Here you would typically connect this stream to a video element
        // or process it for fall detection
        toast.success("Camera activated");
        setIsOn(true);
      } else {
        // Stop all tracks
        const tracks = await navigator.mediaDevices.getUserMedia({ video: true });
        tracks.getTracks().forEach(track => track.stop());
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
  );
};

export default CameraButton;
