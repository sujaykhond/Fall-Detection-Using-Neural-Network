
import React, { useState } from 'react';
import CameraFeed from '@/components/CameraFeed';
import DetectionHistory from '@/components/DetectionHistory';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, Users, Plus, FileCog, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample detection data
const sampleDetections = [
  {
    id: '1',
    timestamp: '2025-04-10 15:23:45',
    location: 'Living Room',
    severity: 'high' as const,
    personName: 'John Doe',
    status: 'new' as const,
  },
  {
    id: '2',
    timestamp: '2025-04-10 14:18:22',
    location: 'Kitchen',
    severity: 'medium' as const,
    personName: 'Jane Doe',
    status: 'acknowledged' as const,
  },
  {
    id: '3',
    timestamp: '2025-04-10 13:05:17',
    location: 'Bedroom',
    severity: 'low' as const,
    personName: 'Alice Smith',
    status: 'resolved' as const,
  }
];

const Dashboard = () => {
  const [detections, setDetections] = useState(sampleDetections);
  const [showDetections, setShowDetections] = useState(true); // This can toggle between showing or not

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-500/20">
            <Shield className="h-8 w-8 text-detector-blue" />
          </div>
          <h1 className="text-3xl font-bold text-white">Fall Detector Dashboard</h1>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="bg-detector-card text-muted-foreground border-border/30">
            <Bell className="mr-1 h-4 w-4" />
            Alerts
            <Badge className="ml-2 bg-red-500 text-white" variant="outline">3</Badge>
          </Button>
          <Button variant="outline" size="sm" className="bg-detector-card text-muted-foreground border-border/30">
            <Settings className="mr-1 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="monitoring" className="mb-8">
        <TabsList className="bg-detector-card border border-border/30">
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          <TabsTrigger value="history">Detection History</TabsTrigger>
          <TabsTrigger value="settings">Camera Settings</TabsTrigger>
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monitoring" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CameraFeed cameraId="CAM_001" title="Live Fall Detection" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="detector-card space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Users size={18} className="text-blue-500" />
                    Monitoring Status
                  </h3>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>Active Monitors</span>
                    <span className="text-blue-400 font-medium">3/4</span>
                  </div>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>People Detected</span>
                    <span className="text-blue-400 font-medium">2</span>
                  </div>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>Detection Sensitivity</span>
                    <span className="text-blue-400 font-medium">High</span>
                  </div>
                </div>
                
                <div className="detector-card space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <FileCog size={18} className="text-blue-500" /> 
                    System Statistics
                  </h3>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>Model Version</span>
                    <span className="text-blue-400 font-medium">v2.3.1</span>
                  </div>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>Uptime</span>
                    <span className="text-blue-400 font-medium">23h 45m</span>
                  </div>
                  <div className="bg-detector-darker rounded p-3 flex justify-between items-center">
                    <span>CPU Usage</span>
                    <span className="text-blue-400 font-medium">34%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <DetectionHistory detections={showDetections ? detections : []} />
              
              <div className="mt-6 flex gap-2 justify-end">
                <Button 
                  variant="outline"
                  className="border-border/30 text-muted-foreground"
                  onClick={() => setShowDetections(!showDetections)}
                >
                  {showDetections ? 'Hide Detections' : 'Show Detections'}
                </Button>
                <Button className="bg-detector-blue hover:bg-blue-600">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Camera
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <div className="detector-card">
            <h3 className="text-xl mb-4">Detection History - Coming Soon</h3>
            <p className="text-muted-foreground">
              This tab will display a full history of all fall detections,
              including filtering and search capabilities.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <div className="detector-card">
            <h3 className="text-xl mb-4">Camera Settings - Coming Soon</h3>
            <p className="text-muted-foreground">
              This tab will allow configuration of cameras, detection sensitivity,
              and other monitoring parameters.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="contacts" className="mt-6">
          <div className="detector-card">
            <h3 className="text-xl mb-4">Emergency Contacts - Coming Soon</h3>
            <p className="text-muted-foreground">
              This tab will allow management of emergency contacts who will be
              notified when a fall is detected.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
