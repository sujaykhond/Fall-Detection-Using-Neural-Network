
import React from 'react';
import { Folder, Clock, AlertTriangle, User } from 'lucide-react';

interface Detection {
  id: string;
  timestamp: string;
  location: string;
  severity: 'high' | 'medium' | 'low';
  personName?: string;
  imageUrl?: string;
  status: 'new' | 'acknowledged' | 'resolved';
}

interface DetectionHistoryProps {
  detections: Detection[];
}

const DetectionHistory: React.FC<DetectionHistoryProps> = ({ detections }) => {
  return (
    <div className="detector-card space-y-4">
      <div className="flex items-center gap-2">
        <Folder className="text-yellow-500" />
        <h2 className="text-xl font-medium">Last 10 Abnormal Postures</h2>
      </div>
      
      {detections.length === 0 ? (
        <div className="py-8 text-center text-gray-400">
          No detections found.
        </div>
      ) : (
        <div className="space-y-3">
          {detections.map((detection) => (
            <div 
              key={detection.id} 
              className="p-3 rounded-md bg-detector-darker border border-border/30 flex gap-3 items-center"
            >
              <div className={`w-12 h-12 rounded-md flex items-center justify-center
                ${detection.severity === 'high' ? 'bg-red-500/20 text-red-500' : 
                detection.severity === 'medium' ? 'bg-amber-500/20 text-amber-500' : 
                'bg-blue-500/20 text-blue-500'}`}
              >
                <AlertTriangle size={24} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Fall Detected</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full
                    ${detection.status === 'new' ? 'bg-red-500/20 text-red-400' : 
                    detection.status === 'acknowledged' ? 'bg-amber-500/20 text-amber-400' : 
                    'bg-green-500/20 text-green-400'}`}
                  >
                    {detection.status === 'new' ? 'New' : 
                     detection.status === 'acknowledged' ? 'Acknowledged' : 'Resolved'}
                  </span>
                </div>
                
                <div className="text-sm text-gray-400 flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{detection.timestamp}</span>
                  </div>
                  
                  {detection.personName && (
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{detection.personName}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-12 h-12 overflow-hidden rounded-md bg-detector-darker">
                {detection.imageUrl ? (
                  <img 
                    src={detection.imageUrl} 
                    alt="Detection" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <span className="text-xs">No Img</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetectionHistory;
